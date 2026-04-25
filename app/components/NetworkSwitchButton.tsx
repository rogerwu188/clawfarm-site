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
