// All copy and data (EN + RU).
export const CONST = [
  { id: "orion", en: "Orion", ru: "Орион", season: { en: "winter", ru: "зима" } },
  { id: "ursa", en: "Big Dipper", ru: "Большой Ковш", season: { en: "all year", ru: "круглый год" } },
  { id: "cassiopeia", en: "Cassiopeia", ru: "Кассиопея", season: { en: "autumn", ru: "осень" } },
  { id: "cygnus", en: "Cygnus", ru: "Лебедь", season: { en: "summer", ru: "лето" } },
  { id: "polaris", en: "Polaris", ru: "Полярная", season: { en: "all year", ru: "круглый год" } },
];

export const EXHIBITS = [
  ["K-01", { en: "Vostok descent capsule (replica)", ru: "Спускаемый аппарат «Восток» (копия)" }, "1961", "I"],
  ["K-07", { en: "Hand-ground 24-inch telescope mirror", ru: "Зеркало телескопа 24 дюйма ручной шлифовки" }, "1932", "I"],
  ["K-12", { en: "Meteorite from the Sikhote-Alin fall", ru: "Метеорит Сихотэ-Алинь" }, "1947", "II"],
  ["K-19", { en: "Apollo-era navigation sextant", ru: "Навигационный секстант эпохи «Аполлона»" }, "1968", "II"],
  ["K-23", { en: "Star atlas plates, hand-coloured", ru: "Листы звёздного атласа, раскрашенные вручную" }, "1890", "III"],
  ["K-31", { en: "Live feed: solar telescope on the roof", ru: "Прямая трансляция: солнечный телескоп на крыше" }, "now", "III"],
];

export const SHOWS = [
  ["11:00", { en: "The sky tonight", ru: "Небо этой ночью" }, "30′"],
  ["13:30", { en: "Journey to the edge of the Solar System", ru: "Путешествие на край Солнечной системы" }, "45′"],
  ["16:00", { en: "How to read a star atlas", ru: "Как читать звёздный атлас" }, "40′"],
  ["19:30", { en: "Rooftop observing (weather permitting)", ru: "Наблюдения на крыше (если позволит погода)" }, "60′"],
];

export const T = {
  en: {
    nav: { atlas: "Atlas", halls: "Exhibits", shows: "Dome", visit: "Visit" },
    plate: "Tab. I · Northern celestial sphere · Epoch J2000",
    title: ["Look up.", "Then come", "inside."],
    lead: "Kepler Hall is a planetarium and museum of astronomy in an 1890s observatory. Three halls, one dome, and a telescope on the roof that anyone can look through on clear nights.",
    drag: "Drag to turn the sky. Pick a constellation to find it.",
    legend: "Magnitude", moon: "Moon tonight", phases: ["New moon", "Waxing crescent", "First quarter", "Waxing gibbous", "Full moon", "Waning gibbous", "Last quarter", "Waning crescent"],
    exhibits: { title: "Catalogue of exhibits", head: ["No.", "Object", "Date", "Hall"] },
    shows: { title: "Under the dome today" },
    visit: { title: "Visit", text: "Observatory Hill 1 · Tue–Sun 10:00–21:00 · rooftop telescope after dark on clear evenings.", free: "Entry to the halls is free. Dome shows are free for under-16s." },
    foot: "Template by vibe-templates · fictional museum · star positions J2000 (approx.) · MIT",
  },
  ru: {
    nav: { atlas: "Атлас", halls: "Экспонаты", shows: "Купол", visit: "Как прийти" },
    plate: "Табл. I · Северная небесная сфера · Эпоха J2000",
    title: ["Посмотрите", "вверх. Потом —", "заходите."],
    lead: "Kepler Hall — планетарий и музей астрономии в обсерватории 1890-х годов. Три зала, один купол и телескоп на крыше, в который ясными ночами может заглянуть каждый.",
    drag: "Тяните, чтобы повернуть небо. Выберите созвездие, чтобы найти его.",
    legend: "Звёздная величина", moon: "Луна сегодня", phases: ["Новолуние", "Растущий серп", "Первая четверть", "Растущая луна", "Полнолуние", "Убывающая луна", "Последняя четверть", "Убывающий серп"],
    exhibits: { title: "Каталог экспонатов", head: ["№", "Предмет", "Год", "Зал"] },
    shows: { title: "Под куполом сегодня" },
    visit: { title: "Как прийти", text: "Обсерваторный холм, 1 · Вт–Вс 10:00–21:00 · телескоп на крыше после заката в ясные вечера.", free: "Вход в залы свободный. Сеансы под куполом бесплатны до 16 лет." },
    foot: "Шаблон vibe-templates · вымышленный музей · координаты звёзд J2000 (прибл.) · MIT",
  },
};
