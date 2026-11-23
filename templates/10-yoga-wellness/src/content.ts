// All copy and data. Every string is { en, ru }; <T> renders both and CSS shows one.
export type L = { en: string; ru: string };
type P = [number, number];

// A pose is a stick figure in a 100×100 box: the joints below, joined as bones.
export interface Pose {
  id: string; name: L; sk: string; cue: L; breaths: number;
  j: { head: P; neck: P; hip: P; le: P; lh: P; re: P; rh: P; lk: P; lf: P; rk: P; rf: P };
}

export const POSES: Pose[] = [
  { id: "mountain", sk: "Tāḍāsana", breaths: 5, name: { en: "Mountain", ru: "Гора" },
    cue: { en: "Feet hip-width. Grow tall through the crown, let the shoulders drop.", ru: "Стопы на ширине таза. Тянитесь макушкой вверх, плечи опустите." },
    j: { head: [50, 14], neck: [50, 24], hip: [50, 52], le: [44, 38], lh: [42, 52], re: [56, 38], rh: [58, 52], lk: [47, 70], lf: [47, 88], rk: [53, 70], rf: [53, 88] } },
  { id: "tree", sk: "Vṛkṣāsana", breaths: 6, name: { en: "Tree", ru: "Дерево" },
    cue: { en: "Sole of the foot to the inner thigh, never the knee. Palms meet overhead.", ru: "Стопа к внутренней стороне бедра, не к колену. Ладони соединяются над головой." },
    j: { head: [50, 18], neck: [50, 27], hip: [50, 53], le: [42, 17], lh: [49, 5], re: [58, 17], rh: [51, 5], lk: [48, 71], lf: [48, 88], rk: [65, 64], rf: [51, 66] } },
  { id: "warrior", sk: "Vīrabhadrāsana II", breaths: 5, name: { en: "Warrior II", ru: "Воин II" },
    cue: { en: "Front knee over the ankle, back leg straight. Gaze over the front hand.", ru: "Переднее колено над пяткой, задняя нога прямая. Взгляд — над передней рукой." },
    j: { head: [50, 21], neck: [50, 30], hip: [50, 55], le: [36, 31], lh: [21, 31], re: [64, 31], rh: [79, 31], lk: [33, 63], lf: [31, 87], rk: [66, 71], rf: [81, 87] } },
  { id: "triangle", sk: "Trikoṇāsana", breaths: 5, name: { en: "Triangle", ru: "Треугольник" },
    cue: { en: "Reach long before you tilt. Top arm stacks over the bottom one.", ru: "Сначала вытянитесь, потом наклоняйтесь. Верхняя рука над нижней." },
    j: { head: [29, 37], neck: [36, 43], hip: [53, 55], le: [34, 60], lh: [31, 76], re: [40, 29], rh: [44, 13], lk: [39, 71], lf: [28, 88], rk: [65, 71], rf: [77, 88] } },
  { id: "dog", sk: "Adho Mukha Śvānāsana", breaths: 8, name: { en: "Downward dog", ru: "Собака мордой вниз" },
    cue: { en: "Hips up and back. Bend the knees if the back rounds.", ru: "Таз вверх и назад. Если спина круглится — согните колени." },
    j: { head: [33, 58], neck: [38, 51], hip: [57, 30], le: [31, 67], lh: [24, 87], re: [34, 67], rh: [27, 87], lk: [66, 58], lf: [74, 87], rk: [68, 58], rf: [77, 87] } },
  { id: "chair", sk: "Utkaṭāsana", breaths: 5, name: { en: "Chair", ru: "Стул" },
    cue: { en: "Sit back as if into a chair. Weight in the heels, arms alongside the ears.", ru: "Сядьте назад, как на стул. Вес на пятках, руки вдоль ушей." },
    j: { head: [44, 22], neck: [46, 32], hip: [57, 58], le: [41, 19], lh: [36, 6], re: [43, 19], rh: [38, 6], lk: [43, 68], lf: [48, 88], rk: [45, 68], rf: [51, 88] } },
];

export const BREATH = [
  { k: "in", s: 4, t: { en: "Breathe in", ru: "Вдох" } },
  { k: "hold", s: 4, t: { en: "Hold", ru: "Задержка" } },
  { k: "out", s: 6, t: { en: "Breathe out", ru: "Выдох" } },
] as const;

export const LEVELS = [
  { id: "all", t: { en: "All levels", ru: "Все уровни" } },
  { id: "b", t: { en: "Beginner", ru: "Новички" } },
  { id: "o", t: { en: "Open", ru: "Открытый" } },
  { id: "a", t: { en: "Advanced", ru: "Продвинутый" } },
];

export const DAYS: L[] = [{ en: "Mon", ru: "Пн" }, { en: "Tue", ru: "Вт" }, { en: "Wed", ru: "Ср" }, { en: "Thu", ru: "Чт" }, { en: "Fri", ru: "Пт" }, { en: "Sat", ru: "Сб" }];
export const TIMES = ["07:00", "12:30", "18:00", "19:45"];
// [day index, time index, level, class name]
export const CLASSES: [number, number, "b" | "o" | "a", L][] = [
  [0, 0, "o", { en: "Morning flow", ru: "Утренний поток" }], [0, 2, "b", { en: "Foundations", ru: "Основы" }], [0, 3, "o", { en: "Slow & strong", ru: "Медленно и сильно" }],
  [1, 0, "a", { en: "Ashtanga", ru: "Аштанга" }], [1, 1, "o", { en: "Lunch reset", ru: "Перезагрузка в обед" }], [1, 3, "b", { en: "Stretch", ru: "Растяжка" }],
  [2, 0, "o", { en: "Morning flow", ru: "Утренний поток" }], [2, 2, "a", { en: "Inversions", ru: "Перевёрнутые" }], [2, 3, "b", { en: "Foundations", ru: "Основы" }],
  [3, 1, "o", { en: "Lunch reset", ru: "Перезагрузка в обед" }], [3, 2, "o", { en: "Vinyasa", ru: "Виньяса" }], [3, 3, "b", { en: "Breath work", ru: "Дыхание" }],
  [4, 0, "a", { en: "Ashtanga", ru: "Аштанга" }], [4, 2, "b", { en: "Stretch", ru: "Растяжка" }],
  [5, 0, "o", { en: "Long practice", ru: "Долгая практика" }], [5, 1, "b", { en: "Foundations", ru: "Основы" }],
];

export const TEACHERS = [
  { m: "AL", n: "Anna Lind", s: { en: "Foundations, breath work", ru: "Основы, дыхание" }, q: { en: "Fewer poses, held longer.", ru: "Меньше поз, но дольше." } },
  { m: "TK", n: "Tomas Kerr", s: { en: "Ashtanga, inversions", ru: "Аштанга, перевёрнутые" }, q: { en: "Strength is a kind of patience.", ru: "Сила — это вид терпения." } },
  { m: "RS", n: "Rita Sato", s: { en: "Vinyasa, stretch", ru: "Виньяса, растяжка" }, q: { en: "Move like you have nowhere else to be.", ru: "Двигайтесь так, будто больше никуда не нужно." } },
];

export const T = {
  nav: [["#poses", { en: "Poses", ru: "Позы" }], ["#breath", { en: "Breath", ru: "Дыхание" }], ["#timetable", { en: "Timetable", ru: "Расписание" }], ["#teachers", { en: "Teachers", ru: "Преподаватели" }]] as [string, L][],
  booklet: { en: "Booklet No. 3 · Practice at home and in the studio", ru: "Брошюра № 3 · Практика дома и в студии" },
  title: { en: "Hold still. Then a little longer.", ru: "Замрите. А потом ещё немного." },
  lead: { en: "A small yoga studio with three teachers, twenty mats and no mirrors. We teach poses the way an old gymnastics manual would: one clear step at a time.", ru: "Маленькая студия йоги: три преподавателя, двадцать ковриков и ни одного зеркала. Учим позам, как старое пособие по гимнастике: по одному понятному шагу." },
  fig: { en: "Fig.", ru: "Рис." },
  posesTitle: { en: "Six poses to begin with", ru: "Шесть поз для начала" },
  prev: { en: "Previous", ru: "Назад" }, next: { en: "Next pose", ru: "Следующая поза" },
  hold: { en: "Hold for", ru: "Держите" }, breaths: { en: "breaths", ru: "вдохов" },
  breathTitle: { en: "Breathe with the circle", ru: "Дышите вместе с кругом" },
  breathLead: { en: "4 counts in, 4 hold, 6 out. Five rounds calm most people down.", ru: "4 счёта вдох, 4 задержка, 6 выдох. Пяти кругов хватает, чтобы успокоиться." },
  start: { en: "Start", ru: "Начать" }, stop: { en: "Stop", ru: "Стоп" }, round: { en: "Round", ru: "Круг" },
  ttTitle: { en: "Timetable", ru: "Расписание" },
  teachersTitle: { en: "Teachers", ru: "Преподаватели" },
  visit: { en: "Hold Studio · 9 Mill Lane, second floor · bring nothing, mats are ours", ru: "Hold Studio · Мельничный пер., 9, второй этаж · ничего не берите, коврики наши" },
  foot: { en: "Template by vibe-templates · fictional studio · MIT · Not medical advice.", ru: "Шаблон vibe-templates · вымышленная студия · MIT · Не медицинская рекомендация." },
};
