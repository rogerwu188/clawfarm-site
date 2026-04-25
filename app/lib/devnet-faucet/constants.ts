import { PublicKey } from '@solana/web3.js'

export const DEVNET_FAUCET_DECIMALS = 6
export const DEVNET_FAUCET_BASE_UNITS = BigInt(10 ** DEVNET_FAUCET_DECIMALS)


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
