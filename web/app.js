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

  const setBadge = (id, state, text) => {
    const node = el(id);
    if (!node) return;

    node.classList.remove("ok", "warn", "missing");
    if (state) node.classList.add(state);
    node.textContent = text;
  };

  const shortId = (v) => {
    const s = String(v);
    // Solana addresses/tx sigs are long; show a readable short form.
    if (s.length <= 14) return s;
    return `${s.slice(0, 6)}…${s.slice(-6)}`;
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
      a.textContent = shortId(v);
      a.title = v;

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

  const buildProofBundleMarkdown = () => {
    const lines = [];
    lines.push(`WORSHIPAI proof bundle (Solscan)`);

    const add = (label, url) => {
      if (isMissing(url)) return;
      lines.push(`- ${label}: ${url}`);
    };

    if (!isMissing(onchain.mint_address)) add("Token mint", solscan.token(onchain.mint_address));
    if (!isMissing(onchain.amm?.pool_address)) add("Raydium pool", solscan.address(onchain.amm.pool_address));

    if (!isMissing(onchain.tx?.create_mint_tx)) add("Create mint tx", solscan.tx(onchain.tx.create_mint_tx));
    if (!isMissing(onchain.tx?.add_liquidity_tx)) add("Add liquidity tx", solscan.tx(onchain.tx.add_liquidity_tx));

    if (!isMissing(onchain.lp?.lp_mint)) add("LP mint", solscan.token(onchain.lp.lp_mint));
    if (!isMissing(onchain.lp?.burn_address)) add("LP burn address", solscan.address(onchain.lp.burn_address));
    if (!isMissing(onchain.lp?.burn_tx)) add("LP burn tx", solscan.tx(onchain.lp.burn_tx));

    if (!isMissing(data.updated_at)) lines.push(`\nUpdated: ${data.updated_at}`);

    return lines.join("\n");
  };

  const wireCopyProofBundle = () => {
    const btn = el("copy_proof_md");
    if (!btn) return;

    btn.addEventListener("click", async () => {
      try {
        await copyText(buildProofBundleMarkdown());
        btn.textContent = "Copied";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy bundle";
          btn.classList.remove("copied");
        }, 1200);
      } catch (err) {
        console.error(err);
        btn.textContent = "Failed";
        setTimeout(() => {
          btn.textContent = "Copy bundle";
        }, 1200);
      }
    });
  };

  // Lightweight status badges (presence-based; still verify independently via Solscan links below).
  setBadge(
    "b_mint",
    isMissing(onchain.mint_address) ? "missing" : "ok",
    isMissing(onchain.mint_address) ? "Mint: missing" : "Mint: set"
  );

  setBadge(
    "b_pool",
    isMissing(onchain.amm?.pool_address) ? "missing" : "ok",
    isMissing(onchain.amm?.pool_address) ? "Pool: missing" : "Pool: set"
  );

  // LP burn is considered present only when we have the canonical burn address + burn tx.
  const hasLpBurn = !isMissing(onchain.lp?.burn_address) && !isMissing(onchain.lp?.burn_tx);
  setBadge(
    "b_lp_burn",
    hasLpBurn ? "ok" : "missing",
    hasLpBurn ? "LP burn: set" : "LP burn: missing"
  );

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

  wireCopyProofBundle();
}

load();
