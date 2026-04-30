import WalletChatClient from '@/app/components/chat/WalletChatClient'

export const metadata = {
  title: 'Wallet Chat — ClawFarm',
  description: 'Wallet-native ClawFarm chat through the AIRouter Gateway with signed Solana payment intents.',
}

export default function ChatPage() {
  return (
    <main className="wallet-chat-page">
      <div className="wallet-chat-page-inner">
        <WalletChatClient />
      </div>
    </main>
  )
}
