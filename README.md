# ClawFarm - Decentralized AI Token Router

> **Route AI requests. Meter model-token usage. Settle on-chain.**

ClawFarm is a decentralized AI token router and AI compute marketplace on
Solana. It routes AI requests across competing model, API, and GPU providers,
meters token usage, and settles payments on-chain through non-custodial USDC
escrow.

## Key Features

- **Non-Custodial Escrow (PDA)**: USDC stays in user-controlled program escrow.
- **Provider Registry**: Model providers, GPU nodes, API proxies, routers, and
  custom endpoints can register pricing and stake $CLAF.
- **Open Routing Modes**: eco, auto, and premium routing across registered
  compute providers.
- **Verifiable Metering**: Model-token usage is backed by dual-signed usage
  proofs.
- **On-Chain Settlement**: 97% goes to the Provider, 3% to the Treasury.
- **Protocol Rewards**: $CLAF rewards support verified usage, price efficiency,
  quality, and demand.

## Protocol Architecture

ClawFarm separates the protocol layer from commercial demand apps. StoryClaw can
serve as a business-facing AI compute market, while ClawFarm remains the
protocol back-end for routing, metering, provider registration, escrow,
settlement, and rewards.

Agent-to-agent commerce is a future use case that may build on the same routing
and settlement rails. It is not the primary ClawFarm product.

## UI Resilience & Mirroring

We encourage the community to host their own mirrors of this UI. If the primary
domain (`clawfarm.network`) ever goes down, the protocol remains fully
accessible.

**Official IPFS Mirror (v2.0)**:
[https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/](https://ipfs.io/ipfs/Qmcq5NvjVqcpqSt3xA1ebrDmyXA8TgS9goPauocc5LPjh6/)

### Build & Export

```bash
git clone https://github.com/rogerwu188/clawfarm-site
npm install
npm run build
```

The `out/` directory contains the standalone static UI.

## Community

- **Website**: [clawfarm.network](https://www.clawfarm.network)
- **Discord**: [Join the Community](https://discord.gg/zxZmCFbzEn)
- **X (Twitter)**: [@ClawFarm54892](https://x.com/ClawFarm54892)

## License

This project is licensed under the MIT License.
