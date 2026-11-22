// All copy and data for the festival. Edit here — components only render it.
export const FESTIVAL = {
  name: "NEON BLOOM",
  year: "2027",
  // ISO start used by the countdown and the .ics file
  start: "2027-07-16T16:00:00+02:00",
  end: "2027-07-18T23:59:00+02:00",
};

export const STAGES = [
  { id: "orbit", color: "var(--pink)" },
  { id: "garden", color: "var(--lime)" },
  { id: "tunnel", color: "var(--cyan)" },
];

// size: 3 = headliner, 2 = big, 1 = regular
export const LINEUP = {
  fri: [
    { name: "VELVET STATIC", stage: "orbit", size: 3 },
    { name: "Mira Holo", stage: "garden", size: 2 },
    { name: "DJ Pastel Riot", stage: "tunnel", size: 2 },
    { name: "Kōji Bloom", stage: "orbit", size: 1 },
    { name: "Glass Arcade", stage: "garden", size: 1 },
    { name: "Nocturne FM", stage: "tunnel", size: 1 },
    { name: "Lulu Byte", stage: "garden", size: 1 },
  ],
  sat: [
    { name: "AURORA//SYSTEM", stage: "orbit", size: 3 },
    { name: "Chrome Hearts Club", stage: "orbit", size: 2 },
    { name: "Sasha Neon", stage: "tunnel", size: 2 },
    { name: "Pixel Lagoon", stage: "garden", size: 1 },
    { name: "Bubblegum Tape", stage: "garden", size: 1 },
    { name: "Ultraviolet Kid", stage: "tunnel", size: 1 },
    { name: "Ferro Twins", stage: "tunnel", size: 1 },
    { name: "Star Mall", stage: "orbit", size: 1 },
  ],
  sun: [
    { name: "HYPERDREAM", stage: "orbit", size: 3 },
    { name: "Lake Ghosts", stage: "garden", size: 2 },
    { name: "Mochi Mochi", stage: "garden", size: 2 },
    { name: "Signal Lost", stage: "tunnel", size: 1 },
    { name: "Disco Fennec", stage: "tunnel", size: 1 },
    { name: "Afterglow Choir", stage: "orbit", size: 1 },
  ],
};

// Map hotspots: x/y in % of the map box
export const SPOTS = [
  { id: "orbit", x: 26, y: 34, color: "var(--pink)" },
  { id: "garden", x: 70, y: 28, color: "var(--lime)" },
  { id: "tunnel", x: 60, y: 72, color: "var(--cyan)" },
  { id: "food", x: 34, y: 74, color: "var(--chrome)" },
  { id: "camp", x: 86, y: 62, color: "var(--chrome)" },
];

export const T = {
  en: {
    nav: { lineup: "Lineup", stages: "Stages", map: "Map", faq: "FAQ" },
    hero: {
      dates: "16—18 July 2027 · Lake Arena",
      tag: "Three nights of synth-pop, club and glitter by the water.",
      play: "Play the teaser", stop: "Stop",
      hint: "Sound is generated live in your browser — no files.",
    },
    count: { d: "days", h: "hrs", m: "min", s: "sec", live: "We are live!" },
    lineup: { title: "Lineup", days: { fri: "Fri 16", sat: "Sat 17", sun: "Sun 18" }, all: "All stages" },
    stages: {
      title: "Three stages",
      orbit: { name: "Orbit", desc: "Main stage on a floating platform. Pop, synthwave, headliners." },
      garden: { name: "Garden", desc: "Daylight under willow trees. Indie, city-pop, dreamy sets." },
      tunnel: { name: "Tunnel", desc: "A concrete tube with 40 lasers. Club, hyperpop, until 6 am." },
      food: { name: "Food court", desc: "Twelve trucks, vegan options, free water." },
      camp: { name: "Camping", desc: "Quiet zone after 2 am. Showers, lockers, charging." },
    },
    map: { title: "Find your way", hint: "Tap a spot" },
    save: {
      title: "Save the date",
      text: "Add the festival to your calendar so you don't miss the lineup drops.",
      btn: "Add to calendar (.ics)",
    },
    faq: {
      title: "Questions",
      items: [
        ["Is it all ages?", "Daytime (until 20:00) is all ages with an adult. After that, 18+."],
        ["Can I bring a camera?", "Phones and compact cameras yes, detachable lenses no."],
        ["How do I get there?", "Free shuttles every 15 minutes from the central station, plus 400 bike racks."],
        ["Is it accessible?", "Step-free routes to every stage, a raised viewing deck at Orbit and a quiet tent."],
      ],
    },
    foot: { note: "Template by vibe-templates · fictional festival · MIT", top: "Back up ↑" },
  },
  ru: {
    nav: { lineup: "Лайнап", stages: "Сцены", map: "Карта", faq: "Вопросы" },
    hero: {
      dates: "16—18 июля 2027 · Lake Arena",
      tag: "Три ночи синти-попа, клуба и блёсток у воды.",
      play: "Включить тизер", stop: "Стоп",
      hint: "Звук генерируется прямо в браузере, без файлов.",
    },
    count: { d: "дней", h: "час", m: "мин", s: "сек", live: "Мы в эфире!" },
    lineup: { title: "Лайнап", days: { fri: "Пт 16", sat: "Сб 17", sun: "Вс 18" }, all: "Все сцены" },
    stages: {
      title: "Три сцены",
      orbit: { name: "Орбита", desc: "Главная сцена на плавучей платформе. Поп, синтвейв, хедлайнеры." },
      garden: { name: "Сад", desc: "Дневная сцена под ивами. Инди, сити-поп, мечтательные сеты." },
      tunnel: { name: "Тоннель", desc: "Бетонная труба и 40 лазеров. Клуб, гиперпоп, до 6 утра." },
      food: { name: "Фудкорт", desc: "Двенадцать фудтраков, веган-меню, бесплатная вода." },
      camp: { name: "Кемпинг", desc: "Тихая зона после 2 ночи. Душ, камеры хранения, зарядка." },
    },
    map: { title: "Как не потеряться", hint: "Нажмите на точку" },
    save: {
      title: "Сохраните дату",
      text: "Добавьте фестиваль в календарь, чтобы не пропустить анонсы.",
      btn: "Добавить в календарь (.ics)",
    },
    faq: {
      title: "Вопросы",
      items: [
        ["Можно с детьми?", "Днём (до 20:00) — да, со взрослыми. После — 18+."],
        ["Можно взять камеру?", "Телефоны и компактные камеры — да, со сменной оптикой — нет."],
        ["Как добраться?", "Бесплатные шаттлы каждые 15 минут от центрального вокзала и 400 велопарковок."],
        ["Доступная среда?", "Пути без ступеней ко всем сценам, приподнятая площадка у Орбиты и тихий шатёр."],
      ],
    },
    foot: { note: "Шаблон vibe-templates · вымышленный фестиваль · MIT", top: "Наверх ↑" },
  },
};
