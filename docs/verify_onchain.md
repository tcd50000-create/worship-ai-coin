# Verify On-Chain (Solscan)

Quick link bundle: see `docs/solscan_links.md`.

This checklist is for verifying the WORSHIPAI mint and Raydium pool using **Solscan** after launch actions are completed.

Safety note (anti-scam):

- Only trust **direct** links to `https://solscan.io/...`.
- Ignore DMs/“support” messages asking you to connect a wallet or sign anything to “verify” a token/pool.

> Guardrail: keep this doc **operator-agnostic**.
> 
> - It is OK for this repo to publish **verifiable proof identifiers** (mint / pool / tx signatures) via `web/data.json` and `docs/solscan_links.md`.
> - Do **not** publish **operator wallet addresses**, seed phrases, private keys, API keys, or any other sensitive data.

## What you should capture during launch

Record these identifiers. Split them into **public proofs** vs **private operator details**:

Public proofs (safe to publish in this repo, and should remain consistent across docs + dashboard):

- Mint address
- Create-mint txid (or the first txid that created the mint)
- Raydium pool address (or pool id)
- Add-liquidity txid
- LP burn txid (if applicable)

Private operator details (keep out of this repo):

- Signer/operator wallet addresses
- Any “community pool”/treasury **wallet** address if it could be used for impersonation/social engineering
- Anything that could identify or compromise the operator (notes, screenshots, browser data)

## 1) Verify mint basics

On Solscan:

1. Search for the **mint address**.
2. Use these Solscan “breadcrumbs” to find the right views:
   - **Token page → Overview**: name, symbol, decimals, supply.
   - **Token page → Holders**: distribution sanity check (top holders, LP/AMM accounts).
   - **Token page → Transfers / Transactions**: early activity should match your launch timeline.
   - **Token page → Metadata** (if shown): confirm the on-chain/off-chain metadata pointers align with your plan.
3. Confirm:
   - **Token name / symbol** match expectations.
   - **Decimals** match `docs/launch_parameters.md`.
   - **Total supply** matches the issuance plan (see `docs/issuance_plan.md`).

Notes:

- If supply looks “wrong”, check whether Solscan is displaying **UI supply** (human-readable) versus raw base units.
- Decimals must be correct; if decimals are wrong, everything downstream (price, balances) will look wrong.

## 2) Verify the pool exists and points to the right mint

The main goal here is to prove that the **canonical pool address you publish** (in `web/data.json` + `docs/solscan_links.md`) actually corresponds to the WORSHIPAI trading pair you intend.

On Solscan:

1. Open the **pool address** (or open it from Raydium’s “view on explorer” link).
2. Use these Solscan “breadcrumbs” to validate you are looking at a pool **account**:
   - **Account page → Overview**: should show an **Owner / Program** (some Raydium/AMM program).
   - **Account page → Token Accounts** (or similar): the pool should control token accounts for the pair.
   - **Account page → Transactions**: initialization activity should be near launch time.
3. Confirm the pair is correct by checking the pool’s token accounts include:
   - the WORSHIPAI mint (base)
   - the intended quote asset (e.g., wSOL / USDC), per `docs/launch_parameters.md`
4. Cross-check via Raydium UI:
   - Open the WORSHIPAI pair on Raydium.
   - Find the “AMM ID / Pool ID” shown by Raydium for that pair.
   - Confirm it exactly matches the **pool address** you publish.

Extra sanity checks:

- A Raydium “pool address” is typically an **account**, not a mint. If you accidentally paste the token mint into this step, the page you land on will look like a *Token* page, not an *Account* page.
- Raydium has multiple pool types/versions; the exact program id may differ. Don’t rely only on “Owner looks familiar” — rely on the **token accounts** and the **Raydium UI AMM ID** matching the published pool address.
- If you see multiple similarly-named pools, treat the *pool address you publish* as canonical and keep it consistent across `web/data.json` and `docs/solscan_links.md`.

## 3) Verify liquidity add transaction

1. Open the **add-liquidity txid** on Solscan.
2. Confirm:
   - the signer(s) match your expected operator wallet(s) (**do not publish wallet addresses in this repo**)
   - token amounts are consistent with the planned initial liquidity
   - there are no unexpected extra instructions (e.g., random program interactions)

## 4) Verify LP burn (if you burn LP tokens)

> Burning LP is a human-signed action; this doc only describes how to verify it.

1. Open the **LP burn txid** on Solscan.
2. Confirm the instruction indicates a burn (or transfer to an irrecoverable address, depending on method).
3. Confirm the LP token amount burned matches what you intended.

If you cannot clearly interpret the transaction:

- Do not claim “LP burned” publicly.
- Ask another human to verify the tx interpretation.

## 5) Verify community pool / treasury token balance

If you maintain a community pool/treasury token account:

1. Open the token account address on Solscan.
2. Confirm the **token balance** matches what you intended.
3. Confirm the funding txid(s) and timestamps.

## 6) Sanity checks (common failure modes)

- Wrong mint: pool created against a different mint with a similar name.
- Wrong decimals: UI shows confusing numbers; confirm decimals first.
- “Phantom” liquidity: user looks at the wrong pool (Raydium has multiple pools).
- Misread burn: a transfer is not a burn; verify the instruction type.

## Minimal public proof bundle (suggested)

When you do share proofs publicly, keep it simple and link-only:

- Mint (Solscan link)
- Pool (Solscan link)
- Create-mint tx (Solscan link)
- Liquidity add tx (Solscan link)
- LP burn tx (Solscan link), only if confidently verified

Avoid screenshots that may leak browser extensions, bookmarks, or personal data.
