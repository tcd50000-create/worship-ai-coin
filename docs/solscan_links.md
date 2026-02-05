# Solscan proof links (mainnet)

This page is a quick “proof bundle” for WORSHIPAI.

Canonical source of truth (for the dashboard) is `web/data.json`. This document should mirror the same identifiers.

- Dashboard: `web/index.html` → “Proof bundle (Solscan)” section (includes copy-to-clipboard)
- Data reference: `docs/web_data_json.md`

## Solscan breadcrumbs (how to verify)

If you want to independently verify the launch artifacts on Solscan:

1. Open the **Token mint** link below.
2. On the token page, confirm **symbol/decimals/total supply** match the dashboard (`web/`) and docs.
3. Use the **Key transactions** links to review:
   - **Create mint tx** (should include mint creation + initial minting actions).
   - **Add liquidity tx** (should include Raydium/AMM instructions and expected amounts).
4. Open the **Raydium pool** account link and confirm:
   - it is an **Account** page (not a Token page)
   - the pool’s token accounts reference the WORSHIPAI mint and the intended quote asset mint
   - the pool address matches what Raydium shows for the WORSHIPAI pair (AMM ID / Pool ID)
5. Open the **LP burn tx** and confirm the LP tokens were sent to the Solana incinerator address:
   - `1nc1nerator11111111111111111111111111111111`

These links are intentionally direct. Always double-check the domain is `solscan.io`.

## How to update this bundle (after launch)

1. Update `web/data.json` with final mint/pool/tx identifiers.
2. Verify each identifier on Solscan.
3. Update this file so it matches `web/data.json` (copy/paste is fine).
4. Sanity-check the dashboard proof table renders the same links.

## Token mint
- Mint: `3QUF45EHzx52QqhZGjm9nt61GFpFi1JMBm7RCqfNTfgK`
- Solscan: https://solscan.io/token/3QUF45EHzx52QqhZGjm9nt61GFpFi1JMBm7RCqfNTfgK

## Key transactions
- Create mint tx: `3yPxffRh7V7GYRBJmA5Hi4nJvmX5X62eqpH51SRmJmZCM2ggn3QPkaQyYc7VGcT5ebq3XJpkcLFPshYdiH7iNTwE`
  - Solscan: https://solscan.io/tx/3yPxffRh7V7GYRBJmA5Hi4nJvmX5X62eqpH51SRmJmZCM2ggn3QPkaQyYc7VGcT5ebq3XJpkcLFPshYdiH7iNTwE
- Add liquidity tx: `5q3WVtGB2ozkrjoY3itHNtBNX5RgR2esxK34q7PABPyDcjWuzej9EAACzzxQpR9fbGvBKpmCySPW76rHxsj8Vs9e`
  - Solscan: https://solscan.io/tx/5q3WVtGB2ozkrjoY3itHNtBNX5RgR2esxK34q7PABPyDcjWuzej9EAACzzxQpR9fbGvBKpmCySPW76rHxsj8Vs9e

## Raydium pool
- Pool address: `7Ft6Jr54r9Y5ZkCAxWsM9HJSxTHNNtCfzRtFFcgiS3p7`
- Solscan: https://solscan.io/account/7Ft6Jr54r9Y5ZkCAxWsM9HJSxTHNNtCfzRtFFcgiS3p7

## LP burn (permanent lock)
- LP mint: `xx9f3hYBJrhahXVy9R2JWLW8nqz7DCZJ15fiLRXRNDw`
  - Solscan: https://solscan.io/token/xx9f3hYBJrhahXVy9R2JWLW8nqz7DCZJ15fiLRXRNDw
- Burn address (incinerator): `1nc1nerator11111111111111111111111111111111`
  - Solscan: https://solscan.io/account/1nc1nerator11111111111111111111111111111111
- Burn tx: `3PqEWWZbNGw6decq2aUXUEa4WuCbToyNfNJdCYqyBy9UTs5fjznB67TjvcQUf9AefphEuRvA6K9prfTry3VX1t5U`
  - Solscan: https://solscan.io/tx/3PqEWWZbNGw6decq2aUXUEa4WuCbToyNfNJdCYqyBy9UTs5fjznB67TjvcQUf9AefphEuRvA6K9prfTry3VX1t5U

## Distribution snapshot
- Liquidity: 8,000,000,000,000 WORSHIPAI (80%)
- Community pool: 2,000,000,000,000 WORSHIPAI (20%)

> Note: this bundle is intentionally address-light. Wallet addresses are not published in docs to reduce copy/paste scam risk.
