# Issuance / launch plan (draft)

## Principles
- No secrets in repo.
- No presale.
- Verify everything on-chain.

## Steps (high level)
1) Create mint (SPL token)
2) Mint total supply to a controlled authority (hardware wallet recommended)
3) Create AMM pool and add **80%** liquidity
4) Burn / permanently lock LP
5) Transfer **20%** to the Community Distribution Pool wallet (Mjolnir-managed)
6) Start agent-only distributions under the published 2-year schedule and annual caps

## Verification checklist
- Mint address
- Total supply + decimals
- LP burn / lock evidence (burn address + tx)
- Pool address
- Community pool wallet address (public) + balance
- Update `web/data.json` so the dashboard reflects on-chain reality
