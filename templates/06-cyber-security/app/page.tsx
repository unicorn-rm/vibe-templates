"use client";

import { useEffect, useRef, useState } from "react";
import { CONTENT, FEED, SCAN_RESULT, type Copy, type Lang, type Status } from "@/lib/content";

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

const wrap = "mx-auto w-full max-w-[1280px] px-4 sm:px-8";
const COLOR: Record<Status, string> = { ok: "text-ok", warn: "text-warn", fail: "text-alert" };
const LABEL: Record<Status, string> = { ok: "PASS", warn: "WARN", fail: "FAIL" };

function H2({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-end gap-4">
      <span className="font-mono text-xs text-cyan">[{k}]</span>
      <h2 className="font-display text-4xl leading-none sm:text-5xl">{children}</h2>
      <span className="mb-2 h-px flex-1 bg-edge" />
    </div>
  );
}

/* ---------- signature: simulated attack-surface scanner ---------- */
function Scanner({ t }: { t: Copy["scanner"] }) {
  const [domain, setDomain] = useState("");
  const [step, setStep] = useState(-1); // -1 idle, 0..n running, n done
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = t.checks.length;
  const done = step >= n;

  const run = (e: React.FormEvent) => {
    e.preventDefault();
    if (timer.current) clearInterval(timer.current);
    setStep(0);
    timer.current = setInterval(() => setStep((s) => {
      if (s + 1 >= n && timer.current) clearInterval(timer.current);
      return s + 1;
    }), 650);
  };
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const score = SCAN_RESULT.reduce((a, s) => a + (s === "fail" ? 22 : s === "warn" ? 9 : 0), 0);
  const target = (domain || t.placeholder).replace(/^https?:\/\//, "").slice(0, 40);

  return (
    <div className="cut relative overflow-hidden border border-edge bg-panel/90 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-edge px-4 py-2 font-mono text-[11px] text-dim">
        <span className="size-2 rounded-full bg-alert" /><span className="size-2 rounded-full bg-warn" /><span className="size-2 rounded-full bg-ok" />
        <span className="ml-2">bastion://surface-check</span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl">{t.title}</h3>
        <form onSubmit={run} className="mt-4 flex gap-2">
          <label className="sr-only" htmlFor="domain">Domain</label>
          <input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder={t.placeholder}
            className="min-w-0 flex-1 border border-edge bg-void px-3 py-2.5 font-mono text-sm outline-none placeholder:text-dim/60 focus:border-cyan" />
          <button className="bg-cyan px-4 font-display text-sm text-void transition-colors hover:bg-text">{done ? t.again : t.run}</button>
        </form>
        <ul className="mt-5 space-y-1.5 font-mono text-[13px]" aria-live="polite">
          {t.checks.map(([name, detail], i) => {
            const state = step < 0 ? "idle" : i < step ? "done" : i === step ? "run" : "wait";
            const st = SCAN_RESULT[i];
            return (
              <li key={name} className={`grid grid-cols-[3.4rem_1fr] gap-3 transition-opacity ${state === "idle" || state === "wait" ? "opacity-35" : ""}`}>
                <span className={state === "done" ? COLOR[st] : "text-dim"}>
                  {state === "done" ? `[${LABEL[st]}]` : state === "run" ? <span className="text-cyan">[<span className="blink">··</span>]</span> : "[    ]"}
                </span>
                <span>
                  {name}
                  {state === "done" && <span className="block text-dim">↳ {detail}</span>}
                </span>
              </li>
            );
          })}
        </ul>
        <div className={`mt-5 grid grid-cols-[1fr_auto] items-end gap-4 border-t border-edge pt-4 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-dim">{t.score} · {target}</p>
            <div className="mt-2 h-2 bg-edge"><div className="h-full bg-gradient-to-r from-warn to-alert transition-all duration-700" style={{ width: done ? `${score}%` : 0 }} /></div>
            <p className="mt-2 text-sm text-warn">{t.verdict}</p>
          </div>
          <span className="font-display text-5xl tabular-nums text-alert">{done ? score : "--"}</span>
        </div>
        <p className="mt-4 text-[11px] text-dim">{t.note}</p>
      </div>
    </div>
  );
}

export default function Page() {
  const [lang, setLang] = useLang();
  const t = CONTENT[lang];
  const total = t.report.sev.reduce((a, [, v]) => a + v, 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-edge bg-void/85 backdrop-blur">
        <div className={`${wrap} flex h-14 items-center gap-8`}>
          <a href="#top" className="flex items-center gap-2 font-display text-lg tracking-wide">
            <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true"><path d="M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8z" fill="none" stroke="var(--color-cyan)" strokeWidth="2.5" /></svg>
            BASTION
          </a>
          <nav className="hidden gap-6 text-sm text-dim md:flex" aria-label="Primary">
            {(["services", "method", "scanner", "cases"] as const).map((k) => <a key={k} href={`#${k}`} className="hover:text-cyan">{t.nav[k]}</a>)}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => setLang(lang === "en" ? "ru" : "en")} className="border border-edge px-2 py-1 font-mono text-xs hover:border-cyan hover:text-cyan" aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
            <a href="#incident" className="hidden items-center gap-2 border border-alert/60 px-3 py-1.5 text-sm text-alert hover:bg-alert hover:text-void sm:flex">
              <span className="size-1.5 animate-pulse rounded-full bg-current" />{t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO + scanner */}
        <section id="scanner" className="relative overflow-hidden">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan/10 to-transparent" aria-hidden="true" />
          <div className={`${wrap} relative grid gap-12 py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-28`}>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{"//"} {t.hero.tag}</p>
              <h1 className="mt-6 font-display text-5xl leading-[0.95] sm:text-7xl">
                {t.hero.title[0]}<br /><span className="text-cyan">{t.hero.title[1]}</span>
              </h1>
              <p className="mt-6 max-w-[52ch] text-lg text-dim">{t.hero.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#incident" className="cut bg-cyan px-6 py-3 font-display text-void transition-colors hover:bg-text">{t.hero.a} →</a>
                <a href="#report" className="cut border border-edge px-6 py-3 font-display transition-colors hover:border-cyan hover:text-cyan">{t.hero.b}</a>
              </div>
            </div>
            <Scanner t={t.scanner} />
          </div>
        </section>

        {/* certs */}
        <section className="border-y border-edge bg-panel/50">
          <ul className={`${wrap} flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 font-display text-sm tracking-widest text-dim`}>
            {t.certs.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        {/* services */}
        <section id="services" className={`${wrap} py-24`}>
          <H2 k="01">{t.services.title}</H2>
          <div className="grid gap-px bg-edge sm:grid-cols-2 lg:grid-cols-3 border border-edge">
            {t.services.items.map(([h, d, code]) => (
              <article key={h} className="group relative bg-void p-6 transition-colors hover:bg-panel">
                <span className="font-mono text-xs text-dim transition-colors group-hover:text-cyan">{code}-0{t.services.items.findIndex((x) => x[0] === h) + 1}</span>
                <h3 className="mt-8 font-display text-2xl">{h}</h3>
                <p className="mt-2 text-sm text-dim">{d}</p>
                <span className="absolute top-0 left-0 h-px w-0 bg-cyan transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </section>

        {/* method */}
        <section id="method" className={`${wrap} pb-24`}>
          <H2 k="02">{t.method.title}</H2>
          <ol className="grid gap-6 md:grid-cols-5">
            {t.method.steps.map(([h, d], i) => (
              <li key={h} className="relative border-t-2 border-edge pt-5">
                <span className="absolute -top-[7px] left-0 size-3 rotate-45 border-2 border-cyan bg-void" />
                <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                <h3 className="mt-2 font-display text-xl">{h}</h3>
                <p className="mt-1 text-sm text-dim">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* report + feed */}
        <section id="report" className={`${wrap} grid gap-6 pb-24 lg:grid-cols-[1.4fr_1fr]`}>
          <div className="cut border border-edge bg-panel p-6">
            <H2 k="03">{t.report.title}</H2>
            <p className="-mt-6 mb-8 text-sm text-dim">{t.report.sub}</p>
            <div className="flex h-4 overflow-hidden" aria-hidden="true">
              {t.report.sev.map(([s, v], i) => (
                <span key={s} style={{ width: `${(v / total) * 100}%` }} className={["bg-alert", "bg-[#ff8a4d]", "bg-warn", "bg-cyan"][i]} />
              ))}
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {t.report.sev.map(([s, v], i) => (
                <div key={s} className="border-l-2 pl-3" style={{ borderColor: ["var(--color-alert)", "#ff8a4d", "var(--color-warn)", "var(--color-cyan)"][i] }}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-dim">{s}</dt>
                  <dd className="font-display text-4xl">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 flex flex-wrap gap-x-6 font-mono text-sm"><span><b className="text-text">{total}</b> <span className="text-dim">{t.report.found}</span></span><span><b className="text-ok">{total - 2}</b> <span className="text-dim">{t.report.fixed}</span></span></p>
          </div>
          <div className="cut flex flex-col border border-edge bg-panel">
            <p className="flex items-center gap-2 border-b border-edge px-5 py-3 font-mono text-xs text-dim"><span className="size-1.5 animate-pulse rounded-full bg-ok" />{t.feed}</p>
            <div className="relative h-72 flex-1 overflow-hidden">
              <ul className="feed px-5 py-3 font-mono text-xs leading-7" aria-hidden="true">
                {[...FEED, ...FEED].map((l, i) => {
                  const kind = l.split(" ")[0];
                  return <li key={i} className="whitespace-pre"><span className={kind === "blocked" ? "text-ok" : kind === "alert" ? "text-alert" : "text-cyan"}>{l.slice(0, 9)}</span><span className="text-dim">{l.slice(9)}</span></li>;
                })}
              </ul>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-panel" />
            </div>
          </div>
        </section>

        {/* cases */}
        <section id="cases" className={`${wrap} pb-24`}>
          <H2 k="04">{t.cases.title}</H2>
          <div className="grid gap-4 md:grid-cols-3">
            {t.cases.items.map(([h, d], i) => (
              <article key={h} className="cut border border-edge p-6 transition-colors hover:border-cyan">
                <span className="font-mono text-xs text-dim">CASE-{2026 - i}-{String(117 - i * 13).padStart(3, "0")}</span>
                <h3 className="mt-4 font-display text-xl">{h}</h3>
                <p className="mt-2 text-dim">{d}</p>
              </article>
            ))}
          </div>
        </section>

        {/* incident CTA */}
        <section id="incident" className="border-y border-alert/40 bg-[linear-gradient(135deg,rgba(255,77,94,.12),transparent_60%)]">
          <div className={`${wrap} flex flex-wrap items-center justify-between gap-6 py-16`}>
            <div>
              <h2 className="font-display text-3xl sm:text-5xl">{t.cta.title}</h2>
              <p className="mt-3 text-dim">{t.cta.sub}</p>
            </div>
            <a href="tel:+00000000000" className="cut bg-alert px-8 py-4 font-display text-xl text-void transition-colors hover:bg-text">{t.cta.btn}</a>
          </div>
        </section>
      </main>

      <footer className={`${wrap} flex flex-wrap justify-between gap-4 py-8 font-mono text-xs text-dim`}>
        <span>© 2026 BASTION SECURITY</span><span>{t.foot}</span><a href="#top" className="hover:text-cyan">↑ top</a>
      </footer>
    </>
  );
}
