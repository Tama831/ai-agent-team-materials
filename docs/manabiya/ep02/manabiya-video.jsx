// ============================================================
// 藪医者の学舎 — 解説動画エンジン 横型16:9（テーマ切替式）
// ------------------------------------------------------------
// theme: duotone / broadcast / paper / chalk / pop / cinema
// エピソードの中身は episode-XX.js、テーマ定義は manabiya-themes.js。
// 依存: animations.jsx, manabiya-themes.js
// ============================================================

// IIFE で内部スコープを閉じる — 横型/縦型で同名の内部関数(Opening/PointsScene 等)が
// グローバル衝突しないため。公開は window.ManabiyaVideo(Vertical) のみ。
(function () {
const { Stage, Sprite, useTime, useSprite, Easing, clamp } = window;

const ROMAN = { '01': 'I', '02': 'II', '03': 'III', '04': 'IV', '05': 'V' };

// runs: [{t:'テキスト', b:1, c:'iris'}, {br:1}] — c はテーマの tokens で解決
function R(runs, t) {
  if (runs == null) return null;
  if (typeof runs === 'string') return runs;
  return runs.map((r, i) => r.br
    ? <br key={i} />
    : <span key={i} style={{ fontWeight: r.b ? 700 : 'inherit', color: r.c ? (t.tokens[r.c] || r.c) : 'inherit' }}>{r.t}</span>);
}

function FadeIn({ delay = 0, dur = 0.7, dy = 26, style, children }) {
  const { localTime } = useSprite();
  const p = clamp((localTime - delay) / dur, 0, 1);
  const e = Easing.easeOutCubic(p);
  return <div style={{ opacity: e, transform: `translateY(${(1 - e) * dy}px)`, ...style }}>{children}</div>;
}

function TypeIn({ text, delay = 0, cps = 22, style }) {
  const { localTime } = useSprite();
  const n = Math.max(0, Math.floor((localTime - delay) * cps));
  return <div style={style}>{text.slice(0, n)}</div>;
}

// アクティブ/非アクティブのカード様式（テーマ別）
function card(t, active) {
  const d = t.day;
  if (t.flags.pop) return { background: active ? '#FFD43A' : '#FFFFFF', border: '3px solid #111111', boxShadow: active ? '8px 8px 0 #111111' : 'none', borderRadius: 12, opacity: active ? 1 : 0.45 };
  if (t.flags.chalk) return { background: active ? d.active : 'transparent', border: active ? '3px solid #E8C468' : '3px dashed #54746A', borderRadius: 10, opacity: active ? 1 : 0.6 };
  if (t.flags.cinema) return { background: active ? d.active : 'transparent', border: `1px solid ${active ? d.activeBorder : d.line}`, borderRadius: 2, opacity: active ? 1 : 0.45 };
  return { background: active ? d.active : d.tint, border: `1px solid ${active ? d.activeBorder : d.line}`, borderLeft: `8px solid ${active ? t.signal : t.accent}`, borderRadius: t.radius };
}

function Shell({ t, bg = 'night', chapter = null, chaptersTotal = 4, origin = '50% 42%', glow = null, children }) {
  const { localTime, duration } = useSprite();
  const o = clamp(Math.min(localTime / 0.5, (duration - localTime) / 0.5, 1), 0, 1);
  const sc = 1 + 0.022 * (localTime / duration);
  const s = t[bg];
  const chs = Array.from({ length: chaptersTotal }, (_, i) => i + 1);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o, background: s.bg, overflow: 'hidden' }}>
      {glow && <div style={{ position: 'absolute', inset: 0, backgroundImage: glow }}></div>}
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${sc})`, transformOrigin: origin }}>
        {children}
      </div>
      {t.sig && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: t.sig }}></div>}
      {t.flags.pop && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: '#111111' }}></div>}
      {t.flags.chalk && <div style={{ position: 'absolute', inset: 0, border: '22px solid #6B4F35', pointerEvents: 'none' }}></div>}
      {t.flags.cinema && (
        <div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 100, background: '#000000' }}></div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: '#000000' }}></div>
        </div>
      )}
      {bg === 'day' && chapter != null && !t.flags.cinema && (
        <div style={{ position: 'absolute', left: 120, right: 120, bottom: t.flags.chyron ? 104 : (t.flags.chalk ? 44 : 26), display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: t.fm, fontSize: 20, letterSpacing: 5, color: t.day.fg3, fontWeight: 700 }}>MANABIYA</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {chs.map((i) => (
              <div key={i} style={{ width: 64, height: 6, borderRadius: 3, background: i === chapter ? t.signal : t.day.line }}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DayHeader({ t, label, title }) {
  return (
    <div style={{ position: 'absolute', top: 88, left: 120 }}>
      <FadeIn delay={0.4} dy={18}>
        {t.flags.chyron ? (
          <div style={{ display: 'inline-block', background: '#030712', color: '#F5FAFF', fontFamily: t.fm, fontSize: 24, letterSpacing: 6, fontWeight: 700, padding: '8px 22px' }}>{label}</div>
        ) : (
          <div style={{ fontFamily: t.fm, fontSize: 26, letterSpacing: 8, color: t.flags.pop ? '#111111' : t.accent, fontWeight: 700 }}>
            {!t.flags.serif && !t.flags.cinema && <span style={{ color: t.signal }}>▸ </span>}{label}
          </div>
        )}
      </FadeIn>
      <FadeIn delay={0.7} dy={22}>
        <div style={{ fontFamily: t.fd, fontSize: 62, fontWeight: t.flags.pop ? 400 : 700, color: t.day.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 1 : -1, marginTop: 12, whiteSpace: 'nowrap', display: 'inline-block', borderBottom: t.flags.chalk ? '3px dashed #E8C468' : 'none', paddingBottom: t.flags.chalk ? 10 : 0 }}>{title}</div>
      </FadeIn>
    </div>
  );
}

function Captions({ t, captions, show }) {
  const time = useTime();
  if (show === false || !captions) return null;
  const c = captions.find((c) => time >= c[0] && time < c[1]);
  if (!c) return null;
  const [t0, t1, text, theme] = c;
  const o = clamp(Math.min((time - t0) / 0.35, (t1 - time) / 0.35, 1), 0, 1);
  const day = theme === 'd';
  if (t.flags.chyron) {
    return (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, opacity: o, background: '#030712', padding: '20px 120px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ width: 8, height: 36, background: t.signal, flexShrink: 0 }}></div>
        <div style={{ fontFamily: t.fb, fontSize: 34, lineHeight: 1.5, color: '#F5FAFF' }}>{text}</div>
      </div>
    );
  }
  if (t.flags.cinema) {
    return (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center', opacity: o }}>
        <div style={{ maxWidth: 1600, padding: '8px 36px', fontFamily: t.fd, fontSize: 32, lineHeight: 1.6, letterSpacing: 2, color: '#F5F1E8', textAlign: 'center' }}>{text}</div>
      </div>
    );
  }
  if (t.flags.chalk) {
    return (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 74, display: 'flex', justifyContent: 'center', opacity: o }}>
        <div style={{ maxWidth: 1520, padding: '16px 40px', background: 'rgba(10,26,22,0.72)', borderRadius: 10, fontFamily: t.fb, fontSize: 34, lineHeight: 1.6, color: '#F2EFE4' }}>
          <span style={{ color: t.signal, marginRight: 16 }}>✎</span>{text}
        </div>
      </div>
    );
  }
  if (t.flags.pop) {
    return (
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 74, display: 'flex', justifyContent: 'center', opacity: o }}>
        <div style={{ maxWidth: 1520, padding: '16px 40px', background: '#FFFFFF', border: '3px solid #111111', borderRadius: 12, boxShadow: '6px 6px 0 #111111', fontFamily: t.fb, fontSize: 34, fontWeight: 700, lineHeight: 1.6, color: '#111111' }}>{text}</div>
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 74, display: 'flex', justifyContent: 'center', opacity: o }}>
      <div style={{
        maxWidth: 1520, padding: '18px 44px', borderRadius: 12, fontFamily: t.fb, fontSize: 34, lineHeight: 1.6,
        background: day ? (t.flags.serif ? 'rgba(255,253,248,0.95)' : 'rgba(255,255,255,0.94)') : (t.flags.serif ? 'rgba(46,42,36,0.92)' : 'rgba(10,20,40,0.88)'),
        border: `1px solid ${day ? t.day.line : t.night.line}`,
        color: day ? t.day.fg : t.night.fg,
        boxShadow: day ? '0 2px 8px rgba(0,0,0,0.06)' : '0 6px 24px rgba(0,0,0,0.55)',
      }}>
        <span style={{ color: t.signal, fontFamily: t.fm, marginRight: 18 }}>▸</span>{text}
      </div>
    </div>
  );
}

function TimeStamp() {
  const time = useTime();
  const sec = Math.floor(time);
  React.useEffect(() => {
    const el = document.querySelector('[data-video-root]');
    if (el) el.setAttribute('data-screen-label', '藪医者の学舎動画 t=' + sec + 's');
  }, [sec]);
  return null;
}

function NightAccentText({ t, children, style }) {
  const s = t.gradText
    ? { background: t.gradText, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }
    : { color: t.nightAccent };
  return <div style={{ ...s, ...style }}>{children}</div>;
}

// ---------- scenes ----------
function Opening({ t, kicker, ep, lead, title, sub, presenterIcon, presenterName }) {
  const { localTime: lt } = useSprite();
  const lineW = Easing.easeOutCubic(clamp((lt - 0.3) / 0.9, 0, 1));
  if (t.flags.chyron) {
    return (
      <Shell t={t} bg="day" origin="50% 62%">
        <div style={{ position: 'absolute', top: 54, right: 120, display: 'flex', alignItems: 'center', gap: 14, border: `1px solid ${t.day.line}`, borderRadius: 999, padding: '10px 26px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.signal }}></div>
          <div style={{ fontFamily: t.fm, fontSize: 22, letterSpacing: 4, color: t.day.fg, fontWeight: 700 }}>{ep}</div>
        </div>
        <FadeIn delay={1.2} dy={16} style={{ position: 'absolute', left: 120, bottom: 470 }}>
          <div style={{ fontFamily: t.fb, fontSize: 36, color: t.day.fg2 }}>{lead}</div>
        </FadeIn>
        <FadeIn delay={2.2} dy={30} style={{ position: 'absolute', left: 0, right: 0, bottom: 220 }}>
          <div style={{ background: '#030712', padding: '44px 120px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 14, background: 'linear-gradient(180deg,#22D3EE,#1E5BE6)' }}></div>
            <div style={{ fontFamily: t.fm, fontSize: 22, letterSpacing: 8, color: t.signal, marginBottom: 14 }}>{kicker}</div>
            <div style={{ fontFamily: t.fd, fontSize: 78, fontWeight: 800, color: '#F5FAFF', letterSpacing: -1, whiteSpace: 'nowrap' }}>{title} <NightAccentText t={t} style={{ display: 'inline-block' }}>{sub}</NightAccentText></div>
          </div>
          <div style={{ background: t.accent, padding: '16px 120px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: t.fb, fontSize: 28, color: '#FFFFFF' }}>{presenterName}</div>
            <div style={{ fontFamily: t.fm, fontSize: 22, letterSpacing: 4, color: '#DFF0FF' }}>05:00</div>
          </div>
        </FadeIn>
      </Shell>
    );
  }
  return (
    <Shell t={t} bg="night" glow={t.night.glowA} origin="30% 60%">
      {t.flags.cinema && (
        <div style={{ position: 'absolute', top: 100, bottom: 100, left: 0, right: 0, background: t.flags.placeholder, border: '1px dashed #3A382F', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 150, boxSizing: 'border-box' }}>
          <div style={{ fontFamily: t.fm, fontSize: 20, letterSpacing: 4, color: '#3F3C33' }}>実写素材枠 — 夕方の診察室、手元のカルテ</div>
        </div>
      )}
      <div style={{ position: 'absolute', top: t.flags.cinema ? 140 : 54, left: 120, right: 120, display: 'flex', justifyContent: 'space-between' }}>
        <TypeIn text={kicker || '▸ YABUISHA NO MANABIYA'} delay={1.1} style={{ fontFamily: t.fm, fontSize: 27, letterSpacing: 10, color: t.flags.cinema || t.flags.chalk || t.flags.pop || t.flags.serif ? t.nightAccent : t.signal, fontWeight: 700 }} />
        <FadeIn delay={1.8} dy={10}>
          <div style={{ fontFamily: t.fm, fontSize: 24, letterSpacing: 6, color: t.night.fg3 }}>{ep}</div>
        </FadeIn>
      </div>
      {t.flags.pop && (
        <FadeIn delay={2} dy={12} style={{ position: 'absolute', top: 130, right: 140, transform: 'rotate(4deg)' }}>
          <div style={{ background: '#FFD43A', border: '3px solid #FFFDF4', color: '#111111', fontFamily: t.fd, fontSize: 30, padding: '10px 26px', borderRadius: 10, boxShadow: '5px 5px 0 rgba(255,253,244,0.35)' }}>5分解説!</div>
        </FadeIn>
      )}
      <div style={{ position: 'absolute', left: 120, top: 380 }}>
        <FadeIn delay={2.5} dy={20}>
          <div style={{ fontFamily: t.fb, fontSize: 40, color: t.night.fg2, marginBottom: 22 }}>{lead}</div>
        </FadeIn>
        <FadeIn delay={3.3} dy={30}>
          <div style={{ fontFamily: t.fd, fontSize: 116, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -2, lineHeight: 1.2, textShadow: t.flags.cinema ? '0 2px 20px rgba(0,0,0,0.85)' : 'none' }}>{title}</div>
        </FadeIn>
        <FadeIn delay={4.2} dy={30}>
          <NightAccentText t={t} style={{ fontFamily: t.fd, fontSize: 116, fontWeight: t.flags.pop ? 400 : 800, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -2, lineHeight: 1.2, textShadow: t.flags.cinema ? '0 2px 20px rgba(0,0,0,0.85)' : 'none' }}>{sub}</NightAccentText>
        </FadeIn>
        <div style={{ width: `${lineW * 560}px`, height: t.flags.cinema || t.flags.serif ? 2 : 3, background: t.sig || t.nightAccent, marginTop: 34 }}></div>
      </div>
      <FadeIn delay={5.6} dy={16} style={{ position: 'absolute', left: 120, bottom: 178 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 62, height: 62, borderRadius: '50%', border: `2px solid ${t.nightAccent || t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fd, fontSize: 26, color: t.nightAccent || '#8AD9FF' }}>{presenterIcon || '医'}</div>
          <div style={{ fontFamily: t.fb, fontSize: 30, color: t.night.fg2 }}>{presenterName}</div>
        </div>
      </FadeIn>
      {t.flags.cinema ? (
        <FadeIn delay={5.6} dy={0} style={{ position: 'absolute', right: 120, bottom: 178 }}>
          <div style={{ fontFamily: t.fm, fontSize: 20, color: '#5A564A' }}>00:00:04:12</div>
        </FadeIn>
      ) : (
        <FadeIn delay={5.6} dy={0} style={{ position: 'absolute', right: 88, bottom: 178 }}>
          <div style={{ width: 44, height: 44, borderRight: `3px solid ${t.nightAccent || t.accent}`, borderBottom: `3px solid ${t.nightAccent || t.accent}` }}></div>
        </FadeIn>
      )}
    </Shell>
  );
}

function Divider({ t, num, title, chaptersTotal = 4 }) {
  const active = parseInt(num, 10);
  const chs = Array.from({ length: chaptersTotal }, (_, i) => i + 1);
  return (
    <Shell t={t} bg="night" origin="50% 50%">
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <FadeIn delay={0.4} dy={20}>
          <div style={{ fontFamily: t.fm, fontSize: 108, fontWeight: 700, color: t.nightAccent || t.accent }}>{t.flags.cinema ? (ROMAN[num] || num) : num}</div>
        </FadeIn>
        <FadeIn delay={0.8} dy={24}>
          <div style={{ fontFamily: t.fd, fontSize: 74, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg, marginTop: 14, letterSpacing: t.flags.serif || t.flags.cinema ? 2 : -1, whiteSpace: 'nowrap' }}>{title}</div>
        </FadeIn>
        <FadeIn delay={1.3} dy={12}>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 46 }}>
            {chs.map((i) => (
              <div key={i} style={{ width: 84, height: t.flags.cinema ? 2 : 8, borderRadius: 4, background: i === active ? (t.nightAccent || t.signal) : t.night.line }}></div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Shell>
  );
}

function Bar({ t, delay, h, label, value, fill, border, valueColor, badge }) {
  const { localTime: lt } = useSprite();
  const p = Easing.easeOutCubic(clamp((lt - delay) / 0.9, 0, 1));
  const d = t.day;
  const fillMap = { tint: d.tint, frost: d.active };
  const borderMap = { lineStrong: d.lineStrong || d.line, ice: d.activeBorder };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 14, height: 470, minWidth: 190 }}>
      <div style={{ opacity: p, fontFamily: t.fd, fontSize: 52, fontWeight: t.flags.pop ? 400 : 800, color: t.tokens[valueColor] || valueColor || d.fg, fontVariantNumeric: 'tabular-nums', display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
        {value}
        {badge && (
          <span style={{ fontFamily: t.fm, fontSize: 24, fontWeight: 700, color: t.flags.pop ? '#111111' : t.tokens.deep, background: t.flags.pop ? '#FFD43A' : 'rgba(34,211,238,0.18)', border: t.flags.pop ? '2px solid #111111' : `1px solid ${t.signal}`, borderRadius: 999, padding: '4px 16px' }}>{badge}</span>
        )}
      </div>
      <div style={{ width: 190, height: Math.max(4, h * p), background: fillMap[fill] || fill || d.tint, border: t.flags.pop ? '3px solid #111111' : `1px solid ${borderMap[border] || border || d.line}`, borderRadius: t.flags.cinema ? 0 : 10 }}></div>
      <div style={{ fontFamily: t.fb, fontSize: 28, color: d.fg2 }}>{label}</div>
    </div>
  );
}

function CaseScene({ t, chapter, chaptersTotal, label, title, items = [], footer, chart }) {
  const { localTime: lt } = useSprite();
  const d = t.day;
  const boxBase = t.flags.pop
    ? { background: '#FFFFFF', border: '3px solid #111111', borderRadius: 12 }
    : t.flags.chalk
      ? { background: 'transparent', border: '2px dashed #54746A', borderRadius: 10 }
      : t.flags.cinema
        ? { background: d.card, border: `1px solid ${d.line}`, borderRadius: 2 }
        : { background: d.tint, borderLeft: `6px solid ${t.accent}`, borderRadius: t.radius };
  return (
    <Shell t={t} bg="day" chapter={chapter} chaptersTotal={chaptersTotal} origin="40% 45%">
      <DayHeader t={t} label={label} title={title} />
      <div style={{ position: 'absolute', left: 120, top: 320, width: 850, padding: '44px 48px', display: 'flex', flexDirection: 'column', gap: 30, ...boxBase }}>
        {items.map((it, i) => it.quote ? (
          <FadeIn key={i} delay={it.delay}>
            <div style={{
              fontFamily: t.fd, fontSize: 38, fontWeight: t.flags.pop ? 400 : 700, lineHeight: 1.6, padding: '26px 32px',
              ...card(t, !!(it.win && lt >= it.win[0] && lt < it.win[1])),
              borderLeft: undefined,
              color: (it.win && lt >= it.win[0] && lt < it.win[1] && t.flags.pop) ? '#111111' : d.fg,
              opacity: 1,
              transition: 'background 0.3s ease, border 0.3s ease',
            }}>
              {it.quote.map((l, j) => <React.Fragment key={j}>{j > 0 && <br />}{l}</React.Fragment>)}
            </div>
          </FadeIn>
        ) : (
          <FadeIn key={i} delay={it.delay}>
            <div style={{ fontFamily: t.fb, fontSize: 34, color: d.fg, lineHeight: 1.7 }}>{R(it.runs, t)}</div>
          </FadeIn>
        ))}
        {footer && (
          <FadeIn delay={footer.delay}>
            <div style={{ fontFamily: t.fb, fontSize: 26, color: d.fg3, borderTop: `1px dashed ${d.lineStrong || d.line}`, paddingTop: 22 }}>{footer.text}</div>
          </FadeIn>
        )}
      </div>
      {chart && (
        <FadeIn delay={4} style={{ position: 'absolute', right: 120, top: 320, width: 640 }}>
          <div style={{ background: d.card, border: t.flags.pop ? '3px solid #111111' : `1px solid ${d.line}`, borderRadius: t.flags.cinema ? 2 : t.radius, padding: '38px 44px', boxShadow: t.flags.pop ? '8px 8px 0 #111111' : 'none' }}>
            <div style={{ fontFamily: t.fm, fontSize: 24, letterSpacing: 6, color: t.flags.pop ? '#111111' : t.tokens.iris, fontWeight: 700, marginBottom: 30 }}>
              {!t.flags.serif && !t.flags.cinema && <span style={{ color: t.signal }}>▸ </span>}{chart.label}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 90, alignItems: 'flex-end' }}>
              {chart.bars.map((b, i) => <Bar key={i} t={t} {...b} />)}
            </div>
          </div>
          {chart.conclusion && (
            <FadeIn delay={chart.conclusion.delay}>
              <div style={{ marginTop: 30, textAlign: 'center' }}>
                <div style={{ fontFamily: t.fd, fontSize: 38, fontWeight: t.flags.pop ? 400 : 700, color: t.flags.chalk || t.flags.cinema ? t.nightAccent : t.tokens.iris }}>{chart.conclusion.text}</div>
                <div style={{ width: 260, height: 3, background: t.sig || t.nightAccent, margin: '16px auto 0' }}></div>
              </div>
            </FadeIn>
          )}
        </FadeIn>
      )}
    </Shell>
  );
}

function PointsScene({ t, chapter, chaptersTotal, label, title, items = [] }) {
  const { localTime: lt } = useSprite();
  const d = t.day;
  return (
    <Shell t={t} bg="day" chapter={chapter} chaptersTotal={chaptersTotal} origin="50% 40%">
      <DayHeader t={t} label={label} title={title} />
      <div style={{ position: 'absolute', left: 120, right: 120, top: 330, display: 'flex', flexDirection: 'column', gap: 30 }}>
        {items.map((p) => {
          const active = lt >= p.win[0] && lt < p.win[1];
          return (
            <FadeIn key={p.n} delay={p.at} dy={32}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 44, padding: '38px 48px', ...card(t, active), transition: 'background 0.3s ease, border-color 0.3s ease' }}>
                <div style={{ fontFamily: t.fm, fontSize: 54, fontWeight: 700, color: t.flags.pop ? '#111111' : (active ? t.tokens.deep : t.tokens.iris), fontVariantNumeric: 'tabular-nums' }}>{p.n}</div>
                <div>
                  <div style={{ fontFamily: t.fd, fontSize: 48, fontWeight: t.flags.pop ? 400 : 700, color: d.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 1 : -0.5 }}>{p.title}</div>
                  <div style={{ fontFamily: t.fb, fontSize: 30, color: d.fg2, marginTop: 8 }}>{p.sub}</div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </Shell>
  );
}

function FlowScene({ t, chapter, chaptersTotal, label, title, steps = [], note }) {
  const { localTime: lt } = useSprite();
  const d = t.day;
  return (
    <Shell t={t} bg="day" chapter={chapter} chaptersTotal={chaptersTotal} origin="50% 50%">
      <DayHeader t={t} label={label} title={title} />
      <div style={{ position: 'absolute', left: 120, right: 120, top: 430, display: 'flex', alignItems: 'stretch' }}>
        {steps.map((s, i) => {
          const active = lt >= s.win[0] && lt < s.win[1];
          return (
            <React.Fragment key={s.n}>
              {i > 0 && (
                <FadeIn delay={s.at} dy={0} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: 44, height: 3, background: active ? (t.flags.chalk || t.flags.cinema ? t.nightAccent : t.accent) : (d.lineStrong || d.line), position: 'relative' }}>
                    <div style={{ position: 'absolute', right: -2, top: -7, borderLeft: `14px solid ${active ? (t.flags.chalk || t.flags.cinema ? t.nightAccent : t.accent) : (d.lineStrong || d.line)}`, borderTop: '8.5px solid transparent', borderBottom: '8.5px solid transparent' }}></div>
                  </div>
                </FadeIn>
              )}
              <FadeIn delay={s.at} dy={30} style={{ flex: 1 }}>
                <div style={{ height: 280, padding: '40px 30px', textAlign: 'center', boxSizing: 'border-box', ...card(t, active), transition: 'all 0.3s ease' }}>
                  <div style={{ fontFamily: t.fm, fontSize: 24, letterSpacing: 5, fontWeight: 700, color: t.flags.pop ? '#111111' : (active ? t.tokens.deep : t.tokens.iris) }}>
                    {active && !t.flags.serif && !t.flags.cinema && <span style={{ color: t.flags.pop ? '#111111' : t.signal }}>◉ </span>}{s.n}
                  </div>
                  <div style={{ fontFamily: t.fd, fontSize: 44, fontWeight: t.flags.pop ? 400 : 700, color: d.fg, marginTop: 22 }}>{s.title}</div>
                  <div style={{ fontFamily: t.fb, fontSize: 26, color: d.fg2, marginTop: 14, lineHeight: 1.6 }}>{s.sub}</div>
                </div>
              </FadeIn>
            </React.Fragment>
          );
        })}
      </div>
      {note && (
        <FadeIn delay={note.delay} style={{ position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: t.fd, fontSize: 36, fontWeight: t.flags.pop ? 400 : 700, color: t.flags.chalk || t.flags.cinema ? t.nightAccent : t.tokens.iris, whiteSpace: 'nowrap', opacity: lt >= note.win[0] && lt < note.win[1] ? 1 : 0.4, transition: 'opacity 0.4s ease' }}>
            {note.text}
          </div>
        </FadeIn>
      )}
    </Shell>
  );
}

function RoleList({ t, mono, title, items, base, emph }) {
  const d = t.day;
  return (
    <div style={{ flex: 1, padding: '40px 44px', boxSizing: 'border-box', ...card(t, false), opacity: 1, borderLeft: emph && !t.flags.pop && !t.flags.chalk && !t.flags.cinema ? `6px solid ${t.accent}` : undefined }}>
      <div style={{ fontFamily: t.fm, fontSize: 24, letterSpacing: 6, color: t.flags.pop ? '#111111' : t.tokens.iris, fontWeight: 700 }}>
        {!t.flags.serif && !t.flags.cinema && <span style={{ color: t.signal }}>▸ </span>}{mono}
      </div>
      <div style={{ fontFamily: t.fd, fontSize: 46, fontWeight: t.flags.pop ? 400 : 700, color: d.fg, margin: '16px 0 30px' }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((it, i) => (
          <FadeIn key={i} delay={base + i * 1.2} dy={22}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '22px 28px', ...card(t, emph), opacity: 1 }}>
              <span style={{ fontFamily: t.fm, fontSize: 28, fontWeight: 700, color: t.flags.pop ? '#111111' : (emph ? t.tokens.deep : t.tokens.iris) }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: t.fb, fontSize: 32, color: d.fg }}>{it}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function RoleScene({ t, chapter, chaptersTotal, label, title, columns = [], conclusion }) {
  return (
    <Shell t={t} bg="day" chapter={chapter} chaptersTotal={chaptersTotal} origin="50% 45%">
      <DayHeader t={t} label={label} title={title} />
      <div style={{ position: 'absolute', left: 120, right: 120, top: 320, display: 'flex', gap: 40 }}>
        {columns.map((c, i) => <RoleList key={i} t={t} {...c} />)}
      </div>
      {conclusion && (
        <FadeIn delay={conclusion.delay} style={{ position: 'absolute', left: 0, right: 0, top: 880, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: t.fd, fontSize: 40, fontWeight: t.flags.pop ? 400 : 800, color: t.day.fg, whiteSpace: 'nowrap' }}>{R(conclusion.runs, t)}</div>
        </FadeIn>
      )}
    </Shell>
  );
}

function KeyMessage({ t, line1, line2 }) {
  const { localTime: lt } = useSprite();
  const lineW = Easing.easeOutCubic(clamp((lt - 6.5) / 1, 0, 1));
  if (t.flags.pop) {
    return (
      <Shell t={t} bg="night" origin="50% 50%">
        <div style={{ position: 'absolute', inset: 0, background: '#FFD43A' }}></div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
          <FadeIn delay={0.8} dy={16}>
            <div style={{ fontFamily: t.fd, fontSize: 34, color: '#111111', marginBottom: 40 }}>＼ きょうのまとめ ／</div>
          </FadeIn>
          <FadeIn delay={1.8} dy={30}>
            <div style={{ display: 'inline-block', background: '#FFFDF4', border: '4px solid #111111', borderRadius: 16, padding: '50px 80px', boxShadow: '12px 12px 0 #111111' }}>
              <div style={{ fontFamily: t.fd, fontSize: 72, color: '#111111', lineHeight: 1.7 }}>{line1}<br />{line2}</div>
            </div>
          </FadeIn>
        </div>
      </Shell>
    );
  }
  return (
    <Shell t={t} bg="night" origin="50% 50%" glow={t.night.glowB}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', width: 1500 }}>
        <FadeIn delay={0.8} dy={16}>
          <div style={{ fontFamily: t.fm, fontSize: 27, letterSpacing: 12, color: t.nightAccent || t.signal, fontWeight: 700, marginBottom: 52 }}>{t.flags.serif || t.flags.chalk ? '今日のひとこと' : (t.flags.cinema ? '' : '▸ KEY MESSAGE')}</div>
        </FadeIn>
        <FadeIn delay={1.8} dy={34}>
          <div style={{ fontFamily: t.fd, fontSize: 92, fontWeight: 800, color: t.night.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -1, lineHeight: 1.5 }}>{line1}</div>
        </FadeIn>
        <FadeIn delay={4.4} dy={34}>
          <NightAccentText t={t} style={{ fontFamily: t.fd, fontSize: 92, fontWeight: 800, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -1, lineHeight: 1.5 }}>{line2}</NightAccentText>
        </FadeIn>
        <div style={{ width: `${lineW * 320}px`, height: 2, background: t.nightAccent || '#1E5BE6', margin: '56px auto 0' }}></div>
      </div>
    </Shell>
  );
}

function Ending({ t, logoChar, name, tagline, disclaimer = [] }) {
  return (
    <Shell t={t} bg="night" origin="50% 45%">
      <div style={{ position: 'absolute', top: '44%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
        <FadeIn delay={0.8} dy={20}>
          <div style={{ width: 120, height: 120, margin: '0 auto 34px', borderRadius: t.flags.serif || t.flags.cinema ? '50%' : 24, border: `3px solid ${t.nightAccent || t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fd, fontSize: 54, fontWeight: 700, color: t.nightAccent || '#8AD9FF' }}>{logoChar || '学'}</div>
        </FadeIn>
        <FadeIn delay={1.6} dy={20}>
          <div style={{ fontFamily: t.fd, fontSize: 56, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg }}>{name}</div>
        </FadeIn>
        <FadeIn delay={2.3} dy={14}>
          <div style={{ fontFamily: t.fm, fontSize: 23, letterSpacing: 10, color: t.night.fg2, marginTop: 18 }}>{tagline}</div>
        </FadeIn>
      </div>
      <FadeIn delay={3.4} style={{ position: 'absolute', left: 0, right: 0, bottom: 190, textAlign: 'center' }}>
        <div style={{ fontFamily: t.fb, fontSize: 24, color: t.night.fg3, lineHeight: 2 }}>
          {disclaimer.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>)}
        </div>
      </FadeIn>
    </Shell>
  );
}

// ---------- app ----------
const SCENE_TYPES = {
  opening: Opening,
  divider: Divider,
  case: CaseScene,
  points: PointsScene,
  flow: FlowScene,
  roles: RoleScene,
  keymessage: KeyMessage,
  ending: Ending,
};

window.ManabiyaVideo = function ManabiyaVideo(props) {
  const epId = props.episodeId || 'ep01';
  const ep = props.episode || (window.MANABIYA_EPISODES || {})[epId];
  const themes = window.MANABIYA_THEMES || {};
  const t = themes[props.theme] || themes.duotone;
  React.useEffect(() => {
    const ts = [300, 900, 2000].map((ms) => setTimeout(() => window.dispatchEvent(new Event('resize')), ms));
    return () => ts.forEach(clearTimeout);
  }, []);
  if (!ep || !t) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: '#030712', color: '#8AA0C2', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, letterSpacing: 2 }}>
        {!ep ? `EPISODE NOT FOUND: ${epId}` : 'THEMES NOT LOADED'} — 読み込みスクリプトを確認してください
      </div>
    );
  }
  const showCaps = props.showCaptions !== false;
  return (
    <div data-video-root data-screen-label="藪医者の学舎動画" style={{ position: 'fixed', inset: 0, background: t.night.bg }}>
      <Stage width={1920} height={1080} duration={ep.duration} background={t.night.bg} fps={30}>
        {ep.scenes.map((s, i) => {
          const Scene = SCENE_TYPES[s.type];
          if (!Scene) return null;
          return (
            <Sprite key={i} start={s.start} end={s.end}>
              <Scene {...s.props} t={t} chaptersTotal={ep.chaptersTotal || 4} />
            </Sprite>
          );
        })}
        <Sprite start={0} end={ep.duration} keepMounted>
          <Captions t={t} captions={ep.captions} show={showCaps} />
          <TimeStamp />
        </Sprite>
      </Stage>
    </div>
  );
};
})();
