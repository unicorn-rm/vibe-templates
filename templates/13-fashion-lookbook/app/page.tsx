"use client";

import { useCallback, useEffect, useState } from "react";
import { CONTENT, HERO, ROLLS, SECOND, img, type Frame, type Lang } from "@/lib/content";

function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("vt-lang"); } catch {}
    const q = new URLSearchParams(location.search).get("lang") || saved;
    if (q === "ru" || q === "en") setLang(q);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("vt-lang", lang); } catch {}
  }, [lang]);
  return [lang, setLang];
}

const ALL: Frame[] = ROLLS.flatMap((r) => r.frames);

/* grease-pencil marks: a loose hand-drawn ellipse and a quick cross */
const Circle = () => (
  <svg className="mark mark--circle" viewBox="0 0 120 90" preserveAspectRatio="none" aria-hidden="true">
    <path d="M60 6 C100 4 116 26 114 46 C112 72 84 86 54 84 C22 82 4 64 6 42 C8 20 30 6 66 8" />
  </svg>
);
const Cross = () => (
  <svg className="mark mark--cross" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M14 12 L88 90 M86 10 L12 88" />
  </svg>
);

export default function Page() {
  const [lang, setLang] = useLang();
  const t = CONTENT[lang];
  const [open, setOpen] = useState(-1);
  const step = useCallback((d: number) => setOpen((o) => (o + d + ALL.length) % ALL.length), []);

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, step]);

  const cur = open >= 0 ? ALL[open] : null;

  return (
    <>
      <header className="top">
        <a href="#top" className="logo">OSTEN</a>
        <span className="season">{t.season}</span>
        <nav aria-label="Primary">{Object.entries(t.nav).map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav>
        <button className="lang" onClick={() => setLang(lang === "en" ? "ru" : "en")} aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__text">
            <h1>{t.title.map((l, i) => <span key={i}>{l}</span>)}</h1>
            <p>{t.lead}</p>
          </div>
          <figure className="hero__print">
            <img src={img(HERO, 1400)} alt="" />
            <figcaption>{ROLLS[0].name} — 00A</figcaption>
          </figure>
        </section>

        {/* SIGNATURE: contact sheets on a light table */}
        <section id="sheets" className="table">
          <div className="table__head">
            <h2>{t.sheets.title}</h2>
            <p>{t.sheets.sub} <b>{ALL.filter((f) => f.select).length} {t.sheets.selects}</b></p>
          </div>
          {ROLLS.map((roll, ri) => (
            <div key={roll.name} className="strip" style={{ rotate: `${ri ? 0.6 : -0.4}deg` }}>
              <p className="strip__edge"><span>{roll.name}</span><span>▸ {ri * 6 + 1}</span><span>KODAK SAFETY FILM</span><span>▸ {ri * 6 + 4}</span></p>
              <ol className="strip__frames">
                {roll.frames.map((f) => {
                  const i = ALL.indexOf(f);
                  return (
                    <li key={f.no}>
                      <button className="frame" onClick={() => setOpen(i)} aria-label={`${f.no} — ${f.look[lang]}`}>
                        <img src={img(f.id, 500)} alt="" loading="lazy" />
                        {f.select && <Circle />}
                        {f.reject && <Cross />}
                      </button>
                      <span className="frame__no">{f.no}</span>
                    </li>
                  );
                })}
              </ol>
              <p className="strip__edge"><span>{ri * 6 + 2} ▸</span><span>{roll.name}</span><span>{ri * 6 + 5} ▸</span></p>
            </div>
          ))}
        </section>

        <section id="pieces" className="pieces">
          <h2>{t.pieces.title}</h2>
          <table>
            <thead><tr>{t.pieces.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {ALL.filter((f) => f.select).map((f) => (
                <tr key={f.no} onClick={() => setOpen(ALL.indexOf(f))}>
                  <td>{f.look[lang]}</td><td>{f.pieces[lang]}</td><td>{f.no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section id="notes" className="notes">
          <img src={img(SECOND, 1000)} alt="" loading="lazy" />
          <div>
            <blockquote>{t.notes.quote}</blockquote>
            <p className="by">{t.notes.by}</p>
            <p>{t.notes.p}</p>
          </div>
        </section>

        <section id="showroom" className="showroom">
          <h2>{t.showroom.title}</h2>
          <p className="addr">{t.showroom.addr}</p>
          <p>{t.showroom.note}</p>
        </section>
      </main>

      <footer className="foot"><span>OSTEN © 2026</span><span>{t.foot}</span></footer>

      {cur && (
        <div className="loupe" role="dialog" aria-modal="true" aria-label={`${cur.no} — ${cur.look[lang]}`}>
          <button className="loupe__bg" onClick={() => setOpen(-1)} aria-label={t.loupe.close} />
          <div className="loupe__lens" key={cur.no}>
            <img src={img(cur.id, 1200)} alt={`${cur.look[lang]}: ${cur.pieces[lang]}`} />
          </div>
          <div className="loupe__info">
            <p className="loupe__no">{cur.no}</p>
            <p className="loupe__look">{cur.look[lang]}</p>
            <p>{cur.pieces[lang]}</p>
            <p className={`loupe__verdict${cur.select ? " is-sel" : ""}`}>{cur.select ? t.loupe.kept : cur.reject ? t.loupe.cut : t.loupe.maybe}</p>
          </div>
          <button className="loupe__nav loupe__nav--prev" onClick={() => step(-1)} aria-label={t.loupe.prev}>←</button>
          <button className="loupe__nav loupe__nav--next" onClick={() => step(1)} aria-label={t.loupe.next}>→</button>
          <button className="loupe__close" onClick={() => setOpen(-1)}>{t.loupe.close} ✕</button>
        </div>
      )}
    </>
  );
}
