import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'
import vm from 'node:vm'

function loadAllowanceModule() {
  const source = readFileSync(new URL('../app/lib/wallet-chat/allowance.ts', import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  })

  const module = { exports: {} }
  const context = vm.createContext({
    exports: module.exports,
    module,
    console,
    require(id) {
      if (id === '@solana/web3.js') {
        return {
          PublicKey: class PublicKey {
            constructor(value) { this.value = value }
            toBase58() { return this.value }
            equals(other) { return other?.toBase58?.() === this.value }
          },
          Transaction: class Transaction {
            constructor() { this.instructions = [] }
            add(ix) { this.instructions.push(ix); return this }
            serialize() { return Buffer.from('signed-transaction') }
          },
        }
      }
      if (id === '@solana/spl-token') {
        return {
          TOKEN_PROGRAM_ID: { toBase58: () => 'Token1111111111111111111111111111111111' },
          getAssociatedTokenAddressSync: (mint, owner) => ({ toBase58: () => `ata:${mint.toBase58()}:${owner.toBase58()}` }),
          getAccount: async () => { throw new Error('getAccount not stubbed for this test') },
          createApproveCheckedInstruction: (...args) => ({ kind: 'approveChecked', args }),
        }
      }
      throw new Error(`Unexpected import: ${id}`)
    },
  })
  vm.runInContext(outputText, context)
  return module.exports
}

const allowance = loadAllowanceModule()

test('classifies allowance as ready when delegate and amount match', () => {
  const result = allowance.classifyWalletAllowance(
    { exists: true, tokenAccount: null, delegate: 'Delegate1111111111111111111111111111111111', delegatedAmountAtomic: '25000', amountAtomic: '10000000' },
    { paymentDelegate: 'Delegate1111111111111111111111111111111111', requiredAtomic: '25000' }
  )

  assert.equal(result.status, 'ready')
})

test('classifies missing token account', () => {
  const result = allowance.classifyWalletAllowance(
    { exists: false, tokenAccount: null, delegate: null, delegatedAmountAtomic: '0', amountAtomic: '0' },
    { paymentDelegate: 'Delegate1111111111111111111111111111111111', requiredAtomic: '25000' }
  )

  assert.equal(result.status, 'missing-token-account')
})

test('classifies wrong delegate', () => {
  const result = allowance.classifyWalletAllowance(
    { exists: true, tokenAccount: null, delegate: 'WrongDelegate111111111111111111111111111111', delegatedAmountAtomic: '999999', amountAtomic: '10000000' },
    { paymentDelegate: 'Delegate1111111111111111111111111111111111', requiredAtomic: '25000' }
  )

  assert.equal(result.status, 'wrong-delegate')
})

test('classifies low allowance', () => {
  const result = allowance.classifyWalletAllowance(
    { exists: true, tokenAccount: null, delegate: 'Delegate1111111111111111111111111111111111', delegatedAmountAtomic: '100', amountAtomic: '10000000' },
    { paymentDelegate: 'Delegate1111111111111111111111111111111111', requiredAtomic: '25000' }
  )

  assert.equal(result.status, 'low-allowance')
})

test('approval amount uses default 10 token units unless required cap is larger', () => {
  assert.equal(allowance.defaultApprovalAmountAtomic(6), '10000000')
  assert.equal(allowance.approvalAmountForRequiredCap('25000', 6), '10000000')
  assert.equal(allowance.approvalAmountForRequiredCap('20000000', 6), '20000000')
})

test('approve signs transaction and submits through provided devnet connection', async () => {
  const calls = []
  const connection = {
    getLatestBlockhash: async () => ({ blockhash: 'devnet-blockhash', lastValidBlockHeight: 123 }),
    sendRawTransaction: async (serialized) => {
      calls.push(['sendRawTransaction', serialized.toString()])
      return 'approval-signature'
    },
    confirmTransaction: async (confirmation, commitment) => {
      calls.push(['confirmTransaction', confirmation.signature, confirmation.blockhash, commitment])
    },
  }
  const signTransaction = async (transaction) => {
    calls.push(['signTransaction', transaction.feePayer.toBase58(), transaction.recentBlockhash])
    return transaction
  }

  const signature = await allowance.approveDelegateAllowance({
    connection,
    walletPublicKey: { toBase58: () => 'Wallet111111111111111111111111111111111111' },
    signTransaction,
    usdcMint: 'D3vhDe6mtdAgj2t8pu6XnaFXDPdiMDTALTSCZbizfm9P',
    usdcDecimals: 6,
    paymentDelegate: 'Delegate1111111111111111111111111111111111',
    amountAtomic: '10000000',
  })

  assert.equal(signature, 'approval-signature')
  assert.deepEqual(calls, [
    ['signTransaction', 'Wallet111111111111111111111111111111111111', 'devnet-blockhash'],
    ['sendRawTransaction', 'signed-transaction'],
    ['confirmTransaction', 'approval-signature', 'devnet-blockhash', 'confirmed'],
  ])
})
