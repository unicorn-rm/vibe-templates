// All copy and data (EN + RU). Alpine renders it; edit here only.
export const BATCHES = ["07:00", "11:00", "15:00"]; // fresh-out-of-the-oven times (local)

export const PRODUCTS = [
  { id: "sour", icon: "loaf", price: 6.5, tags: ["vegan"], soldOut: false,
    en: { n: "Country sourdough", d: "48-hour ferment, crackly crust" }, ru: { n: "Деревенская закваска", d: "Брожение 48 часов, хрустящая корка" } },
  { id: "crois", icon: "croissant", price: 3.2, tags: [], soldOut: false,
    en: { n: "Butter croissant", d: "Normandy butter, 27 layers" }, ru: { n: "Масляный круассан", d: "Нормандское масло, 27 слоёв" } },
  { id: "cinn", icon: "bun", price: 3.8, tags: [], soldOut: true,
    en: { n: "Cardamom bun", d: "Swedish-style knot, pearl sugar" }, ru: { n: "Булочка с кардамоном", d: "Шведский узелок, перламутровый сахар" } },
  { id: "rye", icon: "loaf", price: 5.9, tags: ["vegan", "nutfree"], soldOut: false,
    en: { n: "Seeded rye", d: "Sunflower, flax, a little molasses" }, ru: { n: "Ржаной с семенами", d: "Подсолнечник, лён, немного патоки" } },
  { id: "cookie", icon: "cookie", price: 2.5, tags: ["gf"], soldOut: false,
    en: { n: "Brown-butter cookie", d: "Buckwheat flour, sea salt" }, ru: { n: "Печенье на жжёном масле", d: "Гречневая мука, морская соль" } },
  { id: "pie", icon: "pie", price: 4.6, tags: ["nutfree"], soldOut: false,
    en: { n: "Apple hand pie", d: "Antonovka apples, cinnamon" }, ru: { n: "Пирожок с яблоком", d: "Антоновка, корица" } },
  { id: "focaccia", icon: "loaf", price: 4.2, tags: ["vegan", "nutfree"], soldOut: true,
    en: { n: "Rosemary focaccia", d: "Olive oil, flaky salt" }, ru: { n: "Фокачча с розмарином", d: "Оливковое масло, хлопья соли" } },
  { id: "brownie", icon: "cookie", price: 3.4, tags: ["gf", "nutfree"], soldOut: false,
    en: { n: "Fudgy brownie", d: "70% chocolate, no flour" }, ru: { n: "Влажный брауни", d: "Шоколад 70%, без муки" } },
];

export const TAGS = ["vegan", "gf", "nutfree"];

export const NOTES = [
  { en: "Best cardamom buns outside Stockholm. I've checked.", ru: "Лучшие булочки с кардамоном за пределами Стокгольма. Я проверяла.", by: "— Freja", c: "pink" },
  { en: "My kids now refuse supermarket bread. Thanks a lot.", ru: "Дети теперь отказываются от магазинного хлеба. Спасибо большое.", by: "— Dmitri", c: "butter" },
  { en: "Come at 7. Trust me.", ru: "Приходите к 7. Поверьте.", by: "— Anna", c: "mint" },
];

export const T = {
  en: {
    nav: { menu: "Today", shop: "Breads", visit: "Visit" },
    hero: { k: "a tiny bakery on Linden Street", h1: "Baked this morning,", h2: "gone by noon.", lead: "Two ovens, one sourdough starter called Gerald, and a short list that changes with the flour we get.", cta: "What's in the oven?", note: "← Gerald’s work" },
    board: { title: "Today's bake", next: "Next batch in", out: "sold out", done: "All batches are out. See you tomorrow at 7!", fresh: "fresh at" },
    shop: { title: "Breads & sweets", all: "Everything", tags: { vegan: "Vegan", gf: "Gluten-free", nutfree: "Nut-free" }, empty: "Nothing matches — try fewer filters.", sold: "Sold out" },
    how: { title: "How it's made", steps: [["Feed", "Gerald gets rye flour and water at 9 pm."], ["Wait", "Dough rests 14–48 hours in the cold."], ["Bake", "Stone oven, steam, 240 °C."]] },
    notes: "Notes from neighbours",
    visit: { title: "Find us", addr: "12 Linden Street, the door with the bell", hours: "Tue–Sun · 7:00–14:00", map: "hand-drawn map, not to scale" },
    foot: "Template by vibe-templates · fictional bakery · MIT",
  },
  ru: {
    nav: { menu: "Сегодня", shop: "Хлеб", visit: "Как найти" },
    hero: { k: "маленькая пекарня на Липовой улице", h1: "Испекли утром —", h2: "к обеду разберут.", lead: "Две печи, одна закваска по имени Геральд и короткое меню, которое меняется вместе с мукой.", cta: "Что сейчас в печи?", note: "← работа Геральда" },
    board: { title: "Сегодня в печи", next: "Следующая партия через", out: "нет в наличии", done: "Все партии вышли. Ждём завтра в 7!", fresh: "свежее в" },
    shop: { title: "Хлеб и сладкое", all: "Всё", tags: { vegan: "Веган", gf: "Без глютена", nutfree: "Без орехов" }, empty: "Ничего не подошло — уберите пару фильтров.", sold: "Разобрали" },
    how: { title: "Как мы печём", steps: [["Кормим", "Геральд получает ржаную муку и воду в 21:00."], ["Ждём", "Тесто отдыхает 14–48 часов в холоде."], ["Печём", "Каменная печь, пар, 240 °C."]] },
    notes: "Записки от соседей",
    visit: { title: "Как найти", addr: "Липовая улица, 12, дверь с колокольчиком", hours: "Вт–Вс · 7:00–14:00", map: "карта от руки, без масштаба" },
    foot: "Шаблон vibe-templates · вымышленная пекарня · MIT",
  },
};
