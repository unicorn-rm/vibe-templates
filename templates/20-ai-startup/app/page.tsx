"use client";

import { useEffect, useRef, useState } from "react";
import { BIBTEX, CONTENT, DEMO, RESULTS, type Copy, type Lang, type Tok } from "@/lib/content";

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

/* ---------- Figure 1: token-by-token answer with confidence underlines ---------- */
function Figure({ t, lang }: { t: Copy["fig"]; lang: Lang }) {
  const demos = DEMO[lang];
  const [which, setWhich] = useState(0);
  const [shown, setShown] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const toks: Tok[] = demos[which].a;

  const play = (i: number) => {
    setWhich(i); setShown(0); setHover(null);
    if (timer.current) clearInterval(timer.current);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(demos[i].a.length); return; }
    timer.current = setInterval(() => setShown((n) => {
      if (n + 1 >= demos[i].a.length && timer.current) clearInterval(timer.current);
      return n + 1;
    }), 90);
  };
  useEffect(() => { play(0); return () => { if (timer.current) clearInterval(timer.current); }; }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  const h = hover !== null ? toks[hover] : null;
  return (
    <figure id="fig" className="my-10 border-y border-ink py-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {demos.map((d, i) => (
          <button key={i} onClick={() => play(i)} className={`border px-3 py-1 text-left text-sm ${which === i ? "border-ink bg-ink text-paper" : "border-rule hover:border-ink"}`}>
            {t.ask}: <i>{d.q}</i>
          </button>
        ))}
      </div>
      <div className="relative min-h-[150px] bg-[#f6f5f0] p-5 font-code text-[15px] leading-[2.2]">
        <p className="mb-2 text-xs uppercase tracking-widest text-dim">{t.prompt}: {demos[which].q}</p>
        <p aria-live="polite">
          {toks.slice(0, shown).map(([tok, p], i) => (
            <span key={i} tabIndex={0} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setHover(i)}
              className={`tok ${p < 0.35 ? "tok--low" : ""} ${hover === i ? "tok--on" : ""}`} style={{ ["--p" as string]: p }}>{tok}</span>
          ))}
          {shown < toks.length && <span className="caret">▍</span>}
        </p>
        {h && (
          <div className="mt-3 inline-flex flex-wrap items-center gap-x-4 gap-y-1 border border-ink bg-paper px-3 py-1.5 text-xs">
            <b>“{h[0].trim()}” {(h[1] * 100).toFixed(0)}%</b>
            {h[1] < 0.35 && <span className="text-flag">{t.low}</span>}
            {h[2].length > 0 && <span className="text-dim">{t.alt}:</span>}
            {h[2].map(([a, p]) => <span key={a}>“{a.trim()}” {(p * 100).toFixed(0)}%</span>)}
          </div>
        )}
        <button onClick={() => play(which)} className="absolute top-3 right-3 text-xs underline">{t.replay}</button>
      </div>
      <figcaption className="mt-3 text-[15px]"><b>{t.caption.split(":")[0]}:</b>{t.caption.slice(t.caption.indexOf(":") + 1)}</figcaption>
    </figure>
  );
}

export default function Page() {
  const [lang, setLang] = useLang();
  const t = CONTENT[lang];
  const [copied, setCopied] = useState(false);
  const best = (col: number, low = false) => RESULTS.reduce((b, r) => { const v = r[col] as number; return (low ? v < b : v > b) ? v : b; }, low ? Infinity : -Infinity);

  return (
    <div className="relative">
      {/* arXiv-style side stamp */}
      <p className="side-stamp" aria-hidden="true">{t.arxiv}</p>

      <header className="mx-auto flex max-w-[760px] items-center gap-5 px-5 pt-6 text-sm">
        <a href="#top" className="font-bold">Tern Labs</a>
        <nav className="hidden gap-4 sm:flex" aria-label="Sections">
          {Object.entries(t.nav).map(([id, l]) => <a key={id} href={`#${id}`} className="text-link hover:underline">{l}</a>)}
        </nav>
        <button onClick={() => setLang(lang === "en" ? "ru" : "en")} className="ml-auto border border-ink px-2 font-code text-xs" aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
      </header>

      <main id="top" className="mx-auto max-w-[760px] px-5 pb-16">
        <h1 className="mt-14 text-center text-[clamp(1.8rem,4vw,2.5rem)] leading-tight font-bold">{t.title}</h1>
        <p className="mt-6 text-center text-lg">
          {t.authors.map(([n, a], i) => <span key={n}>{n}<sup>{a}</sup>{i < t.authors.length - 1 ? ", " : ""}</span>)}
        </p>
        <p className="mt-1 text-center text-sm text-dim">{t.affil.join(" · ")}</p>
        <p className="mt-4 flex justify-center gap-4 font-code text-sm">
          {t.links.map(([l, href]) => <a key={l} href={href} className="text-link underline-offset-4 hover:underline">[{l}]</a>)}
        </p>

        <section id="abs" className="mx-auto mt-10 max-w-[620px]">
          <h2 className="text-center text-base font-bold">{t.absTitle}</h2>
          <p className="mt-2 text-justify text-[17px] leading-relaxed hyphens-auto">{t.abs}</p>
        </section>

        <section className="mt-12">
          <h2 className="h2">{t.intro.h}</h2>
          <p className="para">{t.intro.p1}</p>
          <p className="para">{t.intro.p2}</p>
        </section>

        <Figure t={t.fig} lang={lang} />

        <section className="mt-12">
          <h2 className="h2">{t.method.h}</h2>
          <p className="para">{t.method.p}</p>
          <div className="my-6 flex items-center justify-center gap-6 text-xl">
            <math display="block" aria-label="ECE equals sum over m of the fraction of answers in bin m times the absolute difference between accuracy and confidence in bin m">
              <mrow>
                <mtext>ECE</mtext><mo>=</mo>
                <munderover><mo>∑</mo><mrow><mi>m</mi><mo>=</mo><mn>1</mn></mrow><mi>M</mi></munderover>
                <mfrac><mrow><mo>|</mo><msub><mi>B</mi><mi>m</mi></msub><mo>|</mo></mrow><mi>n</mi></mfrac>
                <mo>|</mo><mi>acc</mi><mo>(</mo><msub><mi>B</mi><mi>m</mi></msub><mo>)</mo><mo>−</mo><mi>conf</mi><mo>(</mo><msub><mi>B</mi><mi>m</mi></msub><mo>)</mo><mo>|</mo>
              </mrow>
            </math>
            <span className="text-base">(1)</span>
          </div>
          <p className="para">{t.method.where}</p>
        </section>

        <section id="res" className="mt-12">
          <h2 className="h2">{t.res.h}</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="booktabs">
              <caption>{t.res.caption}</caption>
              <thead><tr>{t.res.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {RESULTS.map((r) => (
                  <tr key={r[0]}>
                    <td className={r[0].startsWith("Tern") ? "font-bold" : ""}>{r[0]}</td>
                    <td>{r[1]}</td>
                    <td className={r[2] === best(2) ? "font-bold" : ""}>{r[2]}</td>
                    <td className={r[3] === best(3) ? "font-bold" : ""}>{r[3]}</td>
                    <td className={r[4] === best(4, true) ? "font-bold" : ""}>{r[4]}</td>
                    <td className={r[5] === best(5) ? "font-bold" : ""}>{r[5]}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="cite" className="mt-12">
          <h2 className="h2">{t.cite.h}</h2>
          <pre className="relative overflow-x-auto bg-[#f6f5f0] p-4 font-code text-[13px]">{BIBTEX}
            <button className="absolute top-2 right-2 border border-ink bg-paper px-2 text-xs" onClick={async () => { try { await navigator.clipboard.writeText(BIBTEX); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} }}>
              {copied ? t.cite.done : t.cite.copy}
            </button>
          </pre>
        </section>

        <section className="mt-12 text-[15px]">
          <h2 className="h2">{t.refs.h}</h2>
          <ol className="space-y-1">{t.refs.list.map((r) => <li key={r}>{r}</li>)}</ol>
        </section>
      </main>

      <footer className="border-t border-rule py-6 text-center text-sm text-dim">{t.foot}</footer>
    </div>
  );
}
