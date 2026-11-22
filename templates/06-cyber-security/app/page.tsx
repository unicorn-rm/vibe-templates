"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { CONTENT, FORM_RESULT, type Copy, type Lang, type Mark } from "@/lib/content";

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

/* "[[secret]]" → redaction bar you can hover or tab to */
function R({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[\[.+?\]\])/g).map((part, i) =>
        part.startsWith("[[")
          ? <span key={i} className="redact" tabIndex={0}>{part.slice(2, -2)}</span>
          : <Fragment key={i}>{part}</Fragment>)}
    </>
  );
}

function Sheet({ id, n, total, t, children, className = "" }: { id?: string; n: number; total: number; t: Copy; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`sheet relative mx-auto w-full max-w-[880px] px-6 py-10 sm:px-14 sm:py-14 ${className}`}>
      {children}
      <p className="mt-12 flex justify-between border-t border-rule pt-3 font-mono text-[11px] text-pencil">
        <span>{t.file.no}</span><span>{t.file.page} {n} {t.file.of} {total}</span>
      </p>
    </section>
  );
}

const MARK: Record<Mark, string> = { ok: "✓", warn: "!", fail: "✗" };

/* ---------- signature: the request form ---------- */
function RequestForm({ t }: { t: Copy["form"] }) {
  const [domain, setDomain] = useState("");
  const [step, setStep] = useState(-1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = t.checks.length;
  const done = step >= n;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (done) { setStep(-1); return; }
    if (timer.current) clearInterval(timer.current);
    setStep(0);
    timer.current = setInterval(() => setStep((s) => {
      if (s + 1 >= n && timer.current) clearInterval(timer.current);
      return s + 1;
    }), 520);
  };
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <form onSubmit={submit} className="relative border-2 border-ink p-5 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-3">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <span className="font-mono text-xs text-pencil">BS-7 / rev. 3</span>
      </div>
      <p className="mt-2 font-mono text-xs text-pencil">{t.sub}</p>

      <label className="mt-6 block">
        <span className="font-mono text-xs uppercase tracking-widest">1. {t.field}</span>
        <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder={t.placeholder} disabled={step >= 0 && !done}
          className="mt-1 block w-full border-0 border-b border-dashed border-ink bg-transparent px-0 py-2 font-mono text-xl outline-none placeholder:text-pencil/50 focus:border-solid focus:border-stamp" />
      </label>

      <ol className="mt-6 divide-y divide-rule border-y border-rule" aria-live="polite">
        {t.checks.map(([name, detail], i) => {
          const shown = step > i;
          const m = FORM_RESULT[i];
          return (
            <li key={name} className="grid grid-cols-[2rem_1fr] items-baseline gap-3 py-2.5">
              <span className={`grid size-6 place-items-center border-2 border-ink font-mono text-sm font-bold ${shown && m !== "ok" ? "text-stamp" : ""}`}>{shown ? MARK[m] : ""}</span>
              <span>
                <span className="font-mono text-xs uppercase tracking-wider">{i + 2}. {name}</span>
                {shown && <span className="type block max-w-full font-mono text-sm text-pencil">→ {detail}</span>}
                {step === i && <span className="block font-mono text-sm text-pencil">…</span>}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 grid grid-cols-2 gap-6 font-mono text-xs">
        <div className="border-b border-ink pb-1">{t.examiner}: <span className="text-base italic font-serif">{done ? "J. Kowalski" : ""}</span></div>
        <div className="border-b border-ink pb-1">{t.date}: <span>{done ? new Date().toISOString().slice(0, 10) : ""}</span></div>
      </div>

      <button className="mt-6 border-2 border-ink bg-ink px-5 py-3 font-mono text-sm font-bold uppercase tracking-widest text-sheet transition-colors hover:bg-sheet hover:text-ink disabled:opacity-40" disabled={step >= 0 && !done}>
        {done ? t.again : t.submit}
      </button>

      {done && (
        <span className="stamp thump pointer-events-none absolute right-6 bottom-20 text-2xl sm:right-10 sm:text-3xl" style={{ ["--rot" as string]: "-11deg" }}>
          {t.verdict}<br /><span className="text-sm">{(domain || t.placeholder).slice(0, 28)}</span>
        </span>
      )}
    </form>
  );
}

export default function Page() {
  const [lang, setLang] = useLang();
  const t = CONTENT[lang];
  const total = 5;
  const sum = t.report.sev.reduce((a, [, v]) => a + v, 0);
  const HATCH = ["hatch-solid", "hatch-diag", "hatch-dots", "hatch-none"];

  return (
    <>
      {/* desk-top bar: like a folder tab */}
      <header className="sticky top-0 z-40 border-b border-ink/20 bg-desk/95">
        <div className="mx-auto flex max-w-[880px] items-center gap-6 px-4 py-3 font-mono text-xs">
          <a href="#top" className="font-bold tracking-[0.3em]">BASTION</a>
          <nav className="hidden gap-5 md:flex" aria-label="Sections">
            {t.nav.map(([id, label]) => <a key={id} href={`#${id}`} className="hover:text-stamp">{label}</a>)}
          </nav>
          <button onClick={() => setLang(lang === "en" ? "ru" : "en")} className="ml-auto border border-ink px-2 py-0.5 hover:bg-ink hover:text-desk" aria-label="Switch language">{t.lang}</button>
        </div>
      </header>

      <main id="top" className="space-y-10 px-3 py-10 sm:space-y-14 sm:py-16">
        {/* page 1 — cover memo */}
        <Sheet n={1} total={total} t={t}>
          <div className="flex flex-wrap items-start justify-between gap-4 font-mono text-xs">
            <div className="space-y-1">
              <p>{t.file.no}</p>
              <p>{t.file.cls}: <s className="text-pencil">{t.file.was}</s> → <b>{t.file.now}</b></p>
            </div>
            <span className="stamp thump text-xl sm:text-2xl" style={{ ["--rot" as string]: "-8deg", animationDelay: ".5s" }}>{t.stamp}</span>
          </div>
          <dl className="mt-10 space-y-1 border-y border-ink py-4 font-mono text-sm">
            <dd>{t.hero.to}</dd><dd>{t.hero.from}</dd><dd className="font-bold">{t.hero.re}</dd>
          </dl>
          <h1 className="mt-10 text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02] font-bold tracking-[-0.02em] text-balance"><R text={t.hero.title} /></h1>
          <p className="mt-8 max-w-[60ch] text-xl leading-relaxed"><R text={t.hero.lead} /></p>
          <p className="mt-8 text-lg italic">{t.hero.sign}</p>
        </Sheet>

        {/* page 2 — services table */}
        <Sheet id="services" n={2} total={total} t={t}>
          <h2 className="text-3xl font-bold">{t.services.title}</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead className="font-mono text-[11px] uppercase tracking-widest">
                <tr className="border-y-2 border-ink">{t.services.head.map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}</tr>
              </thead>
              <tbody>
                {t.services.rows.map(([code, name, len, get]) => (
                  <tr key={code} className="border-b border-rule align-top transition-colors hover:bg-ink/[.04]">
                    <td className="py-3 pr-4 font-mono font-bold">{code}</td>
                    <td className="py-3 pr-4 text-lg">{name}</td>
                    <td className="py-3 pr-4 font-mono text-sm">{len}</td>
                    <td className="py-3 font-mono text-sm">{get}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm italic text-pencil">* {t.services.note}</p>

          <div id="method" className="mt-14 grid gap-8 md:grid-cols-[1fr_12rem]">
            <div>
              <h2 className="text-3xl font-bold">{t.method.title}</h2>
              <ol className="mt-6 space-y-3">
                {t.method.steps.map(([h, d], i) => (
                  <li key={h} className="grid grid-cols-[3rem_1fr] gap-2">
                    <span className="font-mono text-sm">2.{i + 1}</span>
                    <span><b>{h}.</b> {d}</span>
                  </li>
                ))}
              </ol>
            </div>
            <aside className="self-end border-l-2 border-stamp pl-4 font-mono text-xs text-stamp md:mb-1">{t.method.margin}</aside>
          </div>
        </Sheet>

        {/* page 3 — the form */}
        <Sheet id="form" n={3} total={total} t={t}>
          <RequestForm t={t.form} />
        </Sheet>

        {/* page 4 — report tally + log */}
        <Sheet id="log" n={4} total={total} t={t}>
          <h2 className="text-3xl font-bold">{t.report.title}</h2>
          <p className="mt-1 italic text-pencil">{t.report.sub}</p>
          <div className="mt-6 space-y-2">
            {t.report.sev.map(([s, v], i) => (
              <div key={s} className="grid grid-cols-[8rem_1fr_2rem] items-center gap-3 font-mono text-sm">
                <span>{s}</span>
                <span className="h-5 border border-ink"><span className={`block h-full ${HATCH[i]}`} style={{ width: `${(v / 12) * 100}%` }} /></span>
                <span className="text-right font-bold">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 font-mono text-sm">Σ {sum} · <b>{sum - 2}</b> {t.report.fixed}</p>

          <h2 className="mt-14 text-3xl font-bold">{t.log.title}</h2>
          <ul className="mt-5 space-y-1.5 font-mono text-sm">
            {t.log.lines.map(([time, line]) => (
              <li key={time} className="grid grid-cols-[3.5rem_1fr] gap-2"><span className="text-pencil">{time}</span><span><R text={line} /></span></li>
            ))}
          </ul>
        </Sheet>

        {/* page 5 — cases + cut-out */}
        <Sheet n={5} total={total} t={t}>
          <h2 className="text-3xl font-bold">{t.cases.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.cases.items.map(([code, who, what]) => (
              <article key={code} className="border border-ink p-4">
                <p className="flex justify-between font-mono text-xs"><b>{code}</b><span className="text-pencil">{who}</span></p>
                <p className="mt-3 leading-snug"><R text={what} /></p>
              </article>
            ))}
          </div>

          <div className="relative mt-14 border-2 border-dashed border-ink p-6 sm:p-8">
            <span className="absolute -top-3 left-6 bg-sheet px-2 font-mono text-sm" aria-hidden="true">✂ - - - - - - - - - -</span>
            <h2 className="text-3xl font-bold text-stamp">{t.cut.title}</h2>
            <p className="mt-2 max-w-[48ch] text-pencil">{t.cut.sub}</p>
            <a href="tel:+00000000000" className="mt-4 inline-block font-mono text-[clamp(1.6rem,5vw,2.8rem)] font-bold underline decoration-stamp decoration-2 underline-offset-8 hover:text-stamp">{t.cut.phone}</a>
          </div>
        </Sheet>
      </main>

      <footer className="pb-10 text-center font-mono text-xs text-pencil">{t.foot}</footer>
    </>
  );
}
