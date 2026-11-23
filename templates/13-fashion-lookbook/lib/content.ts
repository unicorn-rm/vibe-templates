// All copy and look data (EN + RU). Photos are hot-linked from Unsplash — swap the ids for your own shoot.
export type Lang = "en" | "ru";
export const img = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format`;

// select: circled in grease pencil · reject: crossed out
export interface Frame { id: string; no: string; select?: boolean; reject?: boolean; look: { en: string; ru: string }; pieces: { en: string; ru: string } }

export const ROLLS: { name: string; frames: Frame[] }[] = [
  { name: "ROLL 01 · PORTRA 400", frames: [
    { id: "1485968579580-b6d095142e6e", no: "01A", select: true, look: { en: "Look 01", ru: "Образ 01" }, pieces: { en: "Check wool coat, black wide trousers", ru: "Пальто в клетку, чёрные широкие брюки" } },
    { id: "1475180098004-ca77a66827be", no: "02A", reject: true, look: { en: "Look 02", ru: "Образ 02" }, pieces: { en: "Cream knit, suede boots", ru: "Кремовый свитер, замшевые сапоги" } },
    { id: "1487222477894-8943e31ef7b2", no: "03A", select: true, look: { en: "Look 03", ru: "Образ 03" }, pieces: { en: "Brown leather biker, sky shirt", ru: "Коричневая кожаная косуха, голубая рубашка" } },
    { id: "1503342217505-b0a15ec3261c", no: "04A", look: { en: "Look 04", ru: "Образ 04" }, pieces: { en: "Graphic tee, washed denim", ru: "Футболка с принтом, выбеленный деним" } },
    { id: "1488161628813-04466f872be2", no: "05A", select: true, look: { en: "Look 05", ru: "Образ 05" }, pieces: { en: "Rust chinos, black overshirt", ru: "Ржавые чиносы, чёрная куртка-рубашка" } },
    { id: "1469334031218-e382a71b716b", no: "06A", reject: true, look: { en: "Look 06", ru: "Образ 06" }, pieces: { en: "Green crochet top", ru: "Зелёный вязаный топ" } },
  ] },
  { name: "ROLL 02 · PORTRA 400", frames: [
    { id: "1506634572416-48cdfe530110", no: "07A", select: true, look: { en: "Look 07", ru: "Образ 07" }, pieces: { en: "Burgundy merino crew", ru: "Бордовый свитер из мериноса" } },
    { id: "1509631179647-0177331693ae", no: "08A", look: { en: "Look 08", ru: "Образ 08" }, pieces: { en: "Striped wide-leg trousers", ru: "Широкие брюки в полоску" } },
    { id: "1515886657613-9f3515b0c78f", no: "09A", select: true, look: { en: "Look 09", ru: "Образ 09" }, pieces: { en: "Mustard fleece set", ru: "Горчичный флисовый костюм" } },
    { id: "1520975954732-35dd22299614", no: "10A", reject: true, look: { en: "Look 10", ru: "Образ 10" }, pieces: { en: "Black leather jacket", ru: "Чёрная кожаная куртка" } },
    { id: "1529139574466-a303027c1d8b", no: "11A", look: { en: "Look 11", ru: "Образ 11" }, pieces: { en: "Red jersey, black coat", ru: "Красная трикотажная кофта, чёрное пальто" } },
    { id: "1539109136881-3be0616acf4b", no: "12A", select: true, look: { en: "Look 12", ru: "Образ 12" }, pieces: { en: "Powder-blue trench", ru: "Пудрово-голубой тренч" } },
  ] },
];

export const HERO = "1524504388940-b1c1722653e1";
export const SECOND = "1534528741775-53994a69daeb";

const en = {
  nav: { sheets: "Contact sheets", pieces: "The pieces", notes: "Notes", showroom: "Showroom" },
  season: "SS27 · Off-Season",
  title: ["Clothes for the", "weeks nobody", "photographs."],
  lead: "OSTEN makes quiet clothes for March, late September and every grey Tuesday in between. This season was shot on two rolls of film in one afternoon. We kept the contact sheets.",
  sheets: { title: "Contact sheets", sub: "Circled frames made the cut. Click any frame to look through the loupe.", selects: "selects" },
  loupe: { close: "Close", prev: "Previous frame", next: "Next frame", kept: "Selected", cut: "Cut", maybe: "Kept for archive" },
  pieces: { title: "The pieces", head: ["Look", "Pieces", "Frame"] },
  notes: { quote: "“We wanted a collection that looks better on the third wear than on the first.”", by: "— Lena Osten, founder", p: "Undyed wool from one farm in Tyrol, cotton woven in Porto, buttons from a family workshop in Brno. Small runs, no discounts, repairs for life." },
  showroom: { title: "Showroom", addr: "Kastanienallee 42, Berlin · Thursdays and Fridays, 12–19", note: "Walk in. Tea is free, nobody will ask what you're looking for." },
  foot: "Template by vibe-templates · fictional brand · photos: Unsplash · MIT",
};
const ru: typeof en = {
  nav: { sheets: "Контактные листы", pieces: "Вещи", notes: "Заметки", showroom: "Шоурум" },
  season: "ВЛ27 · Межсезонье",
  title: ["Одежда для", "недель, которые", "никто не снимает."],
  lead: "OSTEN шьёт тихую одежду для марта, конца сентября и каждого серого вторника между ними. Сезон сняли на две плёнки за один день. Контактные листы мы сохранили.",
  sheets: { title: "Контактные листы", sub: "Обведённые кадры вошли в отбор. Нажмите на любой кадр, чтобы посмотреть через лупу.", selects: "в отборе" },
  loupe: { close: "Закрыть", prev: "Предыдущий кадр", next: "Следующий кадр", kept: "В отборе", cut: "Вырезан", maybe: "В архив" },
  pieces: { title: "Вещи", head: ["Образ", "Вещи", "Кадр"] },
  notes: { quote: "«Мы хотели коллекцию, которая на третьей носке выглядит лучше, чем на первой».", by: "— Лена Остен, основательница", p: "Некрашеная шерсть с одной фермы в Тироле, хлопок, сотканный в Порту, пуговицы из семейной мастерской в Брно. Малые тиражи, без скидок, ремонт пожизненно." },
  showroom: { title: "Шоурум", addr: "Кастаниеналлее, 42, Берлин · по четвергам и пятницам, 12–19", note: "Заходите без записи. Чай бесплатно, никто не спросит, что вы ищете." },
  foot: "Шаблон vibe-templates · вымышленный бренд · фото: Unsplash · MIT",
};
export const CONTENT = { en, ru };
export type Copy = typeof en;
