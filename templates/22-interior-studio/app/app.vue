<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { MATERIALS, SCHEMES, SURFACES, T } from "./content";

const lang = ref<"en" | "ru">("en");
const scheme = ref(0);
const t = computed(() => T[lang.value]);
const s = computed(() => SCHEMES[scheme.value]);
const mat = (surface: (typeof SURFACES)[number]) => MATERIALS[s.value[surface]];

onMounted(() => {
  let saved: string | null = null;
  try { saved = localStorage.getItem("vt-lang"); } catch {}
  const q = new URLSearchParams(location.search).get("lang") || saved;
  if (q === "ru" || q === "en") lang.value = q;
});
watch(lang, (l) => {
  document.documentElement.lang = l;
  try { localStorage.setItem("vt-lang", l); } catch {}
});

// texture pattern id for a surface in the room drawing
const fill = (surface: (typeof SURFACES)[number]) => `url(#tx-${surface})`;
</script>

<template>
  <div>
    <header class="top">
      <a href="#top" class="logo">Atelier Hira</a>
      <nav aria-label="Primary">
        <a v-for="(label, id) in t.nav" :key="id" :href="`#${id}`">{{ label }}</a>
      </nav>
      <button class="lang" type="button" aria-label="Switch language" @click="lang = lang === 'en' ? 'ru' : 'en'">{{ lang === "en" ? "RU" : "EN" }}</button>
    </header>

    <main id="top">
      <section class="intro">
        <p class="label">{{ t.k }}</p>
        <h1>{{ t.h }}</h1>
        <p class="lead">{{ t.lead }}</p>
      </section>

      <!-- SIGNATURE: the sample board -->
      <section id="board" class="board">
        <div class="board__head">
          <h2>{{ t.board.title }}</h2>
          <p>{{ t.board.hint }}</p>
        </div>

        <div class="schemes" role="radiogroup" :aria-label="t.board.title">
          <button v-for="(sc, i) in SCHEMES" :key="sc.id" type="button" role="radio" :aria-checked="scheme === i" class="scheme" @click="scheme = i">
            <span class="scheme__chips">
              <i v-for="surf in SURFACES.slice(0, 4)" :key="surf" :style="{ background: MATERIALS[sc[surf]].color }" />
            </span>
            <b>{{ sc.name[lang] }}</b>
          </button>
        </div>

        <div class="board__grid">
          <!-- room elevation -->
          <figure class="room">
            <svg viewBox="0 0 600 400" role="img" :aria-label="s.name[lang]">
              <defs>
                <!-- one pattern per surface, re-coloured from the current scheme -->
                <pattern v-for="surf in SURFACES" :id="`tx-${surf}`" :key="surf" width="40" height="40" patternUnits="userSpaceOnUse">
                  <rect width="40" height="40" :fill="mat(surf).color" />
                  <g v-if="mat(surf).texture === 'wood'" stroke="rgba(0,0,0,.14)" fill="none"><path d="M0 8 C14 6 26 10 40 8 M0 22 C12 24 28 20 40 23 M0 34 C16 32 24 36 40 34" /><path d="M20 0 V40" stroke="rgba(0,0,0,.22)" /></g>
                  <g v-else-if="mat(surf).texture === 'linen'" stroke="rgba(0,0,0,.07)"><path d="M0 4 H40 M0 12 H40 M0 20 H40 M0 28 H40 M0 36 H40 M4 0 V40 M12 0 V40 M20 0 V40 M28 0 V40 M36 0 V40" /></g>
                  <g v-else-if="mat(surf).texture === 'terrazzo'"><circle cx="6" cy="8" r="2.4" fill="#9b8f7d" /><circle cx="24" cy="14" r="1.6" fill="#b5573c" /><circle cx="33" cy="30" r="2.8" fill="#6d6a63" /><circle cx="12" cy="30" r="1.4" fill="#c9a44a" /></g>
                  <g v-else-if="mat(surf).texture === 'plaster'" fill="rgba(0,0,0,.05)"><ellipse cx="10" cy="12" rx="9" ry="4" /><ellipse cx="30" cy="30" rx="11" ry="5" /></g>
                  <g v-else-if="mat(surf).texture === 'wool'" fill="rgba(255,255,255,.12)"><circle cx="5" cy="5" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="30" cy="6" r="2" /><circle cx="10" cy="26" r="2" /><circle cx="26" cy="30" r="2" /><circle cx="36" cy="20" r="2" /></g>
                  <g v-else-if="mat(surf).texture === 'stone'" stroke="rgba(255,255,255,.12)" fill="none"><path d="M0 20 H40 M20 0 V20 M0 0 V20" /></g>
                  <g v-else-if="mat(surf).texture === 'metal'" stroke="rgba(255,255,255,.25)"><path d="M0 6 H40 M0 18 H40 M0 30 H40" /></g>
                </pattern>
              </defs>
              <!-- walls & floor in one-point perspective -->
              <rect x="0" y="0" width="600" height="300" :fill="fill('wall')" class="surf" />
              <path d="M0 300 H600 L600 400 H0 Z" :fill="fill('floor')" class="surf" />
              <path d="M0 300 H600" class="edge" />
              <!-- window -->
              <rect x="380" y="50" width="150" height="170" class="window" />
              <path d="M455 50 V220 M380 135 H530" class="edge thin" />
              <!-- rug -->
              <path d="M90 330 H420 L450 385 H60 Z" :fill="fill('rug')" class="surf" />
              <!-- sofa -->
              <path d="M110 230 H360 Q372 230 372 242 V310 H98 V242 Q98 230 110 230 Z" :fill="fill('sofa')" class="surf" />
              <path d="M98 270 H372 M120 310 V322 M350 310 V322" class="edge" />
              <rect x="84" y="255" width="30" height="60" rx="8" :fill="fill('sofa')" class="surf" />
              <rect x="356" y="255" width="30" height="60" rx="8" :fill="fill('sofa')" class="surf" />
              <!-- floor lamp -->
              <path d="M470 380 H510 M490 380 V150" class="edge" />
              <path d="M455 150 H525 L510 110 H470 Z" :fill="fill('lamp')" class="surf" />
              <!-- leaders + callouts -->
              <g class="callout"><path d="M150 80 L110 40" /><text x="20" y="34">{{ t.board.surfaces.wall }}</text></g>
              <g class="callout"><path d="M530 360 L570 330" /><text x="520" y="322">{{ t.board.surfaces.floor }}</text></g>
            </svg>
            <figcaption><b>{{ s.name[lang] }}</b> — {{ s.note[lang] }}</figcaption>
          </figure>

          <!-- swatches pinned to the board -->
          <aside class="swatches" :aria-label="t.board.spec">
            <div v-for="(surf, i) in SURFACES" :key="surf" class="swatch" :style="{ '--r': `${[-2, 1.5, -1, 2, -1.5][i]}deg` }">
              <svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" :fill="fill(surf)" /></svg>
              <span class="tape">{{ t.board.surfaces[surf] }}</span>
              <p><b>{{ mat(surf).name[lang] }}</b><small>{{ mat(surf).spec }}</small></p>
            </div>
          </aside>
        </div>
      </section>

      <section id="work" class="sec">
        <h2>{{ t.work.title }}</h2>
        <ol class="work">
          <li v-for="([name, meta], i) in t.work.items" :key="name">
            <span class="work__no">0{{ i + 1 }}</span><b>{{ name }}</b><small>{{ meta }}</small>
          </li>
        </ol>
      </section>

      <section id="process" class="sec">
        <h2>{{ t.process.title }}</h2>
        <ol class="steps">
          <li v-for="([h, d], i) in t.process.steps" :key="h"><span>{{ ["I", "II", "III", "IV"][i] }}</span><b>{{ h }}</b><p>{{ d }}</p></li>
        </ol>
      </section>

      <section id="contact" class="sec contact">
        <h2>{{ t.contact.title }}</h2>
        <p class="contact__mail">{{ t.contact.text }}</p>
        <p class="label">{{ t.contact.note }}</p>
      </section>
    </main>

    <footer class="foot"><span>Atelier Hira</span><span>{{ t.foot }}</span></footer>
  </div>
</template>
