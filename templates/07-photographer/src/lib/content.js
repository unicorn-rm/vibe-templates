// All copy and photo data (EN + RU). Photos are hot-linked from Unsplash — replace `id`s or use your own URLs.
export const img = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format`;

export const SERIES = [
  { id: "fog", en: "Fog", ru: "Туман" },
  { id: "water", en: "Water", ru: "Вода" },
  { id: "heights", en: "Heights", ru: "Высота" },
  { id: "people", en: "Portraits", ru: "Портреты" },
];

// ratio = height / width, used to reserve space before images load
export const PHOTOS = [
  { id: "1418065460487-3e41a6c84dc5", s: "fog", r: 0.67, t: { en: "Spruce line, 6 am", ru: "Ельник, 6 утра" }, exif: "Fujifilm GFX 100S · 110 mm · f/5.6 · ISO 200", place: "Karelia" },
  { id: "1505765050516-f72dcac9c60e", s: "heights", r: 0.66, t: { en: "Ridge above the cloud", ru: "Гребень над облаком" }, exif: "Leica Q3 · 28 mm · f/8 · ISO 100", place: "Dolomites" },
  { id: "1494500764479-0c8f2919a3d8", s: "water", r: 0.75, t: { en: "The lone tree", ru: "Одинокое дерево" }, exif: "Sony A7R V · 35 mm · f/11 · 30 s", place: "Wanaka" },
  { id: "1517841905240-472988babdf9", s: "people", r: 1.25, t: { en: "Mira, blue wall", ru: "Мира у синей стены" }, exif: "Canon R5 · 50 mm · f/1.8 · ISO 100", place: "Lisbon" },
  { id: "1500534314209-a25ddb2bd429", s: "fog", r: 0.6, t: { en: "Layers", ru: "Слои" }, exif: "Fujifilm GFX 100S · 250 mm · f/8 · ISO 400", place: "Tuscany" },
  { id: "1480497490787-505ec076689f", s: "water", r: 0.67, t: { en: "Mirror lake", ru: "Зеркальное озеро" }, exif: "Sony A7R V · 24 mm · f/9 · ISO 64", place: "Lago di Braies" },
  { id: "1519681393784-d120267933ba", s: "heights", r: 0.67, t: { en: "Milky way over the pass", ru: "Млечный путь над перевалом" }, exif: "Nikon Z7 II · 14 mm · f/2.8 · 20 s", place: "Altai" },
  { id: "1441974231531-c6227db76b6e", s: "fog", r: 1.3, t: { en: "Forest path", ru: "Лесная тропа" }, exif: "Leica Q3 · 28 mm · f/4 · ISO 800", place: "Black Forest" },
  { id: "1500648767791-00dcc994a43e", s: "people", r: 1.2, t: { en: "Andrej, studio", ru: "Андрей, студия" }, exif: "Hasselblad X2D · 90 mm · f/4 · ISO 64", place: "Studio" },
  { id: "1501785888041-af3ef285b470", s: "water", r: 0.67, t: { en: "Boat at noon", ru: "Лодка в полдень" }, exif: "Sony A7R V · 35 mm · f/8 · ISO 100", place: "Lago di Braies" },
  { id: "1464822759023-fed622ff2c3b", s: "heights", r: 0.66, t: { en: "Valley of cedars", ru: "Долина кедров" }, exif: "Nikon Z7 II · 24 mm · f/10 · ISO 64", place: "Banff" },
  { id: "1507525428034-b723cf961d3e", s: "water", r: 0.67, t: { en: "Low tide", ru: "Отлив" }, exif: "Fujifilm X-T5 · 16 mm · f/11 · ISO 125", place: "Algarve" },
  { id: "1494790108377-be9c29b29330", s: "people", r: 1.25, t: { en: "Lea laughing", ru: "Леа смеётся" }, exif: "Canon R5 · 85 mm · f/1.4 · ISO 200", place: "Berlin" },
  { id: "1506905925346-21bda4d32df4", s: "heights", r: 0.6, t: { en: "Above the inversion", ru: "Над инверсией" }, exif: "Leica Q3 · 28 mm · f/8 · ISO 100", place: "Caucasus" },
  { id: "1426604966848-d7adac402bff", s: "heights", r: 0.66, t: { en: "Granite and pine", ru: "Гранит и сосна" }, exif: "Fujifilm GFX 100S · 45 mm · f/11 · ISO 100", place: "Yosemite" },
];

export const PORTRAIT = "1438761681033-6461ffad8d80";

export const T = {
  en: {
    nav: { work: "Work", about: "About", contact: "Contact" },
    hero: { role: "Photographer", line: "Landscapes that hold their breath, and people who don't." },
    filter: { all: "All" },
    lb: { close: "Close", prev: "Previous", next: "Next", hint: "← → to browse · Esc to close" },
    about: {
      title: "About",
      p1: "I'm Ines, a photographer based in Lisbon. I spend half the year in mountains and on lakes waiting for weather, and the other half in a small studio photographing people who would rather not be photographed.",
      p2: "My work has been published in Kinfolk, Monocle and National Geographic Traveller. I shoot medium format, print on cotton paper and answer every email myself.",
      clients: "Selected clients", ex: "Exhibitions",
    },
    exhibitions: [["2026", "Holding Breath", "Lisbon, MAAT"], ["2025", "Fog Index", "Berlin, C/O"], ["2023", "Faces, Unposed", "Oslo, Fotogalleriet"]],
    contact: { title: "Let's make something quiet.", note: "Editorial, portraits and travel commissions worldwide." },
    foot: "Template by vibe-templates · photos: Unsplash · MIT",
  },
  ru: {
    nav: { work: "Работы", about: "Обо мне", contact: "Контакты" },
    hero: { role: "Фотограф", line: "Пейзажи, затаившие дыхание, и люди, которые не умеют его задерживать." },
    filter: { all: "Все" },
    lb: { close: "Закрыть", prev: "Назад", next: "Вперёд", hint: "← → листать · Esc закрыть" },
    about: {
      title: "Обо мне",
      p1: "Я Инес, фотограф из Лиссабона. Полгода провожу в горах и на озёрах в ожидании погоды, а другие полгода — в маленькой студии, где снимаю людей, которые не любят сниматься.",
      p2: "Мои работы публиковали Kinfolk, Monocle и National Geographic Traveller. Снимаю на средний формат, печатаю на хлопковой бумаге и сама отвечаю на каждое письмо.",
      clients: "Клиенты", ex: "Выставки",
    },
    exhibitions: [["2026", "Затаив дыхание", "Лиссабон, MAAT"], ["2025", "Индекс тумана", "Берлин, C/O"], ["2023", "Лица без позы", "Осло, Fotogalleriet"]],
    contact: { title: "Давайте снимем что-то тихое.", note: "Редакционные съёмки, портреты и путешествия по всему миру." },
    foot: "Шаблон vibe-templates · фото: Unsplash · MIT",
  },
};

export const CLIENTS = ["Kinfolk", "Monocle", "Aesop", "COS", "Patagonia", "NatGeo Traveller"];
