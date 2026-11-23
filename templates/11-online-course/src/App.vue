<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { QUIZ, T, WEEKS } from "./content.js";

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

const q = new URLSearchParams(location.search).get("lang") || read("vt-lang");
const lang = ref(q === "ru" ? "ru" : "en");
const t = computed(() => T[lang.value]);
watch(lang, (l) => { document.documentElement.lang = l; write("vt-lang", l); }, { immediate: true });

// the name on the cover label is a per-device convenience
const student = ref(read("vt-student") || "");
watch(student, (v) => write("vt-student", v));

// quiz state: chosen answer index per question (null = not answered)
const picks = ref(QUIZ.map(() => null));
const answered = computed(() => picks.value.filter((p) => p !== null).length);
const correct = computed(() => picks.value.filter((p, i) => p === QUIZ[i].ok).length);
const done = computed(() => answered.value === QUIZ.length);
// a 5-point school mark: 4/4 → 5, 3 → 4, 2 → 3, else 2
const mark = computed(() => [2, 2, 3, 4, 5][correct.value]);
const remark = computed(() => t.value.quiz.remark[Math.max(0, mark.value - 2)]);
const choose = (qi, ai) => { if (picks.value[qi] === null) picks.value[qi] = ai; };
const reset = () => { picks.value = QUIZ.map(() => null); };

let n = 0;
const lessonNo = WEEKS.map((w) => w.lessons.map(() => ++n));
const total = n;

const mounted = ref(false);
onMounted(() => requestAnimationFrame(() => (mounted.value = true)));
</script>

<template>
  <div class="page">
    <header class="top">
      <a href="#top" class="top__logo">SQL<span>/30</span></a>
      <nav aria-label="Primary">
        <a v-for="(label, id) in t.nav" :key="id" :href="`#${id}`">{{ label }}</a>
      </nav>
      <button class="top__lang" type="button" aria-label="Switch language" @click="lang = lang === 'en' ? 'ru' : 'en'">{{ lang === "en" ? "RU" : "EN" }}</button>
    </header>

    <main id="top">
      <!-- the exercise-book cover -->
      <section class="cover">
        <div class="label" :class="{ 'is-in': mounted }">
          <p class="label__big">{{ t.cover.label }}</p>
          <p class="label__line"><span>{{ t.cover.for }}</span><b class="label__fill">{{ t.cover.subject }}</b></p>
          <p class="label__line">
            <span>{{ t.cover.of }}</span>
            <label class="sr" for="student">{{ t.cover.name }}</label>
            <input id="student" v-model="student" class="label__input" :placeholder="t.cover.name" maxlength="28" autocomplete="off" />
          </p>
          <p class="label__hint">{{ t.cover.hint }}</p>
        </div>
        <p class="cover__school">{{ t.cover.school }}</p>
      </section>

      <!-- first page -->
      <section class="sheet">
        <div class="margin-note pen">{{ new Date().toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB") }}</div>
        <h1>{{ t.hero.title }}</h1>
        <p class="lead">{{ t.hero.lead }}</p>
        <p class="actions"><a class="btn" href="#plan">{{ t.hero.start }} →</a><span>{{ t.hero.free }}</span></p>
      </section>

      <!-- contents -->
      <section id="plan" class="sheet">
        <h2>{{ t.plan.title }} <small>· {{ total }} {{ t.plan.done }}</small></h2>
        <div v-for="(w, wi) in WEEKS" :key="wi" class="week">
          <h3>{{ w[lang] }}</h3>
          <ol>
            <li v-for="(l, li) in w.lessons" :key="li">
              <span class="no">{{ lessonNo[wi][li] }}.</span>
              <span class="title">{{ l[lang] }}</span>
              <span class="dots" aria-hidden="true"></span>
              <span class="page-no">{{ 3 + lessonNo[wi][li] * 4 }}</span>
            </li>
          </ol>
        </div>
      </section>

      <!-- quiz graded in red pen (signature) -->
      <section id="quiz" class="sheet">
        <h2>{{ t.quiz.title }}</h2>
        <p class="sub">{{ t.quiz.sub }}</p>
        <div v-for="(item, qi) in QUIZ" :key="qi" class="task">
          <p class="task__q"><b>№ {{ qi + 1 }}.</b> {{ item.q[lang] }}</p>
          <pre class="task__code"><code>{{ item.code }}</code></pre>
          <ul class="task__opts">
            <li v-for="(a, ai) in item.a" :key="ai">
              <button type="button" :disabled="picks[qi] !== null" :aria-pressed="picks[qi] === ai" @click="choose(qi, ai)"
                :class="{ picked: picks[qi] === ai }">
                <span class="letter">{{ "abc"[ai] }})</span> {{ a[lang] }}
                <!-- red pen marks, drawn with stroke-dashoffset -->
                <svg v-if="picks[qi] !== null && ai === item.ok" class="pen-mark tick" viewBox="0 0 40 30" aria-hidden="true"><path d="M3 16 L14 26 L37 3" pathLength="1" /></svg>
                <svg v-if="picks[qi] === ai && ai !== item.ok" class="pen-mark cross" viewBox="0 0 30 30" aria-hidden="true"><path d="M4 4 L26 26 M26 4 L4 26" pathLength="1" /></svg>
                <svg v-if="picks[qi] !== null && picks[qi] !== item.ok && ai === item.ok" class="pen-mark ring" viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true"><path d="M20 8 C80 -2 190 4 194 24 C198 46 40 50 10 34 C-6 24 12 10 40 6" pathLength="1" /></svg>
              </button>
            </li>
          </ul>
        </div>
        <transition name="stamp">
          <div v-if="done" class="grade">
            <span class="grade__label">{{ t.quiz.score }}:</span>
            <span class="grade__mark pen">{{ mark }}</span>
            <span class="grade__remark pen">{{ remark }}</span>
            <button type="button" class="link" @click="reset">{{ t.quiz.again }}</button>
          </div>
        </transition>
      </section>

      <!-- teacher -->
      <section id="teacher" class="sheet">
        <h2>{{ t.teacher.title }}</h2>
        <blockquote class="pen big">“{{ t.teacher.note }}”</blockquote>
        <p class="sign pen">— {{ t.teacher.sign }}</p>
        <dl class="stats">
          <div v-for="[v, k] in t.teacher.stats" :key="k"><dt>{{ v }}</dt><dd>{{ k }}</dd></div>
        </dl>
      </section>

      <section id="faq" class="sheet">
        <h2>{{ t.faq.title }}</h2>
        <details v-for="[qq, a] in t.faq.items" :key="qq">
          <summary>{{ qq }}</summary>
          <p>{{ a }}</p>
        </details>
      </section>
    </main>

    <footer class="foot">{{ t.foot }}</footer>
  </div>
</template>
