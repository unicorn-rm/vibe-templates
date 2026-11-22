// All copy (EN + RU) and demo data. The scanner is a simulation: it makes no network requests.
export type Lang = "en" | "ru";
export type Status = "ok" | "warn" | "fail";

const en = {
  nav: { services: "Services", method: "Method", scanner: "Scanner", cases: "Cases", cta: "Incident? 24/7" },
  hero: {
    tag: "Offensive security · Incident response",
    title: ["We break in", "so others can't."],
    lead: "Bastion is a team of 14 penetration testers and incident responders. We find the door before the attacker does — and stay with you until it's closed.",
    a: "Book a scoping call", b: "See a sample report",
  },
  scanner: {
    title: "Attack surface check", note: "Simulation for demo purposes — no requests leave your browser.",
    placeholder: "your-company.com", run: "Run check", again: "Run again",
    checks: [
      ["TLS configuration", "TLS 1.3, HSTS preload"],
      ["Security headers", "CSP missing on 2 routes"],
      ["Exposed subdomains", "staging.* reachable from internet"],
      ["DNS & email (SPF/DMARC)", "DMARC p=none"],
      ["Open ports", "22, 443 · no legacy services"],
      ["Leaked credentials", "3 emails in known breaches"],
    ] as [string, string][],
    score: "Exposure score", verdict: "Worth a closer look",
  },
  certs: ["OSCP", "OSCE³", "CREST CRT", "ISO 27001", "PCI QSA", "GIAC GCIH"],
  services: {
    title: "What we do",
    items: [
      ["Penetration testing", "Web, mobile, API and internal networks. Manual first, tools second.", "PT"],
      ["Red teaming", "Multi-week, goal-based operations that test people, process and tech together.", "RT"],
      ["Cloud security review", "AWS, Azure, GCP and Kubernetes — misconfigurations and identity paths.", "CL"],
      ["Incident response", "On call 24/7. Containment within hours, root cause within days.", "IR"],
      ["Secure code review", "Pull-request level review for the parts that move money or data.", "CR"],
      ["Security training", "Hands-on labs for developers, built from findings in your own code.", "TR"],
    ] as [string, string, string][],
  },
  method: {
    title: "How an engagement runs",
    steps: [["Scope", "Rules of engagement, targets, timing, emergency contacts."], ["Recon", "Map the attack surface the way an outsider would."], ["Exploit", "Prove impact safely, stop at agreed boundaries."], ["Report", "Executive summary plus reproducible technical findings."], ["Retest", "Free retest of every fix within 90 days."]] as [string, string][],
  },
  report: {
    title: "A typical report", sub: "Findings from a recent web + API test (anonymised).",
    sev: [["Critical", 1], ["High", 4], ["Medium", 9], ["Low", 12]] as [string, number][],
    found: "findings", fixed: "fixed after retest",
  },
  cases: {
    title: "Recent work",
    items: [
      ["Fintech, EU", "Account takeover via password-reset race condition. Fixed in 36 hours."],
      ["Logistics, 4,000 staff", "Red team reached domain admin in 6 days through a printer. Now it can't."],
      ["SaaS, Series B", "Cloud review removed 212 unused IAM roles and two public buckets."],
    ] as [string, string][],
  },
  feed: "Live feed (demo)",
  cta: { title: "Something is happening right now?", sub: "Our incident line answers within 15 minutes, every day of the year.", btn: "+00 000 000 000" },
  foot: "Template by vibe-templates · fictional company · MIT",
};

const ru: typeof en = {
  nav: { services: "Услуги", method: "Метод", scanner: "Сканер", cases: "Кейсы", cta: "Инцидент? 24/7" },
  hero: {
    tag: "Наступательная безопасность · Реагирование на инциденты",
    title: ["Мы взламываем,", "чтобы не смогли другие."],
    lead: "Bastion — команда из 14 пентестеров и специалистов по реагированию. Находим дверь раньше атакующего и остаёмся с вами, пока её не закроют.",
    a: "Обсудить проект", b: "Пример отчёта",
  },
  scanner: {
    title: "Проверка периметра", note: "Симуляция для демонстрации — запросы не покидают ваш браузер.",
    placeholder: "your-company.ru", run: "Проверить", again: "Ещё раз",
    checks: [
      ["Настройки TLS", "TLS 1.3, HSTS preload"],
      ["Заголовки безопасности", "Нет CSP на 2 маршрутах"],
      ["Открытые поддомены", "staging.* доступен из интернета"],
      ["DNS и почта (SPF/DMARC)", "DMARC p=none"],
      ["Открытые порты", "22, 443 · без устаревших служб"],
      ["Утечки учётных данных", "3 адреса в известных утечках"],
    ],
    score: "Индекс открытости", verdict: "Стоит присмотреться",
  },
  certs: en.certs,
  services: {
    title: "Что мы делаем",
    items: [
      ["Тестирование на проникновение", "Веб, мобайл, API и внутренние сети. Сначала руками, потом инструментами.", "PT"],
      ["Red Team", "Многонедельные операции с целью: проверяем людей, процессы и технику вместе.", "RT"],
      ["Аудит облака", "AWS, Azure, GCP и Kubernetes — ошибки конфигурации и пути через идентичности.", "CL"],
      ["Реагирование на инциденты", "Дежурим 24/7. Сдерживание — за часы, первопричина — за дни.", "IR"],
      ["Аудит кода", "Ревью на уровне pull request для частей, где двигаются деньги и данные.", "CR"],
      ["Обучение", "Практические лабы для разработчиков на основе находок в вашем же коде.", "TR"],
    ],
  },
  method: {
    title: "Как проходит проект",
    steps: [["Рамки", "Правила, цели, сроки, экстренные контакты."], ["Разведка", "Картируем периметр глазами внешнего атакующего."], ["Эксплуатация", "Безопасно доказываем ущерб в согласованных границах."], ["Отчёт", "Резюме для руководства и воспроизводимые технические находки."], ["Перепроверка", "Бесплатная проверка каждого исправления в течение 90 дней."]],
  },
  report: {
    title: "Типичный отчёт", sub: "Находки недавнего теста веба и API (обезличено).",
    sev: [["Критич.", 1], ["Высокие", 4], ["Средние", 9], ["Низкие", 12]],
    found: "находок", fixed: "исправлено после перепроверки",
  },
  cases: {
    title: "Недавние проекты",
    items: [
      ["Финтех, ЕС", "Захват аккаунта через гонку в сбросе пароля. Исправлено за 36 часов."],
      ["Логистика, 4 000 сотрудников", "Red Team получил домен-админа за 6 дней через принтер. Больше не получится."],
      ["SaaS, раунд B", "Аудит облака убрал 212 лишних IAM-ролей и два публичных бакета."],
    ],
  },
  feed: "Живая лента (демо)",
  cta: { title: "Что-то происходит прямо сейчас?", sub: "Линия инцидентов отвечает в течение 15 минут, каждый день в году.", btn: "+00 000 000 000" },
  foot: "Шаблон vibe-templates · вымышленная компания · MIT",
};

export const CONTENT = { en, ru };
export type Copy = typeof en;

// statuses for the six simulated checks, in order
export const SCAN_RESULT: Status[] = ["ok", "warn", "fail", "warn", "ok", "fail"];

export const FEED = [
  "blocked  ssh brute-force   185.220.x.x → bastion-gw",
  "alert    new subdomain     dev-api.client-07",
  "info     cert renewed      *.client-12",
  "blocked  sqli attempt      /api/v2/orders?id=",
  "alert    impossible travel user m.k@client-03",
  "info     retest passed     CL-2026-114",
  "blocked  credential stuff  /login  ×412",
  "alert    public bucket     s3://backup-old",
];
