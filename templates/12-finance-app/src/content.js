// All copy and data (EN + RU). Components only render this.
export const ENVELOPES = [
  { k: "rent", budget: 900, spent: 900 },
  { k: "food", budget: 420, spent: 311 },
  { k: "travel", budget: 150, spent: 58 },
  { k: "fun", budget: 120, spent: 131 },
];

// sample ledger lines for the hero page: [date, description key, amount]
export const ENTRIES = [
  ["01.11", "salary", 2850], ["01.11", "rent", -900], ["03.11", "groceries", -64.2],
  ["07.11", "bike", -38], ["12.11", "groceries", -71.9], ["15.11", "savings", -300],
];

export const T = {
  en: {
    nav: { calc: "Calculator", env: "Envelopes", why: "Why Tally", faq: "Questions" },
    get: "Get the app",
    hero: {
      folio: "Folio 11 · November",
      title: "Know where every coin went.",
      lead: "Tally is a money app that works like a paper ledger: every entry on its own line, every month closed and balanced. No feeds, no stock tips, no confetti.",
      cols: ["Date", "Entry", "In", "Out"],
      desc: { salary: "Salary", rent: "Rent", groceries: "Groceries", bike: "Bike repair", savings: "To savings" },
      balance: "Balance carried forward", stamp: "Balanced",
    },
    calc: {
      title: "What saving a little does",
      monthly: "Put aside each month", rate: "Annual interest", years: "For how many years",
      cols: ["Year", "Put in", "Interest", "Total"],
      chart: "Total vs. what you put in", total: "Total", paid: "Put in",
      note: "Illustration only — compound interest, monthly deposits. Not financial advice.",
    },
    env: {
      title: "Envelopes, like your grandmother had",
      lead: "Split the month into envelopes. When one is empty, it's empty — Tally shows it plainly instead of nudging you to borrow.",
      names: { rent: "Rent", food: "Food", travel: "Transport", fun: "Fun" },
      left: "left", over: "over",
    },
    why: {
      title: "Why Tally",
      rows: [
        ["Works offline, data stays on your phone", "yes"],
        ["Bank sync (optional, read-only)", "yes"],
        ["Ads, upsells, 'premium insights'", "none"],
        ["Monthly close with a printable statement", "yes"],
        ["Shared ledger for two", "yes"],
        ["Investment advice", "never"],
      ],
    },
    faq: {
      title: "Questions",
      items: [
        ["Is it free?", "Yes. Tally is open source; the optional sync costs what the server costs us."],
        ["Does it connect to my bank?", "Only if you want, and only to read transactions. Typing by hand is the default — that's half the point."],
        ["Can I export?", "CSV and a PDF statement for every month, any time."],
      ],
    },
    foot: "Template by vibe-templates · fictional app · MIT · Not financial advice.",
  },
  ru: {
    nav: { calc: "Калькулятор", env: "Конверты", why: "Почему Tally", faq: "Вопросы" },
    get: "Скачать",
    hero: {
      folio: "Лист 11 · Ноябрь",
      title: "Знайте, куда ушла каждая монета.",
      lead: "Tally — приложение для денег, которое работает как бумажная бухгалтерская книга: каждая запись на своей строке, каждый месяц закрыт и сведён. Никаких лент, советов по акциям и конфетти.",
      cols: ["Дата", "Запись", "Приход", "Расход"],
      desc: { salary: "Зарплата", rent: "Аренда", groceries: "Продукты", bike: "Ремонт велосипеда", savings: "В копилку" },
      balance: "Остаток на конец", stamp: "Сведено",
    },
    calc: {
      title: "Что даёт понемногу откладывать",
      monthly: "Откладывать в месяц", rate: "Годовой процент", years: "Сколько лет",
      cols: ["Год", "Вложено", "Проценты", "Итого"],
      chart: "Итог против вложенного", total: "Итого", paid: "Вложено",
      note: "Только иллюстрация — сложный процент, ежемесячные взносы. Не финансовая рекомендация.",
    },
    env: {
      title: "Конверты, как у бабушки",
      lead: "Разложите месяц по конвертам. Если конверт пуст — он пуст: Tally честно показывает это, а не подталкивает занять.",
      names: { rent: "Аренда", food: "Еда", travel: "Транспорт", fun: "Развлечения" },
      left: "осталось", over: "перерасход",
    },
    why: {
      title: "Почему Tally",
      rows: [
        ["Работает без сети, данные остаются в телефоне", "да"],
        ["Синхронизация с банком (по желанию, только чтение)", "да"],
        ["Реклама, допродажи, «премиум-аналитика»", "нет"],
        ["Закрытие месяца с выпиской для печати", "да"],
        ["Общая книга на двоих", "да"],
        ["Инвестиционные советы", "никогда"],
      ],
    },
    faq: {
      title: "Вопросы",
      items: [
        ["Это бесплатно?", "Да. Tally — open source; необязательная синхронизация стоит столько, сколько стоит нам сервер."],
        ["Он подключается к банку?", "Только если захотите, и только на чтение. По умолчанию записи вносятся руками — в этом половина смысла."],
        ["Можно выгрузить данные?", "CSV и PDF-выписка за любой месяц, в любой момент."],
      ],
    },
    foot: "Шаблон vibe-templates · вымышленное приложение · MIT · Не финансовая рекомендация.",
  },
};
