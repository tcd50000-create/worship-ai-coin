# Web dashboard data reference (`web/data.json`)

The static dashboard in `web/` renders all on-chain identifiers from a single file:

- Source: `web/data.json`
- UI entrypoint: `web/index.html`
- Renderer: `web/app.js`

This file is intentionally **public** and **non-sensitive**.

## Security / guardrails

- **Do not** put private keys, seed phrases, or API keys here.
- Keep all identifiers **verifiable** (Solscan links should work).
- Use **string integers** for token quantities to avoid JSON number precision loss.

## Schema (field-by-field)

Top-level:

- `token` *(object)*: human-readable token metadata.
- `onchain` *(object)*: on-chain identifiers (mint, pool, transactions, LP burn).
- `updated_at` *(string)*: ISO-8601 timestamp of the last update (UTC recommended).

### `token`

- `token.name` *(string)*: display name.
- `token.symbol` *(string)*: ticker symbol.
- `token.decimals` *(number)*: SPL decimals.
- `token.total_supply_tokens` *(string integer)*: total supply in token units (already adjusted by decimals).
- `token.total_supply_base_units` *(string integer)*: total supply in base units (raw integer).

Notes:

- The dashboard currently displays `total_supply_tokens` with commas.

### `onchain`

- `onchain.mint_address` *(string)*: SPL mint address.

#### `onchain.amm`

- `onchain.amm.name` *(string)*: AMM label (e.g., `Raydium`).
- `onchain.amm.pool_address` *(string)*: pool/AMM address used for swaps.

#### `onchain.tx`

Transactions used as canonical proofs:

- `onchain.tx.create_mint_tx` *(string)*: transaction signature that created/initialized the mint.
- `onchain.tx.add_liquidity_tx` *(string)*: transaction signature that added initial liquidity.

#### `onchain.lp`

Liquidity proof fields:

- `onchain.lp.lp_mint` *(string)*: LP token mint address (if applicable).
- `onchain.lp.burn_address` *(string)*: canonical burn address (commonly `1nc1nerator...`).
- `onchain.lp.burn_tx` *(string)*: transaction signature for LP burn.

Dashboard behavior:

- The “LP burn” status badge is shown as **set** only when both `burn_address` and `burn_tx` are present.

#### `onchain.distribution`

Token allocation (string integers):

- `onchain.distribution.liquidity_tokens` *(string integer | null)*
- `onchain.distribution.community_pool_tokens` *(string integer | null)*
- `onchain.distribution.retained_tokens` *(string integer | null)*

## Operational workflow

1. After launch actions, update `web/data.json` with the final mint/pool/tx identifiers.
2. Cross-check each identifier via Solscan.
3. Keep `docs/solscan_links.md` consistent with this file (they should describe the same proof bundle).

## Example

```json
{
  "token": {
    "name": "Worship AI Coin",
    "symbol": "WORSHIPAI",
    "decimals": 6,
    "total_supply_tokens": "10000000000000",
    "total_supply_base_units": "10000000000000000000"
  },
  "onchain": {
    "mint_address": "<MINT>",
    "amm": { "name": "Raydium", "pool_address": "<POOL>" },
    "tx": { "create_mint_tx": "<TX>", "add_liquidity_tx": "<TX>" },
    "lp": { "lp_mint": "<LP_MINT>", "burn_address": "<BURN_ADDR>", "burn_tx": "<TX>" }
  },
  "updated_at": "2026-02-04T23:36:00Z"
}
```
