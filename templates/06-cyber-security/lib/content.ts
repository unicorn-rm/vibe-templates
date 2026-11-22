// All copy (EN + RU) and demo data.
// Text inside [[double brackets]] is rendered as a redaction bar that reveals on hover/focus.
// The request form is a simulation: it makes no network requests.
export type Lang = "en" | "ru";
export type Mark = "ok" | "warn" | "fail";

const en = {
  file: { no: "File No. BS-2026-117", cls: "Classification", was: "Secret", now: "Public", page: "Page", of: "of" },
  stamp: "Declassified",
  nav: [["services", "§1 Services"], ["method", "§2 Method"], ["form", "Form BS-7"], ["log", "Appendix A"]] as [string, string][],
  lang: "RU",
  hero: {
    to: "To: whoever is responsible for security", from: "From: Bastion, offensive security & incident response",
    re: "Re: why your next breach is optional",
    title: "We break in so that [[somebody else]] can't.",
    lead: "Fourteen people who think like attackers and write like accountants. Our last client had [[an admin panel open to the internet for 3 years]] before we were called. Nobody had noticed. That is the normal case.",
    sign: "— The Bastion team",
  },
  services: {
    title: "§1 Scope of services",
    head: ["Code", "Service", "Typical length", "You receive"],
    rows: [
      ["PT", "Penetration test — web, mobile, API, internal network", "2–4 weeks", "Report + retest"],
      ["RT", "Red team operation, goal-based", "4–8 weeks", "Attack narrative + debrief"],
      ["CL", "Cloud & Kubernetes review", "1–3 weeks", "Findings + IaC fixes"],
      ["IR", "Incident response, on call 24/7", "Hours, not days", "Containment + root cause"],
      ["CR", "Secure code review", "Per release", "Annotated pull requests"],
      ["TR", "Developer training from your own findings", "1–2 days", "Labs + recordings"],
    ] as string[][],
    note: "All work under written authorisation and agreed rules of engagement. We never test what you did not sign for.",
  },
  method: {
    title: "§2 Method",
    steps: [["Scope", "Targets, rules, timing, emergency contacts."], ["Recon", "Map what an outsider can see."], ["Exploit", "Prove impact safely, stop at the line."], ["Report", "Summary for the board, steps for engineers."], ["Retest", "Every fix re-checked, free, within 90 days."]] as [string, string][],
    margin: "Average engagement found 26 issues; 2 were critical.",
  },
  form: {
    title: "Form BS-7 · Surface check request",
    sub: "Demonstration only. Nothing you type leaves this page.",
    field: "Domain to examine", placeholder: "example.com", submit: "Submit for review", again: "New form",
    checks: [
      ["TLS configuration", "TLS 1.3, HSTS preload"],
      ["Security headers", "CSP missing on 2 routes"],
      ["Exposed subdomains", "staging.* reachable from the internet"],
      ["Mail authentication", "DMARC policy is p=none"],
      ["Open ports", "22, 443 — no legacy services"],
      ["Credentials in known leaks", "3 staff addresses found"],
    ] as [string, string][],
    verdict: "Review advised", examiner: "Examiner", date: "Date",
  },
  report: {
    title: "§3 What a report looks like",
    sub: "Severity tally from a recent web & API engagement (anonymised).",
    sev: [["Critical", 1], ["High", 4], ["Medium", 9], ["Low", 12]] as [string, number][],
    fixed: "fixed after retest",
  },
  log: {
    title: "Appendix A · Incident log, excerpt",
    lines: [
      ["02:14", "Credential stuffing against /login, 412 attempts. Blocked."],
      ["02:31", "New subdomain [[dev-api.client-07]] seen in CT logs."],
      ["03:05", "Impossible travel: user [[m.k@client-03]] Lisbon → Jakarta in 40 min."],
      ["03:06", "Session revoked. Owner contacted by phone."],
      ["04:47", "Public bucket [[s3://backup-old]] closed."],
      ["06:00", "Shift handover. Nothing on fire."],
    ] as [string, string][],
  },
  cases: {
    title: "§4 Case files",
    items: [["CF-117", "Fintech, EU", "Account takeover through a password-reset race. Fixed in 36 hours."], ["CF-104", "Logistics, 4,000 staff", "Red team reached domain admin in 6 days via [[a networked printer]]."], ["CF-091", "SaaS, Series B", "Cloud review removed 212 unused IAM roles and two public buckets."]] as [string, string, string][],
  },
  cut: { title: "In case of incident", sub: "Cut out and keep near the server room. We answer within 15 minutes, every day of the year.", phone: "+00 000 000 000" },
  foot: "Template by vibe-templates · fictional company · MIT",
};

const ru: typeof en = {
  file: { no: "Дело № BS-2026-117", cls: "Гриф", was: "Секретно", now: "Открыто", page: "Стр.", of: "из" },
  stamp: "Рассекречено",
  nav: [["services", "§1 Услуги"], ["method", "§2 Метод"], ["form", "Форма BS-7"], ["log", "Приложение А"]],
  lang: "EN",
  hero: {
    to: "Кому: ответственному за безопасность", from: "От: Bastion, наступательная безопасность и реагирование",
    re: "Тема: почему следующий взлом необязателен",
    title: "Мы взламываем, чтобы [[кто-то другой]] не смог.",
    lead: "Четырнадцать человек, которые думают как атакующие, а пишут как бухгалтеры. У последнего клиента [[админка три года была открыта в интернет]], пока нас не позвали. Никто не замечал. Это обычный случай.",
    sign: "— Команда Bastion",
  },
  services: {
    title: "§1 Перечень услуг",
    head: ["Код", "Услуга", "Обычный срок", "Вы получаете"],
    rows: [
      ["PT", "Пентест — веб, мобайл, API, внутренняя сеть", "2–4 недели", "Отчёт + перепроверка"],
      ["RT", "Red Team с целью", "4–8 недель", "Хронология атаки + разбор"],
      ["CL", "Аудит облака и Kubernetes", "1–3 недели", "Находки + правки IaC"],
      ["IR", "Реагирование на инциденты 24/7", "Часы, не дни", "Сдерживание + первопричина"],
      ["CR", "Аудит кода", "На релиз", "Размеченные pull request"],
      ["TR", "Обучение разработчиков на ваших находках", "1–2 дня", "Лабы + записи"],
    ],
    note: "Работаем только по письменному разрешению и согласованным правилам. Не тестируем то, на что вы не подписались.",
  },
  method: {
    title: "§2 Метод",
    steps: [["Рамки", "Цели, правила, сроки, экстренные контакты."], ["Разведка", "Что видно снаружи."], ["Эксплуатация", "Безопасно доказываем ущерб и останавливаемся на черте."], ["Отчёт", "Резюме для руководства, шаги для инженеров."], ["Перепроверка", "Каждое исправление — бесплатно, в течение 90 дней."]],
    margin: "В среднем проект находит 26 проблем; 2 из них критические.",
  },
  form: {
    title: "Форма BS-7 · Заявка на проверку периметра",
    sub: "Только демонстрация. Введённое никуда не уходит со страницы.",
    field: "Домен для проверки", placeholder: "example.ru", submit: "Отправить на проверку", again: "Новый бланк",
    checks: [
      ["Настройки TLS", "TLS 1.3, HSTS preload"],
      ["Заголовки безопасности", "Нет CSP на 2 маршрутах"],
      ["Открытые поддомены", "staging.* доступен из интернета"],
      ["Почтовая аутентификация", "Политика DMARC p=none"],
      ["Открытые порты", "22, 443 — без устаревших служб"],
      ["Учётки в известных утечках", "Найдено 3 адреса сотрудников"],
    ],
    verdict: "Нужна проверка", examiner: "Проверил", date: "Дата",
  },
  report: {
    title: "§3 Как выглядит отчёт",
    sub: "Сводка по критичности из недавнего теста веба и API (обезличено).",
    sev: [["Критические", 1], ["Высокие", 4], ["Средние", 9], ["Низкие", 12]],
    fixed: "исправлено после перепроверки",
  },
  log: {
    title: "Приложение А · Журнал инцидентов, выдержка",
    lines: [
      ["02:14", "Перебор паролей на /login, 412 попыток. Заблокировано."],
      ["02:31", "Новый поддомен [[dev-api.client-07]] в логах CT."],
      ["03:05", "Невозможное перемещение: [[m.k@client-03]] Лиссабон → Джакарта за 40 мин."],
      ["03:06", "Сессия отозвана. Владельцу позвонили."],
      ["04:47", "Публичный бакет [[s3://backup-old]] закрыт."],
      ["06:00", "Пересменка. Ничего не горит."],
    ],
  },
  cases: {
    title: "§4 Дела",
    items: [["CF-117", "Финтех, ЕС", "Захват аккаунта через гонку в сбросе пароля. Исправлено за 36 часов."], ["CF-104", "Логистика, 4 000 сотрудников", "Red Team получил домен-админа за 6 дней через [[сетевой принтер]]."], ["CF-091", "SaaS, раунд B", "Аудит облака убрал 212 лишних IAM-ролей и два публичных бакета."]],
  },
  cut: { title: "На случай инцидента", sub: "Вырежьте и держите возле серверной. Отвечаем в течение 15 минут, каждый день в году.", phone: "+00 000 000 000" },
  foot: "Шаблон vibe-templates · вымышленная компания · MIT",
};

export const CONTENT = { en, ru };
export type Copy = typeof en;

// marks for the six simulated checks, in order
export const FORM_RESULT: Mark[] = ["ok", "warn", "fail", "warn", "ok", "fail"];
