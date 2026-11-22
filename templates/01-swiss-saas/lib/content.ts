// All copy for the page, in English and Russian. Components only render this.
export type Lang = "en" | "ru";

const en = {
  nav: { features: "Features", how: "How it works", changelog: "Changelog", pricing: "Pricing", faq: "FAQ", cta: "Try the demo" },
  hero: {
    kicker: "Gridline 2.4 — now with cycles",
    title: ["Plan less.", "Ship more"],
    lead: "Gridline is a planning tool for product teams of 3 to 30. One board, one rhythm, zero ceremony.",
    primary: "Start free", secondary: "Watch 2-min tour",
    meta: [["Teams", "4,200+"], ["Median setup", "6 min"], ["Uptime 2026", "99.98%"]],
  },
  board: { cols: ["Backlog", "This cycle", "In review", "Shipped"], add: "New issue" },
  logos: "Trusted by quiet, fast teams",
  features: {
    n: "01", title: "Everything in one grid",
    items: {
      palette: { t: "Command palette", d: "Every action is two keystrokes away. Create, assign, move — without touching the mouse.", typing: "assign to mira" },
      cycles: { t: "Cycles, not sprints", d: "Two-week rhythms that roll over automatically. Unfinished work moves on, no guilt." },
      burn: { t: "Honest progress", d: "Scope changes are drawn on the chart, so nobody pretends the line went down." },
      keys: { t: "Keyboard first", d: "Vim-style navigation, J/K to move, X to select, ⇧ to bulk-edit." },
      live: { t: "Live together", d: "See who is looking at what. Cursors, not meetings." },
      api: { t: "Open API", d: "GraphQL and webhooks for everything you can click." },
    },
  },
  how: {
    n: "02", title: "Three steps, then get out of the way",
    steps: [
      ["Import", "Bring issues from GitHub, Jira or a CSV. Labels and owners come along."],
      ["Set the rhythm", "Pick a cycle length. Gridline schedules planning and review for you."],
      ["Work", "Your board, your inbox, your shortcuts. Status updates write themselves."],
    ],
  },
  stats: [["38%", "fewer status meetings"], ["2.1×", "faster from idea to merge"], ["12 ms", "median interaction latency"], ["0", "required ceremonies"]],
  changelog: {
    n: "03", title: "Changelog", all: "All releases →",
    items: [
      ["2.4", "Nov 2026", "Cycles", "Automatic roll-over, cycle health score and a calm end-of-cycle digest."],
      ["2.3", "Sep 2026", "Offline mode", "Work on a plane. Changes sync and merge when you land."],
      ["2.2", "Jul 2026", "Command palette 2", "Fuzzy search across issues, docs and people. Now with actions."],
      ["2.0", "Apr 2026", "New engine", "Rewritten sync layer. Interactions under 16 ms on a 2019 laptop."],
    ],
  },
  pricing: {
    n: "04", title: "Simple pricing", monthly: "Monthly", yearly: "Yearly", save: "−20%", per: "/ seat / mo",
    plans: [
      { name: "Solo", price: [0, 0], desc: "For one person and a side project.", feats: ["Unlimited issues", "1 board", "Command palette"], cta: "Start free" },
      { name: "Team", price: [9, 7], desc: "For product teams up to 30.", feats: ["Everything in Solo", "Cycles & roadmaps", "Integrations", "Guest access"], cta: "Try 14 days", hot: "Popular" },
      { name: "Scale", price: [16, 13], desc: "For many teams, one plan.", feats: ["Everything in Team", "SAML SSO", "Audit log", "Priority support"], cta: "Talk to us" },
    ],
  },
  faq: {
    n: "05", title: "Questions",
    items: [
      ["Can I import from Jira?", "Yes. The importer maps projects, epics, labels and assignees. Most teams are done in under ten minutes."],
      ["Is there a self-hosted version?", "Not yet. Data is stored in the EU with encryption at rest and in transit."],
      ["Do you have a mobile app?", "iOS and Android apps cover triage, comments and notifications."],
      ["What happens when a cycle ends?", "Unfinished issues roll into the next cycle and the team gets a short digest. No meeting required."],
    ],
  },
  cta: { title: "Your next cycle starts Monday.", btn: "Start free", note: "No card. Import in minutes." },
  foot: {
    cols: [["Product", ["Features", "Changelog", "Pricing", "API"]], ["Company", ["About", "Blog", "Careers", "Press"]], ["Resources", ["Docs", "Guides", "Status", "Security"]]],
    note: "Template by vibe-templates · fictional product · MIT",
  },
};

const ru: typeof en = {
  nav: { features: "Возможности", how: "Как это работает", changelog: "Обновления", pricing: "Тарифы", faq: "Вопросы", cta: "Открыть демо" },
  hero: {
    kicker: "Gridline 2.4 — теперь с циклами",
    title: ["Меньше планов.", "Больше релизов"],
    lead: "Gridline — инструмент планирования для продуктовых команд от 3 до 30 человек. Одна доска, один ритм, никаких церемоний.",
    primary: "Начать бесплатно", secondary: "Тур за 2 минуты",
    meta: [["Команд", "4 200+"], ["Медианная настройка", "6 мин"], ["Аптайм 2026", "99,98%"]],
  },
  board: { cols: ["Бэклог", "Этот цикл", "На ревью", "Готово"], add: "Новая задача" },
  logos: "Нам доверяют тихие и быстрые команды",
  features: {
    n: "01", title: "Всё в одной сетке",
    items: {
      palette: { t: "Командная палитра", d: "Любое действие — в двух нажатиях. Создать, назначить, перенести — без мыши.", typing: "назначить на миру" },
      cycles: { t: "Циклы вместо спринтов", d: "Двухнедельный ритм, который продлевается сам. Незаконченное просто переезжает дальше." },
      burn: { t: "Честный прогресс", d: "Изменения объёма видны на графике, поэтому никто не делает вид, что линия пошла вниз." },
      keys: { t: "Клавиатура прежде всего", d: "Навигация в стиле Vim: J/K — движение, X — выбор, ⇧ — массовое редактирование." },
      live: { t: "Вместе в реальном времени", d: "Видно, кто что смотрит. Курсоры вместо созвонов." },
      api: { t: "Открытый API", d: "GraphQL и вебхуки для всего, что можно нажать." },
    },
  },
  how: {
    n: "02", title: "Три шага — и дальше не мешаем",
    steps: [
      ["Импорт", "Перенесите задачи из GitHub, Jira или CSV. Метки и исполнители переедут вместе с ними."],
      ["Задайте ритм", "Выберите длину цикла. Gridline сам поставит планирование и ревью."],
      ["Работайте", "Ваша доска, ваши входящие, ваши горячие клавиши. Статусы пишутся сами."],
    ],
  },
  stats: [["38%", "меньше статус-встреч"], ["2,1×", "быстрее от идеи до мержа"], ["12 мс", "медианная задержка интерфейса"], ["0", "обязательных церемоний"]],
  changelog: {
    n: "03", title: "Обновления", all: "Все релизы →",
    items: [
      ["2.4", "ноя 2026", "Циклы", "Автоматический перенос, оценка здоровья цикла и спокойная сводка в конце."],
      ["2.3", "сен 2026", "Офлайн-режим", "Работайте в самолёте. Изменения синхронизируются после посадки."],
      ["2.2", "июл 2026", "Палитра 2.0", "Нечёткий поиск по задачам, документам и людям. Теперь с действиями."],
      ["2.0", "апр 2026", "Новый движок", "Переписанная синхронизация. Отклик быстрее 16 мс на ноутбуке 2019 года."],
    ],
  },
  pricing: {
    n: "04", title: "Простые тарифы", monthly: "Помесячно", yearly: "За год", save: "−20%", per: "/ место / мес",
    plans: [
      { name: "Соло", price: [0, 0], desc: "Для одного человека и пет-проекта.", feats: ["Безлимит задач", "1 доска", "Командная палитра"], cta: "Начать бесплатно" },
      { name: "Команда", price: [9, 7], desc: "Для продуктовых команд до 30 человек.", feats: ["Всё из «Соло»", "Циклы и роадмапы", "Интеграции", "Гостевой доступ"], cta: "14 дней бесплатно", hot: "Популярный" },
      { name: "Масштаб", price: [16, 13], desc: "Для многих команд на одном тарифе.", feats: ["Всё из «Команды»", "SAML SSO", "Журнал аудита", "Приоритетная поддержка"], cta: "Связаться" },
    ],
  },
  faq: {
    n: "05", title: "Вопросы",
    items: [
      ["Можно перенести задачи из Jira?", "Да. Импорт переносит проекты, эпики, метки и исполнителей. Большинство команд укладывается в десять минут."],
      ["Есть ли версия для своего сервера?", "Пока нет. Данные хранятся в ЕС, зашифрованы при хранении и передаче."],
      ["Есть мобильное приложение?", "Да, для iOS и Android: разбор задач, комментарии и уведомления."],
      ["Что происходит в конце цикла?", "Незаконченные задачи переезжают в следующий цикл, команда получает короткую сводку. Без встреч."],
    ],
  },
  cta: { title: "Ваш следующий цикл начнётся в понедельник.", btn: "Начать бесплатно", note: "Без карты. Импорт за минуты." },
  foot: {
    cols: [["Продукт", ["Возможности", "Обновления", "Тарифы", "API"]], ["Компания", ["О нас", "Блог", "Вакансии", "Пресса"]], ["Ресурсы", ["Документация", "Гайды", "Статус", "Безопасность"]]],
    note: "Шаблон vibe-templates · вымышленный продукт · MIT",
  },
};

export const CONTENT = { en, ru };
export type Copy = typeof en;

export const LOGOS = ["Northwind", "Parcelo", "Fluxbank", "Hollow&Co", "Kite", "Monolith"];

// Fake issues for the board mock: [id, title, tag, assignee initials]
export const ISSUES: [string, string, string, string][][] = [
  [["GRD-142", "Empty state for archived boards", "design", "MK"], ["GRD-150", "Rate limit webhooks", "api", "AS"]],
  [["GRD-131", "Cycle roll-over digest", "cycles", "IV"], ["GRD-138", "Offline merge conflicts", "sync", "AS"], ["GRD-140", "Shortcut cheat-sheet", "ux", "MK"]],
  [["GRD-127", "SAML group mapping", "auth", "LN"]],
  [["GRD-119", "Palette: fuzzy people search", "ux", "IV"], ["GRD-121", "Import Jira epics", "import", "LN"]],
];
