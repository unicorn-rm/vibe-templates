(() => {
  const C = window.CONTENT;
  const $ = (s) => document.querySelector(s);
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------- language ---------- */
  const params = new URLSearchParams(location.search);
  let lang = params.get("lang") || store.get("vt-lang") || "en";
  if (!["en", "ru"].includes(lang)) lang = "en";

  const THEMES = ["green", "amber", "ice"];
  let theme = store.get("vt-term-theme") || "green";

  function applyLang() {
    root.lang = lang;
    const ui = C.ui[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const v = ui[el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
    $("#langBtn").textContent = lang === "en" ? "[RU]" : "[EN]";
    $("#footLang").textContent = lang;
    renderProjects(); renderLog(); renderSkills();
  }
  function applyTheme() {
    root.dataset.theme = theme;
    $("#themeBtn").textContent = `[${theme}]`;
  }

  /* ---------- sections ---------- */
  function renderProjects() {
    const list = $("#lsList");
    list.innerHTML = "";
    C.projects.forEach((p, i) => {
      const row = document.createElement("button");
      row.className = "ls__row"; row.type = "button"; row.setAttribute("aria-expanded", "false");
      row.innerHTML = `<span class="ls__perm">${p.perm}</span><span class="ls__size">★${p.stars}</span><span class="ls__date">${p.date}</span><span class="ls__name">${p.name}</span>`;
      const readme = document.createElement("div");
      readme.className = "ls__readme"; readme.hidden = true; readme.setAttribute("role", "listitem");
      readme.innerHTML = `<p><span class="dim">$ cat ${p.name}/README.md</span></p><p>${p[lang]}</p><div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div><p><a href="${p.url}" target="_blank" rel="noopener">→ ${p.url.replace(/^https?:\/\//, "")}${p.name}</a> <span class="dim">[open ${i + 1}]</span></p>`;
      row.addEventListener("click", () => {
        const open = row.getAttribute("aria-expanded") === "true";
        row.setAttribute("aria-expanded", String(!open)); readme.hidden = open;
      });
      list.append(row, readme);
    });
  }
  function renderLog() {
    $("#gitlog").innerHTML = C.log.map((l) => l.pipe
      ? `<li><span class="pipe">${l.g}</span></li>`
      : `<li><span class="g">${l.g}</span><span class="sha">${l.sha}</span><span>${l.ref ? `<span class="ref">${l.ref}</span>` : ""}${l[lang]} <span class="when">(${l.when})</span></span></li>`).join("");
  }
  function renderSkills() {
    const W = 24;
    $("#htop").innerHTML = C.skills.map(([n, v]) => {
      const on = Math.round((v / 100) * W);
      return `<div class="meter"><span class="meter__name">${n}</span><span class="meter__bar">[<b>${"|".repeat(on)}</b>${" ".repeat(W - on)}]</span><span class="meter__val">${v}%</span></div>`;
    }).join("");
  }

  /* ---------- terminal ---------- */
  const out = $("#out"), input = $("#cmd"), caret = document.querySelector(".caret");
  const history = []; let hIdx = 0;
  const COMMANDS = ["help", "about", "projects", "experience", "skills", "contact", "theme", "lang", "open", "whoami", "date", "history", "banner", "clear", "sudo"];

  function print(text, cls = "") {
    String(text).split("\n").forEach((line) => {
      const p = document.createElement("p");
      p.className = `ln ${cls}`; p.textContent = line;
      out.append(p);
    });
    out.lastElementChild?.scrollIntoView({ block: "nearest" });
  }

  const run = {
    help: () => print(C.cmd[lang].help),
    about: () => print(C.cmd[lang].about),
    projects: () => { C.projects.forEach((p, i) => print(`${i + 1}. ${p.name.padEnd(12)} ★${p.stars.padEnd(5)} ${p[lang]}`)); },
    experience: () => C.log.filter((l) => !l.pipe).forEach((l) => print(`${l.sha}  ${l[lang]} (${l.when})`)),
    skills: () => C.skills.forEach(([n, v]) => print(`${n.padEnd(12)} ${"█".repeat(Math.round(v / 5)).padEnd(20, "░")} ${v}%`)),
    contact: () => print(C.cmd[lang].contact),
    whoami: () => print("alex"),
    date: () => print(new Date().toString()),
    history: () => history.forEach((h, i) => print(`${String(i + 1).padStart(4)}  ${h}`)),
    banner: () => print(document.querySelector(".banner").textContent, "ok"),
    clear: () => { out.innerHTML = ""; },
    sudo: () => print(C.cmd[lang].sudo, "err"),
    theme: (a) => {
      theme = THEMES.includes(a) ? a : THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
      store.set("vt-term-theme", theme); applyTheme(); print(C.cmd[lang].theme + theme, "ok");
    },
    lang: (a) => {
      lang = ["en", "ru"].includes(a) ? a : lang === "en" ? "ru" : "en";
      store.set("vt-lang", lang); applyLang(); print(C.cmd[lang].lang, "ok");
    },
    open: (a) => {
      const p = C.projects[Number(a) - 1];
      if (!p) return print(C.cmd[lang].openUsage, "err");
      window.open(p.url, "_blank", "noopener");
    },
  };

  function exec(raw) {
    const line = raw.trim();
    print(line, "cmd");
    if (!line) return;
    history.push(line); hIdx = history.length;
    const [name, ...args] = line.split(/\s+/);
    const fn = run[name.toLowerCase()];
    fn ? fn(args[0]) : print(C.cmd[lang].notFound + name, "err");
  }

  let chW = 0;
  function measure() {
    const s = document.createElement("span");
    s.textContent = "0000000000"; s.style.cssText = "position:absolute;visibility:hidden;font:inherit";
    input.parentElement.append(s); chW = s.getBoundingClientRect().width / 10; s.remove();
  }
  function moveCaret() {
    const pos = input.selectionStart ?? input.value.length;
    caret.style.setProperty("--caret-x", `${input.offsetLeft + (pos - input.scrollLeft / chW) * chW}px`);
  }
  ["input", "keyup", "click", "focus"].forEach((e) => input.addEventListener(e, moveCaret));

  $("#cmdForm").addEventListener("submit", (e) => { e.preventDefault(); exec(input.value); input.value = ""; moveCaret(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); if (hIdx > 0) input.value = history[--hIdx]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || ""; }
    else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMMANDS.filter((c) => c.startsWith(input.value.trim()));
      if (m.length === 1) input.value = m[0] + " ";
      else if (m.length > 1) print(m.join("  "), "dim");
    } else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); run.clear(); }
    requestAnimationFrame(moveCaret);
  });
  $("#term").addEventListener("click", (e) => { if (!getSelection().toString() && e.target.tagName !== "A") input.focus({ preventScroll: true }); });

  /* boot sequence */
  async function boot() {
    const lines = C.boot[lang];
    for (const l of lines) {
      print(l, l.startsWith("[ OK ]") ? "ok" : "");
      if (!reduced) await new Promise((r) => setTimeout(r, 220));
    }
    input.focus({ preventScroll: true }); moveCaret();
  }

  /* ---------- controls ---------- */
  $("#themeBtn").addEventListener("click", () => run.theme());
  $("#langBtn").addEventListener("click", () => { lang = lang === "en" ? "ru" : "en"; store.set("vt-lang", lang); applyLang(); });

  const keyLinks = { m: 0, g: 1, t: 2, c: 3 };
  document.addEventListener("keydown", (e) => {
    if (document.activeElement === input || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key in keyLinks) document.querySelectorAll(".key")[keyLinks[e.key]]?.click();
  });

  const t0 = Date.now();
  setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000);
    $("#uptime").textContent = "up " + [s / 3600, (s / 60) % 60, s % 60].map((n) => String(Math.floor(n)).padStart(2, "0")).join(":");
  }, 1000);

  applyTheme(); applyLang(); measure(); boot();
})();
