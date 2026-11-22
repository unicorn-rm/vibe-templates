import Alpine from "alpinejs";
import "./style.css";
import { BATCHES, NOTES, PRODUCTS, T, TAGS } from "./content.js";

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

// Hand-drawn doodles (single stroke, drawn with the same wobbly pen)
const DOODLE = {
  loaf: "M10 44 C10 22 26 14 40 14 C54 14 70 22 70 44 L70 52 C70 56 66 58 62 58 L18 58 C14 58 10 56 10 52 Z M26 24 L32 36 M38 20 L44 34 M50 22 L56 36",
  croissant: "M6 50 C10 30 28 18 40 18 C52 18 70 30 74 50 C64 56 58 52 54 46 C50 52 44 54 40 54 C36 54 30 52 26 46 C22 52 16 56 6 50 Z M26 46 C28 34 34 26 40 24 M54 46 C52 34 46 26 40 24",
  bun: "M14 46 C10 30 24 16 40 16 C56 16 70 30 66 46 C62 58 18 58 14 46 Z M28 30 C34 24 46 24 52 30 C46 38 34 38 28 30 Z",
  cookie: "M40 12 C58 12 68 24 68 40 C68 56 56 68 40 68 C24 68 12 56 12 40 C12 24 22 12 40 12 Z M30 30 L33 33 M48 26 L50 29 M44 46 L47 49 M28 50 L30 52 M54 42 L56 44",
  pie: "M8 44 L72 44 L64 60 L16 60 Z M8 44 C14 26 28 18 40 18 C52 18 66 26 72 44 M24 34 L56 34 M30 26 L50 26",
};

Alpine.data("bakery", () => ({
  lang: (() => { const q = new URLSearchParams(location.search).get("lang") || read("vt-lang"); return q === "ru" ? "ru" : "en"; })(),
  active: [],         // allergen filters
  now: Date.now(),
  products: PRODUCTS,
  notes: NOTES,
  tags: TAGS,
  batches: BATCHES,

  init() {
    document.documentElement.lang = this.lang;
    this.$watch("lang", (l) => { document.documentElement.lang = l; write("vt-lang", l); });
    setInterval(() => { this.now = Date.now(); }, 1000);
  },
  get t() { return T[this.lang]; },
  doodle(name) { return DOODLE[name]; },
  toggle(tag) { this.active = this.active.includes(tag) ? this.active.filter((x) => x !== tag) : [...this.active, tag]; },
  get shown() { return this.products.filter((p) => this.active.every((tag) => p.tags.includes(tag))); },
  price(p) { return new Intl.NumberFormat(this.lang === "ru" ? "ru-RU" : "en-GB", { style: "currency", currency: "EUR" }).format(p.price); },

  // countdown to the next batch today
  get next() {
    const d = new Date(this.now);
    for (const hm of this.batches) {
      const [h, m] = hm.split(":").map(Number);
      const at = new Date(d); at.setHours(h, m, 0, 0);
      if (at > d) {
        const s = Math.floor((at - d) / 1000);
        return { at: hm, left: [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0")).join(":") };
      }
    }
    return null;
  },
}));

window.Alpine = Alpine;
Alpine.start();
