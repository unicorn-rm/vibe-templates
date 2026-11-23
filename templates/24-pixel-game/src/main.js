import { createGame, draw, SPR } from "./game.js";

const T = {
  en: {
    nav: { play: "Play", manual: "Manual", cast: "Characters" },
    seal: "Official seal of quality", tag: "Light every lamp in the old town before the bats put them out.",
    b1: "1 player", b2: "Infinite nights", b3: "Battery save*",
    start: "Start", score: "Score", lives: "Lives", over: "GAME OVER", again: "Play again", ready: "PRESS START",
    m: {
      title: "Instruction manual", story: "Every night the old town goes dark, and every night you climb the rooftops with your lighter. Light all seven lamps and the next night begins — with one more bat.",
      controls: "Controls", k1: "run left and right", k2: "jump (only from a roof)",
      hints: "Hints from the lamplighters' guild", h1: "Bats fly in waves. Wait for the gap.", h2: "Falling off the edge costs a life, so jump from the middle of a roof.", h3: "Clearing a night is worth 50 bonus points.",
      warn: "*There is no battery. Your score is gone when you close the tab. Just like 1987.",
    },
    cast: { title: "Characters", hero: "The lamplighter", lamp: "Gas lamp (lit)", bat: "Night bat" },
    foot: "Template by vibe-templates · fictional game · MIT",
  },
  ru: {
    nav: { play: "Играть", manual: "Инструкция", cast: "Персонажи" },
    seal: "Официальный знак качества", tag: "Зажгите все фонари старого города, пока летучие мыши их не погасили.",
    b1: "1 игрок", b2: "Бесконечные ночи", b3: "Сохранение на батарейке*",
    start: "Старт", score: "Очки", lives: "Жизни", over: "ИГРА ОКОНЧЕНА", again: "Ещё раз", ready: "НАЖМИТЕ СТАРТ",
    m: {
      title: "Инструкция", story: "Каждую ночь старый город погружается во тьму, и каждую ночь вы поднимаетесь на крыши с зажигалкой. Зажгите все семь фонарей — и начнётся следующая ночь, с ещё одной летучей мышью.",
      controls: "Управление", k1: "бег влево и вправо", k2: "прыжок (только с крыши)",
      hints: "Советы гильдии фонарщиков", h1: "Мыши летают волнами. Дождитесь просвета.", h2: "Падение с края стоит жизни — прыгайте с середины крыши.", h3: "Пройденная ночь даёт 50 бонусных очков.",
      warn: "*Батарейки нет. Счёт пропадёт, когда вы закроете вкладку. Совсем как в 1987-м.",
    },
    cast: { title: "Персонажи", hero: "Фонарщик", lamp: "Газовый фонарь (горит)", bat: "Ночная мышь" },
    foot: "Шаблон vibe-templates · вымышленная игра · MIT",
  },
};

const $ = (s) => document.querySelector(s);
const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
let lang = new URLSearchParams(location.search).get("lang") || read("vt-lang");
lang = lang === "ru" ? "ru" : "en";
let state = "ready";
const get = (o, p) => p.split(".").reduce((a, k) => a?.[k], o);

function render() {
  const t = T[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach((el) => { const v = get(t, el.dataset.t); if (v != null) el.textContent = v; });
  $("#lang").textContent = lang === "en" ? "RU" : "EN";
  $("#ovTitle").textContent = state === "over" ? t.over : t.ready;
  $("#start").textContent = state === "over" ? t.again : t.start;
}

// the game
const game = createGame($("#game"), {
  onScore: (n) => { $("#score").textContent = String(n).padStart(5, "0"); },
  onLives: (n) => { $("#lives").textContent = "♥".repeat(Math.max(0, n)) || "—"; },
  onState: (s) => { state = s; $("#overlay").hidden = s === "play"; render(); },
});
game.preview();
$("#start").addEventListener("click", () => game.start());

// on-screen pad (touch)
document.querySelectorAll(".pad [data-k]").forEach((b) => {
  const k = b.dataset.k;
  b.addEventListener("pointerdown", (e) => { e.preventDefault(); game.press(k, true); });
  ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => b.addEventListener(ev, () => game.press(k, false)));
});

// box art = a still frame of the game
createGame($("#art"), { onScore() {}, onLives() {}, onState() {} }).preview();

// character sheet sprites, drawn big and crisp
document.querySelectorAll(".sprite").forEach((c) => {
  const spr = SPR[c.dataset.spr];
  c.width = spr[0].length + 2; c.height = spr.length + 2;
  draw(c.getContext("2d"), spr, 1, 1);
});

$("#lang").addEventListener("click", () => { lang = lang === "en" ? "ru" : "en"; write("vt-lang", lang); render(); });
render();
