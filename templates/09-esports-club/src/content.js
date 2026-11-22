// All copy and data (EN + RU). Components only render this.
export const CLUB = { short: "NOVA", full: "NOVA E.C.", est: "1998" };

export const TEAMS = ["Nova", "Kraken", "Vortex", "Ronin", "Phantom", "Echo", "Titan", "Hydra"];
// Quarter-final scores, in bracket order. Winners advance automatically.
export const QF = [[13, 9], [11, 13], [13, 7], [8, 13]];
export const SF = [[13, 11], [10, 13]];
export const FINAL = [2, 1]; // best of 3

// League table: team, played, won, drawn, lost
export const TABLE = [["Nova", 14, 11, 1, 2], ["Hydra", 14, 10, 2, 2], ["Vortex", 14, 8, 3, 3], ["Kraken", 14, 7, 2, 5], ["Titan", 14, 5, 3, 6], ["Echo", 14, 3, 2, 9]];

export const SQUAD = [
  { no: 7, nick: "vexa", name: "Vera Okafor", role: { en: "Entry", ru: "Энтри" }, kd: 1.38, win: 64, hs: 58 },
  { no: 4, nick: "m0ss", name: "Mikko Salo", role: { en: "Support", ru: "Саппорт" }, kd: 1.02, win: 61, hs: 44 },
  { no: 11, nick: "Kairo", name: "Kai Rodrigues", role: { en: "AWP", ru: "Снайпер" }, kd: 1.51, win: 66, hs: 71 },
  { no: 1, nick: "lumen", name: "Lu Meng", role: { en: "Captain", ru: "Капитан" }, kd: 0.97, win: 63, hs: 39 },
];

export const SPONSORS = ["Hollowfield", "Kite Energy", "North Byte", "Parcelo", "Grain Audio"];

export const T = {
  en: {
    nav: { fixture: "Tonight", table: "Table", bracket: "Cup", squad: "Squad" },
    cover: { prog: "Official matchday programme", no: "No. 07", price: "Free", season: "Season 2026/27", est: "Est.", title: ["Play", "for the", "badge"], lead: "An esports club with a home ground: 60 stations, a stage, a bootcamp — and a first team that trains here every night." },
    fixture: { label: "Tonight's fixture", vs: "vs", game: "Counter-Strike 2 · Best of 3", ko: "Kick-off", where: "Venue", venue: "Home ground, Stage A", info: "Free entry for members · doors 18:30" },
    table: { title: "League table", head: ["Pos", "Club", "P", "W", "D", "L", "Pts"] },
    bracket: { title: "Winter Cup", qf: "Quarter-finals", sf: "Semi-finals", f: "Final", champ: "Winner", hint: "Click a team to trace its path" },
    squad: { title: "First team", kd: "K/D", win: "Win %", hs: "HS %" },
    ground: { title: "Ground guide", items: [["A", "Arena", "40 stations · 360 Hz · stage with LED wall"], ["B", "Bootcamp", "10 private seats, coach desk, VOD screen"], ["C", "Console lounge", "PS5, Switch, fight sticks"], ["D", "Studio", "Streaming booths and capture"]] },
    join: { title: "Pull on the shirt.", text: "Members play Saturday cups, train with our coaches and get in free on matchdays.", btn: "Join on Discord" },
    sponsors: "Club partners",
    foot: "Template by vibe-templates · fictional club · MIT",
  },
  ru: {
    nav: { fixture: "Сегодня", table: "Таблица", bracket: "Кубок", squad: "Состав" },
    cover: { prog: "Официальная программа матча", no: "№ 07", price: "Бесплатно", season: "Сезон 2026/27", est: "Осн.", title: ["Играй", "за свой", "герб"], lead: "Киберспортивный клуб со своим стадионом: 60 мест, сцена, буткемп — и основной состав, который тренируется здесь каждый вечер." },
    fixture: { label: "Матч дня", vs: "против", game: "Counter-Strike 2 · до двух побед", ko: "Начало", where: "Где", venue: "Домашняя арена, сцена A", info: "Для членов клуба вход свободный · открытие в 18:30" },
    table: { title: "Турнирная таблица", head: ["Место", "Клуб", "И", "В", "Н", "П", "О"] },
    bracket: { title: "Зимний кубок", qf: "Четвертьфинал", sf: "Полуфинал", f: "Финал", champ: "Победитель", hint: "Нажмите на команду, чтобы увидеть её путь" },
    squad: { title: "Основной состав", kd: "K/D", win: "Побед %", hs: "Хедшоты %" },
    ground: { title: "Схема клуба", items: [["A", "Арена", "40 мест · 360 Гц · сцена с LED-экраном"], ["B", "Буткемп", "10 закрытых мест, стол тренера, экран разбора"], ["C", "Консоли", "PS5, Switch, аркадные стики"], ["D", "Студия", "Кабины для стримов и захват"]] },
    join: { title: "Надень форму.", text: "Члены клуба играют субботние кубки, тренируются с нашими тренерами и проходят на матчи бесплатно.", btn: "Вступить в Discord" },
    sponsors: "Партнёры клуба",
    foot: "Шаблон vibe-templates · вымышленный клуб · MIT",
  },
};
