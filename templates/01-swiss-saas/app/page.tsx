"use client";

import { useEffect, useState } from "react";
import { CONTENT, ISSUES, LOGOS, type Copy, type Lang } from "@/lib/content";

/* ---------- language (EN default, ?lang=ru, remembered) ---------- */
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

const wrap = "mx-auto w-full max-w-[1320px] px-4 sm:px-8";

function SectionHead({ n, title, aside }: { n: string; title: string; aside?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 border-t border-ink pt-4 pb-10">
      <span className="col-span-12 font-mono text-sm sm:col-span-2">{n} —</span>
      <h2 className="col-span-12 text-4xl font-bold leading-[0.95] tracking-[-0.04em] text-balance sm:col-span-8 sm:text-6xl">{title}</h2>
      {aside && <div className="col-span-12 mt-4 sm:col-span-2 sm:mt-0 sm:text-right">{aside}</div>}
    </div>
  );
}

/* ---------- product mock ---------- */
function Board({ t }: { t: Copy["board"] }) {
  return (
    <div className="overflow-hidden border border-ink bg-paper shadow-[12px_12px_0_var(--color-ink)]">
      <div className="flex items-center gap-3 border-b border-ink px-4 py-2 font-mono text-xs">
        <span className="size-2.5 bg-signal" />
        <span>gridline.app / product / cycle-24</span>
        <span className="ml-auto hidden sm:inline">⌘K</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {t.cols.map((col, c) => (
          <div key={col} className="min-h-56 border-r border-b border-rule p-3 last:border-r-0 lg:border-b-0">
            <div className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-2">
              <span>{col}</span><span>{ISSUES[c].length}</span>
            </div>
            <ul className="space-y-2">
              {ISSUES[c].map(([id, title, tag, who]) => (
                <li key={id} className="group border border-rule bg-white/60 p-2.5 transition-colors duration-200 hover:border-ink">
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-2">
                    <span>{id}</span>
                    <span className="grid size-5 place-items-center bg-ink text-[9px] text-paper">{who}</span>
                  </div>
                  <p className="mt-1 text-sm leading-snug font-medium">{title}</p>
                  <span className={`mt-2 inline-block font-mono text-[10px] ${c === 3 ? "text-ink-2 line-through" : "text-signal"}`}>#{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- bento cells with tiny live demos ---------- */
function Typing({ text }: { text: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = setInterval(() => setI((v) => (v > text.length + 12 ? 0 : v + 1)), 110);
    return () => clearInterval(id);
  }, [text]);
  return <>{text.slice(0, i)}<span className="caret ml-px inline-block h-4 w-2 translate-y-0.5 bg-signal" /></>;
}

function Burn() {
  // ideal vs real line + a scope bump on day 6
  const real = "M0 10 L20 18 L40 26 L60 30 L70 22 L90 34 L110 48 L130 56 L150 70 L170 78 L190 90";
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden="true">
      {[25, 50, 75].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="var(--color-rule)" strokeWidth="0.6" />)}
      <path d="M0 10 L200 95" stroke="var(--color-ink-2)" strokeDasharray="3 3" strokeWidth="1" fill="none" />
      <path d={real} stroke="var(--color-signal)" strokeWidth="2.2" fill="none" />
      <rect x="60" y="18" width="12" height="14" fill="var(--color-signal)" opacity=".12" />
      <text x="74" y="16" fontSize="7" fontFamily="var(--font-mono)" fill="var(--color-signal)">+3 scope</text>
    </svg>
  );
}

function Bento({ t }: { t: Copy["features"]["items"] }) {
  const cell = "relative flex flex-col justify-between gap-6 border border-ink p-5 transition-colors duration-300 hover:bg-paper-2";
  const h = "text-xl font-semibold tracking-tight";
  const d = "mt-1 max-w-[38ch] text-sm text-ink-2";
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-6">
      <article className={`${cell} md:col-span-4 md:row-span-2`}>
        <div className="border border-ink bg-white/70">
          <div className="flex items-center gap-2 border-b border-rule px-4 py-3 font-mono text-sm">
            <span className="text-ink-2">›</span><Typing text={t.palette.typing} />
          </div>
          <ul className="font-mono text-xs">
            {["GRD-131  Cycle roll-over digest", "GRD-138  Offline merge conflicts", "GRD-140  Shortcut cheat-sheet"].map((r, i) => (
              <li key={r} className={`flex justify-between px-4 py-2 ${i === 0 ? "bg-ink text-paper" : ""}`}><span>{r}</span><span>{i === 0 ? "↵" : ""}</span></li>
            ))}
          </ul>
        </div>
        <div><h3 className={h}>{t.palette.t}</h3><p className={d}>{t.palette.d}</p></div>
      </article>

      <article className={`${cell} md:col-span-2`}>
        <div className="flex items-end gap-1" aria-hidden="true">
          {[1, 1, 1, 1, 1, 0.55, 0, 0].map((v, i) => (
            <span key={i} className="h-14 flex-1 border border-ink" style={{ background: `linear-gradient(to top, var(--color-ink) ${v * 100}%, transparent 0)` }} />
          ))}
        </div>
        <div><h3 className={h}>{t.cycles.t}</h3><p className={d}>{t.cycles.d}</p></div>
      </article>

      <article className={`${cell} md:col-span-2`}>
        <div className="h-24"><Burn /></div>
        <div><h3 className={h}>{t.burn.t}</h3><p className={d}>{t.burn.d}</p></div>
      </article>

      <article className={`${cell} md:col-span-2`}>
        <div className="flex flex-wrap gap-1.5 font-mono text-sm" aria-hidden="true">
          {["J", "K", "X", "⇧", "⌘", "K", "C", "/"].map((k, i) => (
            <kbd key={i} className={`grid size-10 place-items-center border border-ink shadow-[0_3px_0_var(--color-ink)] transition-transform duration-150 hover:translate-y-[3px] hover:shadow-none ${i === 5 ? "bg-signal text-paper" : "bg-white"}`}>{k}</kbd>
          ))}
        </div>
        <div><h3 className={h}>{t.keys.t}</h3><p className={d}>{t.keys.d}</p></div>
      </article>

      <article className={`${cell} md:col-span-2`}>
        <div className="flex -space-x-2" aria-hidden="true">
          {["MK", "AS", "IV", "LN", "+4"].map((p, i) => (
            <span key={p} className={`grid size-11 place-items-center rounded-full border-2 border-paper text-xs font-semibold ${i === 2 ? "bg-signal text-paper" : "bg-ink text-paper"}`}>{p}</span>
          ))}
        </div>
        <div><h3 className={h}>{t.live.t}</h3><p className={d}>{t.live.d}</p></div>
      </article>

      <article className={`${cell} md:col-span-2`}>
        <pre className="overflow-x-auto bg-ink p-3 font-mono text-[11px] leading-relaxed text-paper" aria-hidden="true">
{`query {
  cycle(id: 24) {
    issues { id title }
  }
}`}
        </pre>
        <div><h3 className={h}>{t.api.t}</h3><p className={d}>{t.api.d}</p></div>
      </article>
    </div>
  );
}

function Pricing({ t }: { t: Copy["pricing"] }) {
  const [yearly, setYearly] = useState(true);
  return (
    <>
      <SectionHead n={t.n} title={t.title} aside={
        <div className="inline-flex border border-ink font-mono text-xs" role="group">
          {[false, true].map((y) => (
            <button key={String(y)} onClick={() => setYearly(y)} aria-pressed={yearly === y}
              className={`px-3 py-2 transition-colors ${yearly === y ? "bg-ink text-paper" : "hover:bg-paper-2"}`}>
              {y ? <>{t.yearly} <span className={yearly ? "text-signal" : ""}>{t.save}</span></> : t.monthly}
            </button>
          ))}
        </div>
      } />
      <div className="grid gap-px bg-ink md:grid-cols-3 border border-ink">
        {t.plans.map((p) => (
          <article key={p.name} className={`flex flex-col p-6 ${p.hot ? "bg-ink text-paper" : "bg-paper"}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">{p.name}</h3>
              {p.hot && <span className="bg-signal px-2 py-1 font-mono text-[10px] uppercase tracking-wider">{p.hot}</span>}
            </div>
            <p className={`mt-1 text-sm ${p.hot ? "text-paper/70" : "text-ink-2"}`}>{p.desc}</p>
            <p className="mt-8 flex items-baseline gap-2">
              <span className="text-7xl font-bold tracking-[-0.05em] tabular-nums">${p.price[yearly ? 1 : 0]}</span>
              <span className="font-mono text-xs opacity-70">{t.per}</span>
            </p>
            <ul className="mt-8 mb-10 space-y-2 text-sm">
              {p.feats.map((f) => <li key={f} className="flex gap-3"><span className="text-signal">■</span>{f}</li>)}
            </ul>
            <a href="#" className={`mt-auto border px-4 py-3 text-center font-medium transition-colors ${p.hot ? "border-signal bg-signal hover:bg-paper hover:text-ink hover:border-paper" : "border-ink hover:bg-ink hover:text-paper"}`}>{p.cta}</a>
          </article>
        ))}
      </div>
    </>
  );
}

/* ---------- page ---------- */
export default function Page() {
  const [lang, setLang] = useLang();
  const t = CONTENT[lang];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink bg-paper/90 backdrop-blur">
        <div className={`${wrap} flex h-14 items-center gap-8`}>
          <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="grid size-6 place-items-center bg-signal"><span className="size-3 border-2 border-paper" /></span>
            Gridline
          </a>
          <nav className="hidden gap-6 text-sm lg:flex" aria-label="Primary">
            {(["features", "how", "changelog", "pricing", "faq"] as const).map((k) => (
              <a key={k} href={`#${k}`} className="hover:text-signal">{t.nav[k]}</a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={() => setLang(lang === "en" ? "ru" : "en")} className="border border-ink px-2 py-1 font-mono text-xs hover:bg-ink hover:text-paper" aria-label="Switch language">
              {lang === "en" ? "RU" : "EN"}
            </button>
            <a href="#pricing" className="hidden bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-signal sm:block">{t.nav.cta}</a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="grid-lines">
          <div className={`${wrap} pt-14 pb-20 sm:pt-20`}>
            <p className="inline-flex items-center gap-2 border border-ink bg-paper px-3 py-1 font-mono text-xs">
              <span className="size-2 bg-signal" />{t.hero.kicker}
            </p>
            <h1 className="mt-8 text-[clamp(3.4rem,11vw,10.5rem)] leading-[0.85] font-extrabold tracking-[-0.06em]">
              <span className="block">{t.hero.title[0]}</span>
              <span className="block">{t.hero.title[1]}<span className="text-signal">.</span></span>
            </h1>
            <div className="mt-10 grid grid-cols-12 gap-6">
              <p className="col-span-12 max-w-[46ch] bg-paper text-lg text-ink-2 md:col-span-6 md:col-start-4">{t.hero.lead}</p>
              <div className="col-span-12 flex flex-wrap items-start gap-3 self-start md:col-span-6 md:col-start-4">
                <a href="#pricing" className="bg-signal px-6 py-3.5 font-medium text-paper transition-colors hover:bg-ink">{t.hero.primary} →</a>
                <a href="#how" className="border border-ink bg-paper px-6 py-3.5 font-medium transition-colors hover:bg-ink hover:text-paper">▶ {t.hero.secondary}</a>
              </div>
              <dl className="col-span-12 grid grid-cols-3 border-t border-ink bg-paper md:col-span-3 md:col-start-10 md:row-start-1 md:row-span-2 md:grid-cols-1 md:self-end md:border-t-0">
                {t.hero.meta.map(([k, v]) => (
                  <div key={k} className="border-b border-ink py-3 md:border-t md:border-b-0 md:last:border-b">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-2">{k}</dt>
                    <dd className="text-2xl font-bold tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-16"><Board t={t.board} /></div>
          </div>
        </section>

        {/* LOGOS */}
        <section className="border-y border-ink">
          <div className={`${wrap} flex flex-wrap items-center gap-x-12 gap-y-4 py-6`}>
            <span className="font-mono text-xs text-ink-2">{t.logos}</span>
            {LOGOS.map((l, i) => <span key={l} className={`text-xl tracking-tight ${i % 2 ? "font-mono" : "font-bold"}`}>{l}</span>)}
          </div>
        </section>

        <section id="features" className={`${wrap} py-24`}>
          <SectionHead n={t.features.n} title={t.features.title} />
          <Bento t={t.features.items} />
        </section>

        <section id="how" className={`${wrap} pb-24`}>
          <SectionHead n={t.how.n} title={t.how.title} />
          <ol className="grid md:grid-cols-3">
            {t.how.steps.map(([h, d], i) => (
              <li key={h} className="border-t border-ink py-6 md:border-t-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <span className="block text-[7rem] leading-none font-extrabold tracking-[-0.06em] text-signal">{i + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold">{h}</h3>
                <p className="mt-2 max-w-[34ch] text-ink-2">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-ink text-paper">
          <dl className={`${wrap} grid grid-cols-2 py-16 md:grid-cols-4`}>
            {t.stats.map(([v, k]) => (
              <div key={k} className="border-l border-paper/25 py-4 pl-5">
                <dt className="text-5xl font-bold tracking-[-0.04em] tabular-nums sm:text-6xl">{v}</dt>
                <dd className="mt-2 max-w-[20ch] text-sm text-paper/65">{k}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="changelog" className={`${wrap} py-24`}>
          <SectionHead n={t.changelog.n} title={t.changelog.title} aside={<a href="#" className="font-mono text-sm hover:text-signal">{t.changelog.all}</a>} />
          <ol className="relative">
            {t.changelog.items.map(([v, date, title, d], i) => (
              <li key={v} className="group grid grid-cols-12 gap-x-6 border-b border-rule py-6 first:border-t">
                <span className="col-span-3 font-mono text-sm text-ink-2 sm:col-span-2">{date}</span>
                <span className="col-span-9 sm:col-span-2">
                  <span className={`inline-block px-2 py-0.5 font-mono text-sm ${i === 0 ? "bg-signal text-paper" : "border border-ink"}`}>v{v}</span>
                </span>
                <div className="col-span-12 mt-3 sm:col-span-8 sm:mt-0">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-signal">{title}</h3>
                  <p className="mt-1 max-w-[60ch] text-ink-2">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="pricing" className={`${wrap} pb-24`}>
          <Pricing t={t.pricing} />
        </section>

        <section id="faq" className={`${wrap} pb-24`}>
          <SectionHead n={t.faq.n} title={t.faq.title} />
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              {t.faq.items.map(([q, a]) => (
                <details key={q} className="group border-b border-ink py-5 first:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium [&::-webkit-details-marker]:hidden">
                    {q}<span className="font-mono text-signal transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-[60ch] text-ink-2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-signal text-paper">
          <div className={`${wrap} grid gap-8 py-20 md:grid-cols-12 md:items-end`}>
            <h2 className="text-5xl leading-[0.9] font-extrabold tracking-[-0.05em] text-balance md:col-span-8 md:text-8xl">{t.cta.title}</h2>
            <div className="md:col-span-4 md:text-right">
              <a href="#" className="inline-block bg-ink px-8 py-4 font-medium transition-colors hover:bg-paper hover:text-ink">{t.cta.btn} →</a>
              <p className="mt-3 font-mono text-xs opacity-80">{t.cta.note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={`${wrap} grid grid-cols-2 gap-8 py-12 md:grid-cols-12`}>
        <div className="col-span-2 md:col-span-6">
          <span className="text-[clamp(3rem,10vw,8rem)] leading-none font-extrabold tracking-[-0.06em]">Gridline<span className="text-signal">.</span></span>
          <p className="mt-4 font-mono text-xs text-ink-2">{t.foot.note}</p>
        </div>
        {t.foot.cols.map(([h, links]) => (
          <div key={h as string} className="md:col-span-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-ink-2">{h}</h3>
            <ul className="mt-3 space-y-1.5 text-sm">{(links as string[]).map((l) => <li key={l}><a href="#" className="hover:text-signal">{l}</a></li>)}</ul>
          </div>
        ))}
      </footer>
    </>
  );
}
