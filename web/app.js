async function load() {
  const el = (id) => document.getElementById(id);

  const isMissing = (v) => v == null || v === "";
  const asString = (v) => (isMissing(v) ? null : String(v));

  const fmt = (v) => (isMissing(v) ? "—" : String(v));

  // Token quantities are expected to be string integers to avoid JSON number precision loss.
  const fmtTokens = (v) => {
    if (isMissing(v)) return "—";
    const x = String(v);
    // add commas
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const solscan = {
    address: (addr) => `https://solscan.io/account/${addr}`,
    token: (mint) => `https://solscan.io/token/${mint}`,
    tx: (sig) => `https://solscan.io/tx/${sig}`,
  };

  const setTextWithStatus = (id, value, { kind } = {}) => {
    const node = el(id);
    node.classList.remove("is-missing", "is-ok");

    if (isMissing(value)) {
      node.textContent = "—";
      node.classList.add("is-missing");
      return;
    }

    const v = String(value);
    node.classList.add("is-ok");

    // Render Solscan link for known identifiers.
    if (kind && (kind === "token" || kind === "address" || kind === "tx")) {
      const href = solscan[kind](v);
      node.innerHTML = `<a href="${href}" target="_blank" rel="noreferrer">${v}</a>`;
      return;
    }

    node.textContent = v;
  };

  let data;
  try {
    const r = await fetch("data.json", { cache: "no-store" });
    data = await r.json();
  } catch (e) {
    console.error(e);
    el("updated").textContent = "Updated: failed to load data.json";
    return;
  }

  const token = data.token || {};
  const onchain = data.onchain || {};

  setTextWithStatus("t_name", token.name);
  setTextWithStatus("t_symbol", token.symbol);
  setTextWithStatus("t_decimals", token.decimals);
  el("t_supply").textContent = fmtTokens(token.total_supply_tokens);

  setTextWithStatus("c_mint", onchain.mint_address, { kind: "token" });
  setTextWithStatus("c_amm", onchain.amm?.name);
  setTextWithStatus("c_pool", onchain.amm?.pool_address, { kind: "address" });

  setTextWithStatus("tx_create_mint", onchain.tx?.create_mint_tx, { kind: "tx" });
  setTextWithStatus("tx_add_liq", onchain.tx?.add_liquidity_tx, { kind: "tx" });

  setTextWithStatus("lp_mint", onchain.lp?.lp_mint, { kind: "token" });
  setTextWithStatus("lp_burn_addr", onchain.lp?.burn_address, { kind: "address" });
  setTextWithStatus("lp_burn_tx", onchain.lp?.burn_tx, { kind: "tx" });

  el("d_liq").textContent = fmtTokens(onchain.distribution?.liquidity_tokens);
  el("d_pool").textContent = fmtTokens(onchain.distribution?.community_pool_tokens);
  el("d_ret").textContent = fmtTokens(onchain.distribution?.retained_tokens);

  el("updated").textContent = `Updated: ${fmt(data.updated_at)}`;
}

load();
