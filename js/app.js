/* A2 Course — rendering, exercises and American-English text-to-speech */
(() => {
  const app = document.getElementById("app");
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const plain = h => h.replace(/<[^>]+>/g, "");

  /* ───────── Audio engine ───────── */
  const synth = window.speechSynthesis;
  let voices = [], chosen = null, rate = 0.92, token = 0, activeBtn = null;
  const SPEEDS = [["Slow", 0.75], ["Normal", 0.92], ["Fast", 1.05]];
  let speedIdx = 1;

  // Higher score = more natural American voice
  const score = v => {
    const n = v.name.toLowerCase(); let s = 0;
    if (!/^en[-_]us$/i.test(v.lang.replace("_", "-")) ) return -1;
    if (/natural|neural|online/.test(n)) s += 100;           // Edge neural voices
    if (/google us english/.test(n)) s += 80;                // Chrome / Android
    if (/aria|jenny|guy|ava|andrew|emma|brian|michelle|steffan|ana/.test(n)) s += 70;
    if (/samantha|allison|ava|nicky|evan|zoe|tom|alex/.test(n)) s += 60; // Apple
    if (/zira|david|mark/.test(n)) s += 30;                  // Windows basic
    if (/female/.test(n)) s += 2;
    if (v.localService === false) s += 5;
    return s;
  };
  const isFemale = v => /aria|jenny|ava|emma|michelle|ana|samantha|allison|nicky|zoe|zira|female|google us english/i.test(v.name);

  function loadVoices() {
    voices = (synth ? synth.getVoices() : []).filter(v => score(v) >= 0).sort((a, b) => score(b) - score(a));
    if (!voices.length) voices = (synth ? synth.getVoices() : []).filter(v => /^en/i.test(v.lang));
    const sel = document.getElementById("voice-select");
    const saved = localStorage.getItem("a2voice");
    chosen = voices.find(v => v.name === saved) || voices[0] || null;
    sel.innerHTML = voices.length
      ? voices.map(v => `<option value="${esc(v.name)}"${chosen && v.name === chosen.name ? " selected" : ""}>${esc(v.name.replace(/Microsoft |Google /, ""))}</option>`).join("")
      : `<option>Default voice</option>`;
  }
  if (synth) { loadVoices(); synth.onvoiceschanged = loadVoices; }
  document.getElementById("voice-select").addEventListener("change", e => {
    chosen = voices.find(v => v.name === e.target.value) || chosen;
    localStorage.setItem("a2voice", chosen.name);
    speak("This is how I sound. Let's learn English together.");
  });
  document.getElementById("speed-btn").addEventListener("click", e => {
    speedIdx = (speedIdx + 1) % SPEEDS.length; rate = SPEEDS[speedIdx][1]; e.target.textContent = SPEEDS[speedIdx][0];
  });

  // second voice for dialogues (opposite gender when possible)
  function altVoice() {
    if (!chosen) return null;
    const want = !isFemale(chosen);
    return voices.find(v => v !== chosen && isFemale(v) === want && score(v) >= 30) || null;
  }
  const clean = t => t.replace(/_{2,}/g, "…").replace(/\bPE\b/g, "P E").replace(/\bp\.m\./gi, "p m").replace(/\ba\.m\./gi, "a m").replace(/\bMr\b/g, "Mister").replace(/\bMrs\b/g, "Missus");
  const sentences = t => clean(t).match(/[^.!?]+[.!?]+["')]*|[^.!?]+$/g) || [clean(t)];

  function stop() { token++; if (synth) synth.cancel(); if (activeBtn) activeBtn.classList.remove("playing"); activeBtn = null; }

  // parts: [{text, voice, pitch}]
  function playParts(parts, btn) {
    if (!synth) return toast("Audio is not supported in this browser. Try Chrome, Edge or Safari.");
    stop(); const my = token; activeBtn = btn || null; if (btn) btn.classList.add("playing");
    synth.resume();
    const queue = [];
    parts.forEach(p => sentences(p.text).forEach(s => queue.push({ ...p, text: s.trim() })));
    let i = 0;
    const next = () => {
      if (my !== token) return;
      if (i >= queue.length) { if (btn) btn.classList.remove("playing"); activeBtn = null; return; }
      const q = queue[i++], u = new SpeechSynthesisUtterance(q.text);
      u.lang = "en-US"; if (q.voice || chosen) u.voice = q.voice || chosen;
      u.rate = rate; u.pitch = q.pitch || 1; u.volume = 1;
      u.onend = () => setTimeout(next, q.gap ?? 180);
      u.onerror = () => setTimeout(next, 50);
      synth.speak(u);
    };
    next();
  }
  const speak = (t, btn) => playParts([{ text: t }], btn);
  function toast(msg) { const d = document.createElement("div"); d.className = "toast"; d.textContent = msg; document.body.appendChild(d); setTimeout(() => d.remove(), 3500); }

  /* ───────── Exercise builders ───────── */
  const norm = s => s.toLowerCase().replace(/[’`]/g, "'").replace(/\s+/g, " ").replace(/\s*,\s*/g, ", ").trim();
  const strip = s => norm(s).replace(/'/g, "");
  const speakBtn = (txt, label = "Listen") => `<button class="say" type="button" data-say="${esc(txt)}" aria-label="${label}" title="${label}">🔊</button>`;

  function gapBlock(ex, uid) {
    const items = ex.items.map((it, i) => {
      let b = 0; const html = esc(it.t).replace(/___/g, () => `<input class="gapin" data-i="${i}" data-b="${b++}" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="answer ${i + 1}">`);
      return `<div class="item" data-gap="${i}">${i + 1}. ${html} <span class="key" hidden></span></div>`;
    }).join("");
    return `<div class="ex-block" data-type="gap" data-ex="${uid}"><div class="ex-title">${esc(ex.title)}</div>${items}${ctrls()}</div>`;
  }
  function mcqBlock(ex, uid) {
    const items = ex.items.map((it, i) => `<div class="item" data-mcq="${i}"><div>${i + 1}. ${esc(it.q)}</div>` +
      it.o.map((o, k) => `<label class="opt"><input type="radio" name="${uid}_${i}" value="${k}"> ${esc(o)}</label>`).join("") + `</div>`).join("");
    return `<div class="ex-block" data-type="mcq" data-ex="${uid}"><div class="ex-title">${esc(ex.title)}</div>${items}${ctrls()}</div>`;
  }
  const ctrls = () => `<button class="btn main" data-act="check" type="button">Check answers</button><button class="btn alt" data-act="show" type="button">Show answers</button><button class="btn alt" data-act="reset" type="button">Try again</button><span class="score" aria-live="polite"></span>`;

  function wire(root, exMap) {
    root.querySelectorAll("[data-say]").forEach(b => b.addEventListener("click", () => speak(b.dataset.say, b)));
    root.querySelectorAll(".ex-block").forEach(block => {
      const ex = exMap[block.dataset.ex], type = block.dataset.type, score = block.querySelector(".score");
      const mark = (show) => {
        let ok = 0;
        if (type === "gap") {
          block.querySelectorAll("[data-gap]").forEach(row => {
            const it = ex.items[+row.dataset.gap], inputs = [...row.querySelectorAll("input")];
            const given = inputs.map(x => x.value).join(", ");
            const good = it.a.split("|").some(a => strip(a) === strip(given));
            const keyEl = row.querySelector(".key");
            if (show && !good) { const first = it.a.split("|")[0].split(", "); inputs.forEach((x, k) => x.value = first[k] || ""); }
            const fine = show ? true : good; if (good) ok++;
            inputs.forEach(x => { x.classList.toggle("ok", fine); x.classList.toggle("no", !fine); });
            keyEl.hidden = true;
            if (show) { keyEl.hidden = false; keyEl.textContent = "✔ " + it.a.split("|")[0]; }
          });
        } else {
          block.querySelectorAll("[data-mcq]").forEach(row => {
            const it = ex.items[+row.dataset.mcq], sel = row.querySelector("input:checked");
            row.querySelectorAll(".opt").forEach((l, k) => {
              l.classList.remove("ok", "no");
              if (show && k === it.a) l.classList.add("ok");
              if (!show && l.querySelector("input").checked) l.classList.add(+sel.value === it.a ? "ok" : "no");
            });
            if (show) row.querySelectorAll("input")[it.a].checked = true;
            if (sel && +sel.value === it.a) ok++;
          });
        }
        if (!show) score.textContent = `${ok} / ${ex.items.length}` + (ok === ex.items.length ? " 🎉 Excellent!" : " — check the red answers and try again.");
        else score.textContent = "";
      };
      block.addEventListener("click", e => {
        const a = e.target.dataset.act; if (!a) return;
        if (a === "check") mark(false);
        if (a === "show") mark(true);
        if (a === "reset") { block.querySelectorAll("input").forEach(x => { x.value = x.type === "radio" ? x.value : ""; x.checked = false; x.classList.remove("ok", "no"); });
          block.querySelectorAll(".opt").forEach(o => o.classList.remove("ok", "no")); block.querySelectorAll(".key").forEach(k => k.hidden = true); score.textContent = ""; }
      });
    });
  }

  /* ───────── Pages ───────── */
  function navHtml(cur) {
    document.getElementById("topnav").innerHTML = UNITS.map(u =>
      `<a href="#/unit/${u.n}" id="nav-u${u.n}" class="${u.n === cur ? "active" : ""}" title="Unit ${u.n}: ${esc(u.title)}">${u.n}</a>`).join("");
  }

  function home() {
    navHtml(0); document.title = "A2 English Course — 8 Units | CEFR Elementary EFL Coursebook";
    app.innerHTML = `
      <section class="hero"><h1>A2 English Course</h1>
      <p>Eight units for CEFR A2 learners — from the past simple to the present perfect. Every unit has seven numbered sections: vocabulary &amp; collocations, grammar, practice, listening, reading, speaking and writing.</p></section>
      <div class="grid">${UNITS.map(u => `<a class="ucard" id="card-u${u.n}" href="#/unit/${u.n}"><span class="num">UNIT A2.${u.n}</span><span class="em">${u.emoji}</span>
        <h3>${esc(u.title)}</h3><small>${esc(u.topic)}</small><span class="gram">📘 ${esc(u.grammarName)}</span></a>`).join("")}</div>`;
  }

  function unit(n) {
    const u = UNITS[n - 1]; if (!u) return home();
    navHtml(n); document.title = `Unit ${n}: ${u.title} — A2 English Course`;
    const exMap = {}; let uid = 0;
    const S = (k, title, body) => `<section class="sec" id="s-${n}-${k}"><h2><span class="sec-num">A2.${n}.${k}</span>${title}</h2>${body}</section>`;
    const qBlock = (qs, title, id) => { const e = { title, items: qs }; exMap[id] = e; return mcqBlock(e, id); };

    const vocab = S(1, "Vocabulary &amp; Collocations", `<p>Listen and repeat. Notice which words go together.</p><div class="vocab">${u.vocab.map(([w, ex]) =>
      `<div class="vitem">${speakBtn(w + ". " + ex)}<div><b>${esc(w)}</b><p>${esc(ex)}</p></div></div>`).join("")}</div>`);

    const gram = S(2, `Grammar: ${esc(u.grammarName)}`, u.grammar.rules.map(r => `<div class="rule">${r}</div>`).join("") +
      `<div class="ex-title">Listen to the examples</div><div class="examples">${u.grammar.examples.map(e => `<div class="ex">${speakBtn(e)}<span>${esc(e)}</span></div>`).join("")}</div>`);

    const prac = S(3, "Practice", u.practice.map(ex => { const id = `e${uid++}`; exMap[id] = ex; return ex.type === "gap" ? gapBlock(ex, id) : mcqBlock(ex, id); }).join(""));

    const L = u.listening;
    const who = [...new Set(L.lines.map(l => l[0]))];
    const lis = S(4, "Listening", `<p><b>${esc(L.title)}</b> Press play, listen, then answer.</p>
      <button class="btn main" id="play-dialog-${n}" type="button">▶ Play dialogue</button><button class="btn alt" id="stop-${n}" type="button">■ Stop</button>
      ${qBlock(L.qs, "Choose the correct answer.", "lq")}
      <details class="tscript"><summary>Show audio script</summary><div class="dialog">${L.lines.map(([s, t]) =>
        `<div class="line"><span class="who ${who.indexOf(s) ? "b" : "a"}">${esc(s)}</span><div class="bubble">${esc(t)}</div>${speakBtn(t)}</div>`).join("")}</div></details>`);

    const R = u.reading;
    const rd = S(5, "Reading", `<h3>${esc(R.title)}</h3><button class="btn main" id="play-read-${n}" type="button">🔊 Listen to the text</button>
      <div class="reading">${R.text.map(p => `<p>${esc(p)}</p>`).join("")}</div>${qBlock(R.qs, "True or False?", "rq")}`);

    const sp = S(6, "Speaking", `<p>Work with a partner.</p><ul class="talk">${u.speaking.map(s => `<li>${esc(s)}</li>`).join("")}</ul>`);

    const wr = S(7, "Writing", `<p class="write-task"><b>Task:</b> ${esc(u.writing.task)}</p><textarea id="write-${n}" placeholder="Write here…" aria-label="Your writing"></textarea>
      <div class="wc" id="wc-${n}">0 words</div><details class="model"><summary><b>Show a model answer</b></summary><p>${esc(u.writing.model)}</p>${speakBtn(u.writing.model, "Listen to model")}</details>`);

    app.innerHTML = `<header class="unit-head"><div class="tag">UNIT A2.${n} ${u.emoji}</div><h1>${esc(u.title)}</h1><div>${esc(u.topic)} · <b>${esc(u.grammarName)}</b></div>
      <ul>${u.goals.map(g => `<li>${esc(g)}</li>`).join("")}</ul></header>${vocab}${gram}${prac}${lis}${rd}${sp}${wr}
      <div class="pager">${n > 1 ? `<a class="btn alt" id="prev" href="#/unit/${n - 1}">← Unit ${n - 1}</a>` : `<a class="btn alt" href="#/">← Home</a>`}
      ${n < UNITS.length ? `<a class="btn main" id="next" href="#/unit/${n + 1}">Unit ${n + 1} →</a>` : `<a class="btn main" href="#/">Home</a>`}</div>`;

    wire(app, exMap);
    document.getElementById(`stop-${n}`).onclick = stop;
    document.getElementById(`play-dialog-${n}`).onclick = e => {
      const alt = altVoice(), vs = [chosen, alt];
      playParts(L.lines.map(([s, t]) => { const k = who.indexOf(s) % 2; return { text: t, voice: vs[k] || chosen, pitch: alt ? 1 : (k ? 0.8 : 1.12), gap: 450 }; }), e.currentTarget);
    };
    document.getElementById(`play-read-${n}`).onclick = e => playParts(R.text.map(t => ({ text: t, gap: 300 })), e.currentTarget);
    const ta = document.getElementById(`write-${n}`), wc = document.getElementById(`wc-${n}`);
    ta.value = localStorage.getItem("a2w" + n) || ""; const upd = () => { wc.textContent = (ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0) + " words"; localStorage.setItem("a2w" + n, ta.value); };
    ta.oninput = upd; upd(); window.scrollTo(0, 0);
  }

  function route() {
    stop();
    const m = location.hash.match(/#\/unit\/(\d+)/);
    m ? unit(+m[1]) : home();
  }
  window.addEventListener("hashchange", route);
  route();
})();
