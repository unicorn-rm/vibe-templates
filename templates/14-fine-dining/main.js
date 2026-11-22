(() => {
  const C = window.CONTENT;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGsap = !!window.gsap && !reduced;
  const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
  };

  /* English copy is the HTML itself; remember it so we can switch back. */
  $$("[data-i18n]").forEach((el) => { C.ui.en[el.dataset.i18n] = el.innerHTML; });

  let lang = new URLSearchParams(location.search).get("lang") || store.get("vt-lang") || "en";
  if (!C.ui[lang]) lang = "en";

  /* ---------- courses ---------- */
  const imgs = $("#menuImgs");
  C.courses.forEach((c, i) => {
    const img = new Image();
    img.src = c.img; img.alt = ""; img.loading = i ? "lazy" : "eager";
    if (!i) img.classList.add("is-on");
    imgs.append(img);
  });
  function renderCourses() {
    $("#courses").innerHTML = C.courses.map((c, i) => {
      const t = c[lang];
      return `<li class="course${i ? "" : " is-on"}" data-i="${i}"><span class="course__n">${ROMAN[i]}</span><div><h3>${t.t}</h3><p>${t.d}</p></div><p class="pair">${t.p}</p></li>`;
    }).join("");
  }
  function setCourse(i) {
    $$(".course").forEach((el) => el.classList.toggle("is-on", +el.dataset.i === i));
    $$("img", imgs).forEach((el, k) => el.classList.toggle("is-on", k === i));
    $("#menuNum").textContent = ROMAN[i];
  }

  /* ---------- split quote into words for the scrub reveal ---------- */
  function splitQuote() {
    const q = $("[data-split]");
    q.innerHTML = q.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  }

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => {
      const v = C.ui[lang][el.dataset.i18n] ?? C.ui.en[el.dataset.i18n];
      if (v != null) el.innerHTML = v;
    });
    $("#langBtn").textContent = lang === "en" ? "RU" : "EN";
    renderCourses(); splitQuote();
    hasGsap ? bindScroll() : bindStatic();
  }

  /* ---------- scroll choreography ---------- */
  let triggers = [];
  function bindScroll() {
    triggers.forEach((t) => t.kill()); triggers = [];
    const ST = window.ScrollTrigger;

    triggers.push(gsap.fromTo(".story__quote .w", { opacity: .14 }, {
      opacity: 1, stagger: .05, ease: "none",
      scrollTrigger: { trigger: ".story__quote", start: "top 75%", end: "bottom 40%", scrub: true },
    }).scrollTrigger);

    $$(".course").forEach((el, i) => triggers.push(ST.create({
      trigger: el, start: "top 55%", end: "bottom 55%",
      onToggle: (s) => s.isActive && setCourse(i),
    })));
    ST.refresh();
  }

  function intro() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".hero__title .line > *", { yPercent: 110, duration: 1.4, ease: "expo.out", stagger: .12, delay: .15 });
    gsap.from(".hero__est, .hero__lead, .nav", { opacity: 0, y: 16, duration: 1.2, ease: "power3.out", delay: .6, stagger: .1 });
    gsap.from(".hero__media img", { scale: 1.18, duration: 2.6, ease: "power2.out" });
    gsap.to(".hero__media", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    gsap.from(".chef__img", { clipPath: "inset(100% 0 0 0)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".chef", start: "top 70%" } });
    gsap.fromTo(".chef__img img", { yPercent: -8 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".chef", scrub: true } });

    $$("[data-count]").forEach((el) => {
      const o = { v: 0 };
      gsap.to(o, { v: +el.dataset.count, duration: 2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString(lang); } });
    });

    $$("[data-speed]").forEach((el) => gsap.to(el, { yPercent: +el.dataset.speed, ease: "none", scrollTrigger: { trigger: ".gallery", scrub: true } }));

    gsap.from(".press__item, .visit > *", { opacity: 0, y: 40, duration: 1.1, ease: "power3.out", stagger: .12,
      scrollTrigger: { trigger: ".press", start: "top 80%" } });
  }

  /* Without GSAP (or with reduced motion) everything still works. */
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setCourse(+e.target.dataset.i)), { rootMargin: "-50% 0px -50% 0px" });
  function bindStatic() {
    io.disconnect();
    $$(".course").forEach((el) => io.observe(el));
    $$("[data-count]").forEach((el) => { el.textContent = (+el.dataset.count).toLocaleString(lang); });
  }

  /* ---------- nav + language ---------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-solid", scrollY > 80);
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  $("#langBtn").addEventListener("click", () => {
    lang = lang === "en" ? "ru" : "en"; store.set("vt-lang", lang); applyLang();
  });

  if (hasGsap) intro();
  applyLang();
})();
