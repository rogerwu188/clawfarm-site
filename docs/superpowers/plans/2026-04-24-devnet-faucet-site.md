# Devnet Faucet Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a polished `/devnet` faucet card that lets connected wallets claim devnet `CLAW` and `Test USDC` directly from the browser.

**Architecture:** Keep `/devnet` as a server-rendered status page and embed one client component for wallet/RPC/transaction behavior. Put faucet constants, amount parsing, RPC persistence, error mapping, and transaction construction into focused helper modules so the UI stays readable and the chain integration can later be replaced by a published SDK.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript strict mode, Tailwind/global CSS tokens, `@solana/web3.js`, Solana wallet adapter, `@coral-xyz/anchor`, `@solana/spl-token`, `bn.js`. UI implementation should use `$impeccable craft` guidance: distinctive, production-grade, cohesive with current ClawFarm dark protocol aesthetic, no generic AI patterns, no gradient text, and no decorative side-stripe borders.

---

## File Structure

- Modify `package.json`: add Solana client dependencies and test scripts if needed.
- Modify `package-lock.json`: lock dependency updates from `npm install`.
- Create `app/lib/devnet-faucet/constants.ts`: devnet addresses, PDA seeds, token limits, default RPC, Solscan URL builder, and localStorage keys.
- Create `app/lib/devnet-faucet/amounts.ts`: parse/format 6-decimal UI amounts and validate claim inputs.
- Create `app/lib/devnet-faucet/rpc.ts`: validate URLs, read/write custom RPC URL, and run a lightweight RPC health check.
- Create `app/lib/devnet-faucet/errors.ts`: normalize wallet, RPC, and Anchor/program errors into readable UI messages.
- Create `app/lib/devnet-faucet/client.ts`: derive faucet PDAs, ensure associated token accounts, and submit `claimFaucet`.
- Create `app/components/devnet/DevnetFaucetCard.tsx`: client UI, wallet state, custom amount form, RPC customization, transaction status, and Solscan success link.
- Modify `app/devnet/page.tsx`: import and render `DevnetFaucetCard` near the top, and update static copy that says the page does not query chain state.
- Modify `app/globals.css`: add component styles for the faucet card using existing site tokens and Impeccable quality constraints.
- Optional create `app/lib/devnet-faucet/*.test.ts`: pure tests if a lightweight test runner is added.

## Pre-Flight Checks

- [ ] **Step 1: Check current worktree state**

Run:

```bash
git status --short
```

Expected: note any existing user changes. Do not revert unrelated changes. This repository currently may show pre-existing changes such as `.gitignore`, `package-lock.json`, or `app/devnet/`; only modify files needed by this plan.

- [ ] **Step 2: Re-read the approved spec**

Run:

```bash
sed -n '1,260p' docs/superpowers/specs/2026-04-24-devnet-faucet-site-design.md
```

Expected: confirms the implementation requirements: top inline card, forced devnet, custom RPC, direct browser transaction, Solscan links.

- [ ] **Step 3: Check Impeccable context**

Run:

```bash
if [ -f .impeccable.md ]; then sed -n '1,220p' .impeccable.md; else echo "No .impeccable.md"; fi
```

Expected: if `.impeccable.md` is missing, run `$impeccable teach` before detailed UI work. If the user has already provided enough design direction in this thread, write a concise `.impeccable.md` before implementing the visual card.

## Task 1: Add Faucet Dependencies

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install dependencies**

Run:

```bash
npm install @coral-xyz/anchor @solana/spl-token bn.js
npm install -D @types/bn.js
```

Expected: `package.json` gains `@coral-xyz/anchor`, `@solana/spl-token`, `bn.js`, and dev dependency `@types/bn.js`; `package-lock.json` updates consistently.

- [ ] **Step 2: Verify dependency tree**

Run:

```bash
npm ls @coral-xyz/anchor @solana/spl-token bn.js @types/bn.js
```

Expected: all four packages resolve without `missing` or `invalid` warnings.

- [ ] **Step 3: Commit dependency update if working task-by-task**

Run:

```bash
git add package.json package-lock.json
git commit -m "chore: add devnet faucet client dependencies"
```

Expected: commit succeeds. If the repository has unrelated pre-existing lockfile changes, inspect `git diff package-lock.json` first and do not commit unrelated edits without user approval.

## Task 2: Add Faucet Constants and Amount Utilities

**Files:**
- Create: `app/lib/devnet-faucet/constants.ts`
- Create: `app/lib/devnet-faucet/amounts.ts`

- [ ] **Step 1: Create constants module**

Create `app/lib/devnet-faucet/constants.ts` with:

```ts
import { PublicKey, clusterApiUrl } from '@solana/web3.js'

export const DEVNET_FAUCET_DECIMALS = 6
export const DEVNET_FAUCET_BASE_UNITS = 10n ** BigInt(DEVNET_FAUCET_DECIMALS)

export const DEVNET_DEFAULT_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_DEVNET_RPC_URL || clusterApiUrl('devnet')

export const DEVNET_RPC_STORAGE_KEY = 'clawfarm.devnet.rpcUrl'

export const DEVNET_MASTERPOOL_PROGRAM_ID = new PublicKey(
  'AP5gMEh6yHjvZBjh7Xg5fgs4EnBiCbVUoDyXxMi1omux'
)
export const DEVNET_CLAW_MINT = new PublicKey('GNWh9hfyEpbnNRzVdYBT7ZiB6VRJwXecSwTRohZByky8')
export const DEVNET_TEST_USDC_MINT = new PublicKey('D3vhDe6mtdAgj2t8pu6XnaFXDPdiMDTALTSCZbizfm9P')
export const DEVNET_MASTERPOOL_CONFIG = new PublicKey('Fu2CZPqHZWpSqu9MtxseTurXQidEe54MQxvAkj1Gg54B')
export const DEVNET_POOL_AUTHORITY = new PublicKey('55Cncw3fj9P8RVmgmm1RdAnjYpyF27erJGo1Noz3S3sY')

export const FAUCET_SEEDS = {
  config: 'faucet_config',
  global: 'faucet_global',
  user: 'faucet_user',
  clawVault: 'faucet_claw_vault',
  usdcVault: 'faucet_usdc_vault',
} as const

export const DEVNET_FAUCET_LIMITS = {
  defaultClaw: '10',
  defaultUsdc: '10',
  maxClawPerClaim: '10',
  maxUsdcPerClaim: '10',
  maxClawPerWalletPerDay: '50',
  maxUsdcPerWalletPerDay: '50',
  maxClawGlobalPerDay: '50000',
  maxUsdcGlobalPerDay: '50000',
} as const

export function solscanDevnetTxUrl(signature: string): string {
  return `https://solscan.io/tx/${encodeURIComponent(signature)}?cluster=devnet`
}
```

- [ ] **Step 2: Create amount utilities**

Create `app/lib/devnet-faucet/amounts.ts` with:

```ts
import { DEVNET_FAUCET_BASE_UNITS, DEVNET_FAUCET_DECIMALS } from './constants'

export type FaucetInputValidation =
  | { ok: true; clawBaseUnits: bigint; usdcBaseUnits: bigint }
  | { ok: false; message: string }

export function parseFaucetUiAmount(value: string): bigint {
  const trimmed = value.trim()
  if (!trimmed) return 0n
  if (!/^\d+(\.\d*)?$/.test(trimmed)) {
    throw new Error('Enter a positive number with up to 6 decimal places.')
  }

  const [wholePart, fractionPart = ''] = trimmed.split('.')
  if (fractionPart.length > DEVNET_FAUCET_DECIMALS) {
    throw new Error('Use no more than 6 decimal places.')
  }

  const whole = BigInt(wholePart || '0') * DEVNET_FAUCET_BASE_UNITS
  const fraction = BigInt(fractionPart.padEnd(DEVNET_FAUCET_DECIMALS, '0') || '0')
  return whole + fraction
}

export function formatFaucetUiAmount(baseUnits: bigint): string {
  const whole = baseUnits / DEVNET_FAUCET_BASE_UNITS
  const fraction = baseUnits % DEVNET_FAUCET_BASE_UNITS
  if (fraction === 0n) return whole.toString()
  return `${whole}.${fraction.toString().padStart(DEVNET_FAUCET_DECIMALS, '0').replace(/0+$/, '')}`
}

export function validateFaucetClaimInput(input: {
  clawAmount: string
  usdcAmount: string
  maxClawPerClaim: string
  maxUsdcPerClaim: string
}): FaucetInputValidation {
  try {
    const clawBaseUnits = parseFaucetUiAmount(input.clawAmount)
    const usdcBaseUnits = parseFaucetUiAmount(input.usdcAmount)
    const maxClawBaseUnits = parseFaucetUiAmount(input.maxClawPerClaim)
    const maxUsdcBaseUnits = parseFaucetUiAmount(input.maxUsdcPerClaim)

    if (clawBaseUnits === 0n && usdcBaseUnits === 0n) {
      return { ok: false, message: 'Enter an amount for CLAW, Test USDC, or both.' }
    }
    if (clawBaseUnits > maxClawBaseUnits) {
      return { ok: false, message: `CLAW is limited to ${input.maxClawPerClaim} per claim.` }
    }
    if (usdcBaseUnits > maxUsdcBaseUnits) {
      return { ok: false, message: `Test USDC is limited to ${input.maxUsdcPerClaim} per claim.` }
    }

    return { ok: true, clawBaseUnits, usdcBaseUnits }
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : 'Invalid amount.' }
  }
}
```

- [ ] **Step 3: Type-check utilities**

Run:

```bash
npx tsc --noEmit
```

Expected: TypeScript completes without errors from the new constants and amount utility modules.

- [ ] **Step 4: Commit utility modules if working task-by-task**

Run:

```bash
git add app/lib/devnet-faucet/constants.ts app/lib/devnet-faucet/amounts.ts
git commit -m "feat: add devnet faucet amount utilities"
```

Expected: commit succeeds.

## Task 3: Add RPC and Error Helpers

**Files:**
- Create: `app/lib/devnet-faucet/rpc.ts`
- Create: `app/lib/devnet-faucet/errors.ts`

- [ ] **Step 1: Create RPC helper module**

Create `app/lib/devnet-faucet/rpc.ts` with:

```ts
import { Connection } from '@solana/web3.js'

import { DEVNET_DEFAULT_RPC_URL, DEVNET_RPC_STORAGE_KEY } from './constants'

export function isValidHttpRpcUrl(value: string): boolean {
  try {
    const parsed = new URL(value.trim())
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

export function readStoredDevnetRpcUrl(): string | null {
  if (typeof window === 'undefined') return null
  const stored = window.localStorage.getItem(DEVNET_RPC_STORAGE_KEY)
  return stored && isValidHttpRpcUrl(stored) ? stored : null
}

export function writeStoredDevnetRpcUrl(value: string): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(DEVNET_RPC_STORAGE_KEY, value)
}

export function clearStoredDevnetRpcUrl(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(DEVNET_RPC_STORAGE_KEY)
}

export function getInitialDevnetRpcUrl(): string {
  return readStoredDevnetRpcUrl() || DEVNET_DEFAULT_RPC_URL
}

export function createDevnetConnection(rpcUrl: string): Connection {
  return new Connection(rpcUrl, 'confirmed')
}

export async function assertDevnetRpcHealthy(rpcUrl: string): Promise<void> {
  if (!isValidHttpRpcUrl(rpcUrl)) {
    throw new Error('Enter a valid http or https RPC URL.')
  }

  const connection = createDevnetConnection(rpcUrl)
  await connection.getLatestBlockhash('confirmed')
}
```

- [ ] **Step 2: Create error normalizer**

Create `app/lib/devnet-faucet/errors.ts` with:

```ts
const ERROR_MATCHERS: Array<[RegExp, string]> = [
  [/User rejected|rejected the request|Transaction rejected/i, 'Wallet signature was rejected.'],
  [/FaucetDisabled|faucet is disabled|6000/i, 'The devnet faucet is currently disabled.'],
  [/InvalidFaucetAmount|claim amount is invalid/i, 'The claim amount is invalid.'],
  [/FaucetClaimLimitExceeded|per-claim limit/i, 'This claim exceeds the per-claim faucet limit.'],
  [/FaucetWalletDailyLimitExceeded|wallet daily limit/i, 'This wallet has reached today’s faucet limit.'],
  [/FaucetGlobalDailyLimitExceeded|global daily limit/i, 'The faucet has reached today’s global limit.'],
  [/FaucetVaultInsufficientBalance|insufficient.*vault/i, 'The faucet vault does not have enough tokens right now.'],
  [/blockhash|fetch failed|Network request failed|429|403|timeout/i, 'The devnet RPC request failed. Try another RPC URL.'],
]

export function normalizeFaucetError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error)
  const matched = ERROR_MATCHERS.find(([pattern]) => pattern.test(message))
  return matched?.[1] || 'The faucet transaction failed. Check the console for details and try again.'
}
```

- [ ] **Step 3: Type-check helper modules**

Run:

```bash
npx tsc --noEmit
```

Expected: TypeScript completes without errors from `rpc.ts` or `errors.ts`.

- [ ] **Step 4: Commit helpers if working task-by-task**

Run:

```bash
git add app/lib/devnet-faucet/rpc.ts app/lib/devnet-faucet/errors.ts
git commit -m "feat: add devnet faucet rpc helpers"
```

Expected: commit succeeds.

## Task 4: Add Chain Client Module

**Files:**
- Create: `app/lib/devnet-faucet/client.ts`

- [ ] **Step 1: Create faucet IDL and PDA helpers**

Create `app/lib/devnet-faucet/client.ts` with this starter content:

```ts
import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js'
import BN from 'bn.js'

import {
  DEVNET_CLAW_MINT,
  DEVNET_MASTERPOOL_CONFIG,
  DEVNET_MASTERPOOL_PROGRAM_ID,
  DEVNET_POOL_AUTHORITY,
  DEVNET_TEST_USDC_MINT,
  FAUCET_SEEDS,
} from './constants'

export type FaucetPdas = {
  faucetConfig: PublicKey
  faucetGlobalState: PublicKey
  faucetClawVault: PublicKey
  faucetUsdcVault: PublicKey
  faucetUserState: PublicKey
}

export type FaucetWallet = {
  publicKey: PublicKey | null
  signTransaction?: (transaction: Transaction) => Promise<Transaction>
  sendTransaction: (transaction: Transaction, connection: Connection) => Promise<string>
}

const FAUCET_IDL = {
  version: '0.1.0',
  name: 'clawfarm_masterpool',
  instructions: [
    {
      name: 'claimFaucet',
      accounts: [
        { name: 'config', isMut: false, isSigner: false },
        { name: 'faucetConfig', isMut: true, isSigner: false },
        { name: 'faucetGlobalState', isMut: true, isSigner: false },
        { name: 'faucetUserState', isMut: true, isSigner: false },
        { name: 'faucetClawVault', isMut: true, isSigner: false },
        { name: 'faucetUsdcVault', isMut: true, isSigner: false },
        { name: 'userClawToken', isMut: true, isSigner: false },
        { name: 'userUsdcToken', isMut: true, isSigner: false },
        { name: 'clawMint', isMut: false, isSigner: false },
        { name: 'usdcMint', isMut: false, isSigner: false },
        { name: 'poolAuthority', isMut: false, isSigner: false },
        { name: 'user', isMut: true, isSigner: true },
        { name: 'payer', isMut: true, isSigner: true },
        { name: 'tokenProgram', isMut: false, isSigner: false },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: 'FaucetClaimArgs',
          },
        },
      ],
    },
  ],
  types: [
    {
      name: 'FaucetClaimArgs',
      type: {
        kind: 'struct',
        fields: [
          { name: 'clawAmount', type: 'u64' },
          { name: 'usdcAmount', type: 'u64' },
        ],
      },
    },
  ],
} as anchor.Idl

function seed(value: string): Buffer {
  return Buffer.from(value)
}

export function deriveFaucetPdas(user: PublicKey): FaucetPdas {
  const [faucetConfig] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.config)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetGlobalState] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.global)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetClawVault] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.clawVault)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetUsdcVault] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.usdcVault)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetUserState] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.user), user.toBuffer()],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )

  return {
    faucetConfig,
    faucetGlobalState,
    faucetClawVault,
    faucetUsdcVault,
    faucetUserState,
  }
}
```

- [ ] **Step 2: Add ATA preparation and claim submission**

Append to `app/lib/devnet-faucet/client.ts`:

```ts
async function maybeCreateAtaInstruction(input: {
  connection: Connection
  payer: PublicKey
  mint: PublicKey
  owner: PublicKey
}): Promise<{ address: PublicKey; instruction: TransactionInstruction | null }> {
  const address = getAssociatedTokenAddressSync(input.mint, input.owner, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID)
  const account = await input.connection.getAccountInfo(address, 'confirmed')

  if (account) {
    return { address, instruction: null }
  }

  return {
    address,
    instruction: createAssociatedTokenAccountInstruction(
      input.payer,
      address,
      input.owner,
      input.mint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    ),
  }
}

export async function claimDevnetFaucet(input: {
  connection: Connection
  wallet: FaucetWallet
  clawBaseUnits: bigint
  usdcBaseUnits: bigint
}): Promise<string> {
  const user = input.wallet.publicKey
  if (!user) {
    throw new Error('Connect a wallet before claiming faucet tokens.')
  }

  const pdas = deriveFaucetPdas(user)
  const [userClawToken, userUsdcToken] = await Promise.all([
    maybeCreateAtaInstruction({
      connection: input.connection,
      payer: user,
      mint: DEVNET_CLAW_MINT,
      owner: user,
    }),
    maybeCreateAtaInstruction({
      connection: input.connection,
      payer: user,
      mint: DEVNET_TEST_USDC_MINT,
      owner: user,
    }),
  ])

  const provider = new anchor.AnchorProvider(
    input.connection,
    input.wallet as unknown as anchor.Wallet,
    { commitment: 'confirmed' }
  )
  const program = new Program(FAUCET_IDL, DEVNET_MASTERPOOL_PROGRAM_ID, provider)

  const claimInstruction = await program.methods
    .claimFaucet({
      clawAmount: new BN(input.clawBaseUnits.toString()),
      usdcAmount: new BN(input.usdcBaseUnits.toString()),
    })
    .accounts({
      config: DEVNET_MASTERPOOL_CONFIG,
      faucetConfig: pdas.faucetConfig,
      faucetGlobalState: pdas.faucetGlobalState,
      faucetUserState: pdas.faucetUserState,
      faucetClawVault: pdas.faucetClawVault,
      faucetUsdcVault: pdas.faucetUsdcVault,
      userClawToken: userClawToken.address,
      userUsdcToken: userUsdcToken.address,
      clawMint: DEVNET_CLAW_MINT,
      usdcMint: DEVNET_TEST_USDC_MINT,
      poolAuthority: DEVNET_POOL_AUTHORITY,
      user,
      payer: user,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()

  const transaction = new Transaction()
  if (userClawToken.instruction) transaction.add(userClawToken.instruction)
  if (userUsdcToken.instruction) transaction.add(userUsdcToken.instruction)
  transaction.add(claimInstruction)
  transaction.feePayer = user

  const { blockhash, lastValidBlockHeight } = await input.connection.getLatestBlockhash('confirmed')
  transaction.recentBlockhash = blockhash

  const signature = await input.wallet.sendTransaction(transaction, input.connection)
  await input.connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed')

  return signature
}
```

- [ ] **Step 3: Fix Anchor typing if needed**

Run:

```bash
npx tsc --noEmit
```

Expected: if `Program` constructor typing differs for the installed Anchor version, adjust only the constructor line. A safe fallback is:

```ts
const program = new Program(FAUCET_IDL, provider)
```

with `FAUCET_IDL.address = DEVNET_MASTERPOOL_PROGRAM_ID.toBase58()` added before construction if required by the installed Anchor version.

- [ ] **Step 4: Commit client module if working task-by-task**

Run:

```bash
git add app/lib/devnet-faucet/client.ts
git commit -m "feat: add devnet faucet transaction client"
```

Expected: commit succeeds.

## Task 5: Build the Faucet UI Component

**Files:**
- Create: `app/components/devnet/DevnetFaucetCard.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create the client component**

Create `app/components/devnet/DevnetFaucetCard.tsx` with:

```tsx
'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import dynamic from 'next/dynamic'

import { claimDevnetFaucet } from '@/app/lib/devnet-faucet/client'
import { DEVNET_FAUCET_LIMITS, solscanDevnetTxUrl } from '@/app/lib/devnet-faucet/constants'
import { validateFaucetClaimInput } from '@/app/lib/devnet-faucet/amounts'
import { normalizeFaucetError } from '@/app/lib/devnet-faucet/errors'
import {
  assertDevnetRpcHealthy,
  clearStoredDevnetRpcUrl,
  createDevnetConnection,
  getInitialDevnetRpcUrl,
  writeStoredDevnetRpcUrl,
} from '@/app/lib/devnet-faucet/rpc'

const ConnectWalletButton = dynamic(() => import('@/app/components/ConnectWalletButton'), { ssr: false })

type ClaimMode = 'idle' | 'preparing' | 'signing' | 'confirming' | 'success' | 'error'

function shortAddress(value: string): string {
  return `${value.slice(0, 4)}…${value.slice(-4)}`
}

export default function DevnetFaucetCard() {
  const wallet = useWallet()
  const [customOpen, setCustomOpen] = useState(false)
  const [clawAmount, setClawAmount] = useState(DEVNET_FAUCET_LIMITS.defaultClaw)
  const [usdcAmount, setUsdcAmount] = useState(DEVNET_FAUCET_LIMITS.defaultUsdc)
  const [rpcUrl, setRpcUrl] = useState(getInitialDevnetRpcUrl)
  const [draftRpcUrl, setDraftRpcUrl] = useState(rpcUrl)
  const [mode, setMode] = useState<ClaimMode>('idle')
  const [message, setMessage] = useState('Ready to fund a devnet wallet.')
  const [signature, setSignature] = useState<string | null>(null)
  const [rpcMessage, setRpcMessage] = useState<string | null>(null)

  const connection = useMemo(() => createDevnetConnection(rpcUrl), [rpcUrl])
  const connectedAddress = wallet.publicKey?.toBase58()

  async function submitClaim(nextClawAmount: string, nextUsdcAmount: string) {
    const validation = validateFaucetClaimInput({
      clawAmount: nextClawAmount,
      usdcAmount: nextUsdcAmount,
      maxClawPerClaim: DEVNET_FAUCET_LIMITS.maxClawPerClaim,
      maxUsdcPerClaim: DEVNET_FAUCET_LIMITS.maxUsdcPerClaim,
    })

    if (!validation.ok) {
      setMode('error')
      setMessage(validation.message)
      return
    }

    try {
      setSignature(null)
      setMode('preparing')
      setMessage('Preparing devnet token accounts…')
      setMode('signing')
      setMessage('Waiting for wallet signature…')
      const nextSignature = await claimDevnetFaucet({
        connection,
        wallet,
        clawBaseUnits: validation.clawBaseUnits,
        usdcBaseUnits: validation.usdcBaseUnits,
      })
      setMode('confirming')
      setMessage('Confirmed on devnet. Updating receipt…')
      setSignature(nextSignature)
      setMode('success')
      setMessage('Faucet claim confirmed on devnet.')
    } catch (error) {
      console.error(error)
      setMode('error')
      setMessage(normalizeFaucetError(error))
    }
  }

  async function handleCustomSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await submitClaim(clawAmount, usdcAmount)
  }

  async function handleRpcSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setRpcMessage('Checking devnet RPC…')
      await assertDevnetRpcHealthy(draftRpcUrl)
      writeStoredDevnetRpcUrl(draftRpcUrl)
      setRpcUrl(draftRpcUrl)
      setRpcMessage('Custom RPC saved for this browser.')
    } catch (error) {
      console.error(error)
      setDraftRpcUrl(rpcUrl)
      setRpcMessage(normalizeFaucetError(error))
    }
  }

  function resetRpc() {
    clearStoredDevnetRpcUrl()
    const fallback = getInitialDevnetRpcUrl()
    setRpcUrl(fallback)
    setDraftRpcUrl(fallback)
    setRpcMessage('Using the default devnet RPC.')
  }

  const busy = mode === 'preparing' || mode === 'signing' || mode === 'confirming'

  return (
    <section className="devnet-faucet-shell" aria-labelledby="devnet-faucet-title">
      <div className="devnet-faucet-copy">
        <div className="devnet-faucet-kicker">Devnet faucet · wallet signed</div>
        <h2 id="devnet-faucet-title">Fund a test wallet without leaving the page.</h2>
        <p>
          Claim test CLAW and Test USDC from the Phase 1 masterpool faucet. The page is locked to devnet,
          and the transaction is signed by your wallet.
        </p>
        <div className="devnet-faucet-limits" aria-label="Faucet limits">
          <span>Default {DEVNET_FAUCET_LIMITS.defaultClaw} CLAW + {DEVNET_FAUCET_LIMITS.defaultUsdc} USDC</span>
          <span>Wallet daily {DEVNET_FAUCET_LIMITS.maxClawPerWalletPerDay} / {DEVNET_FAUCET_LIMITS.maxUsdcPerWalletPerDay}</span>
          <span>Global daily {DEVNET_FAUCET_LIMITS.maxClawGlobalPerDay} / {DEVNET_FAUCET_LIMITS.maxUsdcGlobalPerDay}</span>
        </div>
      </div>

      <div className="devnet-faucet-panel">
        <div className="devnet-faucet-network">
          <span>Network</span>
          <strong>Devnet</strong>
        </div>

        {connectedAddress ? (
          <div className="devnet-faucet-wallet">Connected {shortAddress(connectedAddress)}</div>
        ) : (
          <div className="devnet-faucet-wallet">Connect a wallet to claim test tokens.</div>
        )}

        <button
          className="devnet-faucet-primary"
          type="button"
          disabled={!connectedAddress || busy}
          onClick={() => submitClaim(DEVNET_FAUCET_LIMITS.defaultClaw, DEVNET_FAUCET_LIMITS.defaultUsdc)}
        >
          {busy ? 'Claim in progress…' : `Claim ${DEVNET_FAUCET_LIMITS.defaultClaw} + ${DEVNET_FAUCET_LIMITS.defaultUsdc}`}
        </button>

        {!connectedAddress && <ConnectWalletButton />}

        <button className="devnet-faucet-disclosure" type="button" onClick={() => setCustomOpen((value) => !value)}>
          {customOpen ? 'Hide custom amounts' : 'Customize claim amount'}
        </button>

        {customOpen && (
          <form className="devnet-faucet-form" onSubmit={handleCustomSubmit}>
            <label>
              <span>CLAW</span>
              <input value={clawAmount} inputMode="decimal" onChange={(event) => setClawAmount(event.target.value)} />
            </label>
            <label>
              <span>Test USDC</span>
              <input value={usdcAmount} inputMode="decimal" onChange={(event) => setUsdcAmount(event.target.value)} />
            </label>
            <button type="submit" disabled={!connectedAddress || busy}>Claim custom amount</button>
          </form>
        )}

        <form className="devnet-faucet-rpc" onSubmit={handleRpcSubmit}>
          <label>
            <span>Customize RPC</span>
            <input value={draftRpcUrl} onChange={(event) => setDraftRpcUrl(event.target.value)} />
          </label>
          <div>
            <button type="submit">Use RPC</button>
            <button type="button" onClick={resetRpc}>Reset</button>
          </div>
          {rpcMessage && <p>{rpcMessage}</p>}
        </form>

        <div className={`devnet-faucet-status devnet-faucet-status-${mode}`} role="status">
          {message}
        </div>

        {signature && (
          <a className="devnet-faucet-solscan" href={solscanDevnetTxUrl(signature)} target="_blank" rel="noreferrer">
            View transaction on Solscan ↗
          </a>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add polished CSS without banned patterns**

Append to `app/globals.css`:

```css
.devnet-faucet-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: stretch;
  padding: clamp(24px, 5vw, 48px);
  background:
    radial-gradient(circle at 20% 10%, rgba(120, 255, 184, 0.12), transparent 34%),
    linear-gradient(135deg, rgba(16, 18, 22, 0.98), rgba(8, 9, 11, 0.98));
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-lg);
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.35);
}

.devnet-faucet-copy {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
}

.devnet-faucet-kicker,
.devnet-faucet-network,
.devnet-faucet-wallet,
.devnet-faucet-limits,
.devnet-faucet-status,
.devnet-faucet-rpc,
.devnet-faucet-form {
  font-family: var(--font-mono);
}

.devnet-faucet-kicker {
  color: var(--green-bright);
  font-size: 11px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
}

.devnet-faucet-copy h2 {
  margin-top: 18px;
  max-width: 680px;
  font-family: var(--font-display);
  font-size: clamp(42px, 7vw, 76px);
  line-height: 0.98;
  letter-spacing: -0.055em;
  color: var(--text-high);
}

.devnet-faucet-copy p {
  max-width: 62ch;
  margin-top: 20px;
  color: var(--text-mid);
  font-size: 16px;
  line-height: 1.7;
}

.devnet-faucet-limits {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.devnet-faucet-limits span,
.devnet-faucet-wallet,
.devnet-faucet-status,
.devnet-faucet-solscan {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-mid);
}

.devnet-faucet-limits span {
  padding: 8px 10px;
  font-size: 11px;
}

.devnet-faucet-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  background: rgba(6, 7, 8, 0.72);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.devnet-faucet-network {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-low);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.6px;
}

.devnet-faucet-network strong {
  color: var(--green-bright);
  font-weight: 500;
}

.devnet-faucet-wallet,
.devnet-faucet-status,
.devnet-faucet-solscan {
  padding: 12px;
  font-size: 12px;
  line-height: 1.5;
}

.devnet-faucet-primary,
.devnet-faucet-form button,
.devnet-faucet-rpc button,
.devnet-faucet-disclosure {
  border: 1px solid var(--border-bright);
  border-radius: var(--radius-sm);
  min-height: 44px;
  padding: 0 14px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease, color 0.18s ease;
}

.devnet-faucet-primary {
  background: var(--green-bright);
  color: #061109;
  border-color: transparent;
}

.devnet-faucet-primary:not(:disabled):hover,
.devnet-faucet-form button:not(:disabled):hover,
.devnet-faucet-rpc button:hover,
.devnet-faucet-disclosure:hover {
  transform: translateY(-1px);
  border-color: var(--green-bright);
}

.devnet-faucet-primary:disabled,
.devnet-faucet-form button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.devnet-faucet-disclosure,
.devnet-faucet-form button,
.devnet-faucet-rpc button {
  background: var(--surface-raised);
  color: var(--text-high);
}

.devnet-faucet-form,
.devnet-faucet-rpc {
  display: grid;
  gap: 10px;
}

.devnet-faucet-form label,
.devnet-faucet-rpc label {
  display: grid;
  gap: 6px;
  color: var(--text-low);
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.devnet-faucet-form input,
.devnet-faucet-rpc input {
  min-height: 42px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text-high);
  padding: 0 12px;
  outline: none;
}

.devnet-faucet-form input:focus,
.devnet-faucet-rpc input:focus {
  border-color: var(--green-bright);
}

.devnet-faucet-rpc div {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.devnet-faucet-rpc p {
  color: var(--text-low);
  font-size: 12px;
}

.devnet-faucet-status-success {
  color: var(--green-bright);
}

.devnet-faucet-status-error {
  color: var(--amber);
}

.devnet-faucet-solscan {
  display: inline-flex;
  justify-content: center;
  text-decoration: none;
  color: var(--green-bright);
}

@media (max-width: 860px) {
  .devnet-faucet-shell {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .devnet-faucet-copy h2 {
    font-size: clamp(38px, 12vw, 58px);
  }
}
```

- [ ] **Step 3: Check Impeccable constraints manually**

Run:

```bash
rg -n "border-(left|right):\s*[2-9]|background-clip:\s*text|webkit-background-clip" app/components/devnet/DevnetFaucetCard.tsx app/globals.css
```

Expected: no output. If there is output, remove the banned pattern.

- [ ] **Step 4: Type-check component**

Run:

```bash
npx tsc --noEmit
```

Expected: component compiles. If `useWallet()` type is not assignable to `FaucetWallet`, adjust `FaucetWallet` to match wallet adapter's `sendTransaction` signature rather than casting broadly in the UI.

- [ ] **Step 5: Commit UI component if working task-by-task**

Run:

```bash
git add app/components/devnet/DevnetFaucetCard.tsx app/globals.css
git commit -m "feat: add devnet faucet card"
```

Expected: commit succeeds.

## Task 6: Embed Faucet on Devnet Page

**Files:**
- Modify: `app/devnet/page.tsx`

- [ ] **Step 1: Import the component**

Add near the top of `app/devnet/page.tsx`:

```tsx
import DevnetFaucetCard from '../components/devnet/DevnetFaucetCard'
```

- [ ] **Step 2: Insert the faucet card after the hero stats**

In `app/devnet/page.tsx`, after the closing `</div>` for the `grid-3` stat cards and before the hero section container closes, insert:

```tsx
          <div style={{ marginTop: 36 }}>
            <DevnetFaucetCard />
          </div>
```

The surrounding area should read like:

```tsx
          <div className="grid-3" style={{ marginTop: 32 }}>
            ...
          </div>

          <div style={{ marginTop: 36 }}>
            <DevnetFaucetCard />
          </div>
```

- [ ] **Step 3: Update stale static copy**

Change this paragraph in the program addresses section:

```tsx
            integration context; this page does not query chain state in real time.
```

to:

```tsx
            integration context; the faucet card above uses a forced devnet RPC for live wallet claims.
```

- [ ] **Step 4: Type-check page integration**

Run:

```bash
npx tsc --noEmit
```

Expected: TypeScript succeeds.

- [ ] **Step 5: Commit page integration if working task-by-task**

Run:

```bash
git add app/devnet/page.tsx
git commit -m "feat: embed faucet on devnet page"
```

Expected: commit succeeds.

## Task 7: Build and Manual Browser Verification

**Files:**
- No new files unless fixing issues found during verification.

- [ ] **Step 1: Run production build**

Run:

```bash
npm run build
```

Expected: Next.js production build completes. If it fails because the repository's `lint` script uses deprecated `next lint`, do not change unrelated lint setup; fix only faucet-related type/build errors.

- [ ] **Step 2: Start local dev server**

Run:

```bash
npm run dev
```

Expected: local server starts, usually at `http://localhost:3000`.

- [ ] **Step 3: Open `/devnet`**

Open:

```text
http://localhost:3000/devnet
```

Expected: the faucet appears as a top inline hero card, shows `Network: Devnet`, and does not visually break existing page sections.

- [ ] **Step 4: Verify disconnected state**

Expected:

- The card explains the faucet purpose.
- The default and daily limits are visible.
- The claim button is disabled while no wallet is connected.
- The connect-wallet control is visible.

- [ ] **Step 5: Verify custom amount validation**

With a connected wallet or by inspecting the UI state, try values:

```text
CLAW: 11
Test USDC: 10
```

Expected: UI reports `CLAW is limited to 10 per claim.` and does not open a wallet signature.

Try values:

```text
CLAW: 0
Test USDC: 0
```

Expected: UI reports `Enter an amount for CLAW, Test USDC, or both.`

- [ ] **Step 6: Verify RPC customization**

Enter:

```text
not-a-url
```

Expected: UI rejects it and keeps the previous RPC.

Enter a valid devnet RPC URL such as:

```text
https://api.devnet.solana.com
```

Expected: UI saves it and says the custom RPC is active.

- [ ] **Step 7: Verify wallet claim on devnet**

Connect Phantom or Solflare with devnet enabled and enough devnet SOL for fees. Click the default claim button.

Expected:

- Wallet prompts for a transaction.
- Transaction confirms on devnet.
- UI shows `Faucet claim confirmed on devnet.`
- The Solscan link points to `https://solscan.io/tx/<signature>?cluster=devnet`.

If the faucet is disabled or vaults are empty, expected fallback is a readable error message such as `The devnet faucet is currently disabled.` or `The faucet vault does not have enough tokens right now.`

- [ ] **Step 8: Commit verification fixes if any**

If manual verification required fixes, run:

```bash
git add app/components/devnet/DevnetFaucetCard.tsx app/lib/devnet-faucet app/devnet/page.tsx app/globals.css package.json package-lock.json
git commit -m "fix: polish devnet faucet verification issues"
```

Expected: commit includes only faucet-related fixes.

## Task 8: Final Quality Gate

**Files:**
- No new files unless fixes are required.

- [ ] **Step 1: Run TypeScript check**

Run:

```bash
npx tsc --noEmit
```

Expected: no TypeScript errors.

- [ ] **Step 2: Run build**

Run:

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Run Impeccable anti-pattern scan**

Run:

```bash
rg -n "border-(left|right):\s*[2-9]|background-clip:\s*text|webkit-background-clip|linear-gradient\([^;]*text" app/components app/globals.css
```

Expected: no output for the faucet component or new styles. Existing unrelated matches should be left alone and noted separately.

- [ ] **Step 4: Review final diff**

Run:

```bash
git diff --stat
git diff -- app/devnet/page.tsx app/components/devnet/DevnetFaucetCard.tsx app/lib/devnet-faucet app/globals.css package.json package-lock.json docs/superpowers/specs/2026-04-24-devnet-faucet-site-design.md docs/superpowers/plans/2026-04-24-devnet-faucet-site.md
```

Expected: diff only contains the faucet feature, spec, plan, and required dependencies.

- [ ] **Step 5: Document final manual result**

In the final handoff, report:

- Whether `npx tsc --noEmit` passed.
- Whether `npm run build` passed.
- Whether a live wallet claim was tested, and if not, why.
- Any pre-existing unrelated worktree changes that were not touched.
