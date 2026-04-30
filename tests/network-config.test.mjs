import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'
import vm from 'node:vm'

function loadNetworkConfig() {
  const source = readFileSync(new URL('../app/lib/network/config.ts', import.meta.url), 'utf8')
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
    process: { env: {} },
    require(id) {
      if (id === '@solana/web3.js') {
        return { clusterApiUrl: (cluster) => `https://rpc.example/${cluster}` }
      }
      throw new Error(`Unexpected import: ${id}`)
    },
  })
  vm.runInContext(outputText, context)
  return module.exports
}

const networkConfig = loadNetworkConfig()

test('chain-neutral chat page can carry devnet through cluster query', () => {
  const searchParams = new URLSearchParams('cluster=devnet')

  assert.equal(networkConfig.getNetworkIdFromPathAndQuery('/chat', searchParams), 'devnet')
})

test('explicit devnet path still wins over missing cluster query', () => {
  assert.equal(networkConfig.getNetworkIdFromPathAndQuery('/devnet', new URLSearchParams()), 'devnet')
})
