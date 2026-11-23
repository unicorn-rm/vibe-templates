<script>
  import { onMount } from "svelte";
  import "../app.css";
  import { EPISODES, HOSTS, T } from "#lib/content.js";

  const MIN = 88, MAX = 108;
  let lang = $state("en");
  let freq = $state(EPISODES[2].f);
  let power = $state(false);
  const t = $derived(T[lang]);

  // nearest station within ±0.6 MHz counts as "tuned"
  const station = $derived(EPISODES.reduce((best, e) => (Math.abs(e.f - freq) < Math.abs(best.f - freq) ? e : best)));
  const signal = $derived(Math.max(0, 1 - Math.abs(station.f - freq) / 0.6));
  const tuned = $derived(signal > 0.5);
  const angle = $derived(((freq - MIN) / (MAX - MIN)) * 300 - 150); // knob rotation
  const pct = (f) => ((f - MIN) / (MAX - MIN)) * 100;

  onMount(() => {
    let saved = null;
    try { saved = localStorage.getItem("vt-lang"); } catch {}
    const q = new URLSearchParams(location.search).get("lang") || saved;
    if (q === "ru" || q === "en") lang = q;
    return () => audio?.ctx.close();
  });
  $effect(() => { document.documentElement.lang = lang; try { localStorage.setItem("vt-lang", lang); } catch {} });

  /* ---- knob: drag in a circle, or arrow keys ---- */
  let knob = $state();
  function drag(e) {
    const r = knob.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const move = (ev) => {
      let a = (Math.atan2(ev.clientX - cx, cy - ev.clientY) * 180) / Math.PI; // -180..180, 0 = up
      a = Math.max(-150, Math.min(150, a));
      freq = +(MIN + ((a + 150) / 300) * (MAX - MIN)).toFixed(1);
    };
    move(e);
    knob.setPointerCapture(e.pointerId);
    knob.onpointermove = move;
    knob.onpointerup = () => { knob.onpointermove = null; };
  }
  function key(e) {
    const step = e.shiftKey ? 1 : 0.1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") freq = Math.min(MAX, +(freq + step).toFixed(1));
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") freq = Math.max(MIN, +(freq - step).toFixed(1));
    else return;
    e.preventDefault();
  }
  const jump = (e) => { freq = e.f; };

  /* ---- sound: static noise between stations, a soft chord when tuned ---- */
  let audio = null;
  function startAudio() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 1800; bp.Q.value = 0.6;
    const nGain = ctx.createGain(); nGain.gain.value = 0;
    noise.connect(bp).connect(nGain).connect(ctx.destination); noise.start();
    const tGain = ctx.createGain(); tGain.gain.value = 0; tGain.connect(ctx.destination);
    const oscs = [220, 277.2, 329.6].map((f) => { const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f; o.connect(tGain); o.start(); return o; });
    audio = { ctx, nGain, tGain, oscs };
  }
  $effect(() => {
    if (!audio) return;
    const now = audio.ctx.currentTime, on = power ? 1 : 0;
    audio.nGain.gain.setTargetAtTime(on * (1 - signal) * 0.08, now, 0.05);
    audio.tGain.gain.setTargetAtTime(on * signal * 0.05, now, 0.08);
    const base = 180 + (station.no % 6) * 22; // each station has its own chord
    audio.oscs.forEach((o, i) => o.frequency.setTargetAtTime(base * [1, 1.26, 1.5][i], now, 0.1));
  });
  function toggle() {
    if (!audio) startAudio();
    power = !power;
  }
</script>

<svelte:head>
  <title>Long Wave — a podcast about slow technology</title>
  <meta name="description" content="Podcast template styled as a Dieter Rams-era radio: tune episodes with a draggable dial, hear static between stations. SvelteKit + Web Audio." />
</svelte:head>

<header class="top">
  <a href="#top" class="logo">Long Wave</a>
  <nav aria-label="Primary">
    <a href="#radio">{t.nav.radio}</a><a href="#guide">{t.nav.guide}</a><a href="#hosts">{t.nav.hosts}</a>
  </nav>
  <button class="lang" onclick={() => (lang = lang === "en" ? "ru" : "en")} aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
</header>

<main id="top">
  <section class="intro">
    <h1>Long<br />Wave</h1>
    <p>{t.tag}</p>
  </section>

  <!-- SIGNATURE: the receiver -->
  <section id="radio" class="radio" aria-label="Radio tuner">
    <div class="radio__grille" aria-hidden="true"></div>
    <div class="radio__face">
      <p class="radio__model">{t.model}</p>

      <div class="scale">
        <div class="scale__ticks" aria-hidden="true">
          {#each Array.from({ length: 21 }, (_, i) => MIN + i) as f}
            <span style="left:{pct(f)}%" class:major={f % 2 === 0}>{#if f % 4 === 0}<b>{f}</b>{/if}</span>
          {/each}
        </div>
        {#each EPISODES as e}
          <button class="station" class:is-on={station === e && tuned} style="left:{pct(e.f)}%" onclick={() => jump(e)} aria-label={`${e.f} MHz — ${e.t[lang]}`}>{e.no}</button>
        {/each}
        <span class="needle" style="left:{pct(freq)}%" aria-hidden="true"></span>
      </div>

      <div class="display" aria-live="polite">
        <p class="display__freq">{freq.toFixed(1)} <small>MHz</small></p>
        <p class="display__state"><span class="lamp" class:on={power && tuned}></span>{tuned ? t.dial.tuned : t.dial.between}</p>
        <p class="display__title" class:dim={!tuned}>{t.guide.ep} {station.no} · {station.t[lang]}</p>
        <p class="display__len">{station.len}</p>
      </div>

      <div class="controls">
        <button class="power" class:on={power} onclick={toggle} aria-pressed={power}>{power ? t.dial.play : t.dial.off}</button>
        <div class="knob" bind:this={knob} role="slider" tabindex="0" aria-label="Tuning" aria-valuemin={MIN} aria-valuemax={MAX} aria-valuenow={freq}
          onpointerdown={drag} onkeydown={key} style="--a:{angle}deg"><span></span></div>
        <p class="hint">{t.dial.hint}<br /><small>{t.dial.sound}</small></p>
      </div>
    </div>
  </section>

  <section id="guide" class="guide">
    <h2>{t.guide.title}</h2>
    <ol>
      {#each EPISODES as e}
        <li class:is-on={station === e && tuned}>
          <button onclick={() => jump(e)}>
            <span class="f">{e.f.toFixed(1)}</span>
            <span class="no">{t.guide.ep} {e.no}</span>
            <span class="tt"><b>{e.t[lang]}</b><small>{e.d[lang]}</small></span>
            <span class="len">{e.len}</span>
          </button>
        </li>
      {/each}
    </ol>
  </section>

  <section id="hosts" class="hosts">
    <h2>{t.hosts.title}</h2>
    <div class="hosts__grid">
      {#each HOSTS as h, i}
        <article><span class="mic" aria-hidden="true">{i + 1}</span><b>{h.n}</b><small>{h.r[lang]}</small></article>
      {/each}
    </div>
    <p class="listen">{t.listen}: <a href="https://podcasts.apple.com/">Apple Podcasts</a> · <a href="https://open.spotify.com/">Spotify</a> · <a href="https://example.com/feed.xml">RSS</a></p>
  </section>
</main>

<footer class="foot"><span>Long Wave · LW 1</span><span>{t.foot}</span></footer>
