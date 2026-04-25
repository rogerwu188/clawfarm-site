# Network Switch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Solscan-style Mainnet/Devnet switch beside the wallet button, centralize wallet RPC selection, and remove faucet-local RPC configuration.

**Architecture:** Introduce a client `NetworkProvider` that resolves the active network from path/query, normalizes `?cluster=` aliases, stores per-network wallet RPC overrides, and exposes a shared hook. Update the wallet adapter provider, header switch, and faucet card to consume that shared network state while keeping backend API URLs environment-driven and hidden from UI.

**Tech Stack:** Next.js 14 App Router static export, React 18 client components, TypeScript strict mode, Solana wallet adapter, `@solana/web3.js`, localStorage, existing global CSS tokens.

---

## File Structure

- Create `app/lib/network/config.ts`: pure network ids, labels, canonical routes, env-backed RPC/API defaults, cluster parsing helpers, and URL normalization helpers.
- Create `app/lib/network/rpc.ts`: browser-safe localStorage RPC override helpers, HTTP(S) RPC URL validation, and shared `Connection` creation/health checks.
- Create `app/lib/network/api.ts`: network-aware backend API base lookup that never renders URLs in UI and throws friendly service configuration errors.
- Create `app/components/NetworkProvider.tsx`: client context and `useNetwork()` hook for active network, wallet RPC, normalization, and navigation.
- Create `app/components/NetworkSwitchButton.tsx`: header network selector, wallet-connected confirmation dialog, and per-network wallet RPC controls.
- Modify `app/components/SolanaWalletProvider.tsx`: use `useNetwork().walletRpcUrl` instead of hardcoded Mainnet.
- Modify `app/client-layout.tsx`: wrap the tree in `NetworkProvider` and render `NetworkSwitchButton` immediately before `ConnectWalletButton`.
- Modify `app/components/devnet/DevnetFaucetCard.tsx`: remove component-local RPC state/UI; use active Devnet wallet RPC from `useNetwork()` for the current wallet-signed faucet flow.
- Modify `app/lib/devnet-faucet/constants.ts`: remove stale component-local RPC constants after faucet imports no longer need them.
- Modify `app/devnet/page.tsx`: update static copy so it says the faucet uses the selected wallet/read RPC from the global network switch, not component-local RPC controls.
- Modify `app/globals.css`: add header network switch, dropdown, confirmation dialog, and RPC controls styling.

## Pre-Flight Checks

- [ ] **Step 1: Confirm a clean worktree**

Run:

```bash
git status --short
```

Expected: no output. If output appears in files unrelated to this plan, stop and ask the user how to proceed.

- [ ] **Step 2: Re-read the approved design**

Run:

```bash
sed -n '1,260p' docs/superpowers/specs/2026-04-25-network-switch-design.md
```

Expected: the spec describes an A-layout header switch, `/devnet` as canonical Devnet, `?cluster=devnet` as an alias, wallet-connected confirmation, env-backed backend APIs, and RPC config scoped to wallet/on-chain reads.

- [ ] **Step 3: Confirm current hardcoded and faucet-local RPC references**

Run:

```bash
rg -n "clusterApiUrl\('mainnet-beta'\)|DEVNET_DEFAULT_RPC_URL|DEVNET_RPC_STORAGE_KEY|Component RPC|Custom amounts and RPC|createDevnetConnection|assertDevnetRpcHealthy" app
```

Expected: matches in `app/components/SolanaWalletProvider.tsx`, `app/components/devnet/DevnetFaucetCard.tsx`, `app/lib/devnet-faucet/constants.ts`, and `app/lib/devnet-faucet/rpc.ts`. Later tasks remove the faucet-local references from active UI code.

---

## Task 1: Add Network Config and RPC Helpers

**Files:**
- Create: `app/lib/network/config.ts`
- Create: `app/lib/network/rpc.ts`
- Create: `app/lib/network/api.ts`

- [ ] **Step 1: Write the pure network config module**

Create `app/lib/network/config.ts` with:

```ts
import { clusterApiUrl } from '@solana/web3.js'

export type SolanaNetworkId = 'mainnet' | 'devnet'

export type SolanaNetworkConfig = {
  id: SolanaNetworkId
  label: string
  shortLabel: string
  canonicalRoute: string
  clusterParam: SolanaNetworkId
  solscanClusterParam: 'devnet' | null
  defaultWalletRpcUrl: string
  apiBaseUrl: string
}

const MAINNET_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_MAINNET_RPC_URL || clusterApiUrl('mainnet-beta')
const DEVNET_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL || clusterApiUrl('devnet')

export const SOLANA_NETWORKS: Record<SolanaNetworkId, SolanaNetworkConfig> = {
  mainnet: {
    id: 'mainnet',
    label: 'Mainnet',
    shortLabel: 'Mainnet',
    canonicalRoute: '/',
    clusterParam: 'mainnet',
    solscanClusterParam: null,
    defaultWalletRpcUrl: MAINNET_RPC_URL,
    apiBaseUrl: process.env.NEXT_PUBLIC_MAINNET_API_URL || '',
  },
  devnet: {
    id: 'devnet',
    label: 'Devnet',
    shortLabel: 'Devnet',
    canonicalRoute: '/devnet',
    clusterParam: 'devnet',
    solscanClusterParam: 'devnet',
    defaultWalletRpcUrl: DEVNET_RPC_URL,
    apiBaseUrl: process.env.NEXT_PUBLIC_DEVNET_API_URL || '',
  },
}

export const SOLANA_NETWORK_ORDER: SolanaNetworkId[] = ['mainnet', 'devnet']

export function isSolanaNetworkId(value: string | null | undefined): value is SolanaNetworkId {
  return value === 'mainnet' || value === 'devnet'
}

export function getNetworkIdFromPathname(pathname: string | null | undefined): SolanaNetworkId {
  return pathname === '/devnet' || pathname?.startsWith('/devnet/') ? 'devnet' : 'mainnet'
}

export function getClusterParam(searchParams: URLSearchParams | ReadonlyURLSearchParamsLike | null): SolanaNetworkId | null {
  const rawCluster = searchParams?.get('cluster')?.toLowerCase() || null
  return isSolanaNetworkId(rawCluster) ? rawCluster : null
}

export function getNetworkIdFromPathAndQuery(
  pathname: string | null | undefined,
  searchParams: URLSearchParams | ReadonlyURLSearchParamsLike | null
): SolanaNetworkId {
  const pathNetworkId = getNetworkIdFromPathname(pathname)
  const clusterNetworkId = getClusterParam(searchParams)

  if (pathname === '/' && clusterNetworkId === 'devnet') {
    return 'devnet'
  }

  return pathNetworkId
}

export function getCanonicalRouteForNetwork(networkId: SolanaNetworkId): string {
  return SOLANA_NETWORKS[networkId].canonicalRoute
}

export function getNormalizedNetworkHref(
  pathname: string | null | undefined,
  searchParams: URLSearchParams | ReadonlyURLSearchParamsLike | null
): string | null {
  const clusterNetworkId = getClusterParam(searchParams)
  if (!clusterNetworkId) return null

  if (pathname === '/' && clusterNetworkId === 'devnet') return '/devnet'
  if (pathname === '/' && clusterNetworkId === 'mainnet') return '/'
  if ((pathname === '/devnet' || pathname?.startsWith('/devnet/')) && clusterNetworkId === 'mainnet') return '/'
  if (pathname === '/devnet' && clusterNetworkId === 'devnet') return '/devnet'

  return null
}

export function solscanTxUrl(signature: string, networkId: SolanaNetworkId): string {
  const encodedSignature = encodeURIComponent(signature)
  const clusterParam = SOLANA_NETWORKS[networkId].solscanClusterParam
  return clusterParam
    ? `https://solscan.io/tx/${encodedSignature}?cluster=${clusterParam}`
    : `https://solscan.io/tx/${encodedSignature}`
}

type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null
}
```

- [ ] **Step 2: Write the shared wallet RPC helper module**

Create `app/lib/network/rpc.ts` with:

```ts
import { Connection, type Commitment } from '@solana/web3.js'

import { SOLANA_NETWORKS, type SolanaNetworkId } from './config'

const STORAGE_KEY_PREFIX = 'clawfarm.walletRpcUrl.'
export const INVALID_RPC_URL_MESSAGE = 'Enter a valid HTTP or HTTPS RPC URL.'

function hasBrowserStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

export function getWalletRpcStorageKey(networkId: SolanaNetworkId): string {
  return `${STORAGE_KEY_PREFIX}${networkId}`
}

export function isValidHttpRpcUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function readStoredWalletRpcUrl(networkId: SolanaNetworkId): string | null {
  if (!hasBrowserStorage()) return null

  try {
    const storedUrl = window.localStorage.getItem(getWalletRpcStorageKey(networkId))?.trim() || null
    return storedUrl && isValidHttpRpcUrl(storedUrl) ? storedUrl : null
  } catch {
    return null
  }
}

export function writeStoredWalletRpcUrl(networkId: SolanaNetworkId, rpcUrl: string): string {
  const trimmedRpcUrl = rpcUrl.trim()
  if (!isValidHttpRpcUrl(trimmedRpcUrl)) {
    throw new Error(INVALID_RPC_URL_MESSAGE)
  }

  if (hasBrowserStorage()) {
    window.localStorage.setItem(getWalletRpcStorageKey(networkId), trimmedRpcUrl)
  }

  return trimmedRpcUrl
}

export function clearStoredWalletRpcUrl(networkId: SolanaNetworkId): void {
  if (!hasBrowserStorage()) return

  try {
    window.localStorage.removeItem(getWalletRpcStorageKey(networkId))
  } catch {
    return
  }
}

export function getDefaultWalletRpcUrl(networkId: SolanaNetworkId): string {
  return SOLANA_NETWORKS[networkId].defaultWalletRpcUrl
}

export function getInitialWalletRpcUrl(networkId: SolanaNetworkId): string {
  return readStoredWalletRpcUrl(networkId) || getDefaultWalletRpcUrl(networkId)
}

export function createNetworkConnection(rpcUrl: string, commitment: Commitment = 'confirmed'): Connection {
  if (!isValidHttpRpcUrl(rpcUrl)) {
    throw new Error(INVALID_RPC_URL_MESSAGE)
  }

  return new Connection(rpcUrl.trim(), commitment)
}

export async function assertRpcHealthy(rpcUrl: string): Promise<void> {
  const connection = createNetworkConnection(rpcUrl)
  await connection.getLatestBlockhash('confirmed')
}
```

- [ ] **Step 3: Write the network API helper module**

Create `app/lib/network/api.ts` with:

```ts
import { SOLANA_NETWORKS, type SolanaNetworkId } from './config'

export class NetworkServiceConfigError extends Error {
  networkId: SolanaNetworkId

  constructor(networkId: SolanaNetworkId, featureLabel: string) {
    super(`${featureLabel} service is not configured for ${SOLANA_NETWORKS[networkId].label}.`)
    this.name = 'NetworkServiceConfigError'
    this.networkId = networkId
  }
}

export function getNetworkApiBaseUrl(networkId: SolanaNetworkId, featureLabel = 'Network'): string {
  const apiBaseUrl = SOLANA_NETWORKS[networkId].apiBaseUrl.trim()
  if (!apiBaseUrl) {
    throw new NetworkServiceConfigError(networkId, featureLabel)
  }
  return apiBaseUrl
}
```

- [ ] **Step 4: Run a build to verify helper modules type-check in isolation**

Run:

```bash
npm run build
```

Expected: build passes or fails only on existing unrelated code. It must not report TypeScript errors in `app/lib/network/config.ts`, `app/lib/network/rpc.ts`, or `app/lib/network/api.ts`.

- [ ] **Step 5: Commit network helpers**

Run:

```bash
git add app/lib/network/config.ts app/lib/network/rpc.ts app/lib/network/api.ts
git commit -m "feat: add network configuration helpers"
```

Expected: commit succeeds.

---

## Task 2: Add Network Provider

**Files:**
- Create: `app/components/NetworkProvider.tsx`

- [ ] **Step 1: Create the provider and hook**

Create `app/components/NetworkProvider.tsx` with:

```tsx
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import {
  SOLANA_NETWORKS,
  getCanonicalRouteForNetwork,
  getNetworkIdFromPathAndQuery,
  getNormalizedNetworkHref,
  type SolanaNetworkConfig,
  type SolanaNetworkId,
} from '@/app/lib/network/config'
import {
  clearStoredWalletRpcUrl,
  getDefaultWalletRpcUrl,
  getInitialWalletRpcUrl,
  readStoredWalletRpcUrl,
  writeStoredWalletRpcUrl,
} from '@/app/lib/network/rpc'

type WalletRpcOverrides = Partial<Record<SolanaNetworkId, string>>

type NetworkContextValue = {
  networkId: SolanaNetworkId
  network: SolanaNetworkConfig
  walletRpcUrl: string
  isCustomWalletRpc: boolean
  setWalletRpcUrl: (networkId: SolanaNetworkId, rpcUrl: string) => string
  resetWalletRpcUrl: (networkId: SolanaNetworkId) => void
  switchNetwork: (networkId: SolanaNetworkId) => void
}

const NetworkContext = createContext<NetworkContextValue | null>(null)

function loadWalletRpcOverrides(): WalletRpcOverrides {
  return {
    mainnet: readStoredWalletRpcUrl('mainnet') || undefined,
    devnet: readStoredWalletRpcUrl('devnet') || undefined,
  }
}

export default function NetworkProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [walletRpcOverrides, setWalletRpcOverrides] = useState<WalletRpcOverrides>({})

  const networkId = getNetworkIdFromPathAndQuery(pathname, searchParams)
  const network = SOLANA_NETWORKS[networkId]
  const customWalletRpcUrl = walletRpcOverrides[networkId]
  const walletRpcUrl = customWalletRpcUrl || getDefaultWalletRpcUrl(networkId)
  const isCustomWalletRpc = Boolean(customWalletRpcUrl)

  useEffect(() => {
    setWalletRpcOverrides(loadWalletRpcOverrides())
  }, [])

  useEffect(() => {
    const normalizedHref = getNormalizedNetworkHref(pathname, searchParams)
    const currentQuery = searchParams?.toString() || ''
    const currentHref = currentQuery ? `${pathname}?${currentQuery}` : pathname

    if (normalizedHref && normalizedHref !== currentHref) {
      router.replace(normalizedHref)
    }
  }, [pathname, router, searchParams])

  const setWalletRpcUrl = useCallback((targetNetworkId: SolanaNetworkId, rpcUrl: string) => {
    const savedRpcUrl = writeStoredWalletRpcUrl(targetNetworkId, rpcUrl)
    setWalletRpcOverrides((current) => ({ ...current, [targetNetworkId]: savedRpcUrl }))
    return savedRpcUrl
  }, [])

  const resetWalletRpcUrl = useCallback((targetNetworkId: SolanaNetworkId) => {
    clearStoredWalletRpcUrl(targetNetworkId)
    setWalletRpcOverrides((current) => {
      const next = { ...current }
      delete next[targetNetworkId]
      return next
    })
  }, [])

  const switchNetwork = useCallback(
    (targetNetworkId: SolanaNetworkId) => {
      router.push(getCanonicalRouteForNetwork(targetNetworkId))
    },
    [router]
  )

  const value = useMemo<NetworkContextValue>(
    () => ({
      networkId,
      network,
      walletRpcUrl,
      isCustomWalletRpc,
      setWalletRpcUrl,
      resetWalletRpcUrl,
      switchNetwork,
    }),
    [isCustomWalletRpc, network, networkId, resetWalletRpcUrl, setWalletRpcUrl, switchNetwork, walletRpcUrl]
  )

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
}

export function useNetwork(): NetworkContextValue {
  const context = useContext(NetworkContext)
  if (!context) {
    throw new Error('useNetwork must be used inside NetworkProvider.')
  }
  return context
}

export { getInitialWalletRpcUrl }
```

- [ ] **Step 2: Run a build and confirm the new provider type-checks**

Run:

```bash
npm run build
```

Expected: build passes or fails only because the provider is not used yet. It must not report errors in `app/components/NetworkProvider.tsx`.

- [ ] **Step 3: Commit the provider**

Run:

```bash
git add app/components/NetworkProvider.tsx
git commit -m "feat: add network provider"
```

Expected: commit succeeds.

---

## Task 3: Wire Wallet Provider to Active Network

**Files:**
- Modify: `app/components/SolanaWalletProvider.tsx`
- Modify: `app/client-layout.tsx`

- [ ] **Step 1: Update `SolanaWalletProvider` to use active wallet RPC**

Replace `app/components/SolanaWalletProvider.tsx` with:

```tsx
'use client'

import { useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'

import { useNetwork } from './NetworkProvider'

import '@solana/wallet-adapter-react-ui/styles.css'

export default function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const { walletRpcUrl } = useNetwork()
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], [])

  return (
    <ConnectionProvider endpoint={walletRpcUrl} key={walletRpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
```

- [ ] **Step 2: Wrap the layout in `NetworkProvider`**

Modify `app/client-layout.tsx` imports and wrapper. The top imports should include:

```tsx
import NetworkProvider from './components/NetworkProvider'
import SolanaWalletProvider from './components/SolanaWalletProvider'
```

The returned tree should start with:

```tsx
  return (
    <NetworkProvider>
      <SolanaWalletProvider>
        <>
```

The returned tree should end with:

```tsx
        </>
      </SolanaWalletProvider>
    </NetworkProvider>
  )
```

- [ ] **Step 3: Run a build and confirm wallet provider compiles**

Run:

```bash
npm run build
```

Expected: build passes. It must not report `useNetwork must be used inside NetworkProvider` at build time, missing imports, or the old `clusterApiUrl('mainnet-beta')` import in `SolanaWalletProvider.tsx`.

- [ ] **Step 4: Confirm hardcoded Mainnet endpoint is removed**

Run:

```bash
rg -n "clusterApiUrl\('mainnet-beta'\)" app/components/SolanaWalletProvider.tsx app/client-layout.tsx
```

Expected: no output.

- [ ] **Step 5: Commit wallet provider wiring**

Run:

```bash
git add app/components/SolanaWalletProvider.tsx app/client-layout.tsx
git commit -m "feat: wire wallet provider to network state"
```

Expected: commit succeeds.

---

## Task 4: Add Header Network Switch UI

**Files:**
- Create: `app/components/NetworkSwitchButton.tsx`
- Modify: `app/client-layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `NetworkSwitchButton`**

Create `app/components/NetworkSwitchButton.tsx` with:

```tsx
'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useNetwork } from './NetworkProvider'
import { SOLANA_NETWORK_ORDER, SOLANA_NETWORKS, type SolanaNetworkId } from '@/app/lib/network/config'
import { INVALID_RPC_URL_MESSAGE, isValidHttpRpcUrl } from '@/app/lib/network/rpc'

type PendingNetworkSwitch = SolanaNetworkId | null

function getShortRpcLabel(rpcUrl: string): string {
  try {
    const url = new URL(rpcUrl)
    return url.host
  } catch {
    return 'Invalid RPC'
  }
}

export default function NetworkSwitchButton() {
  const wallet = useWallet()
  const {
    networkId,
    network,
    walletRpcUrl,
    isCustomWalletRpc,
    setWalletRpcUrl,
    resetWalletRpcUrl,
    switchNetwork,
  } = useNetwork()
  const [open, setOpen] = useState(false)
  const [pendingNetwork, setPendingNetwork] = useState<PendingNetworkSwitch>(null)
  const [rpcDraft, setRpcDraft] = useState(walletRpcUrl)
  const [rpcMessage, setRpcMessage] = useState('')
  const [switchError, setSwitchError] = useState('')

  useEffect(() => {
    setRpcDraft(walletRpcUrl)
    setRpcMessage('')
  }, [networkId, walletRpcUrl])

  const rpcStatus = useMemo(() => {
    const source = isCustomWalletRpc ? 'Custom' : 'Default'
    return `${source}: ${getShortRpcLabel(walletRpcUrl)}`
  }, [isCustomWalletRpc, walletRpcUrl])

  const requestSwitch = useCallback(
    (targetNetworkId: SolanaNetworkId) => {
      setSwitchError('')
      if (targetNetworkId === networkId) {
        setOpen(false)
        return
      }

      if (wallet.publicKey) {
        setPendingNetwork(targetNetworkId)
        setOpen(false)
        return
      }

      switchNetwork(targetNetworkId)
      setOpen(false)
    },
    [networkId, switchNetwork, wallet.publicKey]
  )

  const handleKeepWalletAndSwitch = useCallback(() => {
    if (!pendingNetwork) return
    switchNetwork(pendingNetwork)
    setPendingNetwork(null)
  }, [pendingNetwork, switchNetwork])

  const handleDisconnectAndSwitch = useCallback(async () => {
    if (!pendingNetwork) return

    try {
      await wallet.disconnect()
      switchNetwork(pendingNetwork)
      setPendingNetwork(null)
    } catch {
      setSwitchError('Could not disconnect the wallet. No network switch was made.')
    }
  }, [pendingNetwork, switchNetwork, wallet])

  const handleCancelSwitch = useCallback(() => {
    setPendingNetwork(null)
    setSwitchError('')
  }, [])

  const handleSaveRpc = useCallback(() => {
    const trimmedRpcUrl = rpcDraft.trim()
    if (!isValidHttpRpcUrl(trimmedRpcUrl)) {
      setRpcMessage(INVALID_RPC_URL_MESSAGE)
      return
    }

    const savedRpcUrl = setWalletRpcUrl(networkId, trimmedRpcUrl)
    setRpcDraft(savedRpcUrl)
    setRpcMessage(`Saved wallet RPC for ${network.label}.`)
  }, [network.label, networkId, rpcDraft, setWalletRpcUrl])

  const handleResetRpc = useCallback(() => {
    resetWalletRpcUrl(networkId)
    setRpcMessage(`Reset ${network.label} wallet RPC to the default endpoint.`)
  }, [network.label, networkId, resetWalletRpcUrl])

  return (
    <div className="network-switch">
      <button
        type="button"
        className="network-switch-trigger"
        data-network={networkId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Select Solana network"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="network-switch-dot" aria-hidden="true" />
        {network.shortLabel}
        <span className="network-switch-caret" aria-hidden="true">▾</span>
      </button>

      {open ? (
        <div className="network-switch-menu" role="menu" aria-label="Solana network selector">
          <div className="network-switch-menu-title">Network</div>
          {SOLANA_NETWORK_ORDER.map((targetNetworkId) => {
            const targetNetwork = SOLANA_NETWORKS[targetNetworkId]
            const active = targetNetworkId === networkId
            return (
              <button
                key={targetNetworkId}
                type="button"
                className="network-switch-option"
                data-active={active}
                role="menuitem"
                onClick={() => requestSwitch(targetNetworkId)}
              >
                <span>{active ? '●' : '○'}</span>
                <strong>{targetNetwork.label}</strong>
                <small>{targetNetwork.canonicalRoute}</small>
              </button>
            )
          })}

          <div className="network-switch-rpc" aria-live="polite">
            <div className="network-switch-menu-title">Wallet RPC</div>
            <p>{rpcStatus}</p>
            <label>
              <span>{network.label} endpoint</span>
              <input
                type="url"
                value={rpcDraft}
                onChange={(event) => setRpcDraft(event.target.value)}
                spellCheck={false}
              />
            </label>
            {rpcMessage ? <p className="network-switch-message">{rpcMessage}</p> : null}
            <div className="network-switch-actions">
              <button type="button" onClick={handleSaveRpc}>Save RPC</button>
              <button type="button" onClick={handleResetRpc}>Reset</button>
            </div>
          </div>
        </div>
      ) : null}

      {pendingNetwork ? (
        <div className="network-switch-dialog-backdrop" role="presentation">
          <div
            className="network-switch-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="network-switch-dialog-title"
          >
            <h2 id="network-switch-dialog-title">Switch to {SOLANA_NETWORKS[pendingNetwork].label}?</h2>
            <p>
              Your wallet is connected on {network.label}. Choose how to handle the wallet before switching the site and wallet RPC.
            </p>
            {switchError ? <p className="network-switch-error" role="alert">{switchError}</p> : null}
            <div className="network-switch-dialog-actions">
              <button type="button" className="network-switch-primary" onClick={handleKeepWalletAndSwitch}>
                Keep wallet and switch
              </button>
              <button type="button" onClick={handleDisconnectAndSwitch}>
                Disconnect then switch
              </button>
              <button type="button" onClick={handleCancelSwitch}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 2: Render the switch before the wallet button**

In `app/client-layout.tsx`, add the dynamic import:

```tsx
const NetworkSwitchButton = dynamic(() => import('./components/NetworkSwitchButton'), { ssr: false })
```

Then update the header action group to render it before `ConnectWalletButton`:

```tsx
            <div className="header-actions">
              <span className="cmdk-hint" aria-hidden>
                <kbd>⌘</kbd><kbd>K</kbd>
              </span>
              <NetworkSwitchButton />
              <ConnectWalletButton />
            </div>
```

Remove the old inline style object from that `div`.

- [ ] **Step 3: Add CSS for header actions and network switch**

Append this CSS near the shared chrome section in `app/globals.css` after `.cmdk-hint kbd`:

```css
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.network-switch {
  position: relative;
  font-family: var(--font-mono);
}

.network-switch-trigger {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-mid);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.15s, background 0.15s, color 0.15s;
}

.network-switch-trigger:hover,
.network-switch-trigger[aria-expanded='true'] {
  border-color: var(--border-bright);
  background: var(--surface-raised);
  color: var(--text-high);
}

.network-switch-trigger[data-network='devnet'] {
  border-color: rgba(16, 185, 129, 0.55);
  background: rgba(16, 185, 129, 0.1);
  color: var(--green-bright);
}

.network-switch-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green-bright);
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.7);
}

.network-switch-caret {
  color: var(--text-low);
  font-size: 10px;
  transform: translateY(-1px);
}

.network-switch-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 120;
  width: min(320px, calc(100vw - 32px));
  padding: 10px;
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-lg);
  background: rgba(12, 13, 15, 0.98);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.38);
}

.network-switch-menu-title {
  padding: 4px 6px 8px;
  color: var(--text-dim);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.network-switch-option {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 8px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-mid);
  text-align: left;
  font-family: var(--font-mono);
  cursor: pointer;
}

.network-switch-option:hover,
.network-switch-option[data-active='true'] {
  background: var(--surface-raised);
  color: var(--text-high);
}

.network-switch-option span {
  color: var(--green-bright);
  font-size: 10px;
}

.network-switch-option strong {
  font-size: 12px;
  font-weight: 600;
}

.network-switch-option small {
  color: var(--text-low);
  font-size: 10px;
}

.network-switch-rpc {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--border);
}

.network-switch-rpc p,
.network-switch-message,
.network-switch-error {
  margin: 0 0 8px;
  color: var(--text-low);
  font-size: 11px;
  line-height: 1.5;
}

.network-switch-rpc label {
  display: grid;
  gap: 6px;
  color: var(--text-low);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.network-switch-rpc input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text-high);
  padding: 8px 9px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: none;
  letter-spacing: 0;
}

.network-switch-actions,
.network-switch-dialog-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.network-switch-actions button,
.network-switch-dialog-actions button {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-mid);
  padding: 7px 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  cursor: pointer;
}

.network-switch-actions button:hover,
.network-switch-dialog-actions button:hover {
  border-color: var(--border-bright);
  background: var(--surface-raised);
  color: var(--text-high);
}

.network-switch-primary {
  border-color: var(--green-bright) !important;
  background: var(--green-bright) !important;
  color: #04110b !important;
}

.network-switch-dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 150;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.58);
}

.network-switch-dialog {
  width: min(480px, 100%);
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-lg);
  background: var(--surface);
  padding: 22px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
}

.network-switch-dialog h2 {
  margin: 0 0 10px;
  color: var(--text-high);
  font-size: 18px;
  font-weight: 650;
  letter-spacing: -0.02em;
}

.network-switch-dialog p {
  margin: 0 0 16px;
  color: var(--text-mid);
  font-size: 13px;
  line-height: 1.6;
}

.network-switch-error {
  color: var(--red) !important;
}
```

- [ ] **Step 4: Add mobile wrapping for the header action group**

Inside the existing `@media` section that already changes `.header-row`, add:

```css
  .header-actions {
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
  }

  .network-switch-menu {
    right: 0;
  }
```

If there is no existing suitable media block, append:

```css
@media (max-width: 768px) {
  .header-actions {
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
  }

  .network-switch-menu {
    right: 0;
  }
}
```

- [ ] **Step 5: Run a build and verify the switch compiles**

Run:

```bash
npm run build
```

Expected: build passes. It must not report missing `NetworkSwitchButton`, missing `header-actions`, or React hook dependency errors that fail compilation.

- [ ] **Step 6: Commit header switch UI**

Run:

```bash
git add app/components/NetworkSwitchButton.tsx app/client-layout.tsx app/globals.css
git commit -m "feat: add network switch control"
```

Expected: commit succeeds.

---

## Task 5: Remove Faucet-Local RPC Configuration

**Files:**
- Modify: `app/components/devnet/DevnetFaucetCard.tsx`
- Modify: `app/lib/devnet-faucet/constants.ts`
- Modify: `app/devnet/page.tsx`

- [ ] **Step 1: Replace faucet RPC imports with shared network imports**

In `app/components/devnet/DevnetFaucetCard.tsx`, replace the imports with this import block:

```tsx
'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useCallback, useMemo, useState } from 'react'

import { useNetwork } from '@/app/components/NetworkProvider'
import { validateFaucetClaimInput } from '@/app/lib/devnet-faucet/amounts'
import { claimDevnetFaucet } from '@/app/lib/devnet-faucet/client'
import {
  DEVNET_FAUCET_LIMITS,
  solscanDevnetTxUrl,
} from '@/app/lib/devnet-faucet/constants'
import { normalizeFaucetError } from '@/app/lib/devnet-faucet/errors'
import { assertRpcHealthy, createNetworkConnection } from '@/app/lib/network/rpc'
```

- [ ] **Step 2: Remove faucet-local RPC state**

In `DevnetFaucetCard`, replace the first state block with:

```tsx
  const wallet = useWallet()
  const { networkId, walletRpcUrl } = useNetwork()
  const [customOpen, setCustomOpen] = useState(false)
  const [clawAmount, setClawAmount] = useState<string>(DEVNET_FAUCET_LIMITS.defaultClaw)
  const [usdcAmount, setUsdcAmount] = useState<string>(DEVNET_FAUCET_LIMITS.defaultUsdc)
  const [status, setStatus] = useState<ClaimStatus>(DEFAULT_STATUS)
```

Delete the `useEffect` block that calls `getInitialDevnetRpcUrl()`.

Add this derived flag after `walletAddress`:

```tsx
  const isDevnet = networkId === 'devnet'
```

Replace `canClaim` with:

```tsx
  const canClaim = isDevnet && Boolean(wallet.publicKey) && !busy && validation.ok
```

- [ ] **Step 3: Use the shared active wallet RPC when claiming default tokens**

Inside `handleDefaultClaim`, replace the preparation/status and connection section with:

```tsx
    if (!isDevnet) {
      setStatus({ phase: 'error', message: 'Switch to Devnet before claiming faucet tokens.', signature: null })
      return
    }

    setStatus({ phase: 'preparing', message: 'Checking the active Devnet wallet RPC and assembling token accounts.', signature: null })
    try {
      await assertRpcHealthy(walletRpcUrl)
      const connection = createNetworkConnection(walletRpcUrl)
      setStatus({ phase: 'signing', message: 'Open your wallet to sign the devnet faucet transaction.', signature: null })
      const signature = await claimDevnetFaucet({
        connection,
        wallet,
        clawBaseUnits: defaultValidation.clawBaseUnits,
        usdcBaseUnits: defaultValidation.usdcBaseUnits,
      })
```

Update the callback dependency list to:

```tsx
  }, [isDevnet, wallet, walletRpcUrl])
```

- [ ] **Step 4: Use the shared active wallet RPC when claiming custom amounts**

Inside `handleCustomClaim`, add this guard before the validation guard:

```tsx
    if (!isDevnet) {
      setStatus({ phase: 'error', message: 'Switch to Devnet before claiming faucet tokens.', signature: null })
      return
    }
```

Replace the connection section with:

```tsx
    setStatus({ phase: 'preparing', message: 'Validating amounts, active Devnet wallet RPC, and faucet account setup.', signature: null })
    try {
      await assertRpcHealthy(walletRpcUrl)
      const connection = createNetworkConnection(walletRpcUrl)
      setStatus({ phase: 'signing', message: 'Approve the custom devnet claim in your wallet.', signature: null })
      const signature = await claimDevnetFaucet({
        connection,
        wallet,
        clawBaseUnits: validation.clawBaseUnits,
        usdcBaseUnits: validation.usdcBaseUnits,
      })
```

Update the callback dependency list to:

```tsx
  }, [isDevnet, validation, wallet, walletRpcUrl])
```

- [ ] **Step 5: Update faucet visible copy and buttons**

In the faucet header paragraph, replace the old text with:

```tsx
            Claim disposable CLAW and Test USDC on Solana devnet. The active wallet/read RPC is controlled by the global network switch in the header.
```

In the wallet helper copy for connected wallets, replace:

```tsx
                ? 'This wallet signs the faucet claim and receives both token accounts.'
                : 'Use the header wallet control, then return here for a one-click devnet claim.'}
```

with:

```tsx
                ? 'This wallet signs the devnet faucet claim and receives both token accounts.'
                : 'Use the header wallet control and Devnet network switch, then return here for a one-click claim.'}
```

Change the default claim button disabled expression to:

```tsx
              disabled={!isDevnet || !wallet.publicKey || busy}
```

Change the custom toggle label from:

```tsx
<span>{customOpen ? 'Hide custom controls' : 'Custom amounts and RPC'}</span>
```

To:

```tsx
<span>{customOpen ? 'Hide custom controls' : 'Custom amounts'}</span>
```

- [ ] **Step 6: Remove the RPC fieldset from the faucet custom controls**

Delete the entire fieldset that starts with:

```tsx
            <div className="devnet-faucet-fieldset" aria-labelledby="devnet-faucet-rpc-label">
```

and ends after the `Reset default` button closing `</div>` for that fieldset.

The `devnet-faucet-custom-grid` should contain only the claim amount fieldset.

- [ ] **Step 7: Remove stale constants from faucet constants**

In `app/lib/devnet-faucet/constants.ts`, remove this import:

```ts
import { PublicKey, clusterApiUrl } from '@solana/web3.js'
```

Replace it with:

```ts
import { PublicKey } from '@solana/web3.js'
```

Delete these exports:

```ts
export const DEVNET_DEFAULT_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL || clusterApiUrl('devnet')

export const DEVNET_RPC_STORAGE_KEY = 'clawfarm.devnet.rpcUrl'
```

- [ ] **Step 8: Update `/devnet` page copy**

In `app/devnet/page.tsx`, replace this sentence:

```tsx
            integration context; the faucet card above uses a devnet-only RPC connection for live wallet claims,
            with optional custom RPC URL support.
```

With:

```tsx
            integration context; the faucet card above uses the active Devnet wallet/read RPC selected from the
            global network switch.
```

- [ ] **Step 9: Run build and search for removed faucet-local RPC UI text**

Run:

```bash
npm run build
rg -n "Component RPC|Custom amounts and RPC|DEVNET_DEFAULT_RPC_URL|DEVNET_RPC_STORAGE_KEY|getInitialDevnetRpcUrl|writeStoredDevnetRpcUrl|clearStoredDevnetRpcUrl" app
```

Expected: build passes. The `rg` command may still show `app/lib/devnet-faucet/rpc.ts` if the file has not been deleted, but it must not show active imports in `DevnetFaucetCard.tsx` or visible UI strings.

- [ ] **Step 10: Commit faucet RPC removal**

Run:

```bash
git add app/components/devnet/DevnetFaucetCard.tsx app/lib/devnet-faucet/constants.ts app/devnet/page.tsx
git commit -m "refactor: use global network rpc for faucet"
```

Expected: commit succeeds.

---

## Task 6: Remove Dead Faucet RPC Helper if Unused

**Files:**
- Delete: `app/lib/devnet-faucet/rpc.ts` if unused

- [ ] **Step 1: Check whether the old faucet RPC helper is still imported**

Run:

```bash
rg -n "devnet-faucet/rpc|createDevnetConnection|assertDevnetRpcHealthy|readStoredDevnetRpcUrl|getInitialDevnetRpcUrl" app
```

Expected: no output outside `app/lib/devnet-faucet/rpc.ts` itself. If another active file imports it, update that file to use `app/lib/network/rpc.ts` before deleting.

- [ ] **Step 2: Delete the old helper**

Run:

```bash
rm app/lib/devnet-faucet/rpc.ts
```

- [ ] **Step 3: Run build and confirm deletion is safe**

Run:

```bash
npm run build
```

Expected: build passes with no missing module errors for `app/lib/devnet-faucet/rpc`.

- [ ] **Step 4: Commit old helper removal**

Run:

```bash
git add -u app/lib/devnet-faucet/rpc.ts
git commit -m "chore: remove faucet-local rpc helper"
```

Expected: commit succeeds.

---

## Task 7: Final Verification

**Files:**
- Verify only; no planned edits

- [ ] **Step 1: Run the production build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 2: Confirm no backend API URLs are rendered directly in UI strings**

Run:

```bash
rg -n "NEXT_PUBLIC_MAINNET_API_URL|NEXT_PUBLIC_DEVNET_API_URL|apiBaseUrl|API URL|backend URL" app/components app/devnet/page.tsx app/page.tsx
```

Expected: no visible component copy exposes API URLs. Matches in `app/lib/network/config.ts` and `app/lib/network/api.ts` are acceptable because they are configuration code, not UI copy.

- [ ] **Step 3: Confirm network switch and faucet-local RPC references are correct**

Run:

```bash
rg -n "NetworkSwitchButton|NetworkProvider|useNetwork|Component RPC|Custom amounts and RPC|DEVNET_DEFAULT_RPC_URL|DEVNET_RPC_STORAGE_KEY" app
```

Expected: `NetworkSwitchButton`, `NetworkProvider`, and `useNetwork` appear in active code. The faucet-local RPC strings/constants do not appear in active code.

- [ ] **Step 4: Start the local server for manual verification**

Run:

```bash
npm run dev
```

Expected: Next.js dev server starts and prints a local URL, usually `http://localhost:3000`.

- [ ] **Step 5: Manually verify canonical routes**

Open these URLs in a browser:

```text
http://localhost:3000/
http://localhost:3000/devnet
http://localhost:3000/?cluster=devnet
http://localhost:3000/devnet?cluster=mainnet
```

Expected:

- `/` shows `Mainnet` in the header switch.
- `/devnet` shows `Devnet` in the header switch.
- `/?cluster=devnet` normalizes to `/devnet` after hydration.
- `/devnet?cluster=mainnet` normalizes to `/` after hydration.

- [ ] **Step 6: Manually verify wallet switch confirmation**

With a wallet connected, use the header network switch to select the other network.

Expected: the confirmation dialog appears with these actions:

```text
Keep wallet and switch
Disconnect then switch
Cancel
```

- [ ] **Step 7: Manually verify wallet RPC controls**

In the network switch menu:

1. Enter `not-a-url` and click `Save RPC`.
2. Enter `https://api.devnet.solana.com` on Devnet or `https://api.mainnet-beta.solana.com` on Mainnet and click `Save RPC`.
3. Reload the page.
4. Click `Reset`.

Expected:

- Invalid input shows `Enter a valid HTTP or HTTPS RPC URL.`
- Valid input is saved for the active network.
- Reload preserves the custom RPC label for the active network.
- Reset returns the active network to its default RPC.

- [ ] **Step 8: Manually verify faucet UI**

Open `/devnet` and inspect the faucet card.

Expected:

- The card says the active wallet/read RPC is controlled by the global network switch.
- The custom panel says `Custom amounts`, not `Custom amounts and RPC`.
- There is no `Component RPC`, `Devnet endpoint`, `Save RPC`, or `Reset default` field in the faucet card.

- [ ] **Step 9: Commit any verification fixes**

If verification required small fixes, commit them with a focused message:

```bash
git add app
git commit -m "fix: polish network switch behavior"
```

Expected: commit succeeds only if files changed. If no files changed, skip this step.
