// All copy and data (EN + RU). Components only render this.
export const WEEKS = [
  { en: "Week 1 · Asking questions", ru: "Неделя 1 · Задаём вопросы", lessons: [
    { en: "SELECT and the shape of a table", ru: "SELECT и форма таблицы" },
    { en: "WHERE: filtering rows", ru: "WHERE: фильтруем строки" },
    { en: "ORDER BY and LIMIT", ru: "ORDER BY и LIMIT" },
    { en: "NULL is not zero", ru: "NULL — это не ноль" },
  ] },
  { en: "Week 2 · Counting things", ru: "Неделя 2 · Считаем", lessons: [
    { en: "COUNT, SUM, AVG", ru: "COUNT, SUM, AVG" },
    { en: "GROUP BY without tears", ru: "GROUP BY без слёз" },
    { en: "HAVING vs WHERE", ru: "HAVING против WHERE" },
  ] },
  { en: "Week 3 · Joining tables", ru: "Неделя 3 · Соединяем таблицы", lessons: [
    { en: "INNER and LEFT JOIN", ru: "INNER и LEFT JOIN" },
    { en: "Self-joins and duplicates", ru: "Самосоединения и дубли" },
    { en: "Subqueries and CTEs", ru: "Подзапросы и CTE" },
  ] },
  { en: "Week 4 · Real analysis", ru: "Неделя 4 · Настоящий анализ", lessons: [
    { en: "Window functions", ru: "Оконные функции" },
    { en: "Cohorts and retention", ru: "Когорты и удержание" },
    { en: "Final project: your own dataset", ru: "Итоговый проект: свой датасет" },
  ] },
];

// Quiz: code + options + index of the correct answer
export const QUIZ = [
  { code: "SELECT COUNT(*) FROM orders\nWHERE total > 100;",
    q: { en: "What does this return?", ru: "Что вернёт запрос?" },
    a: [{ en: "One number", ru: "Одно число" }, { en: "All orders over 100", ru: "Все заказы дороже 100" }, { en: "An error", ru: "Ошибку" }], ok: 0 },
  { code: "SELECT city, COUNT(*)\nFROM users\nGROUP BY city\nHAVING COUNT(*) > 10;",
    q: { en: "Why HAVING and not WHERE?", ru: "Почему HAVING, а не WHERE?" },
    a: [{ en: "They are the same", ru: "Это одно и то же" }, { en: "It filters after grouping", ru: "Он фильтрует после группировки" }, { en: "WHERE can't use numbers", ru: "WHERE не умеет числа" }], ok: 1 },
  { code: "SELECT * FROM users\nWHERE phone = NULL;",
    q: { en: "How many rows will you get?", ru: "Сколько строк вернётся?" },
    a: [{ en: "Users without a phone", ru: "Пользователи без телефона" }, { en: "All users", ru: "Все пользователи" }, { en: "None — use IS NULL", ru: "Ни одной — нужно IS NULL" }], ok: 2 },
  { code: "SELECT u.name, o.id\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id;",
    q: { en: "Users with no orders…", ru: "Пользователи без заказов…" },
    a: [{ en: "are dropped", ru: "пропадут" }, { en: "appear with o.id = NULL", ru: "будут, с o.id = NULL" }, { en: "appear twice", ru: "появятся дважды" }], ok: 1 },
];

export const T = {
  en: {
    nav: { plan: "Contents", quiz: "Test yourself", teacher: "Teacher", faq: "Questions" },
    cover: { label: "Exercise book", for: "for work in", subject: "SQL", of: "of student", name: "your name", hint: "← type it, it stays on this device", school: "Course: “SQL in 30 Evenings” · free · 4 weeks" },
    hero: { title: "Learn SQL the way you learned maths: on paper, with a red pen.", lead: "Thirty short evening lessons, each with exercises you actually write. Every answer is checked, and every mistake is explained in the margin.", start: "Open lesson 1", free: "Free. No sign-up to read." },
    plan: { title: "Contents", lesson: "Lesson", done: "topics · 30 evenings" },
    quiz: { title: "Test yourself", sub: "Four questions. Pick an answer — the teacher checks it straight away.", score: "Mark", again: "Rub out and try again", remark: ["Read lesson 2 again and come back.", "Not bad, re-read the margins.", "Good work!", "Excellent — straight to week 3."] },
    teacher: { title: "From the teacher", note: "I spent ten years writing queries for a living and four years teaching them. Write by hand first, type second — it sticks.", sign: "Irina V., your teacher", stats: [["30", "lessons"], ["120", "exercises"], ["9,400", "students"]] },
    faq: { title: "Questions", items: [["Do I need to install anything?", "No. Every exercise runs in the browser on a sample shop database."], ["Is it really free?", "Yes. The course is open; donations keep the lights on."], ["Which SQL dialect?", "Standard SQL that works in PostgreSQL, SQLite and MySQL. Differences are noted in the margin."]] },
    foot: "Template by vibe-templates · fictional course · MIT",
  },
  ru: {
    nav: { plan: "Оглавление", quiz: "Проверь себя", teacher: "Учитель", faq: "Вопросы" },
    cover: { label: "Тетрадь", for: "для работ по", subject: "SQL", of: "ученика", name: "ваше имя", hint: "← впишите, сохранится на этом устройстве", school: "Курс «SQL за 30 вечеров» · бесплатно · 4 недели" },
    hero: { title: "Учите SQL так же, как учили математику: на бумаге и с красной ручкой.", lead: "Тридцать коротких вечерних уроков, в каждом — задания, которые вы действительно пишете. Каждый ответ проверяется, каждая ошибка разобрана на полях.", start: "Открыть урок 1", free: "Бесплатно. Читать можно без регистрации." },
    plan: { title: "Оглавление", lesson: "Урок", done: "тем · 30 вечеров" },
    quiz: { title: "Проверь себя", sub: "Четыре вопроса. Выберите ответ — учитель проверит сразу.", score: "Оценка", again: "Стереть и решить заново", remark: ["Перечитай урок 2 и возвращайся.", "Неплохо, перечитай пометки на полях.", "Хорошая работа!", "Отлично — можно сразу к 3-й неделе."] },
    teacher: { title: "От учителя", note: "Десять лет я писала запросы за деньги и четыре года учу этому. Сначала пишите от руки, потом печатайте — так запоминается.", sign: "Ирина В., ваш учитель", stats: [["30", "уроков"], ["120", "заданий"], ["9 400", "учеников"]] },
    faq: { title: "Вопросы", items: [["Нужно что-то устанавливать?", "Нет. Все задания выполняются в браузере на учебной базе магазина."], ["Это правда бесплатно?", "Да. Курс открытый, пожертвования помогают его поддерживать."], ["Какой диалект SQL?", "Стандартный SQL для PostgreSQL, SQLite и MySQL. Различия отмечены на полях."]] },
    foot: "Шаблон vibe-templates · вымышленный курс · MIT",
  },
};
