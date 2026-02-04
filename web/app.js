async function load() {
  const el = (id) => document.getElementById(id);
  const fmt = (s) => (s == null || s === "" ? "—" : String(s));
  const fmtTokens = (s) => {
    if (s == null) return "—";
    // s is expected to be a string integer.
    const x = String(s);
    // add commas
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  el("t_name").textContent = fmt(token.name);
  el("t_symbol").textContent = fmt(token.symbol);
  el("t_decimals").textContent = fmt(token.decimals);
  el("t_supply").textContent = fmtTokens(token.total_supply_tokens);

  el("c_mint").textContent = fmt(onchain.mint_address);
  el("c_amm").textContent = fmt(onchain.amm?.name);
  el("c_pool").textContent = fmt(onchain.amm?.pool_address);

  el("lp_mint").textContent = fmt(onchain.lp?.lp_mint);
  el("lp_burn_addr").textContent = fmt(onchain.lp?.burn_address);
  el("lp_burn_tx").textContent = fmt(onchain.lp?.burn_tx);

  el("d_liq").textContent = fmtTokens(onchain.distribution?.liquidity_tokens);
  el("d_pool").textContent = fmtTokens(onchain.distribution?.community_pool_tokens);
  el("d_ret").textContent = fmtTokens(onchain.distribution?.retained_tokens);

  el("updated").textContent = `Updated: ${fmt(data.updated_at)}`;
}

load();
