import { PublicKey, Transaction, type Connection } from '@solana/web3.js'
import {
  TOKEN_PROGRAM_ID,
  createApproveCheckedInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'

export type WalletAllowanceStatus =
  | 'unknown'
  | 'missing-token-account'
  | 'wrong-delegate'
  | 'low-allowance'
  | 'ready'
  | 'error'

export type WalletAllowanceSnapshot = {
  exists: boolean
  tokenAccount: string | null
  amountAtomic: string
  delegate: string | null
  delegatedAmountAtomic: string
}

export type WalletAllowanceDecision = {
  status: WalletAllowanceStatus
  message: string
}

export type WalletAllowanceRequirement = {
  paymentDelegate: string
  requiredAtomic: string
}

export type ApproveDelegateInput = {
  connection: Connection
  walletPublicKey: PublicKey
  signTransaction: (transaction: Transaction) => Promise<Transaction>
  usdcMint: string
  usdcDecimals: number
  paymentDelegate: string
  amountAtomic: string
}

export function deriveAssociatedTokenAddress(owner: PublicKey, mint: PublicKey): PublicKey {
  return getAssociatedTokenAddressSync(mint, owner)
}

export function classifyWalletAllowance(
  snapshot: WalletAllowanceSnapshot,
  requirement: WalletAllowanceRequirement
): WalletAllowanceDecision {
  if (!snapshot.exists) {
    return { status: 'missing-token-account', message: 'Test USDC account not found.' }
  }
  if (!snapshot.delegate || snapshot.delegate !== requirement.paymentDelegate) {
    return { status: 'wrong-delegate', message: 'Approve ClawFarm spending before sending chat requests.' }
  }
  if (parseAtomic(snapshot.delegatedAmountAtomic) < parseAtomic(requirement.requiredAtomic)) {
    return { status: 'low-allowance', message: 'Delegated allowance is below this request cap.' }
  }
  return { status: 'ready', message: 'Allowance ready.' }
}

export function defaultApprovalAmountAtomic(decimals: number): string {
  let scale = BigInt(1)
  for (let index = 0; index < decimals; index += 1) {
    scale *= BigInt(10)
  }
  return (BigInt(10) * scale).toString()
}

export function approvalAmountForRequiredCap(requiredAtomic: string, decimals: number): string {
  const defaultAmount = parseAtomic(defaultApprovalAmountAtomic(decimals))
  const requiredAmount = parseAtomic(requiredAtomic)
  return (requiredAmount > defaultAmount ? requiredAmount : defaultAmount).toString()
}

export async function fetchWalletAllowanceSnapshot(
  connection: Connection,
  owner: PublicKey,
  usdcMint: string
): Promise<WalletAllowanceSnapshot> {
  const mint = new PublicKey(usdcMint)
  const tokenAccount = deriveAssociatedTokenAddress(owner, mint)

  try {
    const account = await getAccount(connection, tokenAccount)
    return {
      exists: true,
      tokenAccount: tokenAccount.toBase58(),
      amountAtomic: account.amount.toString(),
      delegate: account.delegate?.toBase58() ?? null,
      delegatedAmountAtomic: account.delegatedAmount.toString(),
    }
  } catch {
    return {
      exists: false,
      tokenAccount: tokenAccount.toBase58(),
      amountAtomic: '0',
      delegate: null,
      delegatedAmountAtomic: '0',
    }
  }
}

export async function approveDelegateAllowance(input: ApproveDelegateInput): Promise<string> {
  const mint = new PublicKey(input.usdcMint)
  const delegate = new PublicKey(input.paymentDelegate)
  const tokenAccount = deriveAssociatedTokenAddress(input.walletPublicKey, mint)
  const amount = parseAtomic(input.amountAtomic)

  const transaction = new Transaction().add(
    createApproveCheckedInstruction(
      tokenAccount,
      mint,
      delegate,
      input.walletPublicKey,
      amount,
      input.usdcDecimals,
      [],
      TOKEN_PROGRAM_ID
    )
  )

  const latestBlockhash = await input.connection.getLatestBlockhash()
  transaction.feePayer = input.walletPublicKey
  transaction.recentBlockhash = latestBlockhash.blockhash

  const signedTransaction = await input.signTransaction(transaction)
  const signature = await input.connection.sendRawTransaction(signedTransaction.serialize())
  await input.connection.confirmTransaction({ signature, ...latestBlockhash }, 'confirmed')
  return signature
}

function parseAtomic(value: string): bigint {
  if (!/^\d+$/.test(value.trim())) return BigInt(0)
  try {
    return BigInt(value.trim())
  } catch {
    return BigInt(0)
  }
}
