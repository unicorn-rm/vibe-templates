// All copy for the page. Every string is { en, ru }; <T> renders both and CSS shows one.
export type L = { en: string; ru: string };

export const masthead = {
  issue: { en: "Issue Nº 14 · Winter 2026", ru: "Выпуск № 14 · Зима 2026" },
  city: { en: "Tallinn · Old Town", ru: "Таллин · Старый город" },
  nav: [
    { href: "#roast", t: { en: "Today's roast", ru: "Обжарка дня" } },
    { href: "#menu", t: { en: "Menu", ru: "Меню" } },
    { href: "#brew", t: { en: "Brew guide", ru: "Как заварить" } },
    { href: "#visit", t: { en: "Visit", ru: "Как найти" } },
  ],
};

export const hero = {
  kicker: { en: "A small roastery & café", ru: "Маленькая обжарочная и кофейня" },
  title: { en: "Slow coffee for fast mornings", ru: "Медленный кофе для быстрых утр" },
  lead: {
    en: "We roast twice a week in a former print shop, pour by hand, and still believe a good cup can fix about half of your problems.",
    ru: "Обжариваем дважды в неделю в бывшей типографии, завариваем руками и всё ещё верим, что хорошая чашка решает примерно половину проблем.",
  },
};

export const roast = {
  label: { en: "Today's roast", ru: "Обжарка дня" },
  name: "Gichathaini AA",
  origin: { en: "Nyeri, Kenya", ru: "Ньери, Кения" },
  rows: [
    [{ en: "Process", ru: "Обработка" }, { en: "Washed", ru: "Мытая" }],
    [{ en: "Altitude", ru: "Высота" }, { en: "1,750 m", ru: "1 750 м" }],
    [{ en: "Variety", ru: "Сорт" }, { en: "SL28, SL34", ru: "SL28, SL34" }],
    [{ en: "Roasted", ru: "Обжарен" }, { en: "Tuesday", ru: "Во вторник" }],
  ] as [L, L][],
  notes: { en: "blackcurrant · grapefruit · cane sugar", ru: "чёрная смородина · грейпфрут · тростниковый сахар" },
  level: 2, // 1 light … 5 dark
  levelLabel: { en: "Roast level", ru: "Степень обжарки" },
};

// icon names map to line drawings in Illo.astro
export const menu = [
  {
    cat: { en: "Coffee", ru: "Кофе" },
    items: [
      { icon: "pourover", n: { en: "Pour-over of the day", ru: "Пуровер дня" }, d: { en: "V60, 300 ml, today's roast", ru: "V60, 300 мл, обжарка дня" }, p: "5.0" },
      { icon: "cup", n: { en: "Flat white", ru: "Флэт уайт" }, d: { en: "Double ristretto, whole or oat milk", ru: "Двойной ристретто, коровье или овсяное" }, p: "4.2" },
      { icon: "bean", n: { en: "Espresso", ru: "Эспрессо" }, d: { en: "House blend, 18 g in, 36 g out", ru: "Домашний бленд, 18 г на 36 г" }, p: "2.8" },
      { icon: "cup", n: { en: "Cortado", ru: "Кортадо" }, d: { en: "Equal parts espresso and warm milk", ru: "Поровну эспрессо и тёплого молока" }, p: "3.6" },
    ],
  },
  {
    cat: { en: "From the oven", ru: "Из печи" },
    items: [
      { icon: "croissant", n: { en: "Butter croissant", ru: "Масляный круассан" }, d: { en: "Laminated for three days", ru: "Слоим три дня" }, p: "3.2" },
      { icon: "cake", n: { en: "Rye & cardamom cake", ru: "Ржаной кекс с кардамоном" }, d: { en: "Brown butter, salted caramel", ru: "Жжёное масло, солёная карамель" }, p: "4.0" },
      { icon: "leaf", n: { en: "Seasonal tea", ru: "Сезонный чай" }, d: { en: "Sea buckthorn, thyme, honey", ru: "Облепиха, чабрец, мёд" }, p: "3.5" },
    ],
  },
];

export const brew = {
  title: { en: "Brew it at home", ru: "Заварите дома" },
  sub: { en: "V60 · 15 g coffee · 250 g water at 94 °C", ru: "V60 · 15 г кофе · 250 г воды 94 °C" },
  start: { en: "Start timer", ru: "Запустить таймер" },
  reset: { en: "Reset", ru: "Сброс" },
  steps: [
    { s: 0, t: { en: "Bloom", ru: "Цветение" }, d: { en: "Pour 40 g, swirl gently", ru: "Налейте 40 г, слегка покрутите" } },
    { s: 40, t: { en: "First pour", ru: "Первый пролив" }, d: { en: "Up to 150 g in slow circles", ru: "До 150 г медленными кругами" } },
    { s: 80, t: { en: "Second pour", ru: "Второй пролив" }, d: { en: "Up to 250 g, aim at the centre", ru: "До 250 г, в центр" } },
    { s: 120, t: { en: "Drawdown", ru: "Протекание" }, d: { en: "Let it drain, done by 3:00", ru: "Дайте стечь, готово к 3:00" } },
  ],
  total: 180,
};

export const story = {
  quote: { en: "“We never wanted to be fast. We wanted to be the place you remember on a grey Tuesday.”", ru: "«Мы никогда не хотели быть быстрыми. Мы хотели быть местом, которое вспоминаешь серым вторником»." },
  by: { en: "— Liis & Marten, founders", ru: "— Лийс и Мартен, основатели" },
  p1: {
    en: "Paper Moon opened in 2019 in a print shop that had closed after ninety years. We kept the type cases, the cast-iron press and the smell of ink that still comes out of the floorboards on rainy days.",
    ru: "Paper Moon открылся в 2019 году в типографии, закрывшейся после девяноста лет работы. Мы сохранили наборные кассы, чугунный пресс и запах краски, который в дождливые дни всё ещё поднимается от половиц.",
  },
  p2: {
    en: "Our green coffee comes from five farms we have visited. We pay above Fair Trade, publish every price on the bag and roast in batches small enough to taste each one.",
    ru: "Зелёное зерно мы берём у пяти ферм, где бывали лично. Платим выше Fair Trade, печатаем цену на каждой пачке и жарим партиями настолько маленькими, чтобы попробовать каждую.",
  },
};

export const visit = {
  title: { en: "Come by", ru: "Заходите" },
  addr: { en: "Trükikoja 4, Old Town, Tallinn", ru: "Трюкикоя, 4, Старый город, Таллин" },
  hours: [
    [{ en: "Mon — Fri", ru: "Пн — Пт" }, "7:30 — 18:00"],
    [{ en: "Sat — Sun", ru: "Сб — Вс" }, "9:00 — 17:00"],
  ] as [L, string][],
  note: { en: "Beans to go, every day. Wi-Fi password is on the receipt.", ru: "Зерно с собой — каждый день. Пароль от Wi-Fi напечатан на чеке." },
};

export const foot = { en: "Template by vibe-templates · fictional café · MIT", ru: "Шаблон vibe-templates · вымышленная кофейня · MIT" };
