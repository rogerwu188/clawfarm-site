'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { useCallback } from 'react'

export default function ConnectWalletButton() {
  const { publicKey, disconnect, connecting } = useWallet()
  const { setVisible } = useWalletModal()

  const handleClick = useCallback(() => {
    if (publicKey) {
      disconnect()
    } else {
      setVisible(true)
    }
  }, [publicKey, disconnect, setVisible])

  const truncatedAddress = publicKey
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : null

  return (
    <button
      onClick={handleClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        padding: '6px 14px',
        borderRadius: '4px',
        border: publicKey ? '1px solid var(--green)' : '1px solid var(--border)',
        background: publicKey ? 'rgba(0,255,136,0.1)' : 'transparent',
        color: publicKey ? 'var(--green)' : 'var(--text-mid)',
        cursor: 'pointer',
        whiteSpace: 'nowrap' as const,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {connecting ? (
        'Connecting...'
      ) : publicKey ? (
        <>
          <span style={{width:'6px', height:'6px', borderRadius:'50%', background:'var(--green)', display:'inline-block'}} />
          {truncatedAddress}
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  )
}
