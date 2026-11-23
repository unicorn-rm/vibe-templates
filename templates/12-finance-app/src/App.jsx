import { useEffect, useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ENTRIES, ENVELOPES, T } from "./content.js";

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

function useLang() {
  const q = new URLSearchParams(location.search).get("lang") || read("vt-lang");
  const [lang, setLang] = useState(q === "ru" ? "ru" : "en");
  useEffect(() => { document.documentElement.lang = lang; write("vt-lang", lang); }, [lang]);
  return [lang, setLang];
}

const money = (lang, v, d = 2) => new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-GB", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);

/* compound growth, monthly deposits, monthly compounding */
function project(monthly, rate, years) {
  const r = rate / 100 / 12;
  let total = 0, paid = 0;
  const rows = [{ y: 0, paid: 0, total: 0 }];
  for (let m = 1; m <= years * 12; m++) {
    total = total * (1 + r) + monthly; paid += monthly;
    if (m % 12 === 0) rows.push({ y: m / 12, paid, total });
  }
  return rows;
}

function Slider({ label, value, set, min, max, step, suffix }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="italic">{label}</span>
        <b className="font-mono text-2xl">{value}{suffix}</b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} className="ledger-range mt-1 w-full" />
    </label>
  );
}

function Calculator({ t, lang }) {
  const [monthly, setMonthly] = useState(150);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(10);
  const rows = useMemo(() => project(monthly, rate, years), [monthly, rate, years]);
  const last = rows[rows.length - 1];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-6">
        <Slider label={t.monthly} value={monthly} set={setMonthly} min={10} max={1000} step={10} suffix=" €" />
        <Slider label={t.rate} value={rate} set={setRate} min={0} max={10} step={0.5} suffix=" %" />
        <Slider label={t.years} value={years} set={setYears} min={1} max={30} step={1} suffix="" />
        <div className="graph-paper h-64 border border-rule-red p-2">
          <p className="px-2 pt-1 text-sm italic">{t.chart}</p>
          <ResponsiveContainer width="100%" height="88%">
            <LineChart data={rows} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="transparent" />
              <XAxis dataKey="y" tick={{ fontFamily: "Ubuntu Mono", fontSize: 12, fill: "#3a3226" }} axisLine={{ stroke: "#3a3226" }} tickLine={false} />
              <YAxis tick={{ fontFamily: "Ubuntu Mono", fontSize: 12, fill: "#3a3226" }} axisLine={{ stroke: "#3a3226" }} tickLine={false} width={56}
                tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)} />
              <Tooltip formatter={(v) => `${money(lang, v, 0)} €`} labelFormatter={(y) => `${t.cols[0]} ${y}`}
                contentStyle={{ background: "#fbfbf3", border: "1px solid #3a3226", borderRadius: 0, fontFamily: "Ubuntu Mono" }} />
              <Line type="monotone" dataKey="paid" name={t.paid} stroke="#3a3226" strokeWidth={1.6} strokeDasharray="5 4" dot={false} isAnimationActive={false} />
              <Line type="monotone" dataKey="total" name={t.total} stroke="#c8473d" strokeWidth={2.4} dot={{ r: 2.5, fill: "#c8473d" }} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="ledger overflow-hidden">
        <table className="w-full font-mono text-[15px]">
          <thead><tr>{t.cols.map((c, i) => <th key={c} className={i ? "text-right" : "text-left"}>{c}</th>)}</tr></thead>
          <tbody>
            {rows.slice(1).map((r) => (
              <tr key={r.y}>
                <td>{r.y}</td>
                <td className="text-right">{money(lang, r.paid, 0)}</td>
                <td className="text-right text-ink-red">{money(lang, r.total - r.paid, 0)}</td>
                <td className="text-right font-bold">{money(lang, r.total, 0)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr><td colSpan={3} className="italic font-serif">Σ</td><td className="text-right text-lg font-bold">{money(lang, last.total, 0)} €</td></tr></tfoot>
        </table>
        <p className="mt-3 px-3 pb-3 text-sm italic opacity-70">{t.note}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const balance = ENTRIES.reduce((a, e) => a + e[2], 0);

  return (
    <>
      <header className="sticky top-0 z-20 border-b-2 border-ink bg-paper/95">
        <div className="wrap flex items-center gap-8 py-3">
          <a href="#top" className="font-serif text-2xl font-extrabold">Tally<span className="text-ink-red">.</span></a>
          <nav className="hidden gap-6 md:flex" aria-label="Primary">
            {Object.entries(t.nav).map(([id, l]) => <a key={id} href={`#${id}`} className="italic hover:text-ink-red">{l}</a>)}
          </nav>
          <button className="ml-auto font-mono underline decoration-dotted md:ml-auto" onClick={() => setLang(lang === "en" ? "ru" : "en")} aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
          <a href="#calc" className="hidden border-2 border-ink px-4 py-1.5 font-bold hover:bg-ink hover:text-paper sm:block">{t.get}</a>
        </div>
      </header>

      <main id="top">
        {/* hero: a ledger page */}
        <section className="wrap grid items-center gap-12 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-ink-red">{t.hero.folio}</p>
            <h1 className="mt-4 font-serif text-[clamp(3rem,6.4vw,5.6rem)] leading-[0.95] font-extrabold">{t.hero.title}</h1>
            <p className="mt-6 max-w-[46ch] text-xl">{t.hero.lead}</p>
          </div>
          <div className="ledger relative rotate-[0.6deg]">
            <table className="w-full font-mono text-[15px]">
              <thead><tr>{t.hero.cols.map((c, i) => <th key={c} className={i > 1 ? "text-right" : "text-left"}>{c}</th>)}</tr></thead>
              <tbody>
                {ENTRIES.map(([d, k, v], i) => (
                  <tr key={i}>
                    <td>{d}</td><td className="font-serif italic">{t.hero.desc[k]}</td>
                    <td className="text-right">{v > 0 ? money(lang, v) : ""}</td>
                    <td className="text-right text-ink-red">{v < 0 ? money(lang, -v) : ""}</td>
                  </tr>
                ))}
                <tr><td /><td /><td /><td /></tr>
              </tbody>
              <tfoot><tr><td colSpan={2} className="font-serif italic">{t.hero.balance}</td><td colSpan={2} className="text-right text-lg font-bold">{money(lang, balance)} €</td></tr></tfoot>
            </table>
            <span className="stamp">{t.hero.stamp}<small>30.11.2026</small></span>
          </div>
        </section>

        <section id="calc" className="border-y-2 border-ink bg-paper-2">
          <div className="wrap py-16">
            <h2 className="h2">{t.calc.title}</h2>
            <Calculator t={t.calc} lang={lang} />
          </div>
        </section>

        <section id="env" className="wrap py-16">
          <h2 className="h2">{t.env.title}</h2>
          <p className="-mt-4 mb-10 max-w-[56ch] text-lg">{t.env.lead}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ENVELOPES.map((e) => {
              const left = e.budget - e.spent;
              return (
                <article key={e.k} className="envelope">
                  <div className="envelope__flap" aria-hidden="true" />
                  <h3 className="font-serif text-2xl font-bold">{t.env.names[e.k]}</h3>
                  <p className="font-mono text-sm">{money(lang, e.spent, 0)} / {money(lang, e.budget, 0)} €</p>
                  <div className="mt-3 h-2 border border-ink"><div className={`h-full ${left < 0 ? "bg-ink-red" : "bg-ink"}`} style={{ width: `${Math.min(100, (e.spent / e.budget) * 100)}%` }} /></div>
                  <p className={`mt-2 font-mono ${left < 0 ? "text-ink-red" : ""}`}>{left < 0 ? `${money(lang, -left, 0)} € ${t.env.over}` : `${money(lang, left, 0)} € ${t.env.left}`}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="why" className="border-t-2 border-ink">
          <div className="wrap py-16">
            <h2 className="h2">{t.why.title}</h2>
            <ul className="max-w-3xl">
              {t.why.rows.map(([k, v]) => (
                <li key={k} className="flex items-baseline gap-3 border-b border-rule-blue py-2.5 text-lg">
                  <span className="font-serif">{k}</span>
                  <span className="mb-1 flex-1 border-b-2 border-dotted border-ink/40" />
                  <span className={`font-mono font-bold uppercase ${["none", "never", "нет", "никогда"].includes(v) ? "text-ink-red" : ""}`}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="border-t-2 border-ink bg-paper-2">
          <div className="wrap grid gap-8 py-16 md:grid-cols-[1fr_2fr]">
            <h2 className="h2">{t.faq.title}</h2>
            <dl>
              {t.faq.items.map(([q, a]) => (
                <div key={q} className="border-b border-rule-blue py-4">
                  <dt className="font-serif text-xl font-bold">{q}</dt>
                  <dd className="mt-1">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-double border-ink">
        <div className="wrap flex flex-wrap justify-between gap-3 py-5 font-mono text-sm"><span>Tally © 2026</span><span>{t.foot}</span></div>
      </footer>
    </>
  );
}
