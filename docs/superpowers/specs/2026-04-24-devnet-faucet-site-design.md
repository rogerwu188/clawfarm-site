# Devnet Faucet Site Design

Date: 2026-04-24
Scope: Add a devnet faucet to the ClawFarm site `/devnet` page.

## Summary

Add a wallet-connected faucet card to the `/devnet` page so users can claim test `CLAW` and `Test USDC` after connecting a Solana wallet. The site will submit the existing `clawfarm-masterpool` devnet `claimFaucet` instruction directly from the browser. The browser never custodially transfers tokens and no Next.js API route or backend faucet service is added.

The faucet UI uses the existing masterpool devnet rules and script behavior as the source of truth:

- Default claim: `10 CLAW` and `10 Test USDC`
- Maximum per claim: `10 CLAW` and `10 Test USDC`
- Maximum per wallet per UTC day: `50 CLAW` and `50 Test USDC`
- Maximum global per UTC day: `50,000 CLAW` and `50,000 Test USDC`
- Token decimals: 6 for both mints
- Success links use Solscan devnet transaction URLs

## Source References

The design follows the masterpool faucet implementation and scripts in `/Users/lijing/Code/Cobra/Solana/clawfarm-masterpool`:

- `docs/superpowers/specs/2026-04-24-phase1-devnet-faucet-design.md`
- `docs/superpowers/plans/2026-04-24-phase1-devnet-faucet.md`
- `scripts/phase1/faucet-claim.ts`
- `scripts/phase1/faucet-configure.ts`
- `scripts/phase1/faucet-status.ts`
- `scripts/phase1/common.ts`

## User Experience

The `/devnet` page remains primarily a devnet implementation/status page, but gains a prominent inline hero card near the top. This is the selected layout because the faucet is a primary action for users trying the devnet.

When the wallet is disconnected, the card shows:

- `Network: Devnet`
- Faucet purpose and test-token disclaimer
- Default claim amount
- Per-claim, wallet-daily, and global-daily limits
- A connect-wallet call to action

When the wallet is connected, the card shows:

- Wallet address summary
- Default one-click claim button for `10 CLAW + 10 Test USDC`
- A collapsible custom amount form
- Current configured RPC URL and a `Customize RPC` section
- Status/progress text for transaction preparation, wallet signature, submission, confirmation, and refresh
- Last successful Solscan devnet transaction link

Custom amounts are entered as UI amounts and converted to 6-decimal base units. The UI prevents negative values, values above the per-claim maximum, and claims where both token amounts are zero. These validations are only UX safeguards; chain rules remain authoritative.

## Network and RPC Behavior

The `/devnet` faucet must force devnet usage. It must not rely on the global wallet provider endpoint when that endpoint points at `mainnet-beta`.

The faucet component creates or receives a devnet `Connection` using this priority:

1. User custom RPC URL saved in `localStorage`
2. `NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL`
3. `https://api.devnet.solana.com`

The UI provides a `Customize RPC` section, inspired by Solscan's custom network/RPC affordance. The custom URL is validated before being persisted:

- It must parse as a URL.
- It must use `http:` or `https:`.
- It must pass a lightweight devnet connection check such as `getLatestBlockhash` or `getGenesisHash`.

If validation fails, the component keeps the previous working RPC URL and shows a clear error. The UI never offers mainnet/testnet cluster switching for the faucet.

## Solscan Links

Successful transactions link to Solscan with the devnet cluster query:

```text
https://solscan.io/tx/<signature>?cluster=devnet
```

If account links are added later, they must also include `?cluster=devnet`.

## On-Chain Integration

The frontend calls the existing masterpool devnet program directly from the connected wallet. The current devnet addresses are:

- Masterpool Program: `AP5gMEh6yHjvZBjh7Xg5fgs4EnBiCbVUoDyXxMi1omux`
- CLAW Mint: `GNWh9hfyEpbnNRzVdYBT7ZiB6VRJwXecSwTRohZByky8`
- Test USDC Mint: `D3vhDe6mtdAgj2t8pu6XnaFXDPdiMDTALTSCZbizfm9P`
- Masterpool Config: `Fu2CZPqHZWpSqu9MtxseTurXQidEe54MQxvAkj1Gg54B`
- Pool Authority: `55Cncw3fj9P8RVmgmm1RdAnjYpyF27erJGo1Noz3S3sY`

The frontend derives these faucet PDAs using the masterpool program id:

- `faucet_config` → `faucetConfig`
- `faucet_global` → `faucetGlobalState`
- `faucet_claw_vault` → `faucetClawVault`
- `faucet_usdc_vault` → `faucetUsdcVault`
- `faucet_user` + wallet public key → `faucetUserState`

The claim transaction follows the existing script account shape:

- `config`
- `faucetConfig`
- `faucetGlobalState`
- `faucetUserState`
- `faucetClawVault`
- `faucetUsdcVault`
- `userClawToken`
- `userUsdcToken`
- `clawMint`
- `usdcMint`
- `poolAuthority`
- `user`
- `payer`
- `tokenProgram`
- `systemProgram`

The transaction ensures the connected wallet has associated token accounts for both mints, then submits `claimFaucet({ clawAmount, usdcAmount })`.

## Code Organization

The implementation should keep boundaries small and explicit:

- `app/devnet/page.tsx`: server page, keeps existing static content and renders the client faucet card.
- `app/components/devnet/DevnetFaucetCard.tsx`: client UI and interaction orchestration.
- `app/lib/devnet-faucet/constants.ts`: devnet addresses, seeds, limits, default RPC, Solscan helpers.
- `app/lib/devnet-faucet/amounts.ts`: UI amount/base-unit parsing and formatting.
- `app/lib/devnet-faucet/rpc.ts`: RPC URL validation, persistence keys, connection helpers.
- `app/lib/devnet-faucet/client.ts`: PDA derivation, account preparation, transaction construction/submission.
- `app/lib/devnet-faucet/errors.ts`: wallet/RPC/program error normalization.

If the masterpool project later publishes a JavaScript SDK, `client.ts` should become a thin adapter over that SDK while the UI remains unchanged.

## Error Handling

The card maps expected failures to user-friendly messages:

- Wallet not connected
- Wallet rejected signature
- RPC URL invalid or unavailable
- Faucet is disabled
- Claim amount is invalid
- Per-claim limit exceeded
- Wallet daily limit exceeded
- Global daily limit exceeded
- Faucet vault has insufficient balance
- Transaction submitted but confirmation timed out

The implementation should preserve detailed error output in the browser console for debugging, while showing concise messages in the UI.

## Testing and Verification

Automated tests should focus on pure, stable logic if the project already has or accepts a test setup:

- UI amount to base-unit conversion
- Base-unit to UI amount formatting
- Per-claim input validation
- RPC URL validation
- Solscan devnet URL construction
- Error-message normalization

Manual verification is required because wallet signing and devnet state depend on external systems:

1. Load `/devnet` and confirm the faucet card shows `Network: Devnet`.
2. Connect Phantom or Solflare on devnet.
3. Claim the default `10 CLAW + 10 Test USDC`.
4. Confirm the success link opens `https://solscan.io/tx/<signature>?cluster=devnet`.
5. Try custom values within limits.
6. Try over-limit values and confirm the UI blocks them before signing.
7. Reject a wallet signature and confirm the error is readable.
8. Set an invalid custom RPC and confirm the previous working RPC remains active.
9. Set a valid custom devnet RPC and confirm a claim/status query uses it.

## Non-Goals

This change does not add:

- A backend faucet service
- Server-side token custody
- Mainnet or testnet faucet support
- Arbitrary token faucet support
- Changes to the masterpool program rules
- A published masterpool JavaScript SDK

## Open Decisions Resolved

- Layout: top inline hero card.
- Claim interaction: default one-click claim plus collapsible custom amounts.
- Transaction model: browser constructs and submits the devnet transaction; wallet signs.
- Network: forced devnet connection on the `/devnet` faucet.
- RPC: configurable devnet RPC with local persistence and validation.
- Explorer: Solscan devnet links.
