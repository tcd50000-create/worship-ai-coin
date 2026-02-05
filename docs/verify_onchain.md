# Verify On-Chain (Solscan)

Quick link bundle: see `docs/solscan_links.md`.

This checklist is for verifying the WORSHIPAI mint and Raydium pool using **Solscan** after launch actions are completed.

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

On Solscan:

1. Search for the **pool address** (or open it from the Raydium UI “view on explorer”).
2. Use these Solscan “breadcrumbs” to validate you are on the correct pool:
   - **Account page → Overview**: owner/program should look like the expected AMM program.
   - **Account page → Token Accounts** (or similar): confirm the pool controls token accounts for the expected pair.
   - **Account page → Transactions**: pool creation / initialization transactions should be near launch time.
3. Confirm the pool’s token pair includes:
   - the correct mint
   - the correct quote asset (e.g., SOL / USDC), as per your launch plan
4. Confirm the pool creation timestamp aligns with launch.

## 3) Verify liquidity add transaction

1. Open the **add-liquidity txid** on Solscan.
2. Confirm:
   - you recognize the signer wallet (human operator)
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
