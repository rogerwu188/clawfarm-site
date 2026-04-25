# Network Switch Design

Date: 2026-04-25

Scope: Add a global Solana network switch beside the wallet control, centralize wallet RPC and backend API network selection, and normalize devnet/mainnet routes for the static ClawFarm site.

## Goal

Add a compact network switch next to `Connect Wallet` so users can move between Mainnet and Devnet in a Solscan-like way. The selected network controls wallet RPC configuration and future on-chain read/display features. It also selects the appropriate frontend backend API endpoint from environment variables, but backend API URLs are never shown or user-editable in the UI.

The site remains a static Next.js export. `/devnet` remains the canonical Devnet page, `/` remains the canonical Mainnet homepage, and `?cluster=devnet` is supported as a Solscan-style alias that normalizes to `/devnet`.

## Current Context

The current wallet provider hardcodes `clusterApiUrl('mainnet-beta')` in `app/components/SolanaWalletProvider.tsx`. The current `/devnet` faucet card owns a component-local Devnet RPC selector and uses browser wallet-signed transactions. That splits network behavior across components and forces faucet-specific RPC configuration.

This design centralizes network state so wallet connection, faucet service selection, and future on-chain data reads use one network source. It also removes faucet-owned RPC configuration from the user experience.

## Selected Approach

Use a centralized network configuration and client provider:

- `mainnet` is canonical at `/`.
- `devnet` is canonical at `/devnet`.
- `/?cluster=devnet` is accepted and normalized to `/devnet`.
- `/devnet?cluster=mainnet` is accepted and normalized to `/`.
- The header shows a `Mainnet` or `Devnet` selector immediately before `Connect Wallet`.
- Switching network while a wallet is connected opens a confirmation dialog with three actions: keep wallet connected and switch, disconnect then switch, or cancel.

This approach keeps static pages stable while still supporting Solscan-style cluster links.

## Alternatives Considered

### Path canonical plus query alias

This is the selected approach. It keeps `/devnet` as a real static page for direct loading, sharing, and low-hydration ambiguity, while allowing `?cluster=devnet` links to behave like Solscan. It avoids contradictory state by normalizing path and query combinations.

### Query-only SPA mode

Using only `/?cluster=devnet` and `/?cluster=mainnet` would be closer to Solscan, but with static export both URLs load the same `index.html`. Network-specific content would have to move into client-rendered components, increasing hydration dependence and risking visible flicker before JavaScript runs.

### Path-only mode

Using only `/` and `/devnet` is simplest and most static-friendly, but it does not support the requested Solscan-like `?cluster=devnet` behavior.

## URL and Network Resolution

Network resolution uses path first, then query alias only for normalization:

- `/` -> Mainnet.
- `/devnet` -> Devnet.
- `/?cluster=devnet` -> normalize to `/devnet`.
- `/?cluster=mainnet` -> normalize to `/`.
- `/devnet?cluster=mainnet` -> normalize to `/`.
- `/devnet?cluster=devnet` -> normalize to `/devnet` without the query.
- Unknown or unsupported `cluster` values are ignored and the path decides the network.

The active network object exposes a canonical route and optional Solscan cluster query value:

- Mainnet Solscan links omit a cluster query unless a future integration explicitly requires `cluster=mainnet`.
- Devnet Solscan links use `?cluster=devnet`.

## Configuration

Create a single network configuration module, for example `app/lib/network/config.ts`, with these responsibilities:

- Define supported network ids: `mainnet` and `devnet`.
- Define display labels, canonical routes, and Solscan cluster parameters.
- Define wallet RPC defaults and environment variable overrides.
- Define backend API environment variable selection.
- Define localStorage keys for per-network wallet RPC overrides.

Expected environment variables:

- `NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL`: optional default wallet/read RPC for Mainnet.
- `NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL`: optional default wallet/read RPC for Devnet.
- `NEXT_PUBLIC_MAINNET_API_URL`: frontend backend API base for Mainnet features.
- `NEXT_PUBLIC_DEVNET_API_URL`: frontend backend API base for Devnet features.
- If the faucet keeps a specialized endpoint, `NEXT_PUBLIC_DEVNET_FAUCET_API_URL` remains a Devnet-only service env and is selected only when active network is Devnet.

Backend API URLs are not rendered in menus, cards, help text, or error details. Because this is a static browser app, any API endpoint used directly by the frontend is still visible in built JavaScript and browser network requests. This design hides it from normal UI configuration, not from browser developer tools. If API URLs must be truly secret, a server-side proxy or gateway-owned public path is required.

## Wallet RPC Behavior

The network switch controls wallet RPC and future on-chain read RPC. `SolanaWalletProvider` should read the active network endpoint instead of hardcoding Mainnet.

Default endpoint selection:

- Mainnet uses `NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL` when set; otherwise falls back to `clusterApiUrl('mainnet-beta')`.
- Devnet uses `NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL` when set; otherwise falls back to `clusterApiUrl('devnet')`.
- User-saved per-network wallet RPC overrides take precedence over env defaults.

The network menu may include a compact wallet RPC configuration panel:

- It shows the active network and whether the wallet RPC is default or custom.
- It lets users save/reset a per-network wallet RPC URL.
- It validates only URL shape on save: HTTP or HTTPS.
- It does not display backend API URLs.
- Runtime RPC failures are surfaced where the wallet or on-chain read is used.

## Header UI

Add `NetworkSwitchButton` immediately before `ConnectWalletButton` in `app/client-layout.tsx`.

Visual behavior:

- Compact button: `Mainnet ▾` or `Devnet ▾`.
- Active Devnet state uses existing green status styling, consistent with the ClawFarm header.
- Dropdown options list Mainnet and Devnet with current selection.
- The menu includes wallet RPC status and optional custom RPC controls.
- The control remains usable on mobile; if there is not enough width, it wraps with the existing header action group rather than hiding the current network.

Switch behavior:

- If no wallet is connected, selecting another network immediately navigates to its canonical route.
- If a wallet is connected, show a confirmation dialog.
- The dialog actions are:
  - Keep wallet connected and switch.
  - Disconnect wallet, then switch.
  - Cancel.
- The selected action is applied before navigating.

## Network Provider and Data Flow

Introduce a client network provider/hook, for example `NetworkProvider` and `useNetwork()`.

The provider exposes:

- `networkId`: `mainnet` or `devnet`.
- `network`: the resolved config object.
- `walletRpcUrl`: active wallet/read RPC URL after localStorage override and env fallback.
- `isCustomWalletRpc`: whether the active wallet RPC is user-saved.
- `setWalletRpcUrl(networkId, url)`: save a per-network override.
- `resetWalletRpcUrl(networkId)`: remove a per-network override.
- `switchNetwork(targetNetworkId, options)`: normalize and navigate to the target route.
- `normalizeCurrentUrl()`: remove contradictory or alias query state.

Provider ordering should allow `SolanaWalletProvider` to consume the active wallet RPC. A likely tree is:

1. `NetworkProvider`
2. `SolanaWalletProvider`
3. `WalletModalProvider` internals
4. Header and page content

Because this is a client layout, normalization can run after hydration with `useEffect`. The implementation should minimize flicker by deriving the initial network from `usePathname()` synchronously where possible.

## Backend API Selection

API clients should not read raw env variables directly in page components. They should receive the active network or call a network-aware helper that chooses the correct frontend API base.

Rules:

- Mainnet features use the Mainnet API env.
- Devnet features use the Devnet API env.
- Devnet faucet uses the Devnet faucet API env if it remains a separate service.
- Missing API configuration is reported as a user-friendly service configuration error.
- Error text must not include env variable names, private operational details, or backend URLs.

Example user-facing error: `Devnet faucet service is not configured.`

## Faucet Changes

The faucet should no longer own a user-visible RPC selector. Faucet behavior is network-aware:

- On `/devnet`, the faucet uses Devnet service configuration and wallet public key only as a recipient source when applicable.
- Faucet transactions should be Gateway/backend-sponsored if that implementation plan is active; the user should not configure faucet RPC in the card.
- On Mainnet, faucet UI is hidden or replaced with a simple prompt to switch to Devnet.
- Solscan transaction links for Devnet use `?cluster=devnet`.

The existing `Custom amounts and RPC` area should become amount-only if custom amount support remains. The RPC field, save/reset buttons, and component-local RPC status are removed from the faucet card.

## On-Chain Read Features

Future chain state displays should depend on `useNetwork()` for RPC and Solscan link behavior. Components should not create their own unrelated RPC storage keys. If a component needs a `Connection`, it should receive a network-derived endpoint or use a shared connection helper.

## Error Handling

Required cases:

- Unsupported query cluster: ignore and resolve from path.
- Path/query conflict: normalize to the canonical route.
- Invalid wallet RPC URL: show `Enter a valid HTTP or HTTPS RPC URL.`
- Missing backend API URL: show a feature-specific service configuration message without exposing the URL.
- Network switch with connected wallet: require explicit user choice before navigation.
- Wallet disconnect failure during switch: keep the user on the current page and show a non-destructive error.

## Accessibility

- The network button uses `aria-haspopup="menu"`, `aria-expanded`, and a descriptive label such as `Select Solana network`.
- Menu options are keyboard reachable.
- The wallet-connected switch confirmation dialog traps focus while open and supports Escape/cancel.
- Status text for RPC save/reset is announced with `aria-live="polite"`.

## Testing and Verification

Automated verification:

- Run `npm run build`.
- TypeScript should catch missing network ids or config fields.

Manual verification:

1. Load `/` and confirm the header says Mainnet and wallet RPC resolves to Mainnet.
2. Load `/devnet` and confirm the header says Devnet and wallet RPC resolves to Devnet.
3. Load `/?cluster=devnet` and confirm it normalizes to `/devnet`.
4. Load `/devnet?cluster=mainnet` and confirm it normalizes to `/`.
5. With no wallet connected, switch networks and confirm immediate navigation.
6. With a wallet connected, switch networks and confirm the three-action dialog appears.
7. Choose keep wallet and switch; confirm navigation completes.
8. Choose disconnect then switch; confirm disconnect is attempted before navigation.
9. Save a custom Devnet wallet RPC, reload `/devnet`, and confirm the menu reports a custom RPC.
10. Reset the custom Devnet wallet RPC and confirm it falls back to env/default.
11. Confirm the faucet no longer shows component-local RPC configuration.
12. Confirm API URLs are not rendered in visible UI text.

## Non-Goals

- Do not make backend API URLs secret from browser developer tools in this static-site implementation.
- Do not add Testnet support.
- Do not create a server-side proxy in this change.
- Do not replace all current pages with query-only client-rendered versions.
- Do not implement unrelated explorer features beyond preparing network-aware RPC configuration for them.
