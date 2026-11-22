<script>
  import { onMount } from "svelte";
  import "../app.css";
  import { CLIENTS, PHOTOS, PORTRAIT, SERIES, T, img } from "#lib/content.js";

  let lang = $state("en");
  let filter = $state("all");
  let open = $state(-1); // index into `shown`, -1 = closed
  let hero = $state(0);
  let lbEl = $state();

  const t = $derived(T[lang]);
  const shown = $derived(filter === "all" ? PHOTOS : PHOTOS.filter((p) => p.s === filter));
  const featured = PHOTOS.filter((p) => p.r < 0.8).slice(0, 4);

  onMount(() => {
    let saved = null;
    try { saved = localStorage.getItem("vt-lang"); } catch {}
    const q = new URLSearchParams(location.search).get("lang") || saved;
    if (q === "ru" || q === "en") lang = q;
    const id = setInterval(() => (hero = (hero + 1) % featured.length), 5000);
    return () => clearInterval(id);
  });

  $effect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("vt-lang", lang); } catch {}
  });

  $effect(() => {
    document.body.style.overflow = open >= 0 ? "hidden" : "";
    if (open >= 0) lbEl?.focus();
  });

  const step = (d) => (open = (open + d + shown.length) % shown.length);
  function onKey(e) {
    if (open < 0) return;
    if (e.key === "Escape") open = -1;
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  }

  // simple swipe for touch screens
  let x0 = 0;
  const touchStart = (e) => (x0 = e.touches[0].clientX);
  const touchEnd = (e) => { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); };

  const seriesName = (id) => SERIES.find((s) => s.id === id)?.[lang];
  const pad = (n) => String(n).padStart(2, "0");
</script>

<svelte:head>
  <title>Ines Varo — Photographer</title>
  <meta name="description" content="Airy minimal photographer portfolio template: masonry gallery, series filter and keyboard lightbox. SvelteKit + Svelte 5." />
</svelte:head>

<svelte:window onkeydown={onKey} />

<header class="top">
  <a href="#top" class="name">Ines Varo</a>
  <nav aria-label="Primary">
    <a href="#work">{t.nav.work}</a>
    <a href="#about">{t.nav.about}</a>
    <a href="#contact">{t.nav.contact}</a>
  </nav>
  <button class="lang" onclick={() => (lang = lang === "en" ? "ru" : "en")} aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
</header>

<main id="top">
  <section class="hero">
    <div class="hero__text">
      <p class="small">{t.hero.role} — Lisbon</p>
      <h1>Ines<br /><em>Varo</em></h1>
      <p class="hero__line">{t.hero.line}</p>
    </div>
    <figure class="hero__img">
      {#each featured as p, i}
        <img src={img(p.id, 1800)} alt={p.t[lang]} class:on={i === hero} loading={i ? "lazy" : "eager"} />
      {/each}
      <figcaption><span>{pad(hero + 1)} / {pad(featured.length)}</span><span>{featured[hero].t[lang]} · {featured[hero].place}</span></figcaption>
    </figure>
  </section>

  <section id="work" class="work">
    <div class="filters" role="tablist" aria-label="Series">
      {#each [{ id: "all", en: t.filter.all, ru: t.filter.all }, ...SERIES] as s}
        <button role="tab" aria-selected={filter === s.id} onclick={() => (filter = s.id)}>
          {s[lang]} <sup>{s.id === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.s === s.id).length}</sup>
        </button>
      {/each}
    </div>

    <ul class="masonry">
      {#each shown as p, i (p.id)}
        <li>
          <button class="tile" onclick={() => (open = i)} aria-label={p.t[lang]}>
            <img src={img(p.id, 900)} alt={p.t[lang]} loading="lazy" style="aspect-ratio: 1 / {p.r}" />
            <span class="tile__cap"><span>{p.t[lang]}</span><span>{seriesName(p.s)}</span></span>
          </button>
        </li>
      {/each}
    </ul>
  </section>

  <section id="about" class="about">
    <img src={img(PORTRAIT, 1000)} alt="Ines Varo" loading="lazy" />
    <div>
      <h2>{t.about.title}</h2>
      <p>{t.about.p1}</p>
      <p>{t.about.p2}</p>
      <div class="about__cols">
        <div>
          <h3 class="small">{t.about.clients}</h3>
          <ul>{#each CLIENTS as c}<li>{c}</li>{/each}</ul>
        </div>
        <div>
          <h3 class="small">{t.about.ex}</h3>
          <ul>{#each t.exhibitions as [y, n, w]}<li><span class="muted">{y}</span> <em>{n}</em> — {w}</li>{/each}</ul>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <h2>{t.contact.title}</h2>
    <a class="mail" href="mailto:studio@example.com">studio@example.com</a>
    <p class="muted">{t.contact.note}</p>
    <p class="small"><a href="https://instagram.com/" rel="noopener" target="_blank">Instagram</a> · <a href="https://www.behance.net/" rel="noopener" target="_blank">Behance</a></p>
  </section>
</main>

<footer class="foot small"><span>© 2026 Ines Varo</span><span>{t.foot}</span></footer>

{#if open >= 0}
  {@const p = shown[open]}
  <div class="lb" role="dialog" aria-modal="true" aria-label={p.t[lang]} tabindex="-1" bind:this={lbEl} ontouchstart={touchStart} ontouchend={touchEnd}>
    <button class="lb__bg" onclick={() => (open = -1)} aria-label={t.lb.close}></button>
    {#key p.id}
      <img class="lb__img" src={img(p.id, 2200)} alt={p.t[lang]} />
    {/key}
    <div class="lb__bar">
      <span>{pad(open + 1)} / {pad(shown.length)}</span>
      <span class="lb__title"><em>{p.t[lang]}</em> · {p.place}</span>
      <span class="muted">{p.exif}</span>
    </div>
    <button class="lb__nav lb__nav--prev" onclick={() => step(-1)} aria-label={t.lb.prev}>←</button>
    <button class="lb__nav lb__nav--next" onclick={() => step(1)} aria-label={t.lb.next}>→</button>
    <button class="lb__close" onclick={() => (open = -1)}>{t.lb.close} ✕</button>
    <p class="lb__hint small">{t.lb.hint}</p>
  </div>
{/if}
