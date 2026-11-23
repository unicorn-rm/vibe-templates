import Alpine from "alpinejs";
import "./style.css";

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

// Opening hours per weekday (0 = Sunday): [open, close] in 24h, or null
const HOURS = [null, [10, 20], [10, 20], [10, 20], [10, 21], [9, 21], [9, 17]];

const SERVICES = [
  { en: "Haircut", ru: "Стрижка", p: 28, min: 40 },
  { en: "Skin fade", ru: "Фейд", p: 32, min: 45 },
  { en: "Hot-towel shave", ru: "Бритьё с горячим полотенцем", p: 26, min: 35 },
  { en: "Beard trim & shape", ru: "Оформление бороды", p: 18, min: 20 },
  { en: "Father & son", ru: "Отец и сын", p: 45, min: 60 },
  { en: "Buzz cut", ru: "Под машинку", p: 15, min: 15 },
];

const T = {
  en: {
    est: "Est. 1952 · Third generation", nav: { cuts: "Cuts", prices: "Prices", barbers: "Barbers", find: "Find us" },
    h1: ["Sharp", "& Sons"], sub: "Barbers", tagline: "Clean cuts. Hot towels. No appointments, never have been.",
    open: "Open now", closed: "Closed", until: "until", opens: "opens",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ba: { title: "Before & after", hint: "Drag the razor", before: "Before", after: "After" },
    prices: { title: "Price list", min: "min" },
    barbers: { title: "In the chairs", chair: "Chair", list: [["Viktor", "Since 1987 · fades and flat-tops"], ["Ilya", "Since 2009 · straight-razor shaves"], ["Dana", "Since 2018 · long hair and kids"]] },
    walk: "Walk-ins only", walkSub: "First come, first served. Coffee is on the house while you wait.",
    find: "7 Tannery Row · next to the bakery with the red door",
    foot: "Template by vibe-templates · fictional shop · MIT",
  },
  ru: {
    est: "С 1952 года · третье поколение", nav: { cuts: "Стрижки", prices: "Цены", barbers: "Мастера", find: "Адрес" },
    h1: ["Sharp", "& Sons"], sub: "Барбершоп", tagline: "Чистые стрижки. Горячие полотенца. Без записи — и никогда не было.",
    open: "Открыто", closed: "Закрыто", until: "до", opens: "откроемся",
    days: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    ba: { title: "До и после", hint: "Тяните бритву", before: "До", after: "После" },
    prices: { title: "Прейскурант", min: "мин" },
    barbers: { title: "В креслах", chair: "Кресло", list: [["Виктор", "С 1987 · фейды и площадки"], ["Илья", "С 2009 · бритьё опасной бритвой"], ["Дана", "С 2018 · длинные волосы и дети"]] },
    walk: "Только живая очередь", walkSub: "Кто первый пришёл, того первым и стрижём. Пока ждёте — кофе за наш счёт.",
    find: "Кожевенный ряд, 7 · рядом с пекарней с красной дверью",
    foot: "Шаблон vibe-templates · вымышленный барбершоп · MIT",
  },
};

Alpine.data("shop", () => ({
  lang: (() => { const q = new URLSearchParams(location.search).get("lang") || read("vt-lang"); return q === "ru" ? "ru" : "en"; })(),
  split: 70,          // before/after divider, %
  now: new Date(),
  services: SERVICES,
  hours: HOURS,
  init() {
    document.documentElement.lang = this.lang;
    this.$watch("lang", (l) => { document.documentElement.lang = l; write("vt-lang", l); });
    setInterval(() => { this.now = new Date(); }, 30000);
  },
  get t() { return T[this.lang]; },
  get status() {
    const d = this.now.getDay(), h = this.now.getHours() + this.now.getMinutes() / 60, today = HOURS[d];
    if (today && h >= today[0] && h < today[1]) return { open: true, text: `${this.t.open} · ${this.t.until} ${today[1]}:00` };
    for (let i = 1; i <= 7; i++) {
      const nd = (d + i - (today && h < today[0] ? 1 : 0)) % 7, hr = HOURS[nd];
      if (hr) return { open: false, text: `${this.t.closed} · ${this.t.opens} ${this.t.days[nd]} ${hr[0]}:00` };
    }
    return { open: false, text: this.t.closed };
  },
  // drag the razor handle
  drag(e) {
    const box = this.$refs.ba.getBoundingClientRect();
    const move = (ev) => { this.split = Math.max(4, Math.min(96, ((ev.clientX - box.left) / box.width) * 100)); };
    move(e);
    e.target.setPointerCapture?.(e.pointerId);
    const up = () => { removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
    addEventListener("pointermove", move); addEventListener("pointerup", up);
  },
  key(e) {
    if (e.key === "ArrowLeft") this.split = Math.max(4, this.split - 4);
    if (e.key === "ArrowRight") this.split = Math.min(96, this.split + 4);
  },
}));

window.Alpine = Alpine;
Alpine.start();
