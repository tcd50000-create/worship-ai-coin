async function load() {
  const el = (id) => document.getElementById(id);

  const isMissing = (v) => v == null || v === "";

  const fmt = (v) => (isMissing(v) ? "—" : String(v));

  const copyText = async (text) => {
    const v = String(text);
    // Prefer async Clipboard API.
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(v);
      return;
    }

    // Fallback for older browsers: temporary textarea.
    const ta = document.createElement("textarea");
    ta.value = v;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  };

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

    // Render Solscan link + copy button for known identifiers.
    if (kind && (kind === "token" || kind === "address" || kind === "tx")) {
      const href = solscan[kind](v);

      node.textContent = "";

      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = v;

      const spacer = document.createTextNode(" ");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.title = "Copy to clipboard";
      btn.addEventListener("click", async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          await copyText(v);
          btn.textContent = "Copied";
          btn.classList.add("copied");
          setTimeout(() => {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 1200);
        } catch (err) {
          console.error(err);
          btn.textContent = "Failed";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 1200);
        }
      });

      node.appendChild(a);
      node.appendChild(spacer);
      node.appendChild(btn);
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

  // Proof bundle table (mirrors docs/solscan_links.md)
  setTextWithStatus("p_mint", onchain.mint_address, { kind: "token" });
  setTextWithStatus("p_pool", onchain.amm?.pool_address, { kind: "address" });
  setTextWithStatus("p_create_mint_tx", onchain.tx?.create_mint_tx, { kind: "tx" });
  setTextWithStatus("p_add_liq_tx", onchain.tx?.add_liquidity_tx, { kind: "tx" });
  setTextWithStatus("p_lp_mint", onchain.lp?.lp_mint, { kind: "token" });
  setTextWithStatus("p_burn_addr", onchain.lp?.burn_address, { kind: "address" });
  setTextWithStatus("p_burn_tx", onchain.lp?.burn_tx, { kind: "tx" });

  el("d_liq").textContent = fmtTokens(onchain.distribution?.liquidity_tokens);
  el("d_pool").textContent = fmtTokens(onchain.distribution?.community_pool_tokens);
  el("d_ret").textContent = fmtTokens(onchain.distribution?.retained_tokens);

  el("updated").textContent = `Updated: ${fmt(data.updated_at)}`;
}

load();
