(() => {
  const C = window.CONTENT;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = !!window.gsap && !reduced;
  if (!hasGsap) document.documentElement.classList.add("no-gsap");
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  $$("[data-i18n]").forEach((el) => { C.ui.en[el.dataset.i18n] = el.innerHTML; });
  let lang = new URLSearchParams(location.search).get("lang") || store.get("vt-lang") || "en";
  if (!C.ui[lang]) lang = "en";

  $("#heroModel").innerHTML = massing(C.hero, { unit: 22 });

  function render() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => { const v = C.ui[lang][el.dataset.i18n] ?? C.ui.en[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
    $("#langBtn").textContent = lang === "en" ? "RU" : "EN";

    const tape = C.tape[lang].map((t) => `<span>${t}</span>`).join("");
    $("#tape").innerHTML = tape + tape;

    $("#workTrack").innerHTML = C.projects.map((p, i) => `
      <article class="card">
        <div class="card__head"><span class="card__n">${String(i + 1).padStart(2, "0")}</span><span>${p.city[lang]} · ${p.year}</span></div>
        <div class="card__model" aria-hidden="true">${massing(p.boxes)}</div>
        <div class="card__body"><h3>${p.name[lang]}</h3><p>${p.text[lang]}</p><span class="card__mat">${p.mat}</span></div>
      </article>`).join("");

    $("#indexBody").innerHTML = C.projects.map((p, i) => `
      <tr data-i="${i}"><td>${p.year}</td><td>${p.name[lang]}</td><td>${p.type[lang]}</td><td>${p.city[lang]}</td>
      <td><span class="pill${p.status === "built" ? " pill--built" : ""}">${C.status[lang][p.status]}</span></td></tr>`).join("");

    $("#ethos").innerHTML = C.ethos[lang].map(([h, t], i) => `<li><span class="ethos__n">${String(i + 1).padStart(2, "0")}</span><div><h3>${h}</h3><p>${t}</p></div></li>`).join("");

    if (hasGsap) ScrollTrigger.refresh();
  }

  /* index hover preview follows the cursor */
  const peek = $("#peek");
  $("#indexBody").addEventListener("pointerover", (e) => {
    const row = e.target.closest("tr"); if (!row) return;
    peek.innerHTML = massing(C.projects[row.dataset.i].boxes); peek.classList.add("is-on");
  });
  $("#indexBody").addEventListener("pointerleave", () => peek.classList.remove("is-on"));
  addEventListener("pointermove", (e) => { peek.style.left = `${e.clientX + 150}px`; peek.style.top = `${e.clientY}px`; });

  /* Berlin clock */
  const tick = () => { $("#clock").textContent = new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" }); };
  tick(); setInterval(tick, 15000);

  $("#langBtn").addEventListener("click", () => { lang = lang === "en" ? "ru" : "en"; store.set("vt-lang", lang); render(); });

  render();

  if (!hasGsap) { $$("[data-count]").forEach((el) => { el.textContent = (+el.dataset.count).toLocaleString("de-DE"); }); return; }

  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".hero__title .row", { yPercent: 60, opacity: 0, duration: .9, ease: "power4.out", stagger: .08 });
  gsap.from("#heroModel .massing polygon", { opacity: 0, y: 30, duration: .5, ease: "power3.out", stagger: .015, delay: .3 });

  // horizontal scroll: pin the section and translate the track by its overflow
  const track = $("#workTrack");
  const dist = () => track.scrollWidth - innerWidth;
  gsap.to(track, {
    x: () => -dist(), ease: "none",
    scrollTrigger: {
      trigger: ".work", pin: ".work__pin", start: "top top", end: () => `+=${dist()}`, scrub: .6, invalidateOnRefresh: true,
      onUpdate: (s) => { $("#workProgress").style.width = `${s.progress * 100}%`; },
    },
  });

  $$("[data-count]").forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, { v: +el.dataset.count, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("de-DE"); } });
  });
  gsap.from(".ethos__list li", { y: 50, opacity: 0, duration: .7, ease: "power3.out", stagger: .1, scrollTrigger: { trigger: ".ethos__list", start: "top 80%" } });
})();
