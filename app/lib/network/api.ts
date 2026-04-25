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
