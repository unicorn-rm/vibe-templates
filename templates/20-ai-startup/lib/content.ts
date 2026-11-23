// All copy and figure data (EN + RU). The "model" in Figure 1 is pre-recorded: no network calls.
export type Lang = "en" | "ru";

// token, probability (0..1), top alternatives
export type Tok = [string, number, [string, number][]];

export const DEMO: Record<Lang, { q: string; a: Tok[] }[]> = {
  en: [
    { q: "What is the boiling point of water at the top of Everest?", a: [
      ["About", .62, [["Roughly", .21], ["Around", .12]]], [" 70", .81, [[" 71", .09], [" 68", .05]]], [" °C", .97, [[" degrees", .02]]],
      [",", .9, [[".", .08]]], [" because", .88, [[" since", .1]]], [" air", .74, [[" pressure", .2]]], [" pressure", .93, [[" density", .04]]],
      [" there", .7, [[" at", .2]]], [" is", .95, [[" drops", .03]]], [" about", .66, [[" roughly", .2]]], [" a", .92, [[" one", .06]]], [" third", .89, [[" quarter", .06]]],
      [" of", .98, []], [" sea", .97, []], [" level", .99, []], [".", .96, []],
    ] },
    { q: "Who won the 2031 Chess World Championship?", a: [
      ["I", .55, [["The", .3]]], [" don't", .71, [[" do", .12]]], [" know", .84, [[" have", .1]]], [" —", .6, [[".", .3]]],
      [" that", .8, [[" it", .15]]], [" is", .77, [[" happens", .1]]], [" after", .9, [[" beyond", .07]]], [" my", .97, []], [" training", .95, [[" data", .03]]],
      [" data", .93, []], [".", .97, []], [" My", .4, [[" A", .3], [" Any", .2]]], [" best", .5, [[" only", .3]]], [" guess", .88, []],
      [" would", .62, [[" is", .3]]], [" be", .9, []], [" unreliable", .21, [[" a", .19], [" wrong", .14]]], [".", .9, []],
    ] },
  ],
  ru: [
    { q: "При какой температуре кипит вода на вершине Эвереста?", a: [
      ["Примерно", .6, [["Около", .25], ["Приблизительно", .1]]], [" при", .85, [[" в", .1]]], [" 70", .8, [[" 71", .1], [" 68", .05]]], [" °C", .96, [[" градусах", .03]]],
      [",", .9, [[".", .08]]], [" потому", .86, [[" так", .1]]], [" что", .98, []], [" давление", .9, [[" воздух", .06]]], [" там", .72, [[" на", .2]]],
      [" около", .64, [[" примерно", .22]]], [" трети", .87, [[" четверти", .06]]], [" от", .9, []], [" уровня", .95, []], [" моря", .99, []], [".", .96, []],
    ] },
    { q: "Кто выиграл чемпионат мира по шахматам 2031 года?", a: [
      ["Я", .55, [["Это", .3]]], [" не", .8, [[" точно", .1]]], [" знаю", .85, [[" помню", .08]]], [" —", .6, [[".", .3]]],
      [" это", .8, [[" событие", .12]]], [" после", .9, [[" позже", .06]]], [" моих", .95, []], [" обучающих", .9, [[" данных", .05]]], [" данных", .96, []],
      [".", .97, []], [" Любая", .42, [[" Моя", .3]]], [" догадка", .85, []], [" была", .7, [[" будет", .25]]], [" бы", .95, []],
      [" ненадёжной", .22, [[" ошибочной", .2], [" случайной", .14]]], [".", .9, []],
    ] },
  ],
};

export const RESULTS = [
  // model, params, MMLU, TruthfulQA, ECE ↓, abstains when wrong
  ["Tern-7B (ours)", "7B", 68.4, 71.2, 2.1, 64],
  ["Open-7B", "7B", 66.9, 48.3, 9.8, 7],
  ["Open-13B", "13B", 70.1, 52.6, 8.4, 11],
  ["Closed-XL", "—", 86.2, 63.9, 5.7, 22],
] as const;

const en = {
  arxiv: "arXiv:2611.04217v2 [cs.CL] 22 Nov 2026",
  nav: { abs: "Abstract", fig: "Figure 1", res: "Results", cite: "Cite" },
  title: "Tern: a small language model that says when it doesn't know",
  authors: [["Mira Okonkwo", "1"], ["Jonas Feld", "1"], ["Ana Ribeiro", "1,2"], ["Tern Labs team", "1"]] as [string, string][],
  affil: ["¹ Tern Labs, Lisbon", "² University of Porto"],
  absTitle: "Abstract",
  abs: "Small models are cheap and fast, but they guess confidently. We train Tern-7B to keep its stated confidence close to its real accuracy, and to abstain when it would probably be wrong. Tern matches larger open models on knowledge benchmarks, cuts calibration error by 4×, and declines to answer in 64% of the cases where it would otherwise have been wrong. Weights, data recipe and evaluation code are open.",
  links: [["Weights", "https://huggingface.co/"], ["Code", "https://github.com/"], ["PDF", "#"]] as [string, string][],
  intro: { h: "1  Introduction", p1: "A wrong answer delivered with confidence is worse than no answer. Most models are trained to be helpful, which in practice rewards guessing [1].", p2: "Tern is trained with a calibration-aware objective: it is penalised not only for being wrong, but for being sure while wrong. The result is a model whose probabilities you can read, as in Figure 1." },
  fig: { caption: "Figure 1: Tern answering two questions, token by token. Underline strength is the model's probability for each token; hover or tap a token to see alternatives. In the second answer, low-confidence tokens trigger an abstention.", ask: "Ask", replay: "Replay", alt: "alternatives", low: "low confidence", prompt: "Prompt" },
  method: { h: "2  Calibration", p: "We report expected calibration error over M bins of predicted confidence:", where: "where Bₘ is the set of answers whose confidence falls in bin m, and n is the number of answers. Lower is better." },
  res: { h: "3  Results", caption: "Table 1: Accuracy (%) and calibration. ECE in %, lower is better. Last column: share of wrong answers the model declined to give.", head: ["Model", "Params", "MMLU", "TruthfulQA", "ECE ↓", "Abstains when wrong"] },
  cite: { h: "Citation", copy: "Copy BibTeX", done: "Copied" },
  refs: { h: "References", list: ["[1] A. Author, B. Author. Helpfulness rewards guessing. 2025.", "[2] C. Author et al. On calibration of modern language models. 2024."] },
  foot: "Template by vibe-templates · fictional company and paper · MIT",
};
const ru: typeof en = {
  arxiv: "arXiv:2611.04217v2 [cs.CL] 22 ноя 2026",
  nav: { abs: "Аннотация", fig: "Рисунок 1", res: "Результаты", cite: "Цитирование" },
  title: "Tern: небольшая языковая модель, которая говорит, когда не знает",
  authors: [["Мира Оконкво", "1"], ["Йонас Фельд", "1"], ["Ана Рибейру", "1,2"], ["Команда Tern Labs", "1"]],
  affil: ["¹ Tern Labs, Лиссабон", "² Университет Порту"],
  absTitle: "Аннотация",
  abs: "Маленькие модели дешёвые и быстрые, но уверенно угадывают. Мы обучили Tern-7B так, чтобы заявленная уверенность совпадала с реальной точностью, а при вероятной ошибке модель воздерживалась от ответа. Tern не уступает более крупным открытым моделям в тестах на знания, в 4 раза снижает ошибку калибровки и отказывается отвечать в 64% случаев, где иначе ошиблась бы. Веса, рецепт данных и код оценки открыты.",
  links: [["Веса", "https://huggingface.co/"], ["Код", "https://github.com/"], ["PDF", "#"]],
  intro: { h: "1  Введение", p1: "Неверный ответ, данный уверенно, хуже отсутствия ответа. Большинство моделей учат быть полезными, а на практике это поощряет угадывание [1].", p2: "Tern обучен с целевой функцией, учитывающей калибровку: штраф назначается не только за ошибку, но и за уверенность при ошибке. Получается модель, вероятностям которой можно верить, — как на рисунке 1." },
  fig: { caption: "Рисунок 1: Tern отвечает на два вопроса по токенам. Толщина подчёркивания — вероятность каждого токена; наведите или нажмите, чтобы увидеть альтернативы. Во втором ответе токены с низкой уверенностью приводят к отказу отвечать.", ask: "Спросить", replay: "Повторить", alt: "альтернативы", low: "низкая уверенность", prompt: "Запрос" },
  method: { h: "2  Калибровка", p: "Мы считаем ожидаемую ошибку калибровки по M интервалам предсказанной уверенности:", where: "где Bₘ — ответы, чья уверенность попала в интервал m, а n — число ответов. Чем меньше, тем лучше." },
  res: { h: "3  Результаты", caption: "Таблица 1: точность (%) и калибровка. ECE в %, меньше — лучше. Последний столбец — доля неверных ответов, от которых модель отказалась.", head: ["Модель", "Параметры", "MMLU", "TruthfulQA", "ECE ↓", "Отказ при ошибке"] },
  cite: { h: "Цитирование", copy: "Копировать BibTeX", done: "Скопировано" },
  refs: { h: "Литература", list: ["[1] A. Author, B. Author. Helpfulness rewards guessing. 2025.", "[2] C. Author et al. On calibration of modern language models. 2024."] },
  foot: "Шаблон vibe-templates · вымышленные компания и статья · MIT",
};
export const CONTENT = { en, ru };
export type Copy = typeof en;

export const BIBTEX = `@article{okonkwo2026tern,
  title   = {Tern: a small language model that says when it doesn't know},
  author  = {Okonkwo, Mira and Feld, Jonas and Ribeiro, Ana},
  journal = {arXiv preprint arXiv:2611.04217},
  year    = {2026}
}`;
