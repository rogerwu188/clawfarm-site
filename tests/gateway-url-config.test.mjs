import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'
import vm from 'node:vm'

function loadModule(path, env = {}) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
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
    require(id) {
      if (id === '@solana/web3.js') {
        return { PublicKey: class PublicKey { constructor(value) { this.value = value } toBase58() { return this.value } } }
      }
      if (id === '../wallet-chat/api' || id === '@/app/lib/wallet-chat/api') {
        return loadModule('app/lib/wallet-chat/api.ts', env)
      }
      throw new Error(`Unexpected import: ${id}`)
    },
  })
  vm.runInContext(outputText, context)
  return module.exports
}

test('wallet chat builds Gateway routes from NEXT_PUBLIC_CLAWFARM_GATEWAY_URL', () => {
  const api = loadModule('app/lib/wallet-chat/api.ts', {
    NEXT_PUBLIC_CLAWFARM_GATEWAY_URL: 'http://127.0.0.1:8383/',
  })

  assert.equal(api.CLAWFARM_GATEWAY_URL, 'http://127.0.0.1:8383/')
  assert.equal(api.buildGatewayUrl(api.CLAWFARM_GATEWAY_URL, '/clawfarm/v1/wallet/config'), 'http://127.0.0.1:8383/clawfarm/v1/wallet/config')
  assert.equal(api.buildWalletConfigUrl(api.CLAWFARM_GATEWAY_URL), 'http://127.0.0.1:8383/clawfarm/v1/wallet/config')
  assert.equal(api.buildModelsUrl(api.CLAWFARM_GATEWAY_URL), 'http://127.0.0.1:8383/clawfarm/v1/models')
  assert.equal(api.buildChatCompletionsUrl(api.CLAWFARM_GATEWAY_URL), 'http://127.0.0.1:8383/clawfarm/chat/completions')
})

test('devnet faucet endpoint is derived from Gateway base and ignores legacy faucet env', () => {
  const constants = loadModule('app/lib/devnet-faucet/constants.ts', {
    NEXT_PUBLIC_CLAWFARM_GATEWAY_URL: 'http://127.0.0.1:8383/',
    NEXT_PUBLIC_DEVNET_FAUCET_API_URL: 'http://legacy.example/faucet',
  })

  assert.equal(constants.DEVNET_FAUCET_API_URL, 'http://127.0.0.1:8383/clawfarm/v1/devnet/faucet/claim')
})

test('devnet faucet endpoint is empty when Gateway base is missing', () => {
  const constants = loadModule('app/lib/devnet-faucet/constants.ts', {
    NEXT_PUBLIC_DEVNET_FAUCET_API_URL: 'http://legacy.example/faucet',
  })

  assert.equal(constants.DEVNET_FAUCET_API_URL, '')
})
