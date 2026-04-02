# ClawFarm — Decentralized AI Compute Marketplace

> Non-custodial. Permissionless. On-chain settlement.

Website: https://clawfarm.network
Chain: Solana

## Overview

ClawFarm is a decentralized AI compute marketplace built on Solana. Users deposit USDC into an on-chain escrow contract, choose a routing mode (eco / auto / premium), and consume AI inference from any registered Provider.

**The platform never holds user funds.** Every USDC sits in a program-owned escrow (PDA). Every settlement is a contract execution. Every Provider payout is an on-chain transfer.

## Architecture

- **Escrow Contract** — Holds user USDC in PDA. No admin access. Withdraw anytime.
- **Provider Registry** — Permissionless on-chain registration with CLAW stake.
- **Settlement Contract** — Processes dual-signed usage proofs. 97% Provider / 3% Treasury.
- **Treasury Contract** — Non-discretionary buyback & burn engine. No governance.
- **Reward Contract** — Distributes CLAW per Epoch by AWU × Price × Quality formula.

## Routing Modes

| Mode | Strategy |
|---|---|
| eco | Lowest cost per token |
| auto | Balanced (cost × quality × latency) |
| premium | Highest-tier model available |

## For Users

1. Connect Solana wallet
2. Deposit USDC to escrow
3. Select routing mode
4. Send AI requests
5. Withdraw remaining USDC anytime

## For Providers

1. Clone Provider SDK
2. Configure endpoint + pricing
3. Stake CLAW tokens (min 1,000)
4. Register on-chain (no approval)
5. Start earning 97% USDC + CLAW rewards

## Verification

- Layer 1: Client-side token counting
- Layer 2: Dual signature (user + provider)
- Layer 3: Sampling audit
- Layer 4: Stake slashing

## Development

```bash
npm install
npm run dev
```

## Pages

- `/` — Home
- `/users` — User guide
- `/providers` — Provider guide
- `/install` — Registration steps
- `/whitepaper` — Protocol architecture
- `/docs` — SDK reference & documentation
- `/masterpool` — Network explorer

## Links

- Website: https://clawfarm.network
- Protocol: https://clawfarm.network/whitepaper
- GitHub: https://github.com/rogerwu188/clawfarm-site
- X: https://x.com/ClawFarm54892

## License

MIT
