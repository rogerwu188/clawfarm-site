import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'
import vm from 'node:vm'

function loadWalletChatApi(env = {}) {
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
    Response,
    fetch: (...args) => globalThis.fetch(...args),
    btoa: (value) => Buffer.from(value, 'binary').toString('base64'),
    crypto: { getRandomValues: (bytes) => bytes.fill(1) },
    require(id) {
      throw new Error(`Unexpected import: ${id}`)
    },
  })
  vm.runInContext(outputText, context)
  return module.exports
}

const validConfig = {
  enabled: true,
  settlement_mode: 'sync_after_upstream',
  max_output_tokens: 1024,
  chains: [
    {
      chain: 'solana-devnet',
      enabled: true,
      usdc_mint: 'D3vhDe6mtdAgj2t8pu6XnaFXDPdiMDTALTSCZbizfm9P',
      usdc_decimals: 6,
      payment_delegate: 'Delegate1111111111111111111111111111111111',
    },
    {
      chain: 'solana-mainnet',
      enabled: false,
      usdc_mint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      usdc_decimals: 6,
      payment_delegate: 'MainnetDelegate111111111111111111111111111',
    },
  ],
}

test('selects enabled wallet payment chain config', () => {
  const api = loadWalletChatApi({ NEXT_PUBLIC_WALLET_CHAT_MAX_OUTPUT_TOKENS: '512' })

  const chainConfig = api.selectWalletPaymentChainConfig(validConfig, 'solana-devnet')

  assert.equal(chainConfig.chain, 'solana-devnet')
  assert.equal(chainConfig.usdc_mint, 'D3vhDe6mtdAgj2t8pu6XnaFXDPdiMDTALTSCZbizfm9P')
  assert.equal(chainConfig.usdc_decimals, 6)
  assert.equal(chainConfig.payment_delegate, 'Delegate1111111111111111111111111111111111')
})

test('rejects disabled wallet payment chain config', () => {
  const api = loadWalletChatApi()

  assert.throws(
    () => api.selectWalletPaymentChainConfig(validConfig, 'solana-mainnet'),
    /not enabled/
  )
})

test('rejects invalid wallet payment chain config', () => {
  const api = loadWalletChatApi()
  const invalidConfig = {
    ...validConfig,
    chains: [{ chain: 'solana-devnet', enabled: true, usdc_mint: '', usdc_decimals: 6, payment_delegate: '' }],
  }

  assert.throws(
    () => api.selectWalletPaymentChainConfig(invalidConfig, 'solana-devnet'),
    /invalid/
  )
})

test('effective max tokens uses Gateway config when stricter than env fallback', () => {
  const api = loadWalletChatApi({ NEXT_PUBLIC_WALLET_CHAT_MAX_OUTPUT_TOKENS: '2048' })

  assert.equal(api.effectiveWalletChatMaxOutputTokens({ max_output_tokens: 1024 }), 1024)
})

test('effective max tokens falls back to env when Gateway config is missing', () => {
  const api = loadWalletChatApi({ NEXT_PUBLIC_WALLET_CHAT_MAX_OUTPUT_TOKENS: '768' })

  assert.equal(api.effectiveWalletChatMaxOutputTokens(null), 768)
})

test('loadWalletPaymentConfig fetches public Gateway config', async () => {
  const api = loadWalletChatApi()
  const originalFetch = globalThis.fetch
  const calls = []
  globalThis.fetch = async (url, init) => {
    calls.push([url, init])
    return new Response(JSON.stringify(validConfig), { status: 200, headers: { 'Content-Type': 'application/json' } })
  }

  try {
    const result = await api.loadWalletPaymentConfig({ gatewayUrl: 'http://127.0.0.1:8383/' })

    assert.equal(calls[0][0], 'http://127.0.0.1:8383/clawfarm/v1/wallet/config')
    assert.equal(calls[0][1].method, 'GET')
    assert.equal(result.enabled, true)
    assert.equal(result.max_output_tokens, 1024)
  } finally {
    globalThis.fetch = originalFetch
  }
})
