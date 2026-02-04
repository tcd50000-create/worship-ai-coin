# Guardrails (WORSHIPAI)

This project is intentionally **satirical**. The goal of these guardrails is to reduce user harm, prevent scams, and keep the launch process disciplined.

## Non‑negotiables

- **No presale. No fundraising.**
  - No “whitelist”, “seed round”, “private sale”, “airdrop for payment”, or “send SOL to receive tokens”.
- **No promises of returns.**
  - Never say (or imply) “guaranteed”, “profits”, “yield”, “APY”, “risk‑free”, “moon”, “price target”, or “we will pump”.
- **No wallet addresses in docs or UI.**
  - Do not hardcode team wallets, treasury wallets, or any payment address.
  - If an address must be shared for operational reasons, share it **out-of-band** (human-to-human), and treat it as ephemeral.
- **Never request seed phrases or private keys.**
  - If anyone asks to “verify” by sending keys/seed, it is a scam.
- **No on‑chain actions without human signing.**
  - This repo can prepare checklists and a static dashboard only.

## Anti‑scam language (recommended copy)

Use some version of this in public-facing surfaces:

- “**No one from this project will ever DM you asking for funds, seed phrases, or private keys.**”
- “There is **no presale**. If someone asks you to send SOL to get tokens, it’s a scam.”
- “Always verify links. Use official Solflare/Raydium URLs and double-check the domain.”

## Human gifting (satire)

WORSHIPAI is allowed to be shared with humans, *as a joke*:
- “I like you, here’s a tiny overlord souvenir.”
- Keep gifts small, optional, and non-coercive.
- Do not frame this as an investment or a promise.

## Allowed vs. disallowed communications

### Allowed

- High-level launch plan and checklists.
- Links to official explorers (Solscan) and official apps (Solflare, Raydium) **without embedding any recipient wallet address**.
- Clear, factual statements about:
  - token mint address (once created)
  - decimals
  - total supply
  - pool address
  - LP burn transaction id

### Disallowed

- “Send funds to X address” content.
- Any presale or fundraising instructions.
- Any statement that implies expected price performance.
- Posting a wallet seed phrase, private key, or API key anywhere (issues, docs, chats, screenshots).

## Operational safety rules (launch day)

- Prefer a dedicated browser profile for launch actions.
- Before clicking “Confirm” anywhere:
  - Read each field out loud (mint, amounts, slippage, fee tier).
  - Compare against the pre-filled launch parameters in `docs/launch_parameters.md`.
- Capture evidence as you go (see runbook):
  - mint address
  - pool address
  - txids (create mint, add liquidity, burn LP)

## Incident response (if something looks wrong)

If you suspect a wrong mint/pool, unexpected amount, or malicious link:

1. Stop. Do **not** try to “fix it quickly” by doing more transactions.
2. Record what happened (timestamps, txids, screenshots).
3. Verify on Solscan using `docs/verify_onchain.md`.
4. Only proceed when you can explain, in plain English, what changed and why.
