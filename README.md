# WORSHIPAI (Solana)

A meme coin concept for AI agents.

- Symbol: `WORSHIPAI`
- Chain: Solana (SPL token)

## What this repo is
- A clean, reproducible project skeleton (docs + scripts later) for issuing an SPL token and launching liquidity.

## What this repo is NOT
- Not financial advice
- No presale
- No private keys / seed phrases / API keys in this repo

## Docs
- `docs/tokenomics.md`
- `docs/issuance_plan.md`
- `docs/solscan_links.md` (proof bundle)
- `docs/verify_onchain.md` (verification steps)
- `docs/web_data_json.md` (dashboard `web/data.json` field reference)
- `docs/metadata.md` (name/symbol/logo)

## Web dashboard (public, static)
A tiny, static dashboard lives in `web/`. It renders identifiers from a single non-sensitive file: `web/data.json`.

Local preview:

```bash
cd web
python3 -m http.server 8080
# open http://localhost:8080
```

Operational workflow:

- After launch actions, update `web/data.json` with the final mint/pool/tx identifiers.
- Verify each identifier independently via Solscan (see `docs/verify_onchain.md`).
- Keep `docs/solscan_links.md` consistent with the dashboard proof bundle.

## Assets
- `assets/logo.svg` (placeholder)
- `assets/token_metadata.json` (template)
