// ============================================================
// 藪医者の学舎 — 縦型9:16エンジン 1080×1920（テーマ切替式）
// ------------------------------------------------------------
// theme: duotone / broadcast / paper / chalk / pop / cinema
// 横型と同じ episode-XX.js / manabiya-themes.js を読む。原則、編集しない。
// 依存: animations.jsx, manabiya-themes.js
// ============================================================

// IIFE で内部スコープを閉じる — 横型/縦型で同名の内部関数(Opening/PointsScene 等)が
// グローバル衝突しないため。公開は window.ManabiyaVideo(Vertical) のみ。
(function () {
const { Stage, Sprite, useTime, useSprite, Easing, clamp } = window;

const ROMAN_V = { '01': 'I', '02': 'II', '03': 'III', '04': 'IV', '05': 'V' };

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

function card(t, active) {
  const d = t.day;
  if (t.flags.pop) return { background: active ? '#FFD43A' : '#FFFFFF', border: '3px solid #111111', boxShadow: active ? '6px 6px 0 #111111' : 'none', borderRadius: 12, opacity: active ? 1 : 0.45 };
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
      {t.flags.chalk && <div style={{ position: 'absolute', inset: 0, border: '16px solid #6B4F35', pointerEvents: 'none' }}></div>}
      {bg === 'day' && chapter != null && !t.flags.cinema && (
        <div style={{ position: 'absolute', left: 70, right: 70, top: t.flags.chalk ? 36 : 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: t.fm, fontSize: 20, letterSpacing: 5, color: t.day.fg3, fontWeight: 700 }}>MANABIYA</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {chs.map((i) => (
              <div key={i} style={{ width: 48, height: 6, borderRadius: 3, background: i === chapter ? t.signal : t.day.line }}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DayHeader({ t, label, title }) {
  return (
    <div style={{ position: 'absolute', top: 110, left: 70, right: 70 }}>
      <FadeIn delay={0.4} dy={18}>
        {t.flags.chyron ? (
          <div style={{ display: 'inline-block', background: '#030712', color: '#F5FAFF', fontFamily: t.fm, fontSize: 22, letterSpacing: 5, fontWeight: 700, padding: '7px 18px' }}>{label}</div>
        ) : (
          <div style={{ fontFamily: t.fm, fontSize: 24, letterSpacing: 7, color: t.flags.pop ? '#111111' : t.accent, fontWeight: 700 }}>
            {!t.flags.serif && !t.flags.cinema && <span style={{ color: t.signal }}>▸ </span>}{label}
          </div>
        )}
      </FadeIn>
      <FadeIn delay={0.7} dy={22}>
        <div style={{ fontFamily: t.fd, fontSize: 54, fontWeight: t.flags.pop ? 400 : 700, color: t.day.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 1 : -1, marginTop: 12, lineHeight: 1.3, display: 'inline-block', borderBottom: t.flags.chalk ? '3px dashed #E8C468' : 'none', paddingBottom: t.flags.chalk ? 8 : 0 }}>{title}</div>
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
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, opacity: o, background: '#030712', padding: '24px 44px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ width: 8, height: 40, background: t.signal, flexShrink: 0 }}></div>
        <div style={{ fontFamily: t.fb, fontSize: 36, lineHeight: 1.55, color: '#F5FAFF' }}>{text}</div>
      </div>
    );
  }
  if (t.flags.cinema) {
    return (
      <div style={{ position: 'absolute', left: 30, right: 30, bottom: 44, display: 'flex', justifyContent: 'center', opacity: o }}>
        <div style={{ padding: '10px 28px', background: 'rgba(10,10,10,0.78)', fontFamily: t.fd, fontSize: 34, lineHeight: 1.7, letterSpacing: 2, color: '#F5F1E8', textAlign: 'center' }}>{text}</div>
      </div>
    );
  }
  if (t.flags.chalk) {
    return (
      <div style={{ position: 'absolute', left: 40, right: 40, bottom: 120, display: 'flex', justifyContent: 'center', opacity: o }}>
        <div style={{ padding: '18px 36px', background: 'rgba(10,26,22,0.72)', borderRadius: 10, fontFamily: t.fb, fontSize: 36, lineHeight: 1.6, color: '#F2EFE4' }}>
          <span style={{ color: t.signal, marginRight: 14 }}>✎</span>{text}
        </div>
      </div>
    );
  }
  if (t.flags.pop) {
    return (
      <div style={{ position: 'absolute', left: 40, right: 40, bottom: 120, display: 'flex', justifyContent: 'center', opacity: o }}>
        <div style={{ padding: '18px 36px', background: '#FFFFFF', border: '3px solid #111111', borderRadius: 12, boxShadow: '5px 5px 0 #111111', fontFamily: t.fb, fontSize: 36, fontWeight: 700, lineHeight: 1.6, color: '#111111' }}>{text}</div>
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', left: 40, right: 40, bottom: 120, display: 'flex', justifyContent: 'center', opacity: o }}>
      <div style={{
        maxWidth: 1000, padding: '22px 40px', borderRadius: 12, fontFamily: t.fb, fontSize: 38, lineHeight: 1.6,
        background: day ? (t.flags.serif ? 'rgba(255,253,248,0.95)' : 'rgba(255,255,255,0.94)') : (t.flags.serif ? 'rgba(46,42,36,0.92)' : 'rgba(10,20,40,0.88)'),
        border: `1px solid ${day ? t.day.line : t.night.line}`,
        color: day ? t.day.fg : t.night.fg,
        boxShadow: day ? '0 2px 8px rgba(0,0,0,0.06)' : '0 6px 24px rgba(0,0,0,0.55)',
      }}>
        <span style={{ color: t.signal, fontFamily: t.fm, marginRight: 16 }}>▸</span>{text}
      </div>
    </div>
  );
}

function TimeStamp() {
  const time = useTime();
  const sec = Math.floor(time);
  React.useEffect(() => {
    const el = document.querySelector('[data-video-root-v]');
    if (el) el.setAttribute('data-screen-label', '藪医者の学舎 縦型動画 t=' + sec + 's');
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
      <Shell t={t} bg="day" origin="50% 60%">
        <div style={{ position: 'absolute', top: 60, right: 70, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${t.day.line}`, borderRadius: 999, padding: '10px 24px' }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.signal }}></div>
          <div style={{ fontFamily: t.fm, fontSize: 22, letterSpacing: 3, color: t.day.fg, fontWeight: 700 }}>{ep}</div>
        </div>
        <FadeIn delay={1.2} dy={16} style={{ position: 'absolute', left: 70, bottom: 900 }}>
          <div style={{ fontFamily: t.fb, fontSize: 34, color: t.day.fg2 }}>{lead}</div>
        </FadeIn>
        <FadeIn delay={2.2} dy={30} style={{ position: 'absolute', left: 0, right: 0, bottom: 480 }}>
          <div style={{ background: '#030712', padding: '44px 70px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 12, background: 'linear-gradient(180deg,#22D3EE,#1E5BE6)' }}></div>
            <div style={{ fontFamily: t.fm, fontSize: 21, letterSpacing: 6, color: t.signal, marginBottom: 16 }}>{kicker}</div>
            <div style={{ fontFamily: t.fd, fontSize: 84, fontWeight: 800, color: '#F5FAFF', letterSpacing: -1, lineHeight: 1.25 }}>{title}</div>
            <NightAccentText t={t} style={{ fontFamily: t.fd, fontSize: 62, fontWeight: 800, letterSpacing: -1, lineHeight: 1.3, marginTop: 10 }}>{sub}</NightAccentText>
          </div>
          <div style={{ background: t.accent, padding: '16px 70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: t.fb, fontSize: 28, color: '#FFFFFF' }}>{presenterName}</div>
            <div style={{ fontFamily: t.fm, fontSize: 21, letterSpacing: 3, color: '#DFF0FF' }}>05:00</div>
          </div>
        </FadeIn>
      </Shell>
    );
  }
  return (
    <Shell t={t} bg="night" glow={t.night.glowA} origin="40% 55%">
      {t.flags.cinema && (
        <div style={{ position: 'absolute', inset: 0, background: t.flags.placeholder, border: '1px dashed #3A382F', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '190px 44px 0 0', boxSizing: 'border-box' }}>
          <div style={{ fontFamily: t.fm, fontSize: 18, letterSpacing: 3, color: '#3F3C33', writingMode: 'vertical-rl' }}>実写素材枠（縦） — 診察室・勉強会の風景</div>
        </div>
      )}
      <div style={{ position: 'absolute', top: 70, left: 70, right: 70, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <TypeIn text={kicker || '▸ YABUISHA NO MANABIYA'} delay={1.1} style={{ fontFamily: t.fm, fontSize: 26, letterSpacing: 8, color: t.flags.cinema || t.flags.chalk || t.flags.pop || t.flags.serif ? t.nightAccent : t.signal, fontWeight: 700 }} />
        <FadeIn delay={1.8} dy={10}>
          <div style={{ fontFamily: t.fm, fontSize: 22, letterSpacing: 5, color: t.night.fg3 }}>{ep}</div>
        </FadeIn>
      </div>
      {t.flags.pop && (
        <FadeIn delay={2} dy={12} style={{ position: 'absolute', top: 200, right: 70, transform: 'rotate(4deg)' }}>
          <div style={{ background: '#FFD43A', border: '3px solid #FFFDF4', color: '#111111', fontFamily: t.fd, fontSize: 30, padding: '10px 24px', borderRadius: 10, boxShadow: '5px 5px 0 rgba(255,253,244,0.35)' }}>5分解説!</div>
        </FadeIn>
      )}
      <div style={{ position: 'absolute', left: 70, right: 70, top: 620 }}>
        <FadeIn delay={2.5} dy={20}>
          <div style={{ fontFamily: t.fb, fontSize: 38, color: t.night.fg2, marginBottom: 26 }}>{lead}</div>
        </FadeIn>
        <FadeIn delay={3.3} dy={30}>
          <div style={{ fontFamily: t.fd, fontSize: 104, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -2, lineHeight: 1.25, textShadow: t.flags.cinema ? '0 2px 20px rgba(0,0,0,0.85)' : 'none' }}>{title}</div>
        </FadeIn>
        <FadeIn delay={4.2} dy={30}>
          <NightAccentText t={t} style={{ fontFamily: t.fd, fontSize: 76, fontWeight: t.flags.pop ? 400 : 800, letterSpacing: t.flags.serif || t.flags.cinema ? 2 : -1, lineHeight: 1.35, marginTop: 12, textShadow: t.flags.cinema ? '0 2px 20px rgba(0,0,0,0.85)' : 'none' }}>{sub}</NightAccentText>
        </FadeIn>
        <div style={{ width: `${lineW * 460}px`, height: t.flags.cinema || t.flags.serif ? 2 : 3, background: t.sig || t.nightAccent, marginTop: 40 }}></div>
      </div>
      <FadeIn delay={5.6} dy={16} style={{ position: 'absolute', left: 70, bottom: 260 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 62, height: 62, borderRadius: '50%', border: `2px solid ${t.nightAccent || t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fd, fontSize: 26, color: t.nightAccent || '#8AD9FF' }}>{presenterIcon || '医'}</div>
          <div style={{ fontFamily: t.fb, fontSize: 30, color: t.night.fg2 }}>{presenterName}</div>
        </div>
      </FadeIn>
      {t.flags.cinema ? (
        <FadeIn delay={5.6} dy={0} style={{ position: 'absolute', right: 70, bottom: 260 }}>
          <div style={{ fontFamily: t.fm, fontSize: 18, color: '#5A564A' }}>00:00:04:12</div>
        </FadeIn>
      ) : (
        <FadeIn delay={5.6} dy={0} style={{ position: 'absolute', right: 70, bottom: 260 }}>
          <div style={{ width: 40, height: 40, borderRight: `3px solid ${t.nightAccent || t.accent}`, borderBottom: `3px solid ${t.nightAccent || t.accent}` }}></div>
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
      <div style={{ position: 'absolute', top: '50%', left: 70, right: 70, transform: 'translateY(-50%)', textAlign: 'center' }}>
        <FadeIn delay={0.4} dy={20}>
          <div style={{ fontFamily: t.fm, fontSize: 100, fontWeight: 700, color: t.nightAccent || t.accent }}>{t.flags.cinema ? (ROMAN_V[num] || num) : num}</div>
        </FadeIn>
        <FadeIn delay={0.8} dy={24}>
          <div style={{ fontFamily: t.fd, fontSize: 62, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg, marginTop: 18, letterSpacing: t.flags.serif || t.flags.cinema ? 2 : -1, lineHeight: 1.4 }}>{title}</div>
        </FadeIn>
        <FadeIn delay={1.3} dy={12}>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 50 }}>
            {chs.map((i) => (
              <div key={i} style={{ width: 72, height: t.flags.cinema ? 2 : 8, borderRadius: 4, background: i === active ? (t.nightAccent || t.signal) : t.night.line }}></div>
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 12, height: 400, minWidth: 170 }}>
      <div style={{ opacity: p, fontFamily: t.fd, fontSize: 44, fontWeight: t.flags.pop ? 400 : 800, color: t.tokens[valueColor] || valueColor || d.fg, fontVariantNumeric: 'tabular-nums', display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap' }}>
        {value}
        {badge && (
          <span style={{ fontFamily: t.fm, fontSize: 22, fontWeight: 700, color: t.flags.pop ? '#111111' : t.tokens.deep, background: t.flags.pop ? '#FFD43A' : 'rgba(34,211,238,0.18)', border: t.flags.pop ? '2px solid #111111' : `1px solid ${t.signal}`, borderRadius: 999, padding: '4px 14px' }}>{badge}</span>
        )}
      </div>
      <div style={{ width: 170, height: Math.max(4, h * 0.8 * p), background: fillMap[fill] || fill || d.tint, border: t.flags.pop ? '3px solid #111111' : `1px solid ${borderMap[border] || border || d.line}`, borderRadius: t.flags.cinema ? 0 : 10 }}></div>
      <div style={{ fontFamily: t.fb, fontSize: 26, color: d.fg2 }}>{label}</div>
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
    <Shell t={t} bg="day" chapter={chapter} chaptersTotal={chaptersTotal} origin="50% 40%">
      <DayHeader t={t} label={label} title={title} />
      <div style={{ position: 'absolute', left: 70, right: 70, top: 320, padding: '38px 42px', display: 'flex', flexDirection: 'column', gap: 26, ...boxBase }}>
        {items.map((it, i) => it.quote ? (
          <FadeIn key={i} delay={it.delay}>
            <div style={{
              fontFamily: t.fd, fontSize: 36, fontWeight: t.flags.pop ? 400 : 700, lineHeight: 1.6, padding: '24px 30px',
              ...card(t, !!(it.win && lt >= it.win[0] && lt < it.win[1])),
              borderLeft: undefined, opacity: 1,
              color: d.fg,
              transition: 'background 0.3s ease, border 0.3s ease',
            }}>
              {it.quote.map((l, j) => <React.Fragment key={j}>{j > 0 && <br />}{l}</React.Fragment>)}
            </div>
          </FadeIn>
        ) : (
          <FadeIn key={i} delay={it.delay}>
            <div style={{ fontFamily: t.fb, fontSize: 32, color: d.fg, lineHeight: 1.7 }}>{R(it.runs, t)}</div>
          </FadeIn>
        ))}
        {footer && (
          <FadeIn delay={footer.delay}>
            <div style={{ fontFamily: t.fb, fontSize: 26, color: d.fg3, borderTop: `1px dashed ${d.lineStrong || d.line}`, paddingTop: 20 }}>{footer.text}</div>
          </FadeIn>
        )}
      </div>
      {chart && (
        <FadeIn delay={4} style={{ position: 'absolute', left: 70, right: 70, top: 1030 }}>
          <div style={{ background: d.card, border: t.flags.pop ? '3px solid #111111' : `1px solid ${d.line}`, borderRadius: t.flags.cinema ? 2 : t.radius, padding: '34px 40px', boxShadow: t.flags.pop ? '6px 6px 0 #111111' : 'none' }}>
            <div style={{ fontFamily: t.fm, fontSize: 22, letterSpacing: 5, color: t.flags.pop ? '#111111' : t.tokens.iris, fontWeight: 700, marginBottom: 26 }}>
              {!t.flags.serif && !t.flags.cinema && <span style={{ color: t.signal }}>▸ </span>}{chart.label}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 100, alignItems: 'flex-end' }}>
              {chart.bars.map((b, i) => <Bar key={i} t={t} {...b} />)}
            </div>
          </div>
          {chart.conclusion && (
            <FadeIn delay={chart.conclusion.delay}>
              <div style={{ marginTop: 26, textAlign: 'center' }}>
                <div style={{ fontFamily: t.fd, fontSize: 36, fontWeight: t.flags.pop ? 400 : 700, color: t.flags.chalk || t.flags.cinema ? t.nightAccent : t.tokens.iris }}>{chart.conclusion.text}</div>
                <div style={{ width: 240, height: 3, background: t.sig || t.nightAccent, margin: '14px auto 0' }}></div>
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
      <div style={{ position: 'absolute', left: 70, right: 70, top: 420, display: 'flex', flexDirection: 'column', gap: 34 }}>
        {items.map((p) => {
          const active = lt >= p.win[0] && lt < p.win[1];
          return (
            <FadeIn key={p.n} delay={p.at} dy={32}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 36, padding: '40px 44px', ...card(t, active), transition: 'background 0.3s ease, border-color 0.3s ease' }}>
                <div style={{ fontFamily: t.fm, fontSize: 50, fontWeight: 700, color: t.flags.pop ? '#111111' : (active ? t.tokens.deep : t.tokens.iris), fontVariantNumeric: 'tabular-nums' }}>{p.n}</div>
                <div>
                  <div style={{ fontFamily: t.fd, fontSize: 44, fontWeight: t.flags.pop ? 400 : 700, color: d.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 1 : -0.5 }}>{p.title}</div>
                  <div style={{ fontFamily: t.fb, fontSize: 28, color: d.fg2, marginTop: 10, lineHeight: 1.6 }}>{p.sub}</div>
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
    <Shell t={t} bg="day" chapter={chapter} chaptersTotal={chaptersTotal} origin="50% 45%">
      <DayHeader t={t} label={label} title={title} />
      <div style={{ position: 'absolute', left: 70, right: 70, top: 380, display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => {
          const active = lt >= s.win[0] && lt < s.win[1];
          const arrowColor = active ? (t.flags.chalk || t.flags.cinema ? t.nightAccent : t.accent) : (d.lineStrong || d.line);
          return (
            <React.Fragment key={s.n}>
              {i > 0 && (
                <FadeIn delay={s.at} dy={0} style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: 3, height: 34, background: arrowColor, position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: -2, left: -7, borderTop: `14px solid ${arrowColor}`, borderLeft: '8.5px solid transparent', borderRight: '8.5px solid transparent' }}></div>
                  </div>
                </FadeIn>
              )}
              <FadeIn delay={s.at} dy={24}>
                <div style={{ padding: '30px 40px', display: 'flex', alignItems: 'center', gap: 32, boxSizing: 'border-box', ...card(t, active), transition: 'all 0.3s ease' }}>
                  <div style={{ fontFamily: t.fm, fontSize: 24, letterSpacing: 4, fontWeight: 700, color: t.flags.pop ? '#111111' : (active ? t.tokens.deep : t.tokens.iris), whiteSpace: 'nowrap' }}>
                    {active && !t.flags.serif && !t.flags.cinema && <span style={{ color: t.flags.pop ? '#111111' : t.signal }}>◉ </span>}{s.n}
                  </div>
                  <div>
                    <div style={{ fontFamily: t.fd, fontSize: 40, fontWeight: t.flags.pop ? 400 : 700, color: d.fg }}>{s.title}</div>
                    <div style={{ fontFamily: t.fb, fontSize: 26, color: d.fg2, marginTop: 6, lineHeight: 1.6 }}>{s.sub}</div>
                  </div>
                </div>
              </FadeIn>
            </React.Fragment>
          );
        })}
      </div>
      {note && (
        <FadeIn delay={note.delay} style={{ position: 'absolute', left: 70, right: 70, top: 1420, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: t.fd, fontSize: 34, fontWeight: t.flags.pop ? 400 : 700, color: t.flags.chalk || t.flags.cinema ? t.nightAccent : t.tokens.iris, textAlign: 'center', lineHeight: 1.6, opacity: lt >= note.win[0] && lt < note.win[1] ? 1 : 0.4, transition: 'opacity 0.4s ease' }}>
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
    <div style={{ padding: '34px 40px', boxSizing: 'border-box', ...card(t, false), opacity: 1, borderLeft: emph && !t.flags.pop && !t.flags.chalk && !t.flags.cinema ? `6px solid ${t.accent}` : undefined }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
        <div style={{ fontFamily: t.fm, fontSize: 22, letterSpacing: 5, color: t.flags.pop ? '#111111' : t.tokens.iris, fontWeight: 700 }}>
          {!t.flags.serif && !t.flags.cinema && <span style={{ color: t.signal }}>▸ </span>}{mono}
        </div>
        <div style={{ fontFamily: t.fd, fontSize: 42, fontWeight: t.flags.pop ? 400 : 700, color: d.fg }}>{title}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
        {items.map((it, i) => (
          <FadeIn key={i} delay={base + i * 1.2} dy={22}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 26px', ...card(t, emph), opacity: 1 }}>
              <span style={{ fontFamily: t.fm, fontSize: 26, fontWeight: 700, color: t.flags.pop ? '#111111' : (emph ? t.tokens.deep : t.tokens.iris) }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: t.fb, fontSize: 30, color: d.fg }}>{it}</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function RoleScene({ t, chapter, chaptersTotal, label, title, columns = [], conclusion }) {
  return (
    <Shell t={t} bg="day" chapter={chapter} chaptersTotal={chaptersTotal} origin="50% 40%">
      <DayHeader t={t} label={label} title={title} />
      <div style={{ position: 'absolute', left: 70, right: 70, top: 380, display: 'flex', flexDirection: 'column', gap: 40 }}>
        {columns.map((c, i) => <RoleList key={i} t={t} {...c} />)}
      </div>
      {conclusion && (
        <FadeIn delay={conclusion.delay} style={{ position: 'absolute', left: 70, right: 70, top: 1470, display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontFamily: t.fd, fontSize: 38, fontWeight: t.flags.pop ? 400 : 800, color: t.day.fg, textAlign: 'center', lineHeight: 1.6 }}>{R(conclusion.runs, t)}</div>
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
        <div style={{ position: 'absolute', top: '50%', left: 40, right: 40, transform: 'translateY(-50%)', textAlign: 'center' }}>
          <FadeIn delay={0.8} dy={16}>
            <div style={{ fontFamily: t.fd, fontSize: 32, color: '#111111', marginBottom: 40 }}>＼ きょうのまとめ ／</div>
          </FadeIn>
          <FadeIn delay={1.8} dy={30}>
            <div style={{ display: 'inline-block', background: '#FFFDF4', border: '4px solid #111111', borderRadius: 16, padding: '44px 50px', boxShadow: '10px 10px 0 #111111' }}>
              <div style={{ fontFamily: t.fd, fontSize: 58, color: '#111111', lineHeight: 1.8 }}>{line1}<br />{line2}</div>
            </div>
          </FadeIn>
        </div>
      </Shell>
    );
  }
  return (
    <Shell t={t} bg="night" origin="50% 50%" glow={t.night.glowB}>
      <div style={{ position: 'absolute', top: '50%', left: 70, right: 70, transform: 'translateY(-50%)', textAlign: 'center' }}>
        <FadeIn delay={0.8} dy={16}>
          <div style={{ fontFamily: t.fm, fontSize: 26, letterSpacing: 10, color: t.nightAccent || t.signal, fontWeight: 700, marginBottom: 60 }}>{t.flags.serif || t.flags.chalk ? '今日のひとこと' : (t.flags.cinema ? '' : '▸ KEY MESSAGE')}</div>
        </FadeIn>
        <FadeIn delay={1.8} dy={34}>
          <div style={{ fontFamily: t.fd, fontSize: 74, fontWeight: 800, color: t.night.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -1, lineHeight: 1.6 }}>{line1}</div>
        </FadeIn>
        <FadeIn delay={4.4} dy={34}>
          <NightAccentText t={t} style={{ fontFamily: t.fd, fontSize: 74, fontWeight: 800, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -1, lineHeight: 1.6, marginTop: 20 }}>{line2}</NightAccentText>
        </FadeIn>
        <div style={{ width: `${lineW * 300}px`, height: 2, background: t.nightAccent || '#1E5BE6', margin: '64px auto 0' }}></div>
      </div>
    </Shell>
  );
}

function Ending({ t, logoChar, name, tagline, disclaimer = [] }) {
  return (
    <Shell t={t} bg="night" origin="50% 45%">
      <div style={{ position: 'absolute', top: '42%', left: 70, right: 70, transform: 'translateY(-50%)', textAlign: 'center' }}>
        <FadeIn delay={0.8} dy={20}>
          <div style={{ width: 120, height: 120, margin: '0 auto 36px', borderRadius: t.flags.serif || t.flags.cinema ? '50%' : 24, border: `3px solid ${t.nightAccent || t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.fd, fontSize: 54, fontWeight: 700, color: t.nightAccent || '#8AD9FF' }}>{logoChar || '学'}</div>
        </FadeIn>
        <FadeIn delay={1.6} dy={20}>
          <div style={{ fontFamily: t.fd, fontSize: 56, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg }}>{name}</div>
        </FadeIn>
        <FadeIn delay={2.3} dy={14}>
          <div style={{ fontFamily: t.fm, fontSize: 21, letterSpacing: 8, color: t.night.fg2, marginTop: 20 }}>{tagline}</div>
        </FadeIn>
      </div>
      <FadeIn delay={3.4} style={{ position: 'absolute', left: 70, right: 70, bottom: 300, textAlign: 'center' }}>
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

window.ManabiyaVideoVertical = function ManabiyaVideoVertical(props) {
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
    <div data-video-root-v data-screen-label="藪医者の学舎 縦型動画" style={{ position: 'fixed', inset: 0, background: t.night.bg }}>
      <Stage width={1080} height={1920} duration={ep.duration} background={t.night.bg} fps={30}>
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
