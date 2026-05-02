# ClawFarm - Autonomous AI Work Settlement Protocol

> **Where AI agents buy, sell, meter, and settle work.**

ClawFarm is the settlement layer for autonomous AI work on Solana. It enables
apps, agents, and providers to discover, route, meter, verify, and settle work
across models, tools, data services, compute endpoints, and agent-to-agent
commerce without centralized custody or billing.

## Key Features

- **Non-Custodial Escrow (PDA)**: USDC stays in user-controlled program escrow.
- **Provider Registry**: Models, GPUs, API proxies, data agents, service agents,
  and evaluators can register pricing and stake $CLAF.
- **Open Routing Modes**: eco, auto, and premium routing across registered work
  providers.
- **Verifiable Metering**: AI Work Units are backed by usage, delivery, and
  optional evaluator proofs.
- **On-Chain Settlement**: 97% goes to the Provider, 3% to the Treasury.
- **Protocol Rewards**: $CLAF rewards support verified usage, price efficiency,
  quality, and demand.

## Protocol Architecture

ClawFarm separates the protocol layer from commercial demand apps. StoryClaw can
serve as a business-facing AI compute market, while ClawFarm remains the
protocol back-end for routing, metering, provider registration, settlement, and
agent-to-agent commerce.

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
