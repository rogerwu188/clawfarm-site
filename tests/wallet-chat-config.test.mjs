import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'
import vm from 'node:vm'

function loadWalletChatApi(env = {}, globals = {}) {
  const source = readFileSync(new URL('../app/lib/wallet-chat/api.ts', import.meta.url), 'utf8')
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
    process: { env },
    console,
    TextEncoder,
    btoa: (value) => Buffer.from(value, 'binary').toString('base64'),
    crypto: { getRandomValues: (bytes) => bytes.fill(1) },
    Headers,
    Response,
    fetch: globals.fetch,
    require(id) {
      throw new Error(`Unexpected import: ${id}`)
    },
  })
  vm.runInContext(outputText, context)
  return module.exports
}

function decodeBase64Url(value) {
  const padded = `${value}${'='.repeat((4 - (value.length % 4)) % 4)}`
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
}

test('wallet chat max output tokens defaults to 512', () => {
  const api = loadWalletChatApi()

  assert.equal(api.WALLET_CHAT_MAX_OUTPUT_TOKENS, 512)
})

test('wallet chat max output tokens can be configured through NEXT_PUBLIC env', () => {
  const api = loadWalletChatApi({ NEXT_PUBLIC_WALLET_CHAT_MAX_OUTPUT_TOKENS: '1024' })

  assert.equal(api.WALLET_CHAT_MAX_OUTPUT_TOKENS, 1024)
})

test('wallet chat default per-request charge cap is minimal when pricing is unavailable', () => {
  const api = loadWalletChatApi()

  assert.equal(api.DEFAULT_WALLET_CHAT_MAX_CHARGE_ATOMIC, '1')
})

test('estimates max charge from max tokens and model completion price', () => {
  const api = loadWalletChatApi()

  assert.equal(
    api.estimateWalletChatMaxChargeAtomic({
      maxTokens: 128,
      model: { id: 'storyclaw/minimax-m2.7', pricing: { completion: '15.0' } },
    }),
    '1920'
  )
})

test('estimated max charge falls back to one atomic unit when pricing is absent or tiny', () => {
  const api = loadWalletChatApi()

  assert.equal(api.estimateWalletChatMaxChargeAtomic({ maxTokens: 128, model: null }), '1')
  assert.equal(
    api.estimateWalletChatMaxChargeAtomic({
      maxTokens: 100,
      model: { id: 'storyclaw/minimax-m2.7', pricing: { completion: '0.000002' } },
    }),
    '1'
  )
})

test('manual max charge overrides are preserved across estimate refreshes', () => {
  const api = loadWalletChatApi()

  assert.equal(
    api.nextWalletChatMaxChargeAtomic({
      currentMaxChargeAtomic: '894260',
      estimatedMaxChargeAtomic: '1920',
      userEditedMaxCharge: true,
    }),
    '894260'
  )
  assert.equal(
    api.nextWalletChatMaxChargeAtomic({
      currentMaxChargeAtomic: '1',
      estimatedMaxChargeAtomic: '1920',
      userEditedMaxCharge: false,
    }),
    '1920'
  )
})

test('canonical session intent JSON uses Gateway field order', () => {
  const api = loadWalletChatApi()

  assert.equal(
    api.canonicalPaymentSessionIntentJson({
      walletPubkey: 'Wallet111',
      chain: 'solana-devnet',
      allowedModels: ['*'],
      maxPerRequestAtomic: '25000',
      totalBudgetAtomic: '1000000',
      maxRequests: 50,
      nonce: 'clawfarm_session_nonce',
      expiresAt: 1777420800,
    }),
    '{"domain":"clawfarm.payment.session.v1","chain":"solana-devnet","wallet":"Wallet111","protocol":"openai-completions","allowed_models":["*"],"max_per_request_atomic":"25000","total_budget_atomic":"1000000","max_requests":50,"nonce":"clawfarm_session_nonce","expires_at":1777420800}'
  )
})

test('create wallet session sends session headers without per-request payment intent headers', async () => {
  let observedRequest
  const api = loadWalletChatApi({}, {
    fetch: async (url, request) => {
      observedRequest = { url, request }
      return new Response(JSON.stringify({
        session_id: 'cfs_test',
        wallet: 'Wallet111',
        chain: 'solana-devnet',
        protocol: 'openai-completions',
        allowed_models: ['*'],
        max_per_request_atomic: '25000',
        total_budget_atomic: '1000000',
        spent_atomic: '0',
        reserved_atomic: '0',
        requests_used: 0,
        max_requests: 50,
        expires_at: Math.floor(Date.now() / 1000) + 600,
        status: 'active',
      }), { status: 200, headers: { 'Content-Type': 'application/json' } })
    },
  })

  const session = await api.createWalletPaymentSession({
    gatewayUrl: 'https://gateway.example/',
    walletPubkey: 'Wallet111',
    chain: 'solana-devnet',
    maxPerRequestAtomic: '25000',
    totalBudgetAtomic: '1000000',
    maxRequests: 50,
    signMessage: async (message) => {
      assert.match(new TextDecoder().decode(message), /"domain":"clawfarm\.payment\.session\.v1"/)
      return new Uint8Array([7, 8, 9])
    },
  })

  assert.equal(session.sessionId, 'cfs_test')
  assert.equal(observedRequest.url, 'https://gateway.example/clawfarm/v1/wallet/sessions')
  assert.equal(observedRequest.request.method, 'POST')
  assert.equal(observedRequest.request.headers['X-ClawFarm-Wallet'], 'Wallet111')
  assert.ok(observedRequest.request.headers['X-ClawFarm-Session-Intent'])
  assert.equal(decodeBase64Url(observedRequest.request.headers['X-ClawFarm-Session-Intent']).includes('"max_requests":50'), true)
  assert.ok(observedRequest.request.headers['X-ClawFarm-Session-Signature'])
  assert.equal(observedRequest.request.headers['X-ClawFarm-Payment-Intent'], undefined)
  assert.equal(observedRequest.request.headers['X-ClawFarm-Payment-Signature'], undefined)
})

test('send wallet chat uses session header and skips signMessage when session is present', async () => {
  let signCalls = 0
  let observedRequest
  const api = loadWalletChatApi({}, {
    fetch: async (url, request) => {
      observedRequest = { url, request }
      return new Response(JSON.stringify({ choices: [{ message: { content: 'hello from session' } }] }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-ClawFarm-Request-Nonce': 'cfn_1',
          'X-ClawFarm-Payment-Status': 'settled',
          'X-ClawFarm-Max-Charge-Atomic': '25000',
          'X-ClawFarm-Charge-Atomic': '1920',
          'X-ClawFarm-Settlement-Tx': 'tx_1',
          'X-ClawFarm-Session-ID': 'cfs_test',
          'X-ClawFarm-Session-Spent-Atomic': '1920',
          'X-ClawFarm-Session-Reserved-Atomic': '0',
          'X-ClawFarm-Session-Requests-Used': '1',
        },
      })
    },
  })

  const result = await api.sendWalletChatCompletion({
    gatewayUrl: 'https://gateway.example',
    walletPubkey: 'Wallet111',
    chain: 'solana-devnet',
    model: 'storyclaw/minimax-m2.7',
    maxTokens: 128,
    maxChargeAtomic: '25000',
    messages: [{ role: 'user', content: 'hello' }],
    session: {
      sessionId: 'cfs_test',
      wallet: 'Wallet111',
      chain: 'solana-devnet',
      protocol: 'openai-completions',
      allowedModels: ['*'],
      maxPerRequestAtomic: '25000',
      totalBudgetAtomic: '1000000',
      spentAtomic: '0',
      reservedAtomic: '0',
      requestsUsed: 0,
      maxRequests: 50,
      expiresAt: Math.floor(Date.now() / 1000) + 600,
      status: 'active',
    },
    signMessage: async () => {
      signCalls += 1
      throw new Error('signMessage should not be called')
    },
  })

  assert.equal(signCalls, 0)
  assert.equal(result.assistantContent, 'hello from session')
  assert.equal(result.metadata.sessionId, 'cfs_test')
  assert.equal(result.metadata.sessionSpentAtomic, '1920')
  assert.equal(result.metadata.sessionRequestsUsed, '1')
  assert.equal(observedRequest.url, 'https://gateway.example/clawfarm/chat/completions')
  assert.equal(observedRequest.request.headers['X-ClawFarm-Session-ID'], 'cfs_test')
  assert.equal(observedRequest.request.headers['X-ClawFarm-Payment-Intent'], undefined)
  assert.equal(observedRequest.request.headers['X-ClawFarm-Payment-Signature'], undefined)
})

test('session storage key is scoped by gateway chain wallet and protocol', () => {
  const api = loadWalletChatApi()

  assert.equal(
    api.walletSessionStorageKey('https://gateway.example/', 'solana-devnet', 'Wallet111'),
    'clawfarm.walletSession.https://gateway.example.solana-devnet.Wallet111.openai-completions'
  )
})

test('unsupported provider model errors are classified for chat UI recovery', () => {
  const api = loadWalletChatApi()

  assert.equal(
    api.isUnsupportedWalletChatModelError(
      new api.WalletChatError('routing_error', '暂不支持该模型。 / This model is not currently supported. (HTTP 500)', 500)
    ),
    true
  )
  assert.equal(api.isUnsupportedWalletChatModelError(new api.WalletChatError('session_expired', 'expired', 402)), false)
})
