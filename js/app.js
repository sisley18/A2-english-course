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
    const all = synth ? synth.getVoices() : [];
    voices = all.filter(v => score(v) >= 0).sort((a, b) => score(b) - score(a));
    if (!voices.length) voices = all.filter(v => /^en/i.test(v.lang));
    const sel = document.getElementById("voice-select");
    const saved = localStorage.getItem("a2voice");
    chosen = voices.find(v => v.name === saved) || voices[0] || null;
    sel.innerHTML = voices.length
      ? voices.map(v => `<option value="${esc(v.name)}"${chosen && v.name === chosen.name ? " selected" : ""}>${esc(v.name.replace(/Microsoft |Google /, ""))}</option>`).join("")
      : `<option value="">American English (Auto)</option>`;
  }
  if (synth) {
    loadVoices();
    synth.onvoiceschanged = loadVoices;
    setTimeout(loadVoices, 300);
    setTimeout(loadVoices, 1000);
    // Mobile unlock on first interaction
    const unlock = () => {
      synth.resume();
      loadVoices();
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("click", unlock, { once: true });
  }
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

  /* ───────── Teacher customisation (stored in this browser; shareable through a link) ───────── */
  const b64e = o => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const b64d = s => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))));
  const T = { local: {}, shared: null };
  try { T.local = JSON.parse(localStorage.getItem("a2teacher") || "{}"); } catch (e) { }
  try { const p = new URLSearchParams(location.search).get("t"); if (p) T.shared = b64d(p); } catch (e) { }
  let teacherOn = sessionStorage.getItem("a2tm") === "1";
  const cfg = () => teacherOn ? T.local : (T.shared || T.local);
  const ucfg = n => (cfg().units || {})[n] || {};
  const saveLocal = () => localStorage.setItem("a2teacher", JSON.stringify(T.local));
  const editU = n => { T.local.units = T.local.units || {}; return (T.local.units[n] = T.local.units[n] || {}); };
  const safe = u => /^https?:\/\//i.test((u || "").trim()) ? u.trim() : "";
  const DEFAULT_VIDEOS = {
    1: [
      { t: "Video Conversation: 'How Was Your Weekend?'", u: "https://www.youtube.com/watch?v=YGFpga2q-gA", d: "Watch the conversation between adults. Notice the past simple verbs (was, had, went, visited) and time expressions." }
    ],
    2: [
      { t: "Video Conversation: Talking About Holidays", u: "https://www.youtube.com/watch?v=LyEqLzL4KWY", d: "Listen to the speakers talk about past vacations. Listen for irregular past forms like took, ate, saw and went." }
    ],
    3: [
      { t: "Video Lesson: Talking About the Past with 'Used To'", u: "https://www.youtube.com/watch?v=yZeCWdZeKUk", d: "Learn how adults talk about childhood memories, habits, and past routines with 'used to'." }
    ],
    4: [
      { t: "Video Story: Past Simple & Past Continuous in Action", u: "https://www.youtube.com/watch?v=rgHYy90qj2w", d: "Watch how when and while link a background situation with a sudden unexpected event." }
    ],
    5: [
      { t: "Video Dialogue: City Life vs Suburbs & Countryside", u: "https://www.youtube.com/watch?v=Xhs6P9pT7TU", d: "Adults comparing living in the city and outside. Notice comparatives (-er, more) and superlatives (the best, the most)." }
    ],
    6: [
      { t: "Video Scene: How to Order Food at a Restaurant", u: "https://www.youtube.com/watch?v=uUMPULuwdLI", d: "Real-life adult restaurant dialogue: booking, ordering starters, main courses, drinks and asking for the bill." }
    ],
    7: [
      { t: "Video Conversation: Talking About Future Plans", u: "https://www.youtube.com/watch?v=79Yxp84s0KI", d: "Notice the difference between 'going to' (intentions), 'will' (predictions/decisions) and present continuous (arrangements)." }
    ],
    8: [
      { t: "Video Conversation: Life Experiences & 'Have you ever...?'", u: "https://www.youtube.com/watch?v=_ftQpEpKOXo", d: "Adults discussing things they have done and haven't done yet using the present perfect and past simple." }
    ]
  };
  const videosOf = n => ucfg(n).videos || DEFAULT_VIDEOS[n] || [];
  function embedHtml(u) {
    let m;
    if ((m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/))) {
      const st = (u.match(/[?&](?:t|start)=(\d+)/) || [])[1];
      return `<div class="vwrap"><iframe src="https://www.youtube-nocookie.com/embed/${m[1]}?rel=0${st ? "&start=" + st : ""}" title="Video scene" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`;
    }
    if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return `<div class="vwrap"><iframe src="https://player.vimeo.com/video/${m[1]}" title="Video scene" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>`;
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(u)) return `<video class="vplain" controls preload="metadata" src="${esc(u)}"></video>`;
    return "";
  }
  function videoSection(n, S) {
    const uc = ucfg(n), list = videosOf(n);
    let body = `<p>Watch the scenes, then talk about them with your partner. Use the grammar and vocabulary from this unit.</p>` +
      (uc.note ? `<div class="tnote">📝 <b>Teacher's note:</b> ${esc(uc.note)}</div>` : "");
    body += list.map((v, i) => { const u = safe(v.u); return `<div class="vcard"><div class="vtitle">🎬 ${esc(v.t || "Video")}</div>${v.d ? `<p class="vdesc">${esc(v.d)}</p>` : ""}${u ? embedHtml(u) : ""}
      <a class="btn alt vopen" href="${esc(u)}" target="_blank" rel="noopener">Open in a new tab ↗</a>` +
      (teacherOn ? `<button class="btn alt" data-vedit="${i}" type="button">✏️ Edit</button><button class="btn alt" data-vdel="${i}" type="button">🗑 Delete</button>` : "") + `</div>`; }).join("");
    if (!list.length) body += `<p><i>No videos yet.</i></p>`;
    if (teacherOn) body += `<div class="tform" id="tform"><h3>🎓 Teacher editor</h3>
      <label>Video title<input id="tv-t" placeholder="e.g. Scene from Friends: What did you do?"></label>
      <label>Link (YouTube, Vimeo, .mp4 or any web page)<input id="tv-u" type="url" placeholder="https://www.youtube.com/watch?v=…"></label>
      <label>Instructions for students<input id="tv-d" placeholder="Watch from 1:20. Which past tense verbs do you hear?"></label>
      <button class="btn main" id="tv-save" type="button">➕ Add video</button><button class="btn alt" id="tv-cancel" type="button" hidden>Cancel edit</button>
      <label>Note for students in this unit<textarea id="tv-note" style="min-height:70px">${esc(uc.note || "")}</textarea></label>
      <label>Picture for the listening activity (image link — leave empty for the default)<input id="tv-img" type="url" value="${esc(uc.img || "")}" placeholder="https://…/picture.jpg"></label>
      <button class="btn main" id="tv-savemeta" type="button">💾 Save note &amp; picture</button><button class="btn alt" id="tv-reset" type="button">↺ Reset this unit</button></div>`;
    return S(8, "Video Scenes &amp; Links", body);
  }
  function wireTeacher(n) {
    const keep = () => { const y = scrollY; route(); scrollTo(0, y); };
    let editing = -1;
    const $ = id => document.getElementById(id);
    app.querySelectorAll("[data-vdel]").forEach(b => b.onclick = () => { const u = editU(n); u.videos = videosOf(n).filter((_, i) => i !== +b.dataset.vdel); saveLocal(); keep(); });
    app.querySelectorAll("[data-vedit]").forEach(b => b.onclick = () => { const v = videosOf(n)[+b.dataset.vedit]; editing = +b.dataset.vedit;
      $("tv-t").value = v.t || ""; $("tv-u").value = v.u || ""; $("tv-d").value = v.d || ""; $("tv-save").textContent = "💾 Save changes"; $("tv-cancel").hidden = false; $("tform").scrollIntoView({ behavior: "smooth" }); });
    if (!$("tv-save")) return;
    $("tv-cancel").onclick = () => { editing = -1; $("tv-t").value = $("tv-u").value = $("tv-d").value = ""; $("tv-save").textContent = "➕ Add video"; $("tv-cancel").hidden = true; };
    $("tv-save").onclick = () => {
      const u = safe($("tv-u").value); if (!u) return toast("Please paste a full link starting with http:// or https://");
      const v = { t: $("tv-t").value.trim() || "Video", u, d: $("tv-d").value.trim() }, list = videosOf(n).slice();
      editing >= 0 ? list[editing] = v : list.push(v); editU(n).videos = list; saveLocal(); keep();
    };
    $("tv-savemeta").onclick = () => { const e = editU(n), im = $("tv-img").value.trim();
      if (im && !safe(im)) return toast("The picture link must start with http:// or https://");
      e.note = $("tv-note").value.trim(); e.img = im; saveLocal(); keep(); toast("Saved"); };
    $("tv-reset").onclick = () => { if (confirm("Reset videos, note and picture of this unit to the defaults?")) { delete (T.local.units || {})[n]; saveLocal(); keep(); } };
  }
  function teacherBar() {
    const bar = document.getElementById("teacher-bar"), btn = document.getElementById("teacher-btn");
    btn.classList.toggle("on", teacherOn); btn.textContent = teacherOn ? "🎓 Teacher mode: ON" : "🎓 Teacher";
    bar.hidden = !teacherOn; if (!teacherOn) return;
    bar.innerHTML = `<b>Teacher tools</b> · edit the “Video Scenes &amp; Links” section (A2.n.8) in any unit.
      <button class="chip" id="tb-link" type="button">🔗 Copy student link</button><button class="chip" id="tb-exp" type="button">⬇ Export</button>
      <label class="chip" for="tb-imp">⬆ Import</label><input id="tb-imp" type="file" accept="application/json" hidden><button class="chip" id="tb-reset" type="button">↺ Reset all</button>`;
    document.getElementById("tb-link").onclick = () => {
      const base = location.origin + location.pathname, has = Object.keys(T.local.units || {}).length;
      const url = has ? `${base}?t=${b64e(T.local)}#/` : base;
      (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(() => toast("Student link copied — send it to your students"), () => prompt("Copy this link:", url));
    };
    document.getElementById("tb-exp").onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(T.local, null, 2)], { type: "application/json" })); a.download = "a2-teacher-content.json"; a.click(); };
    document.getElementById("tb-imp").onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { T.local = JSON.parse(t); saveLocal(); route(); toast("Imported"); } catch (x) { toast("That file is not valid"); } }); };
    document.getElementById("tb-reset").onclick = () => { if (confirm("Delete ALL your changes?")) { T.local = {}; saveLocal(); route(); } };
  }
  document.getElementById("teacher-btn").addEventListener("click", () => { teacherOn = !teacherOn; sessionStorage.setItem("a2tm", teacherOn ? "1" : "0"); route(); });

  /* ───────── Pages ───────── */
  function navHtml(cur) {
    document.getElementById("topnav").innerHTML = UNITS.map(u =>
      `<a href="#/unit/${u.n}" id="nav-u${u.n}" class="${u.n === cur ? "active" : ""}" title="Unit ${u.n}: ${esc(u.title)}">${u.n}</a>`).join("");
  }

  function home() {
    navHtml(0); document.title = "A2 English Course — 8 Units | CEFR Elementary EFL Coursebook";
    app.innerHTML = `
      <section class="hero"><h1>A2 English Course</h1>
      <p>Eight units for CEFR A2 learners — from the past simple to the present perfect. Every unit has eight numbered sections: vocabulary &amp; collocations, grammar, practice, listening (with a picture), reading, speaking, writing and video scenes.</p></section>
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

    const L = u.listening, img = safe(ucfg(n).img) || `img/unit${n}.jpg`;
    const who = [...new Set(L.lines.map(l => l[0]))];
    const lis = S(4, "Listening", `<figure class="scene"><img src="${esc(img)}" alt="Picture for the listening activity" loading="lazy"><figcaption>👀 <b>Before you listen:</b> look at the picture. Who are the people? Where are they? What are they talking about?</figcaption></figure>
      <p><b>${esc(L.title)}</b> Press play, listen, then answer.</p>
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
      <ul>${u.goals.map(g => `<li>${esc(g)}</li>`).join("")}</ul></header>${vocab}${gram}${prac}${lis}${rd}${sp}${wr}${videoSection(n, S)}
      <div class="pager">${n > 1 ? `<a class="btn alt" id="prev" href="#/unit/${n - 1}">← Unit ${n - 1}</a>` : `<a class="btn alt" href="#/">← Home</a>`}
      ${n < UNITS.length ? `<a class="btn main" id="next" href="#/unit/${n + 1}">Unit ${n + 1} →</a>` : `<a class="btn main" href="#/">Home</a>`}</div>`;

    wire(app, exMap); wireTeacher(n);
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
    stop(); teacherBar();
    const m = location.hash.match(/#\/unit\/(\d+)/);
    m ? unit(+m[1]) : home();
  }
  window.addEventListener("hashchange", route);
  route();
})();
