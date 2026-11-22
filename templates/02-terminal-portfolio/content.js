/* ==========================================================
   All text lives here. Edit this file to make the portfolio yours.
   Every entry has an `en` and `ru` version.
   ========================================================== */
window.CONTENT = {
  ui: {
    en: {
      "nav.about": "about", "nav.projects": "projects", "nav.log": "log", "nav.skills": "skills", "nav.contact": "contact",
      hint: "Type <kbd>help</kbd> and press Enter · <kbd>Tab</kbd> completes · <kbd>↑</kbd> history",
      "about.manual": "User Commands", "about.name": "NAME", "about.synopsis": "SYNOPSIS", "about.desc": "DESCRIPTION", "about.flag": "coffee",
      "about.nameText": "alex kern — backend &amp; tooling engineer, builds quiet systems that stay up",
      "about.descText": "Seven years writing services that move money, logs and packets. I like boring architecture, sharp tools and on-call rotations that nobody remembers. Currently building developer tooling and teaching the occasional workshop.",
      "about.loc": "Berlin, UTC+1 · remote-friendly", "about.status": "open to interesting problems", "about.years": "(years in production)",
      "projects.total": "total 6 · click a row to read its README",
      "skills.load": "Load average", "skills.tasks": "Tasks",
      "contact.cv": "cv.pdf", "contact.cvNote": "(replace with yours)",
      "contact.keys": "Tip: press the letter keys when the terminal is not focused.",
    },
    ru: {
      "nav.about": "обо мне", "nav.projects": "проекты", "nav.log": "путь", "nav.skills": "навыки", "nav.contact": "связь",
      hint: "Введите <kbd>help</kbd> и нажмите Enter · <kbd>Tab</kbd> дополняет · <kbd>↑</kbd> история",
      "about.manual": "Пользовательские команды", "about.name": "ИМЯ", "about.synopsis": "СИНТАКСИС", "about.desc": "ОПИСАНИЕ", "about.flag": "кофе",
      "about.nameText": "алекс керн — бэкенд- и tooling-инженер, строю тихие системы, которые не падают",
      "about.descText": "Семь лет пишу сервисы, через которые идут деньги, логи и пакеты. Люблю скучную архитектуру, острые инструменты и дежурства, о которых никто не вспоминает. Сейчас делаю инструменты для разработчиков и иногда веду воркшопы.",
      "about.loc": "Берлин, UTC+1 · можно удалённо", "about.status": "открыт к интересным задачам", "about.years": "(лет в продакшене)",
      "projects.total": "итого 6 · нажмите на строку, чтобы открыть README",
      "skills.load": "Средняя нагрузка", "skills.tasks": "Задач",
      "contact.cv": "резюме.pdf", "contact.cvNote": "(замените на своё)",
      "contact.keys": "Подсказка: нажимайте буквы, когда терминал не в фокусе.",
    },
  },

  boot: {
    en: ["[ OK ] mounting /home/alex", "[ OK ] starting coffee.service", "[ OK ] loading portfolio v7.4.2", "", "Welcome. Type 'help' to see what I can do."],
    ru: ["[ OK ] монтирую /home/alex", "[ OK ] запускаю coffee.service", "[ OK ] загружаю портфолио v7.4.2", "", "Добро пожаловать. Введите 'help', чтобы увидеть команды."],
  },

  projects: [
    { perm: "drwxr-xr-x", stars: "2.1k", date: "Oct 26", name: "tidewatch", url: "https://github.com/",
      en: "Log shipper that survives network partitions. Buffers to disk, replays in order, never double-counts.",
      ru: "Доставщик логов, переживающий разрывы сети. Буферизует на диск, воспроизводит по порядку, не считает дважды.",
      tags: ["go", "kafka", "observability"] },
    { perm: "drwxr-xr-x", stars: "870", date: "Jul 26", name: "pgshadow", url: "https://github.com/",
      en: "Replays production Postgres traffic against a staging replica to catch slow migrations before they ship.",
      ru: "Проигрывает боевой трафик Postgres на стейджинг-реплике и ловит медленные миграции до релиза.",
      tags: ["rust", "postgres", "testing"] },
    { perm: "drwxr-xr-x", stars: "412", date: "Mar 26", name: "ledgerkit", url: "https://github.com/",
      en: "Double-entry accounting primitives with idempotent writes. Used by two fintech teams in production.",
      ru: "Примитивы двойной записи с идемпотентной записью. В продакшене у двух финтех-команд.",
      tags: ["go", "finance", "library"] },
    { perm: "drwxr-x---", stars: "—", date: "Jan 26", name: "oncall-bot", url: "https://github.com/",
      en: "Telegram bot that summarises incidents, pages the right human and writes the first draft of the postmortem.",
      ru: "Телеграм-бот: пересказывает инциденты, будит нужного человека и пишет черновик постмортема.",
      tags: ["python", "llm", "sre"] },
    { perm: "drwxr-xr-x", stars: "1.3k", date: "Sep 25", name: "dotfiles", url: "https://github.com/",
      en: "Shell, editor and window-manager config. Boots a fresh laptop to productive in eleven minutes.",
      ru: "Конфиги шелла, редактора и оконного менеджера. Новый ноутбук готов к работе за одиннадцать минут.",
      tags: ["zsh", "neovim", "nix"] },
    { perm: "drwxr-xr-x", stars: "96", date: "May 25", name: "talks", url: "https://github.com/",
      en: "Slides and code from conference talks: 'Boring Queues', 'Postgres Is Enough', 'Pager Fatigue'.",
      ru: "Слайды и код с докладов: «Скучные очереди», «Postgres достаточно», «Усталость от пейджера».",
      tags: ["speaking", "slides"] },
  ],

  log: [
    { g: "*", sha: "a3f9e1c", ref: "HEAD", en: "Staff engineer, Platform — Northwind Labs", ru: "Staff-инженер, платформа — Northwind Labs", when: "2024 — now" },
    { g: "|", pipe: true },
    { g: "*", sha: "7be20d4", en: "Senior backend engineer, Payments — Fluxbank", ru: "Старший бэкенд-инженер, платежи — Fluxbank", when: "2021 — 2024" },
    { g: "*", sha: "51c0a8e", en: "Led migration of 40M ledgers to Postgres, zero downtime", ru: "Руководил миграцией 40 млн счетов на Postgres без простоя", when: "2023" },
    { g: "|", pipe: true },
    { g: "*", sha: "0d4e7f2", en: "Backend engineer — Parcelo (logistics)", ru: "Бэкенд-инженер — Parcelo (логистика)", when: "2019 — 2021" },
    { g: "*", sha: "e91b3a0", ref: "init", en: "BSc Computer Science, TU Berlin", ru: "Бакалавр, информатика, TU Berlin", when: "2015 — 2019" },
  ],

  skills: [
    ["Go", 92], ["Rust", 68], ["Postgres", 88], ["Kafka", 74],
    ["Kubernetes", 70], ["Terraform", 64], ["Python", 80], ["Linux", 90],
  ],

  /* Text returned by terminal commands */
  cmd: {
    en: {
      help: "Available commands:\n  about       who I am\n  projects    what I built\n  experience  where I worked\n  skills      what I use\n  contact     how to reach me\n  theme       green | amber | ice\n  lang        en | ru\n  open <n>    open project n in a new tab\n  whoami · date · history · banner · clear",
      about: "Alex Kern — backend & tooling engineer in Berlin.\nSeven years of services that move money, logs and packets.",
      contact: "mail      hello@example.com\ngithub    @alexkern\ntelegram  @alexkern",
      notFound: "command not found: ",
      sudo: "alex is not in the sudoers file. This incident will be reported.",
      theme: "theme set to ", lang: "language set to English",
      openUsage: "usage: open <1-6>",
    },
    ru: {
      help: "Доступные команды:\n  about       кто я\n  projects    что я сделал\n  experience  где работал\n  skills      чем пользуюсь\n  contact     как связаться\n  theme       green | amber | ice\n  lang        en | ru\n  open <n>    открыть проект n в новой вкладке\n  whoami · date · history · banner · clear",
      about: "Алекс Керн — бэкенд- и tooling-инженер из Берлина.\nСемь лет сервисов, через которые идут деньги, логи и пакеты.",
      contact: "почта     hello@example.com\ngithub    @alexkern\ntelegram  @alexkern",
      notFound: "команда не найдена: ",
      sudo: "alex нет в файле sudoers. Об этом инциденте будет сообщено.",
      theme: "тема: ", lang: "язык: русский",
      openUsage: "использование: open <1-6>",
    },
  },
};
