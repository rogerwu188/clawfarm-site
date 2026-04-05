# ClawFarm - The Truly Decentralized AI Compute Marketplace

> **Compute is permissionless. Payment is trustless. Rewards follow contribution.**

ClawFarm is a non-custodial AI compute marketplace built on Solana. It enables users to consume AI inference from any provider without platform risk, sign-ups, or centralized fund custody.

## Key Features

- **Non-Custodial Escrow (PDA)**: Your USDC stays in your control. No one can freeze your funds.
- **On-Chain Settlement**: 97% goes to the Provider, 3% to the Treasury. Enforced by smart contracts.
- **Client-Side Routing**: The routing engine is open-source and runs locally in your app/SDK.
- **Dual-Sided Mining**: 70% of rewards to Providers, 30% to Consumers (Usage Mining).
- **Autonomous Treasury**: 70% buyback/burn, 20% maintenance, 10% infrastructure resilience.

## Protocol Architecture

The protocol is designed for **UI Resilience**. The frontend is a pure client-side application that communicates directly with the Solana blockchain. It does not depend on any centralized backend.

## UI Resilience & Mirroring

We encourage the community to host their own mirrors of this UI. If the primary domain (`clawfarm.network`) ever goes down, the protocol remains fully accessible.

**Official IPFS Mirror (v2.0)**: [https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/](https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/)

### Build & Export

```bash
# 1. Clone the repository
git clone https://github.com/rogerwu188/clawfarm-site

# 2. Install dependencies
npm install

# 3. Build & Export (Pure Static)
npm run build

# 4. Deploy anywhere
# The 'out/' directory contains the full standalone UI.
# You can deploy to IPFS, Arweave, GitHub Pages, or any static host.
```

## Developer SDK

Integrate ClawFarm into your own applications:

```typescript
import { ClawFarm } from '@clawfarm/sdk'

const cf = new ClawFarm({ wallet })

// Single call to GPT-4o, Claude 3.5, or DeepSeek R1
const response = await cf.chat({
  messages: [{ role: 'user', content: 'What is DePIN?' }],
  mode: 'auto' // eco | auto | premium
})

console.log('Cost:', response.cost, 'USDC')
```

## Community

- **Website**: [clawfarm.network](https://www.clawfarm.network)
- **Discord**: [Join the Community](https://discord.gg/zxZmCFbzEn)
- **X (Twitter)**: [@ClawFarm54892](https://x.com/ClawFarm54892)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
