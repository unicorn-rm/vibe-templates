import { useEffect, useMemo, useState } from "react";
import { EVENT, SCHEDULE, SPEAKERS, T } from "./content.js";

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };
const FLAPS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:·.-—'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

function useLang() {
  const q = new URLSearchParams(location.search).get("lang") || read("vt-lang");
  const [lang, setLang] = useState(q === "ru" ? "ru" : "en");
  useEffect(() => { document.documentElement.lang = lang; write("vt-lang", lang); }, [lang]);
  return [lang, setLang];
}

/* One split-flap cell: flips through characters until it lands on the target. */
function Flap({ ch, delay }) {
  const [shown, setShown] = useState(ch);
  useEffect(() => {
    if (reduced || shown === ch) { setShown(ch); return; }
    let i = FLAPS.indexOf(shown); if (i < 0) i = 0;
    let steps = 0;
    const start = setTimeout(function tick() {
      i = (i + 1) % FLAPS.length; steps++;
      const next = steps > 14 ? ch : FLAPS[i];
      setShown(next);
      if (next !== ch) setTimeout(tick, 32);
    }, delay);
    return () => clearTimeout(start);
  }, [ch]); // eslint-disable-line react-hooks/exhaustive-deps
  return <span className="flap" aria-hidden="true">{shown}</span>;
}

/* A row of flaps, fixed width so columns line up like a real board. */
function FlapText({ text, width, delay = 0 }) {
  const chars = text.toUpperCase().padEnd(width, " ").slice(0, width).split("");
  return (
    <span className="flaps">
      <span className="sr">{text}</span>
      {chars.map((c, i) => <Flap key={i} ch={c} delay={delay + i * 18} />)}
    </span>
  );
}

/* convert a Lisbon wall-clock time on a given date to the visitor's local time */
function toLocal(date, hm) {
  // Lisbon is UTC+0 in mid-March (before DST on the last Sunday)
  const d = new Date(`${date}T${hm}:00Z`);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function Board({ t }) {
  const [day, setDay] = useState("d1");
  const [tz, setTz] = useState("venue");
  const rows = SCHEDULE[day];
  const date = day === "d1" ? EVENT.day1 : EVENT.day2;
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);

  return (
    <section id="board" className="board-wrap">
      <div className="board">
        <div className="board__top">
          <h2><span className="plane" aria-hidden="true">✈</span> {t.board.title}</h2>
          <div className="board__tabs" role="tablist">
            {["d1", "d2"].map((d) => <button key={d} role="tab" aria-selected={day === d} onClick={() => setDay(d)}>{d === "d1" ? t.board.day1 : t.board.day2}</button>)}
          </div>
          <div className="board__tabs">
            {["venue", "local"].map((z) => <button key={z} aria-pressed={tz === z} onClick={() => setTz(z)}>{t.board.tz[z]}</button>)}
          </div>
          <span className="board__clock">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}</span>
        </div>
        <div className="board__table" role="table">
          <div className="board__head" role="row">{t.board.cols.map((c) => <span key={c} role="columnheader">{c}</span>)}</div>
          {rows.map(([time, talk, who, gate, st], i) => (
            <div key={day + i} className={`board__row st-${st}`} role="row">
              <span role="cell"><FlapText text={tz === "venue" ? time : toLocal(date, time)} width={5} delay={i * 60} /></span>
              <span role="cell"><FlapText text={talk} width={24} delay={i * 60 + 80} /></span>
              <span role="cell"><FlapText text={who} width={13} delay={i * 60 + 160} /></span>
              <span role="cell"><FlapText text={gate} width={4} delay={i * 60 + 220} /></span>
              <span role="cell" className="status"><FlapText text={t.status[st]} width={11} delay={i * 60 + 260} /></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const barcode = useMemo(() => Array.from({ length: 44 }, (_, i) => 1 + ((i * 7919) % 4)), []);

  return (
    <>
      <header className="sign-bar">
        <a href="#top" className="sign-bar__logo"><span className="pict">27</span>Gate 27</a>
        <nav aria-label="Primary">
          <a href="#board"><i>→</i>{t.nav.board}</a>
          <a href="#speakers"><i>↑</i>{t.nav.speakers}</a>
          <a href="#info"><i>i</i>{t.nav.info}</a>
        </nav>
        <button className="sign-bar__lang" onClick={() => setLang(lang === "en" ? "ru" : "en")} aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
      </header>

      <main id="top">
        <section className="hero">
          <p className="hero__k">{t.hero.k}</p>
          <h1><span className="hero__gate">{t.hero.h[0]}</span><span className="hero__sub">{t.hero.h[1]}</span></h1>
          <p className="hero__lead">{t.hero.lead}</p>
          <a className="wayfind" href="#board"><span className="wayfind__arrow" aria-hidden="true">→</span>{t.hero.cta}<span className="wayfind__no">A1–B2</span></a>
        </section>

        <Board t={t} />

        <section id="speakers" className="sec">
          <h2 className="h2">{t.speakers.title}</h2>
          <div className="passes">
            {SPEAKERS.map((s) => (
              <article key={s.name} className="pass">
                <div className="pass__main">
                  <p className="pass__label">{t.speakers.pass} · GATE 27</p>
                  <h3>{s.name}</h3>
                  <p className="pass__role">{s.role[lang]}</p>
                  <dl>
                    <div><dt>{t.speakers.from}</dt><dd>{s.from}</dd></div>
                    <div><dt>{t.speakers.to}</dt><dd>LIS</dd></div>
                    <div><dt>{t.speakers.seat}</dt><dd>{s.seat}</dd></div>
                  </dl>
                </div>
                <div className="pass__stub" aria-hidden="true">
                  <span className="pass__seat">{s.seat}</span>
                  <span className="barcode">{barcode.map((w, i) => <i key={i} style={{ width: w }} />)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="info" className="sec info">
          <h2 className="h2">{t.info.title}</h2>
          <ul>
            {t.info.items.map(([h, d], i) => (
              <li key={h}><span className="pict pict--sm">{["⌂", "◐", "♿"][i]}</span><div><b>{h}</b><p>{d}</p></div></li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="foot"><span>Gate 27 · LIS · 2027</span><span>{t.foot}</span></footer>
    </>
  );
}
