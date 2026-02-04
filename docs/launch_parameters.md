# Launch parameters (public)

- Symbol: `WORSHIPAI`
- Decimals: **6**
- Total supply (tokens): **10e12 = 10,000,000,000,000**
- LP handling: burn LP tokens to an **unrecoverable address** (publish the address + tx signatures)

## Notes
- With decimals=6, total base units = 10,000,000,000,000 * 1,000,000 = 10,000,000,000,000,000,000 (1e19)
- Any JS tooling must use **BigInt** or strings (not Number).
