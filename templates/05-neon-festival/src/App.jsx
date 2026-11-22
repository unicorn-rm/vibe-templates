import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Visualizer from "./Visualizer.jsx";
import { FESTIVAL, LINEUP, SPOTS, STAGES, T } from "./content.js";

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
const EASE = [0.2, 0.8, 0.2, 1]; // the one easing used everywhere

function useLang() {
  const initial = new URLSearchParams(location.search).get("lang") || read("vt-lang") || "en";
  const [lang, setLang] = useState(T[initial] ? initial : "en");
  useEffect(() => { document.documentElement.lang = lang; write("vt-lang", lang); }, [lang]);
  return [lang, setLang];
}

/* Two-ink type: a pink plate and a blue plate printed with multiply.
   On load the blue plate slides into (almost) register — like paper going through a riso. */
function Riso({ children, as: Tag = "span", className = "", off = [5, 3] }) {
  const reduce = useReducedMotion();
  return (
    <Tag className={`riso ${className}`}>
      <span className="riso__pink">{children}</span>
      <motion.span className="riso__blue" aria-hidden="true"
        initial={reduce ? false : { x: 60, y: -24, opacity: 0 }}
        animate={{ x: off[0], y: off[1], opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}>
        {children}
      </motion.span>
    </Tag>
  );
}

function Crop() {
  return <span className="crop" aria-hidden="true"><i /><i /><i /><i /></span>;
}

function Countdown({ t }) {
  const target = useMemo(() => new Date(FESTIVAL.start).getTime(), []);
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const left = Math.max(0, target - now);
  if (!left) return <p className="stub__live">{t.live}</p>;
  const parts = [[Math.floor(left / 864e5), t.d], [Math.floor(left / 36e5) % 24, t.h], [Math.floor(left / 6e4) % 60, t.m], [Math.floor(left / 1e3) % 60, t.s]];
  return (
    <dl className="count" aria-label="Countdown">
      {parts.map(([v, l]) => <div key={l}><dt>{String(v).padStart(2, "0")}</dt><dd>{l}</dd></div>)}
    </dl>
  );
}

/* Poster billing: headliner huge, then big names, then everyone else in one line. */
function Lineup({ t, st }) {
  const [day, setDay] = useState("fri");
  const [stage, setStage] = useState("all");
  const acts = LINEUP[day].filter((a) => stage === "all" || a.stage === stage);
  const tier = (n) => acts.filter((a) => a.size === n);
  const color = (id) => STAGES.find((s) => s.id === id).color;

  return (
    <section className="sec lineup" id="lineup">
      <Crop />
      <div className="lineup__head">
        <h2 className="h2">{t.title}</h2>
        <div className="days" role="tablist" aria-label="Day">
          {Object.entries(t.days).map(([id, label]) => (
            <button key={id} role="tab" aria-selected={day === id} onClick={() => setDay(id)}>
              <b>{label.split(" ")[1]}</b><span>{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="stages-filter">
        {["all", ...STAGES.map((s) => s.id)].map((id) => (
          <button key={id} aria-pressed={stage === id} onClick={() => setStage(id)} style={{ "--c": id === "all" ? "var(--ink)" : color(id) }}>
            {id === "all" ? t.all : st[id].name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={day + stage} className="bill" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: EASE }}>
          {tier(3).map((a) => <p key={a.name} className="bill__1" style={{ color: color(a.stage) }}>{a.name}</p>)}
          {tier(2).length > 0 && <p className="bill__2">{tier(2).map((a, i) => <span key={a.name}>{i > 0 && <i> • </i>}<span style={{ color: color(a.stage) }}>{a.name}</span></span>)}</p>}
          {tier(1).length > 0 && <p className="bill__3">{tier(1).map((a, i) => <span key={a.name}>{i > 0 && " · "}{a.name}</span>)}</p>}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function SiteMap({ t, st }) {
  const [active, setActive] = useState("orbit");
  return (
    <section className="sec" id="map">
      <Crop />
      <h2 className="h2">{t.title}</h2>
      <div className="map">
        <div className="map__art">
          <svg viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true">
            <path className="map__lake" d="M0 0h42c-6 10 4 18-6 26S20 30 14 40 0 46 0 46z" />
            <path className="map__path" d="M26 24 C40 30 55 18 70 20 M26 24 C30 40 34 50 34 52 M34 52 C46 54 52 50 60 50 M70 20 C76 34 70 44 60 50 M60 50 C70 48 80 44 86 43" />
          </svg>
          {SPOTS.map((s, i) => (
            <button key={s.id} className={`spot${active === s.id ? " is-on" : ""}`} style={{ left: `${s.x}%`, top: `${s.y}%`, "--c": s.color }}
              onClick={() => setActive(s.id)} aria-pressed={active === s.id} aria-label={st[s.id].name}>{i + 1}</button>
          ))}
        </div>
        <ol className="map__legend">
          {SPOTS.map((s, i) => (
            <li key={s.id} className={active === s.id ? "is-on" : ""}>
              <button onClick={() => setActive(s.id)}><span className="n" style={{ "--c": s.color }}>{i + 1}</span><strong>{st[s.id].name}</strong></button>
              {active === s.id && <p>{st[s.id].desc}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function downloadIcs() {
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//vibe-templates//neon-bloom//EN", "BEGIN:VEVENT",
    `UID:neon-bloom-${FESTIVAL.year}@example.com`, `DTSTAMP:${fmt(Date.now())}`, `DTSTART:${fmt(FESTIVAL.start)}`, `DTEND:${fmt(FESTIVAL.end)}`,
    `SUMMARY:${FESTIVAL.name} ${FESTIVAL.year}`, "LOCATION:Lake Arena", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([ics], { type: "text/calendar" })), download: "neon-bloom.ics" });
  a.click(); URL.revokeObjectURL(a.href);
}

export default function App() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const heads = Object.entries(LINEUP).map(([d, acts]) => [t.lineup.days[d], acts.find((a) => a.size === 3).name]);
  const [w1, w2] = FESTIVAL.name.split(" ");

  return (
    <>
      <header className="bar">
        <a href="#top" className="bar__logo">{FESTIVAL.name} <span>’{FESTIVAL.year.slice(2)}</span></a>
        <nav aria-label="Primary">{Object.entries(t.nav).map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <button className="bar__lang" onClick={() => setLang(lang === "en" ? "ru" : "en")} aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
      </header>

      <main id="top">
        {/* HERO = the poster */}
        <section className="poster">
          <Crop />
          <p className="poster__strip"><span>{t.hero.dates}</span><span>Vol. 05</span></p>
          <h1 className="poster__title" aria-label={FESTIVAL.name}>
            <Riso className="poster__w1">{w1}</Riso>
            <Riso className="poster__w2" off={[-4, 4]}>{w2}</Riso>
          </h1>
          <div className="poster__viz">
            <Visualizer labels={t.hero} />
            <p className="small">{t.hero.hint}</p>
          </div>
          <div className="poster__info">
            <p className="poster__tag">{t.hero.tag}</p>
            <ul className="poster__heads">
              {heads.map(([d, n]) => <li key={d}><span>{d}</span><b>{n}</b></li>)}
            </ul>
          </div>
        </section>

        <Lineup t={t.lineup} st={t.stages} />

        <section className="sec" id="stages">
          <Crop />
          <h2 className="h2">{t.stages.title}</h2>
          <div className="plates">
            {STAGES.map((s, i) => (
              <article key={s.id} className="plate" style={{ "--c": s.color }}>
                <span className="plate__n">0{i + 1}</span>
                <h3>{t.stages[s.id].name}</h3>
                <p>{t.stages[s.id].desc}</p>
              </article>
            ))}
          </div>
        </section>

        <SiteMap t={t.map} st={t.stages} />

        <section className="sec">
          <div className="stub">
            <div className="stub__main">
              <h2 className="h2">{t.save.title}</h2>
              <p>{t.save.text}</p>
              <Countdown t={t.count} />
            </div>
            <div className="stub__tear">
              <button className="btn" onClick={downloadIcs}>{t.save.btn}</button>
              <span className="stub__no">№ 000{FESTIVAL.year}</span>
            </div>
          </div>
        </section>

        <section className="sec" id="faq">
          <Crop />
          <h2 className="h2">{t.faq.title}</h2>
          <dl className="faq">
            {t.faq.items.map(([q, a]) => <div key={q}><dt>{q}</dt><dd>{a}</dd></div>)}
          </dl>
        </section>
      </main>

      <footer className="foot">
        <span>{t.foot.note}</span>
        <a href="#top">{t.foot.top}</a>
      </footer>
    </>
  );
}
