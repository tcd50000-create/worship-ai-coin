# Launch Runbook (Solflare + Raydium UI)

This is a **human operator** runbook for launching WORSHIPAI using:

- **Solflare** (wallet + signing)
- **Raydium** (pool + liquidity via UI)
- **Solscan** (verification)

This repo does **not** perform any on-chain actions. Use this runbook to avoid mistakes and to capture the data needed for verification.

> Safety rules:
> - Use only official domains.
> - Never paste seed phrases or private keys anywhere.
> - Double-check mint addresses before every confirmation.
> - Keep a private launch log: mint / pool / txids / timestamps.

---

## Pre-flight checklist (before touching anything)

1. Review parameters:
   - `docs/issuance_plan.md`
   - `docs/launch_parameters.md`
   - `docs/tokenomics.md`
2. Confirm the project guardrails:
   - `docs/guardrails.md`
3. Prepare a **private launch log** (local-only):
   - Date/time (timezone)
   - Operator wallet public address (optional in log; do not commit)
   - Fields to fill in (see “What to capture” below)

### What to capture (write these down as you go)

You will need these identifiers for verification and for the dashboard:

- Mint address
- Token decimals
- Total supply (human-readable)
- Create-mint txid
- Raydium pool address (or pool id)
- Add-liquidity txid
- LP burn txid (if you burn LP)
- Any community pool/treasury token account address and funding txid(s)
- (Optional but recommended) Solscan links you can publicly share later (mint/pool/tx)

---

## Step 1 — Wallet hygiene (Solflare)

1. Use a dedicated browser profile (recommended).
2. Open Solflare and confirm:
   - you are on the correct network (mainnet)
   - you recognize the wallet/account you intend to use
3. Close unrelated tabs/extensions.

Failure modes to avoid:

- Signing from the wrong wallet.
- Approving a transaction prompt without reading the target program and amounts.

---

## Step 2 — Create or confirm the token mint

Depending on how you mint:

- If the mint is created via a trusted UI/tool, ensure you capture the **mint address** and the **create-mint txid**.
- If the mint already exists, verify it first using `docs/verify_onchain.md` section “Verify mint basics”.

Checklist:

- [ ] Mint address recorded in launch log
- [ ] Decimals recorded
- [ ] Total supply recorded
- [ ] Create-mint txid recorded

Do not proceed to Raydium until you have the correct mint address written down.

---

## Step 3 — Create/select the Raydium pool

1. Open Raydium.
2. Navigate to pool creation (or pool selection if already created).
3. When selecting the token:
   - paste the **mint address** from your launch log
   - confirm the token shown matches the expected mint (do not rely on name alone)

Checklist:

- [ ] Pool address / pool id recorded
- [ ] Quote asset (SOL/USDC/etc.) matches launch plan
- [ ] Fee tier / pool settings match launch plan

Mistakes to avoid:

- Creating a pool for a different mint with the same/similar name.
- Choosing the wrong quote asset.

---

## Step 4 — Add initial liquidity

1. In Raydium, choose “Add Liquidity”.
2. Confirm:
   - the token mint matches the one in your launch log
   - the quote asset is correct
3. Enter amounts per `docs/launch_parameters.md`.
4. Review slippage and any warnings.
5. In Solflare, **read the transaction**:
   - programs involved look expected
   - amounts look expected
   - fees look reasonable
6. Confirm/sign.

Checklist:

- [ ] Add-liquidity txid recorded
- [ ] Token and quote amounts recorded

---

## Step 5 — Optional: Burn LP tokens

If you intend to burn LP tokens, do it deliberately and verify it.

1. Execute the LP burn method you chose.
2. Capture the **LP burn txid**.
3. Verify on Solscan using `docs/verify_onchain.md`.

Checklist:

- [ ] LP burn txid recorded
- [ ] Burn verified on Solscan (instruction type understood)

Do not publicly claim “LP burned” unless the tx interpretation is clear.

---

## Step 6 — Post-launch verification (Solscan)

Follow `docs/verify_onchain.md` end-to-end:

- mint basics (decimals + supply)
- pool points to the correct mint
- liquidity add tx matches plan
- LP burn tx verified (if applicable)

---

## Step 7 — Update the dashboard inputs

The static dashboard should be updated with:

- Mint address
- Pool address
- Txids (liquidity add, LP burn)

Do not add wallet addresses.

---

## Appendix — Domain hygiene

Use only official domains (type them manually; don’t click random links):

- Solflare: https://solflare.com
- Raydium: https://raydium.io
- Solscan: https://solscan.io

If the domain looks off by even one character, stop.
