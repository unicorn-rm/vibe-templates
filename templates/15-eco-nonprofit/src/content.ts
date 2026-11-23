// All copy and data. Every string is { en, ru }; <T> renders both and CSS shows one.
export type L = { en: string; ru: string };

// One ring per year: trees planted that year and survival rate after 2 seasons.
export const RINGS = [
  { y: 2018, trees: 1200, survival: 71 },
  { y: 2019, trees: 3400, survival: 74 },
  { y: 2020, trees: 2100, survival: 78 },
  { y: 2021, trees: 6800, survival: 81 },
  { y: 2022, trees: 9300, survival: 83 },
  { y: 2023, trees: 12600, survival: 86 },
  { y: 2024, trees: 15100, survival: 85 },
  { y: 2025, trees: 18900, survival: 88 },
  { y: 2026, trees: 21400, survival: 89 },
];

// Plots on the contour map, x/y in % of the map box
export const PLOTS = [
  { id: "A", x: 24, y: 30, ha: 42, name: { en: "Burnt ridge", ru: "Горелый хребет" }, note: { en: "Larch and birch after the 2017 fire.", ru: "Лиственница и берёза после пожара 2017 года." } },
  { id: "B", x: 58, y: 22, ha: 18, name: { en: "Spring valley", ru: "Родниковая долина" }, note: { en: "Alder along the stream to hold the banks.", ru: "Ольха вдоль ручья, чтобы держать берега." } },
  { id: "C", x: 70, y: 62, ha: 65, name: { en: "Old clear-cut", ru: "Старая вырубка" }, note: { en: "Mixed spruce, oak and rowan, deer fencing.", ru: "Смешанные ель, дуб и рябина, ограда от оленей." } },
  { id: "D", x: 34, y: 72, ha: 27, name: { en: "School plot", ru: "Школьный участок" }, note: { en: "Planted and measured by two village schools.", ru: "Сажают и измеряют две сельские школы." } },
];

export const SPECIES = [
  { latin: "Larix sibirica", name: { en: "Siberian larch", ru: "Лиственница сибирская" }, count: 31200, why: { en: "first to return after fire", ru: "первой возвращается после пожара" } },
  { latin: "Betula pendula", name: { en: "Silver birch", ru: "Берёза повислая" }, count: 22800, why: { en: "fast shade for the slow ones", ru: "быстрая тень для медленных" } },
  { latin: "Quercus robur", name: { en: "English oak", ru: "Дуб черешчатый" }, count: 9600, why: { en: "slow, deep roots, 500 years", ru: "медленный, глубокие корни, 500 лет" } },
  { latin: "Sorbus aucuparia", name: { en: "Rowan", ru: "Рябина" }, count: 6100, why: { en: "food for birds that bring seeds", ru: "корм для птиц, которые приносят семена" } },
];

export const LOG = [
  { d: "2026-10-14", t: { en: "Plot C, autumn count: 1,184 of 1,320 saplings alive. Deer fence holding.", ru: "Участок C, осенний пересчёт: живы 1 184 из 1 320 саженцев. Ограда держит." } },
  { d: "2026-09-02", t: { en: "School plot measured by 4th graders. Tallest oak: 1.42 m.", ru: "Школьный участок измерили четвероклассники. Самый высокий дуб — 1,42 м." } },
  { d: "2026-06-21", t: { en: "Dry June. Volunteers carried 3 tonnes of water up the ridge.", ru: "Сухой июнь. Волонтёры подняли на хребет 3 тонны воды." } },
];

export const T = {
  nav: [["#rings", { en: "Impact", ru: "Итоги" }], ["#plots", { en: "Plots", ru: "Участки" }], ["#species", { en: "Species", ru: "Породы" }], ["#log", { en: "Field log", ru: "Журнал" }]] as [string, L][],
  survey: { en: "Field survey · Sheet 07 · Lake district", ru: "Полевое обследование · Лист 07 · Озёрный край" },
  title: { en: "We plant forests, then we come back to count them.", ru: "Мы сажаем леса, а потом возвращаемся их пересчитать." },
  lead: { en: "Second Growth is a small nonprofit restoring burnt and logged land with native trees. Every sapling has a plot, every plot has a survey, and every survey is published — including the ones that went badly.", ru: "Second Growth — небольшая некоммерческая организация, которая восстанавливает гари и вырубки местными породами. У каждого саженца есть участок, у каждого участка — обследование, и каждое обследование публикуется, даже неудачное." },
  ringsTitle: { en: "Nine years, nine rings", ru: "Девять лет — девять колец" },
  ringsHint: { en: "Each ring is a year. Width is how many trees went into the ground. Tap a ring.", ru: "Каждое кольцо — год. Ширина — сколько деревьев посадили. Нажмите на кольцо." },
  planted: { en: "trees planted", ru: "деревьев посажено" },
  survived: { en: "alive after two seasons", ru: "живы через два сезона" },
  total: { en: "in total", ru: "всего" },
  plotsTitle: { en: "Plots", ru: "Участки" },
  ha: { en: "ha", ru: "га" },
  speciesTitle: { en: "What we plant", ru: "Что мы сажаем" },
  logTitle: { en: "Field log", ru: "Полевой журнал" },
  join: { en: "Planting days run in April and October. Write to plant@example.org — bring boots, we bring spades and soup.", ru: "Дни посадки — в апреле и октябре. Пишите на plant@example.org: с вас сапоги, с нас лопаты и суп." },
  foot: { en: "Template by vibe-templates · fictional organisation · MIT", ru: "Шаблон vibe-templates · вымышленная организация · MIT" },
};
