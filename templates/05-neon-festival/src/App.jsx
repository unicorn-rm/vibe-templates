import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Visualizer from "./Visualizer.jsx";
import { FESTIVAL, LINEUP, SPOTS, STAGES, T } from "./content.js";

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

function useLang() {
  const initial = new URLSearchParams(location.search).get("lang") || read("vt-lang") || "en";
  const [lang, setLang] = useState(T[initial] ? initial : "en");
  useEffect(() => { document.documentElement.lang = lang; write("vt-lang", lang); }, [lang]);
  return [lang, setLang];
}

/* ---------- small pieces ---------- */
function Sparkle({ className, size = 28 }) {
  return (
    <svg className={`sparkle ${className}`} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 0l3.5 12.5L32 16l-12.5 3.5L16 32l-3.5-12.5L0 16l12.5-3.5z" />
    </svg>
  );
}

function ChromeTitle({ text }) {
  const reduce = useReducedMotion();
  return (
    <h1 className="hero__title" aria-label={text}>
      {text.split(" ").map((word, w) => (
        <span key={w} className="hero__word" aria-hidden="true">
          {[...word].map((ch, i) => (
            <motion.span key={i} className="chrome"
              initial={reduce ? false : { y: "110%", rotate: 8, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 + (w * 5 + i) * 0.045 }}>
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function Countdown({ t }) {
  const target = useMemo(() => new Date(FESTIVAL.start).getTime(), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, target - now);
  if (!left) return <p className="count count--live">{t.live}</p>;
  const parts = [
    [Math.floor(left / 864e5), t.d],
    [Math.floor(left / 36e5) % 24, t.h],
    [Math.floor(left / 6e4) % 60, t.m],
    [Math.floor(left / 1e3) % 60, t.s],
  ];
  return (
    <dl className="count" aria-label="Countdown">
      {parts.map(([v, l]) => (
        <div key={l}><dt>{String(v).padStart(2, "0")}</dt><dd>{l}</dd></div>
      ))}
    </dl>
  );
}

function Lineup({ t, st }) {
  const [day, setDay] = useState("fri");
  const [stage, setStage] = useState("all");
  const acts = LINEUP[day].filter((a) => stage === "all" || a.stage === stage);
  return (
    <section className="sec lineup" id="lineup">
      <div className="sec__head">
        <h2 className="h2">{t.title}</h2>
        <div className="tabs" role="tablist" aria-label="Day">
          {Object.entries(t.days).map(([id, label]) => (
            <button key={id} role="tab" aria-selected={day === id} className="tab" onClick={() => setDay(id)}>
              {day === id && <motion.span layoutId="tab" className="tab__bg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="chips">
        {["all", ...STAGES.map((s) => s.id)].map((id) => (
          <button key={id} className="chip" aria-pressed={stage === id} onClick={() => setStage(id)}
            style={{ "--c": STAGES.find((s) => s.id === id)?.color || "var(--chrome)" }}>
            {id === "all" ? t.all : st[id].name}
          </button>
        ))}
      </div>
      <motion.ul className="acts" layout>
        <AnimatePresence mode="popLayout">
          {acts.map((a, i) => (
            <motion.li key={day + a.name} layout className={`act act--${a.size}`}
              style={{ "--c": STAGES.find((s) => s.id === a.stage).color }}
              initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35, delay: i * 0.03 }}>
              <span className="act__name">{a.name}</span>
              <span className="act__stage">{st[a.stage].name}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}

function Stages({ t }) {
  return (
    <section className="sec" id="stages">
      <h2 className="h2">{t.title}</h2>
      <div className="stages">
        {STAGES.map((s, i) => (
          <motion.article key={s.id} className="stage" style={{ "--c": s.color }}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1 }} whileHover={{ rotate: i % 2 ? 1.5 : -1.5, y: -6 }}>
            <span className="stage__n">0{i + 1}</span>
            <h3>{t[s.id].name}</h3>
            <p>{t[s.id].desc}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function SiteMap({ t, st }) {
  const [active, setActive] = useState("orbit");
  return (
    <section className="sec" id="map">
      <div className="sec__head"><h2 className="h2">{t.title}</h2><p className="muted">{t.hint}</p></div>
      <div className="map">
        <svg className="map__art" viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true">
          <path className="map__lake" d="M0 0h42c-6 10 4 18-6 26S20 30 14 40 0 46 0 46z" />
          <path className="map__path" d="M26 24 C40 30 55 18 70 20 M26 24 C30 40 34 50 34 52 M34 52 C46 54 52 50 60 50 M70 20 C76 34 70 44 60 50 M60 50 C70 48 80 44 86 43" />
        </svg>
        {SPOTS.map((s) => (
          <button key={s.id} className={`spot${active === s.id ? " is-on" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%`, "--c": s.color }}
            onClick={() => setActive(s.id)} aria-pressed={active === s.id}>
            <span className="sr">{st[s.id].name}</span>
          </button>
        ))}
        <AnimatePresence mode="wait">
          <motion.div key={active} className="map__card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <strong>{st[active].name}</strong>
            <p>{st[active].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function downloadIcs() {
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//vibe-templates//neon-bloom//EN", "BEGIN:VEVENT",
    `UID:neon-bloom-${FESTIVAL.year}@example.com`, `DTSTAMP:${fmt(Date.now())}`,
    `DTSTART:${fmt(FESTIVAL.start)}`, `DTEND:${fmt(FESTIVAL.end)}`,
    `SUMMARY:${FESTIVAL.name} ${FESTIVAL.year}`, "LOCATION:Lake Arena", "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(new Blob([ics], { type: "text/calendar" })), download: "neon-bloom.ics",
  });
  a.click(); URL.revokeObjectURL(a.href);
}

function Faq({ t }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec" id="faq">
      <h2 className="h2">{t.title}</h2>
      <div className="faq">
        {t.items.map(([q, a], i) => (
          <div key={q} className="faq__item">
            <button className="faq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
              <span>{q}</span><span className="faq__x" aria-hidden="true">+</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div className="faq__a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- page ---------- */
export default function App() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const marquee = Object.values(LINEUP).flat().map((a) => a.name);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <header className="nav">
        <a href="#top" className="nav__logo"><Sparkle size={18} className="nav__spark" />{FESTIVAL.name}</a>
        <nav aria-label="Primary">
          {Object.entries(t.nav).map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <button className="nav__lang" onClick={() => setLang(lang === "en" ? "ru" : "en")} aria-label="Switch language">
          {lang === "en" ? "RU" : "EN"}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="blob blob--1" aria-hidden="true" />
          <div className="blob blob--2" aria-hidden="true" />
          <Sparkle className="s1" size={44} /><Sparkle className="s2" /><Sparkle className="s3" size={20} />
          <p className="hero__dates">{t.hero.dates}</p>
          <ChromeTitle text={FESTIVAL.name} />
          <div className="hero__row">
            <div>
              <p className="hero__tag">{t.hero.tag}</p>
              <Countdown t={t.count} />
            </div>
            <div className="hero__viz">
              <Visualizer labels={t.hero} />
              <p className="muted small">{t.hero.hint}</p>
            </div>
          </div>
          <motion.span className="sticker" initial={{ rotate: -14, scale: 0 }} animate={{ rotate: -14, scale: 1 }} transition={{ delay: 1, type: "spring" }}>
            ’{FESTIVAL.year.slice(2)}
          </motion.span>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[...marquee, ...marquee].map((n, i) => <span key={i}>{n}<Sparkle size={16} className="marquee__s" /></span>)}
          </div>
        </div>

        <Lineup t={t.lineup} st={t.stages} />
        <Stages t={t.stages} />
        <SiteMap t={t.map} st={t.stages} />

        <section className="sec save">
          <div>
            <h2 className="h2">{t.save.title}</h2>
            <p className="muted">{t.save.text}</p>
          </div>
          <button className="btn" onClick={downloadIcs}>{t.save.btn}</button>
        </section>

        <Faq t={t.faq} />
      </main>

      <footer className="foot">
        <p className="foot__big" aria-hidden="true">{FESTIVAL.name}</p>
        <div className="foot__row"><span>{t.foot.note}</span><a href="#top">{t.foot.top}</a></div>
      </footer>
    </>
  );
}
