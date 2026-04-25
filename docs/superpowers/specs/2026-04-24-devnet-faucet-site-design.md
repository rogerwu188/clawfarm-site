# Devnet Faucet Site Design

Date: 2026-04-24
Updated: 2026-04-25
Scope: Add and align a devnet faucet on the ClawFarm site `/devnet` page.

## Summary

Add a Gateway-sponsored faucet card to the `/devnet` page so users can receive test `CLAW` and `Test USDC` without signing a faucet transaction in their wallet. The site remains a static frontend. It reads a recipient public key from the connected wallet or a pasted Solana address, validates the requested amounts in the browser, and sends a claim request to an independent AIRouter/ClawFarm Gateway faucet API.

The Gateway owns the devnet RPC connection and fee payer keypair. It submits the updated `clawfarm-masterpool` devnet `claimFaucet` instruction where the recipient account and fee payer account are separated:

- `user`: recipient wallet public key; does not sign.
- `payer`: Gateway fee payer; signs and pays transaction fees and any associated-token-account rent.
- `poolAuthority`: masterpool PDA authority for faucet vault transfers.
- `faucet_user_state`: derived from the recipient `user`, so wallet daily limits remain keyed by the receiving wallet.
- `userClawToken` and `userUsdcToken`: associated token accounts owned by the recipient.

The browser never stores server secrets, never custodially transfers tokens, and no Next.js API route is added to this static site.

The faucet UI uses the current masterpool devnet rules as the source of truth:

- Default claim: `10 CLAW` and `10 Test USDC`
- Maximum per claim: `10 CLAW` and `10 Test USDC`
- Maximum per wallet per UTC day: `50 CLAW` and `50 Test USDC`
- Maximum global per UTC day: `50,000 CLAW` and `50,000 Test USDC`
- Token decimals: 6 for both mints
- Success links use Solscan devnet transaction URLs

## Source References

The design follows the separated-account faucet implementation and scripts in `/Users/lijing/Code/Cobra/Solana/clawfarm-masterpool`:

- `programs/clawfarm-masterpool/src/instructions/faucet.rs`
- `scripts/phase1/faucet-claim.ts`
- `scripts/phase1/faucet-configure.ts`
- `scripts/phase1/faucet-status.ts`
- `scripts/phase1/common.ts`

It replaces the earlier wallet-signed site design with an independent Gateway API integration.

## User Experience

The `/devnet` page remains primarily a devnet implementation/status page, but includes a prominent inline faucet card near the top. This is the selected layout because the faucet is a primary action for users trying the devnet.

When no wallet is connected, the card shows:

- `Network: Devnet`
- Faucet purpose and test-token disclaimer
- Default claim amount
- Per-claim, wallet-daily, and global-daily limits
- A recipient address field for pasting any valid Solana public key
- A connect-wallet call to action as a convenience, not a requirement

When a wallet is connected, the card shows:

- Connected wallet address summary
- Recipient field prefilled from the wallet public key
- One-click default request for `10 CLAW + 10 Test USDC`
- A collapsible custom amount form
- Gateway API configuration/status copy
- Status/progress text for recipient validation, Gateway request submission, devnet confirmation, and refresh
- Last successful Solscan devnet transaction link

The connected wallet is only a public-key source. Claiming must not open a wallet signature prompt. This makes the faucet usable with wallets that do not expose a Solana devnet signing path, including OKX Wallet.

Custom amounts are entered as UI amounts and converted to 6-decimal base units where needed. The UI prevents negative values, values above the per-claim maximum, and claims where both token amounts are zero. These validations are only UX safeguards; Gateway and chain rules remain authoritative.

## Gateway API Behavior

The static site calls an independent AIRouter/ClawFarm Gateway endpoint configured by:

```text
NEXT_PUBLIC_DEVNET_FAUCET_API_URL
```

The configured endpoint is the only production claim path for the site. The site does not add a local Next.js API route because `next.config.js` uses static export for IPFS/static hosting.

The frontend sends this request shape:

```json
{
  "recipient": "SolanaPublicKeyBase58",
  "clawAmount": "10",
  "usdcAmount": "10"
}
```

Amounts are decimal UI strings, not base-unit strings, unless the Gateway contract explicitly changes. This keeps the API readable and lets the Gateway perform canonical conversion and validation.

A successful response should use this shape:

```json
{
  "ok": true,
  "signature": "transactionSignature",
  "recipient": "SolanaPublicKeyBase58",
  "clawAmount": "10",
  "usdcAmount": "10",
  "cluster": "devnet"
}
```

An error response should use this shape:

```json
{
  "ok": false,
  "code": "WALLET_DAILY_LIMIT_EXCEEDED",
  "message": "This wallet has reached its daily faucet limit."
}
```

Expected Gateway error codes:

- `INVALID_RECIPIENT`
- `INVALID_AMOUNT`
- `PER_CLAIM_LIMIT_EXCEEDED`
- `WALLET_DAILY_LIMIT_EXCEEDED`
- `GLOBAL_DAILY_LIMIT_EXCEEDED`
- `FAUCET_DISABLED`
- `FAUCET_VAULT_EMPTY`
- `RATE_LIMITED`
- `TRANSACTION_FAILED`
- `SERVICE_UNAVAILABLE`

If `NEXT_PUBLIC_DEVNET_FAUCET_API_URL` is missing, the card must show a clear configuration error and disable claim buttons.

## Network and RPC Behavior

The faucet remains devnet-only. The static frontend no longer needs a claim RPC selector because the Gateway owns transaction submission and RPC selection.

The site should still label the faucet as `Devnet only` and must never expose mainnet/testnet switching for this claim path. If the global wallet provider endpoint is adjusted for `/devnet`, that is only for wallet connection consistency; the faucet request itself is Gateway-sponsored and does not use the connected wallet's signing or RPC path.

## Solscan Links

Successful transactions link to Solscan with the devnet cluster query:

```text
https://solscan.io/tx/<signature>?cluster=devnet
```

If account links are added later, they must also include `?cluster=devnet`.

## On-Chain Integration

The Gateway calls the existing masterpool devnet program directly using the separated-account `claimFaucet` model. The current devnet addresses are:

- Masterpool Program: `AP5gMEh6yHjvZBjh7Xg5fgs4EnBiCbVUoDyXxMi1omux`
- CLAW Mint: `GNWh9hfyEpbnNRzVdYBT7ZiB6VRJwXecSwTRohZByky8`
- Test USDC Mint: `D3vhDe6mtdAgj2t8pu6XnaFXDPdiMDTALTSCZbizfm9P`
- Masterpool Config: `Fu2CZPqHZWpSqu9MtxseTurXQidEe54MQxvAkj1Gg54B`
- Pool Authority: `55Cncw3fj9P8RVmgmm1RdAnjYpyF27erJGo1Noz3S3sY`

The Gateway derives these faucet PDAs using the masterpool program id:

- `faucet_config` -> `faucetConfig`
- `faucet_global` -> `faucetGlobalState`
- `faucet_claw_vault` -> `faucetClawVault`
- `faucet_usdc_vault` -> `faucetUsdcVault`
- `faucet_user` + recipient public key -> `faucetUserState`

The Gateway transaction follows the updated script account shape:

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
- `user` = recipient public key, not signer
- `payer` = Gateway fee payer public key, signer
- `tokenProgram`
- `systemProgram`

The Gateway ensures the recipient has associated token accounts for both mints, with Gateway as ATA payer and recipient as ATA owner, then submits `claimFaucet({ clawAmount, usdcAmount })` signed only by the Gateway fee payer.

## Code Organization

The implementation should keep boundaries small and explicit:

- `app/devnet/page.tsx`: server page, keeps existing static content and renders the client faucet card.
- `app/components/devnet/DevnetFaucetCard.tsx`: client UI and interaction orchestration.
- `app/lib/devnet-faucet/constants.ts`: devnet addresses, limits, API URL, Solscan helpers, and public labels.
- `app/lib/devnet-faucet/amounts.ts`: UI amount parsing, formatting, and per-claim input validation.
- `app/lib/devnet-faucet/api.ts`: Gateway request/response types, request execution, and response normalization.
- `app/lib/devnet-faucet/errors.ts`: Gateway, validation, network, and program error normalization.

The old browser transaction helper should be removed or no longer imported by the faucet card because frontend claims no longer use the connected wallet for transaction submission.

## Error Handling

The card maps expected failures to user-friendly messages:

- Faucet API URL is not configured
- Recipient public key is invalid
- Gateway request is rate limited
- Gateway service is unavailable
- Faucet is disabled
- Claim amount is invalid
- Per-claim limit exceeded
- Wallet daily limit exceeded
- Global daily limit exceeded
- Faucet vault has insufficient balance
- Transaction submitted but confirmation timed out or failed

The implementation should preserve detailed Gateway/network error output in the browser console for debugging, while showing concise messages in the UI.

Wallet signature rejection is no longer an expected faucet error because claiming must not request a wallet signature.

## Testing and Verification

Automated tests should focus on pure, stable logic if the project already has or accepts a test setup:

- UI amount to base-unit conversion
- Base-unit to UI amount formatting
- Per-claim input validation
- Recipient public key validation
- Gateway success/error response normalization
- Solscan devnet URL construction
- Error-message normalization

Manual verification is required because Gateway state and devnet state depend on external systems:

1. Load `/devnet` and confirm the faucet card shows `Network: Devnet` or `Devnet only`.
2. Confirm claim buttons are disabled with a clear message when `NEXT_PUBLIC_DEVNET_FAUCET_API_URL` is unset.
3. Configure the Gateway API URL and reload `/devnet`.
4. Connect OKX Wallet and confirm claiming does not open a wallet signature prompt.
5. Connect Phantom or Solflare and confirm claiming also does not open a wallet signature prompt.
6. Claim the default `10 CLAW + 10 Test USDC` for the connected wallet address.
7. Paste a recipient address without connecting a wallet and claim default tokens.
8. Confirm the success link opens `https://solscan.io/tx/<signature>?cluster=devnet`.
9. Try custom values within limits.
10. Try over-limit values and confirm the UI blocks them before contacting the Gateway.
11. Simulate Gateway error codes and confirm the UI messages are readable.
12. Confirm recipient ATAs are owned by the recipient wallet, not by the Gateway payer.

## Non-Goals

This change does not add:

- A Next.js API route inside the static site
- Server-side secrets in the frontend repository
- Mainnet or testnet faucet support
- Arbitrary token faucet support
- Wallet-signed faucet claims from the browser
- A published masterpool JavaScript SDK

## Open Decisions Resolved

- Layout: top inline hero card.
- Claim interaction: default one-click claim plus collapsible custom amounts.
- Transaction model: independent Gateway sponsors the transaction; user wallet does not sign.
- Recipient model: connected wallet public key or pasted Solana public key.
- Network: forced devnet claim path.
- RPC: owned by Gateway, not configurable in the frontend faucet card.
- Explorer: Solscan devnet links.
- Deployment model: static site calls AIRouter/ClawFarm Gateway via `NEXT_PUBLIC_DEVNET_FAUCET_API_URL`.
