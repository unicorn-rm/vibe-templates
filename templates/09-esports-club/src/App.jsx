import { lazy, Suspense, useEffect, useState } from "react";
import { CLUB, FINAL, QF, SF, SPONSORS, SQUAD, TABLE, TEAMS, T } from "./content.js";

const Scene = lazy(() => import("./Scene.jsx")); // three.js loads after the page

const read = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

function useLang() {
  const q = new URLSearchParams(location.search).get("lang") || read("vt-lang");
  const [lang, setLang] = useState(q === "ru" ? "ru" : "en");
  useEffect(() => { document.documentElement.lang = lang; write("vt-lang", lang); }, [lang]);
  return [lang, setLang];
}

/* ---------- cup bracket: winners computed from scores ---------- */
function Bracket({ t }) {
  const [pick, setPick] = useState("Nova");
  const qf = QF.map((s, i) => ({ a: TEAMS[i * 2], b: TEAMS[i * 2 + 1], s }));
  const win = (m) => (m.s[0] > m.s[1] ? m.a : m.b);
  const sf = SF.map((s, i) => ({ a: win(qf[i * 2]), b: win(qf[i * 2 + 1]), s }));
  const fin = { a: win(sf[0]), b: win(sf[1]), s: FINAL };
  const champ = win(fin);
  const rounds = [[t.qf, qf], [t.sf, sf], [t.f, [fin]]];

  const Row = ({ team, score, won }) => (
    <button className={`bk__row${won ? " is-won" : ""}${team === pick ? " is-pick" : ""}`} onClick={() => setPick(team)}>
      <span>{team}</span><b>{score}</b>
    </button>
  );

  return (
    <>
      <p className="hint">{t.hint}</p>
      <div className="bk">
        {rounds.map(([label, matches]) => (
          <div key={label} className="bk__round">
            <h3 className="bk__label">{label}</h3>
            <div className="bk__matches">
              {matches.map((m) => (
                <div key={m.a + m.b} className="bk__match">
                  <Row team={m.a} score={m.s[0]} won={m.s[0] > m.s[1]} />
                  <Row team={m.b} score={m.s[1]} won={m.s[1] > m.s[0]} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="bk__round bk__round--champ">
          <h3 className="bk__label">{t.champ}</h3>
          <div className="bk__matches"><button className={`bk__champ${champ === pick ? " is-pick" : ""}`} onClick={() => setPick(champ)}>★ {champ}</button></div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [lang, setLang] = useLang();
  const t = T[lang];
  const pts = (r) => r[2] * 3 + r[3];

  return (
    <>
      <header className="top">
        <a href="#top" className="top__club"><span className="top__badge" aria-hidden="true">N</span>{CLUB.full}</a>
        <nav aria-label="Primary">{Object.entries(t.nav).map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</nav>
        <button className="top__lang" onClick={() => setLang(lang === "en" ? "ru" : "en")} aria-label="Switch language">{lang === "en" ? "RU" : "EN"}</button>
      </header>

      <main id="top">
        {/* COVER */}
        <section className="cover">
          <div className="cover__strip">
            <span>{t.cover.prog}</span><span>{t.cover.season}</span><span>{t.cover.no} · {t.cover.price}</span>
          </div>
          <div className="cover__body">
            <div className="cover__text">
              <p className="cover__est">{t.cover.est} {CLUB.est}</p>
              <h1>{t.cover.title.map((l, i) => <span key={i}>{l}</span>)}</h1>
              <p className="cover__lead">{t.cover.lead}</p>
            </div>
            <div className="cover__crest" aria-hidden="true">
              <Suspense fallback={<div className="crest-fallback">N</div>}><Scene /></Suspense>
            </div>
          </div>
          <div className="stripes" aria-hidden="true" />
        </section>

        {/* FIXTURE ticket */}
        <section id="fixture" className="sec">
          <div className="ticket">
            <p className="ticket__label">{t.fixture.label}</p>
            <div className="ticket__teams">
              <span className="ticket__team home">NOVA</span>
              <span className="ticket__vs">{t.fixture.vs}</span>
              <span className="ticket__team">KRAKEN</span>
            </div>
            <dl className="ticket__meta">
              <div><dt>{t.fixture.ko}</dt><dd>19:30</dd></div>
              <div><dt>CS2</dt><dd>{t.fixture.game}</dd></div>
              <div><dt>{t.fixture.where}</dt><dd>{t.fixture.venue}</dd></div>
            </dl>
            <p className="ticket__info">{t.fixture.info}</p>
          </div>
        </section>

        {/* TABLE + GROUND */}
        <section id="table" className="sec split">
          <div>
            <h2 className="h2">{t.table.title}</h2>
            <table className="league">
              <thead><tr>{t.table.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {[...TABLE].sort((a, b) => pts(b) - pts(a)).map((r, i) => (
                  <tr key={r[0]} className={r[0] === "Nova" ? "is-us" : ""}>
                    <td>{i + 1}</td><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td><td><b>{pts(r)}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="h2">{t.ground.title}</h2>
            <ol className="ground">
              {t.ground.items.map(([k, n, d]) => <li key={k}><span className="ground__k">{k}</span><div><b>{n}</b><p>{d}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section id="bracket" className="sec">
          <h2 className="h2">{t.bracket.title}</h2>
          <Bracket t={t.bracket} />
        </section>

        {/* SQUAD stickers */}
        <section id="squad" className="sec">
          <h2 className="h2">{t.squad.title}</h2>
          <div className="album">
            {SQUAD.map((p, i) => (
              <article key={p.nick} className="sticker" style={{ "--tilt": `${[-2, 1.5, -1, 2][i]}deg` }}>
                <div className="sticker__photo">
                  <span className="sticker__no">{p.no}</span>
                  <span className="sticker__nick">{p.nick}</span>
                </div>
                <div className="sticker__band"><span>{p.name}</span><span>{p.role[lang]}</span></div>
                <dl className="sticker__stats">
                  {[[t.squad.kd, p.kd, p.kd / 2], [t.squad.win, p.win, p.win / 100], [t.squad.hs, p.hs, p.hs / 100]].map(([k, v, f]) => (
                    <div key={k}><dt>{k}</dt><dd><i style={{ width: `${f * 100}%` }} /><b>{v}</b></dd></div>
                  ))}
                </dl>
                <span className="sticker__corner">{CLUB.short} {String(i + 1).padStart(2, "0")}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="join">
          <h2>{t.join.title}</h2>
          <p>{t.join.text}</p>
          <a className="join__btn" href="https://discord.com/" target="_blank" rel="noopener">{t.join.btn} →</a>
        </section>

        <section className="sponsors" aria-label={t.sponsors}>
          <span>{t.sponsors}</span>
          {SPONSORS.map((s) => <b key={s}>{s}</b>)}
        </section>
      </main>

      <footer className="foot"><span>© {CLUB.full} {CLUB.est}—2026</span><span>{t.foot}</span><a href="#top">↑</a></footer>
    </>
  );
}
