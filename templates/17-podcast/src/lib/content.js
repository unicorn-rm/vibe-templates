// All copy and episodes (EN + RU). Each episode sits at a "frequency" on the dial (88–108).
export const EPISODES = [
  { f: 89.4, no: 41, len: "52:10", t: { en: "The radio that outlived its factory", ru: "Радио, пережившее свой завод" }, d: { en: "Why a 1958 receiver still works and its maker doesn't.", ru: "Почему приёмник 1958 года работает, а его производителя уже нет." } },
  { f: 92.7, no: 42, len: "47:33", t: { en: "Repair cafés and the right to fix", ru: "Ремонтные кафе и право чинить" }, d: { en: "Saturdays with volunteers who refuse to throw things away.", ru: "Субботы с волонтёрами, которые отказываются выбрасывать вещи." } },
  { f: 96.1, no: 43, len: "58:02", t: { en: "Ten principles, sixty years later", ru: "Десять принципов шестьдесят лет спустя" }, d: { en: "Re-reading “good design” rules against today's gadgets.", ru: "Перечитываем правила «хорошего дизайна» на фоне сегодняшних гаджетов." } },
  { f: 99.8, no: 44, len: "39:45", t: { en: "Software that asks for nothing", ru: "Программы, которые ничего не просят" }, d: { en: "No accounts, no updates, no notifications. Does it still exist?", ru: "Без аккаунтов, обновлений и уведомлений. Такое ещё бывает?" } },
  { f: 103.5, no: 45, len: "61:20", t: { en: "The 30-year kettle", ru: "Чайник на 30 лет" }, d: { en: "Designing appliances for grandchildren, with an industrial designer.", ru: "С промышленным дизайнером — о технике, которую проектируют для внуков." } },
  { f: 106.9, no: 46, len: "44:12", t: { en: "Quiet machines", ru: "Тихие машины" }, d: { en: "Fans, fridges and hard drives: the noise we stopped hearing.", ru: "Вентиляторы, холодильники и диски: шум, который мы перестали слышать." } },
];

export const HOSTS = [
  { n: "Mara Lindqvist", r: { en: "Host, former product designer", ru: "Ведущая, бывший продуктовый дизайнер" } },
  { n: "Otto Brenner", r: { en: "Co-host, repairs everything", ru: "Соведущий, чинит всё" } },
];

export const T = {
  en: {
    nav: { radio: "Tune in", guide: "Programme", hosts: "Hosts" },
    model: "LW 1 · Long Wave receiver",
    tag: "A podcast about slow technology — things made to last, and the people who keep them going.",
    dial: { hint: "Drag the dial or use ← → to tune", tuned: "On air", between: "Searching…", play: "Power", off: "Off", sound: "Sound is synthesised in your browser." },
    guide: { title: "Programme guide", ep: "Ep." },
    hosts: { title: "On the microphone" },
    listen: "Listen on",
    foot: "Template by vibe-templates · fictional podcast · MIT",
  },
  ru: {
    nav: { radio: "Настроиться", guide: "Программа", hosts: "Ведущие" },
    model: "LW 1 · Приёмник «Длинная волна»",
    tag: "Подкаст о медленных технологиях — о вещах, сделанных на века, и о людях, которые не дают им сломаться.",
    dial: { hint: "Крутите ручку или нажимайте ← →", tuned: "В эфире", between: "Поиск…", play: "Вкл.", off: "Выкл.", sound: "Звук синтезируется в браузере." },
    guide: { title: "Программа передач", ep: "Вып." },
    hosts: { title: "У микрофона" },
    listen: "Слушать в",
    foot: "Шаблон vibe-templates · вымышленный подкаст · MIT",
  },
};
