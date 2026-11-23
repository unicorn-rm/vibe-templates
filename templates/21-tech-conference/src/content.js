// All copy and the schedule (EN + RU). Times are Lisbon local time (UTC+0 in March).
export const EVENT = { tz: "Europe/Lisbon", day1: "2027-03-18", day2: "2027-03-19" };

// [time, talk, speaker, gate (room), status key]
export const SCHEDULE = {
  d1: [
    ["09:00", "DOORS OPEN · COFFEE", "—", "HALL", "boarding"],
    ["09:40", "SHIP ON FRIDAYS", "N. OKAFOR", "A1", "ontime"],
    ["10:30", "BORING DEPLOYS", "L. HALVORSEN", "A1", "ontime"],
    ["11:20", "FEATURE FLAGS AT 3AM", "S. MARQUES", "B2", "delayed"],
    ["13:30", "ROLLBACK IS A FEATURE", "K. TANAKA", "A1", "ontime"],
    ["14:20", "THE MIGRATION NOBODY SAW", "D. PETROV", "B2", "ontime"],
    ["15:30", "ON-CALL WITHOUT TEARS", "R. OSEI", "A1", "final"],
  ],
  d2: [
    ["09:30", "SMALL PRS, BIG TEAMS", "M. ROSSI", "A1", "ontime"],
    ["10:20", "TESTING IN PRODUCTION", "A. KOWALSKA", "B2", "ontime"],
    ["11:10", "DEPLOY TRAINS", "J. NIEMI", "A1", "boarding"],
    ["13:30", "PLATFORM AS PRODUCT", "F. DIALLO", "A1", "ontime"],
    ["14:30", "POSTMORTEMS THAT HELP", "E. LAMBERT", "B2", "cancelled"],
    ["16:00", "CLOSING · SHIP IT", "ALL", "HALL", "ontime"],
  ],
};

export const SPEAKERS = [
  { name: "Nkem Okafor", role: { en: "Staff engineer, Fluxbank", ru: "Staff-инженер, Fluxbank" }, seat: "1A", from: "LOS" },
  { name: "Kenji Tanaka", role: { en: "SRE lead, Parcelo", ru: "Руководитель SRE, Parcelo" }, seat: "3C", from: "NRT" },
  { name: "Agata Kowalska", role: { en: "QA architect, Kite", ru: "QA-архитектор, Kite" }, seat: "7F", from: "WAW" },
  { name: "Rachel Osei", role: { en: "Engineering manager, Hollow", ru: "Руководитель разработки, Hollow" }, seat: "12D", from: "ACC" },
];

export const T = {
  en: {
    nav: { board: "Departures", speakers: "Speakers", info: "Information" },
    hero: { k: "Lisbon · 18–19 March 2027", h: ["Gate 27", "A conference about shipping software"], lead: "Two days, two rooms, thirteen talks about getting code to production safely and often. Proceed to the gate.", cta: "Check departures" },
    board: { title: "Departures", day1: "Thu 18 Mar", day2: "Fri 19 Mar", cols: ["Time", "Talk", "Speaker", "Gate", "Status"], tz: { local: "Your time", venue: "Lisbon time" } },
    status: { boarding: "BOARDING", ontime: "ON TIME", delayed: "DELAYED", final: "FINAL CALL", cancelled: "CANCELLED" },
    speakers: { title: "Passengers", from: "From", to: "To", seat: "Seat", gate: "Gate", pass: "Boarding pass" },
    info: { title: "Information", items: [["Baggage", "Laptops welcome. Livestream for those who can't fly in."], ["Lounge", "Quiet room on floor 2, no talks, no laptops."], ["Accessibility", "Step-free venue, live captions in both rooms."]] },
    foot: "Template by vibe-templates · fictional event · MIT",
  },
  ru: {
    nav: { board: "Вылеты", speakers: "Спикеры", info: "Информация" },
    hero: { k: "Лиссабон · 18–19 марта 2027", h: ["Gate 27", "Конференция о том, как выпускать софт"], lead: "Два дня, два зала, тринадцать докладов о том, как доставлять код в прод часто и безопасно. Пройдите к выходу на посадку.", cta: "Табло вылетов" },
    board: { title: "Вылеты", day1: "Чт 18 мар", day2: "Пт 19 мар", cols: ["Время", "Доклад", "Спикер", "Выход", "Статус"], tz: { local: "Ваше время", venue: "Время Лиссабона" } },
    status: { boarding: "ПОСАДКА", ontime: "ПО ПЛАНУ", delayed: "ЗАДЕРЖКА", final: "ПОСЛ. ВЫЗОВ", cancelled: "ОТМЕНЁН" },
    speakers: { title: "Пассажиры", from: "Откуда", to: "Куда", seat: "Место", gate: "Выход", pass: "Посадочный талон" },
    info: { title: "Информация", items: [["Багаж", "Ноутбуки можно. Для тех, кто не долетит, — трансляция."], ["Лаунж", "Тихая комната на 2-м этаже: без докладов и ноутбуков."], ["Доступность", "Площадка без ступеней, живые субтитры в обоих залах."]] },
    foot: "Шаблон vibe-templates · вымышленное событие · MIT",
  },
};
