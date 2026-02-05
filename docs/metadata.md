# Token metadata (name/symbol/logo)

## Why name/symbol sometimes don't show up
SPL token mints do **not** store name/symbol directly. Wallets/DEX UIs typically display these via:
- Metaplex Token Metadata (recommended)
- Third-party token lists / indexers

## This repo's approach
- We keep a simple placeholder logo at `assets/logo.svg`.
- We keep a draft JSON metadata template at `assets/token_metadata.json`.

## Next step (after launch)
1) Host the logo + metadata JSON at stable public URLs (IPFS/Arweave preferred).
2) Set Metaplex metadata for the mint.

## Notes
- Many UIs prefer PNG (512x512). SVG may work but is less universally supported.
- Do not include private wallet addresses in metadata.
