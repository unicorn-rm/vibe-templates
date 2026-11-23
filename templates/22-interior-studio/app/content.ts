// All copy and material data (EN + RU).
export type L = { en: string; ru: string };

// A material is a swatch: base colour + a texture kind used by the room drawing.
export interface Material { id: string; name: L; spec: string; color: string; texture: "wood" | "linen" | "terrazzo" | "plaster" | "metal" | "wool" | "stone" }

export const MATERIALS: Record<string, Material> = {
  oak: { id: "oak", name: { en: "Smoked oak", ru: "Мореный дуб" }, spec: "FL-01 · 180 mm plank", color: "#8a6a4a", texture: "wood" },
  ash: { id: "ash", name: { en: "White ash", ru: "Белый ясень" }, spec: "FL-02 · oiled", color: "#cdb896", texture: "wood" },
  linen: { id: "linen", name: { en: "Raw linen", ru: "Сырой лён" }, spec: "TX-04 · 320 g/m²", color: "#ddd3bf", texture: "linen" },
  wool: { id: "wool", name: { en: "Charcoal wool", ru: "Графитовая шерсть" }, spec: "TX-09 · bouclé", color: "#4a4744", texture: "wool" },
  plaster: { id: "plaster", name: { en: "Clay plaster", ru: "Глиняная штукатурка" }, spec: "WL-02 · lime-clay", color: "#e6dccb", texture: "plaster" },
  sage: { id: "sage", name: { en: "Lichen plaster", ru: "Штукатурка «лишайник»" }, spec: "WL-05 · tinted", color: "#a9ad9a", texture: "plaster" },
  smoke: { id: "smoke", name: { en: "Smoke plaster", ru: "Штукатурка «дым»" }, spec: "WL-07 · tinted", color: "#8f8a83", texture: "plaster" },
  terrazzo: { id: "terrazzo", name: { en: "Terrazzo", ru: "Терраццо" }, spec: "FL-06 · 20 mm slab", color: "#d8d2c6", texture: "terrazzo" },
  brass: { id: "brass", name: { en: "Brushed brass", ru: "Шлифованная латунь" }, spec: "MT-01 · unlacquered", color: "#b8954a", texture: "metal" },
  rust: { id: "rust", name: { en: "Rust linen", ru: "Лён «ржавчина»" }, spec: "TX-11 · washed", color: "#a5583a", texture: "linen" },
  slate: { id: "slate", name: { en: "Slate", ru: "Сланец" }, spec: "FL-08 · honed", color: "#5d6266", texture: "stone" },
};

// A scheme assigns a material to every surface in the room drawing.
export const SCHEMES = [
  { id: "kyoto", name: { en: "Kyoto morning", ru: "Утро в Киото" }, note: { en: "Pale ash, clay walls, raw linen — light and quiet.", ru: "Светлый ясень, глиняные стены, сырой лён — светло и тихо." },
    wall: "plaster", floor: "ash", sofa: "linen", rug: "wool", lamp: "brass" },
  { id: "baltic", name: { en: "Baltic oak", ru: "Балтийский дуб" }, note: { en: "Smoked oak and lichen walls for a northern flat.", ru: "Мореный дуб и стены цвета лишайника для северной квартиры." },
    wall: "sage", floor: "oak", sofa: "wool", rug: "linen", lamp: "brass" },
  { id: "clay", name: { en: "Clay & smoke", ru: "Глина и дым" }, note: { en: "Terrazzo, smoke plaster and one rust linen sofa.", ru: "Терраццо, дымчатая штукатурка и один диван из рыжего льна." },
    wall: "smoke", floor: "terrazzo", sofa: "rust", rug: "slate", lamp: "brass" },
] as const;

export const SURFACES = ["wall", "floor", "sofa", "rug", "lamp"] as const;

export const T = {
  en: {
    nav: { board: "Material board", work: "Work", process: "Process", contact: "Contact" },
    k: "Interior architecture · Riga & Helsinki",
    h: "Interiors that start with what you touch.",
    lead: "We design homes from the material up: we choose the floor, the plaster and the cloth before we draw a single wall. The rest follows.",
    board: { title: "Sample board", hint: "Pick a scheme — the room is re-dressed in its materials.", surfaces: { wall: "Walls", floor: "Floor", sofa: "Sofa", rug: "Rug", lamp: "Lamp" }, spec: "Specification" },
    work: { title: "Selected work", items: [["Forest flat", "Riga · 64 m² · 2025"], ["Harbour loft", "Helsinki · 112 m² · 2024"], ["Grandmother's dacha", "Jūrmala · 48 m² · 2023"]] },
    process: { title: "Process", steps: [["Listen", "Two visits, no drawings. How do you live at 7 am and at 11 pm?"], ["Touch", "A physical sample box arrives at your door."], ["Draw", "Plans and elevations only after the materials are agreed."], ["Build", "We stay on site until the last shelf is level."]] },
    contact: { title: "Write to us", text: "studio@example.com · we answer within two working days.", note: "Small studio: four projects a year." },
    foot: "Template by vibe-templates · fictional studio · MIT",
  },
  ru: {
    nav: { board: "Планшет материалов", work: "Проекты", process: "Процесс", contact: "Контакты" },
    k: "Архитектура интерьера · Рига и Хельсинки",
    h: "Интерьеры, которые начинаются с того, к чему прикасаешься.",
    lead: "Мы проектируем дом от материала: сначала выбираем пол, штукатурку и ткань, и только потом рисуем первую стену. Остальное следует из этого.",
    board: { title: "Планшет образцов", hint: "Выберите схему — комната переоденется в её материалы.", surfaces: { wall: "Стены", floor: "Пол", sofa: "Диван", rug: "Ковёр", lamp: "Светильник" }, spec: "Спецификация" },
    work: { title: "Избранные проекты", items: [["Лесная квартира", "Рига · 64 м² · 2025"], ["Лофт у гавани", "Хельсинки · 112 м² · 2024"], ["Бабушкина дача", "Юрмала · 48 м² · 2023"]] },
    process: { title: "Процесс", steps: [["Слушаем", "Два визита без чертежей. Как вы живёте в 7 утра и в 11 вечера?"], ["Трогаем", "К вам приезжает коробка с настоящими образцами."], ["Рисуем", "Планы и развёртки — только после того, как материалы согласованы."], ["Строим", "Остаёмся на объекте, пока не выровнена последняя полка."]] },
    contact: { title: "Напишите нам", text: "studio@example.com · отвечаем в течение двух рабочих дней.", note: "Маленькая студия: четыре проекта в год." },
    foot: "Шаблон vibe-templates · вымышленная студия · MIT",
  },
};
