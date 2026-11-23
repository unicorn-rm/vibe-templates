import { CONST, EXHIBITS, SHOWS, T } from "./content.js";
import { moonPhase } from "./sky.js";

const $ = (s) => document.querySelector(s);
const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

let lang = new URLSearchParams(location.search).get("lang") || read("vt-lang");
lang = lang === "ru" ? "ru" : "en";
let picked = null;
let sphere = null;

const get = (obj, path) => path.split(".").reduce((o, k) => o?.[k], obj);

function render() {
  const t = T[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach((el) => { const v = get(t, el.dataset.t); if (v != null) el.textContent = v; });
  $("#lang").textContent = lang === "en" ? "RU" : "EN";

  $("#consts").innerHTML = "";
  CONST.forEach((c, i) => {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button"; b.className = picked === c.id ? "is-on" : "";
    b.innerHTML = `<span class="n">${["α", "β", "γ", "δ", "ε"][i]}</span><span></span><small></small>`;
    b.children[1].textContent = c[lang]; b.children[2].textContent = c.season[lang];
    b.addEventListener("click", () => { picked = c.id; sphere?.focus(c.id); render(); });
    li.append(b); $("#consts").append(li);
  });
  $("#picked").textContent = picked ? CONST.find((c) => c.id === picked)[lang] : "—";

  $("#catHead").innerHTML = t.exhibits.head.map((h) => `<th>${h}</th>`).join("");
  $("#catBody").innerHTML = "";
  EXHIBITS.forEach(([no, name, year, hall]) => {
    const tr = document.createElement("tr");
    [no, name[lang], year, hall].forEach((v) => { const td = document.createElement("td"); td.textContent = v; tr.append(td); });
    $("#catBody").append(tr);
  });

  $("#shows-list").innerHTML = "";
  SHOWS.forEach(([time, name, len]) => {
    const li = document.createElement("li");
    li.innerHTML = "<time></time><b></b><span></span>";
    li.children[0].textContent = time; li.children[1].textContent = name[lang]; li.children[2].textContent = len;
    $("#shows-list").append(li);
  });

  // tonight's moon, drawn as a terminator ellipse
  const p = moonPhase();
  const idx = Math.round(p * 8) % 8;
  $("#moonName").textContent = t.phases[idx];
  const lit = Math.round((1 - Math.cos(p * 2 * Math.PI)) / 2 * 100);
  $("#moonPct").textContent = `${lit}%`;
  const rx = Math.abs(Math.cos(p * 2 * Math.PI)) * 40, waxing = p < 0.5;
  // outer edge on the lit side; inner terminator bulges toward the lit side for crescents
  const sweepOuter = waxing ? 1 : 0;
  const sweepInner = waxing ? (p < 0.25 ? 0 : 1) : (p < 0.75 ? 0 : 1);
  $("#moonLit").setAttribute("d", `M50 10 A40 40 0 0 ${sweepOuter} 50 90 A${rx} 40 0 0 ${sweepInner} 50 10Z`);
}

$("#lang").addEventListener("click", () => { lang = lang === "en" ? "ru" : "en"; write("vt-lang", lang); render(); });
render();

// three.js loads after first paint; the page works without it
import("./sphere.js").then(({ mountSphere }) => {
  try { sphere = mountSphere($("#sky"), { reduced }); }
  catch { $("#sky").replaceWith(Object.assign(document.createElement("p"), { className: "no-gl", textContent: "WebGL is not available — the atlas needs it." })); }
});
