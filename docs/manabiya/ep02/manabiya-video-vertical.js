// manabiya-video-vertical.js — manabiya-video-vertical.jsx を esbuild 0.28.2（jsx=transform）で変換したもの（2026-10-17）。編集は .jsx 側で行い、作り直す。
(function() {
  const { Stage, Sprite, useTime, useSprite, Easing, clamp } = window;
  const ROMAN_V = { "01": "I", "02": "II", "03": "III", "04": "IV", "05": "V" };
  function R(runs, t) {
    if (runs == null) return null;
    if (typeof runs === "string") return runs;
    return runs.map((r, i) => r.br ? /* @__PURE__ */ React.createElement("br", { key: i }) : /* @__PURE__ */ React.createElement("span", { key: i, style: { fontWeight: r.b ? 700 : "inherit", color: r.c ? t.tokens[r.c] || r.c : "inherit" } }, r.t));
  }
  function FadeIn({ delay = 0, dur = 0.7, dy = 26, style, children }) {
    const { localTime } = useSprite();
    const p = clamp((localTime - delay) / dur, 0, 1);
    const e = Easing.easeOutCubic(p);
    return /* @__PURE__ */ React.createElement("div", { style: { opacity: e, transform: `translateY(${(1 - e) * dy}px)`, ...style } }, children);
  }
  function TypeIn({ text, delay = 0, cps = 22, style }) {
    const { localTime } = useSprite();
    const n = Math.max(0, Math.floor((localTime - delay) * cps));
    return /* @__PURE__ */ React.createElement("div", { style }, text.slice(0, n));
  }
  function card(t, active) {
    const d = t.day;
    if (t.flags.pop) return { background: active ? "#FFD43A" : "#FFFFFF", border: "3px solid #111111", boxShadow: active ? "6px 6px 0 #111111" : "none", borderRadius: 12, opacity: active ? 1 : 0.45 };
    if (t.flags.chalk) return { background: active ? d.active : "transparent", border: active ? "3px solid #E8C468" : "3px dashed #54746A", borderRadius: 10, opacity: active ? 1 : 0.6 };
    if (t.flags.cinema) return { background: active ? d.active : "transparent", border: `1px solid ${active ? d.activeBorder : d.line}`, borderRadius: 2, opacity: active ? 1 : 0.45 };
    return { background: active ? d.active : d.tint, border: `1px solid ${active ? d.activeBorder : d.line}`, borderLeft: `8px solid ${active ? t.signal : t.accent}`, borderRadius: t.radius };
  }
  function Shell({ t, bg = "night", chapter = null, chaptersTotal = 4, origin = "50% 42%", glow = null, children }) {
    const { localTime, duration } = useSprite();
    const o = clamp(Math.min(localTime / 0.5, (duration - localTime) / 0.5, 1), 0, 1);
    const sc = 1;
    const s = t[bg];
    const chs = Array.from({ length: chaptersTotal }, (_, i) => i + 1);
    return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, opacity: o, background: s.bg, overflow: "hidden" } }, glow && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, backgroundImage: glow } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, transform: `scale(${sc})`, transformOrigin: origin } }, children), t.sig && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 6, background: t.sig } }), t.flags.pop && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 10, background: "#111111" } }), t.flags.chalk && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, border: "16px solid #6B4F35", pointerEvents: "none" } }), bg === "day" && chapter != null && !t.flags.cinema && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 70, right: 70, top: t.flags.chalk ? 36 : 40, display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 20, letterSpacing: 5, color: t.day.fg3, fontWeight: 700 } }, "MANABIYA"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8 } }, chs.map((i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { width: 48, height: 6, borderRadius: 3, background: i === chapter ? t.signal : t.day.line } })))));
  }
  function DayHeader({ t, label, title }) {
    return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 110, left: 70, right: 70 } }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.4, dy: 18 }, t.flags.chyron ? /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", background: "#030712", color: "#F5FAFF", fontFamily: t.fm, fontSize: 22, letterSpacing: 5, fontWeight: 700, padding: "7px 18px" } }, label) : /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 24, letterSpacing: 7, color: t.flags.pop ? "#111111" : t.accent, fontWeight: 700 } }, !t.flags.serif && !t.flags.cinema && /* @__PURE__ */ React.createElement("span", { style: { color: t.signal } }, "▸ "), label)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.7, dy: 22 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 54, fontWeight: t.flags.pop ? 400 : 700, color: t.day.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 1 : -1, marginTop: 12, lineHeight: 1.3, display: "inline-block", borderBottom: t.flags.chalk ? "3px dashed #E8C468" : "none", paddingBottom: t.flags.chalk ? 8 : 0 } }, title)));
  }
  function Captions({ t, captions, show }) {
    const time = useTime();
    if (show === false || !captions) return null;
    const c = captions.find((c2) => time >= c2[0] && time < c2[1]);
    if (!c) return null;
    const [t0, t1, text, theme] = c;
    const o = clamp(Math.min((time - t0) / 0.35, (t1 - time) / 0.35, 1), 0, 1);
    const day = theme === "d";
    if (t.flags.chyron) {
      return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, opacity: o, background: "#030712", padding: "24px 44px", display: "flex", alignItems: "center", gap: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 40, background: t.signal, flexShrink: 0 } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 36, lineHeight: 1.55, color: "#F5FAFF" } }, text));
    }
    if (t.flags.cinema) {
      return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 30, right: 30, bottom: 44, display: "flex", justifyContent: "center", opacity: o } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 28px", background: "rgba(10,10,10,0.78)", fontFamily: t.fd, fontSize: 34, lineHeight: 1.7, letterSpacing: 2, color: "#F5F1E8", textAlign: "center" } }, text));
    }
    if (t.flags.chalk) {
      return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 40, right: 40, bottom: 120, display: "flex", justifyContent: "center", opacity: o } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 36px", background: "rgba(10,26,22,0.72)", borderRadius: 10, fontFamily: t.fb, fontSize: 36, lineHeight: 1.6, color: "#F2EFE4" } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.signal, marginRight: 14 } }, "✎"), text));
    }
    if (t.flags.pop) {
      return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 40, right: 40, bottom: 120, display: "flex", justifyContent: "center", opacity: o } }, /* @__PURE__ */ React.createElement("div", { style: { padding: "18px 36px", background: "#FFFFFF", border: "3px solid #111111", borderRadius: 12, boxShadow: "5px 5px 0 #111111", fontFamily: t.fb, fontSize: 36, fontWeight: 700, lineHeight: 1.6, color: "#111111" } }, text));
    }
    return /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 40, right: 40, bottom: 120, display: "flex", justifyContent: "center", opacity: o } }, /* @__PURE__ */ React.createElement("div", { style: {
      maxWidth: 1e3,
      padding: "22px 40px",
      borderRadius: 12,
      fontFamily: t.fb,
      fontSize: 38,
      lineHeight: 1.6,
      background: day ? t.flags.serif ? "rgba(255,253,248,0.95)" : "rgba(255,255,255,0.94)" : t.flags.serif ? "rgba(46,42,36,0.92)" : "rgba(10,20,40,0.88)",
      border: `1px solid ${day ? t.day.line : t.night.line}`,
      color: day ? t.day.fg : t.night.fg,
      boxShadow: day ? "0 2px 8px rgba(0,0,0,0.06)" : "0 6px 24px rgba(0,0,0,0.55)"
    } }, /* @__PURE__ */ React.createElement("span", { style: { color: t.signal, fontFamily: t.fm, marginRight: 16 } }, "▸"), text));
  }
  function TimeStamp() {
    const time = useTime();
    const sec = Math.floor(time);
    React.useEffect(() => {
      const el = document.querySelector("[data-video-root-v]");
      if (el) el.setAttribute("data-screen-label", "藪医者の学舎 縦型動画 t=" + sec + "s");
    }, [sec]);
    return null;
  }
  function NightAccentText({ t, children, style }) {
    const s = t.gradText ? { background: t.gradText, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" } : { color: t.nightAccent };
    return /* @__PURE__ */ React.createElement("div", { style: { ...s, ...style } }, children);
  }
  function Opening({ t, kicker, ep, lead, title, sub, presenterIcon, presenterName }) {
    const { localTime: lt } = useSprite();
    const lineW = Easing.easeOutCubic(clamp((lt - 0.3) / 0.9, 0, 1));
    if (t.flags.chyron) {
      return /* @__PURE__ */ React.createElement(Shell, { t, bg: "day", origin: "50% 60%" }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 60, right: 70, display: "flex", alignItems: "center", gap: 12, border: `1px solid ${t.day.line}`, borderRadius: 999, padding: "10px 24px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 12, height: 12, borderRadius: "50%", background: t.signal } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 22, letterSpacing: 3, color: t.day.fg, fontWeight: 700 } }, ep)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 1.2, dy: 16, style: { position: "absolute", left: 70, bottom: 900 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 34, color: t.day.fg2 } }, lead)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 2.2, dy: 30, style: { position: "absolute", left: 0, right: 0, bottom: 480 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#030712", padding: "44px 70px", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 0, left: 0, bottom: 0, width: 12, background: "linear-gradient(180deg,#22D3EE,#1E5BE6)" } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 21, letterSpacing: 6, color: t.signal, marginBottom: 16 } }, kicker), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 84, fontWeight: 800, color: "#F5FAFF", letterSpacing: -1, lineHeight: 1.25 } }, title), /* @__PURE__ */ React.createElement(NightAccentText, { t, style: { fontFamily: t.fd, fontSize: 62, fontWeight: 800, letterSpacing: -1, lineHeight: 1.3, marginTop: 10 } }, sub)), /* @__PURE__ */ React.createElement("div", { style: { background: t.accent, padding: "16px 70px", display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 28, color: "#FFFFFF" } }, presenterName), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 21, letterSpacing: 3, color: "#DFF0FF" } }, "05:00"))));
    }
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "night", glow: t.night.glowA, origin: "40% 55%" }, t.flags.cinema && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: t.flags.placeholder, border: "1px dashed #3A382F", display: "flex", alignItems: "flex-start", justifyContent: "flex-end", padding: "190px 44px 0 0", boxSizing: "border-box" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 18, letterSpacing: 3, color: "#3F3C33", writingMode: "vertical-rl" } }, "実写素材枠（縦） — 診察室・勉強会の風景")), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: 70, left: 70, right: 70, display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement(TypeIn, { text: kicker || "▸ YABUISHA NO MANABIYA", delay: 1.1, style: { fontFamily: t.fm, fontSize: 26, letterSpacing: 8, color: t.flags.cinema || t.flags.chalk || t.flags.pop || t.flags.serif ? t.nightAccent : t.signal, fontWeight: 700 } }), /* @__PURE__ */ React.createElement(FadeIn, { delay: 1.8, dy: 10 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 22, letterSpacing: 5, color: t.night.fg3 } }, ep))), t.flags.pop && /* @__PURE__ */ React.createElement(FadeIn, { delay: 2, dy: 12, style: { position: "absolute", top: 200, right: 70, transform: "rotate(4deg)" } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#FFD43A", border: "3px solid #FFFDF4", color: "#111111", fontFamily: t.fd, fontSize: 30, padding: "10px 24px", borderRadius: 10, boxShadow: "5px 5px 0 rgba(255,253,244,0.35)" } }, "5分解説!")), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 70, right: 70, top: 620 } }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 2.5, dy: 20 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 38, color: t.night.fg2, marginBottom: 26 } }, lead)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 3.3, dy: 30 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 104, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -2, lineHeight: 1.25, textShadow: t.flags.cinema ? "0 2px 20px rgba(0,0,0,0.85)" : "none" } }, title)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 4.2, dy: 30 }, /* @__PURE__ */ React.createElement(NightAccentText, { t, style: { fontFamily: t.fd, fontSize: 76, fontWeight: t.flags.pop ? 400 : 800, letterSpacing: t.flags.serif || t.flags.cinema ? 2 : -1, lineHeight: 1.35, marginTop: 12, textShadow: t.flags.cinema ? "0 2px 20px rgba(0,0,0,0.85)" : "none" } }, sub)), /* @__PURE__ */ React.createElement("div", { style: { width: `${lineW * 460}px`, height: t.flags.cinema || t.flags.serif ? 2 : 3, background: t.sig || t.nightAccent, marginTop: 40 } })), /* @__PURE__ */ React.createElement(FadeIn, { delay: 5.6, dy: 16, style: { position: "absolute", left: 70, bottom: 260 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 62, height: 62, borderRadius: "50%", border: `2px solid ${t.nightAccent || t.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: t.fd, fontSize: 26, color: t.nightAccent || "#8AD9FF" } }, presenterIcon || "医"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 30, color: t.night.fg2 } }, presenterName))), t.flags.cinema ? /* @__PURE__ */ React.createElement(FadeIn, { delay: 5.6, dy: 0, style: { position: "absolute", right: 70, bottom: 260 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 18, color: "#5A564A" } }, "00:00:04:12")) : /* @__PURE__ */ React.createElement(FadeIn, { delay: 5.6, dy: 0, style: { position: "absolute", right: 70, bottom: 260 } }, /* @__PURE__ */ React.createElement("div", { style: { width: 40, height: 40, borderRight: `3px solid ${t.nightAccent || t.accent}`, borderBottom: `3px solid ${t.nightAccent || t.accent}` } })));
  }
  function Divider({ t, num, title, chaptersTotal = 4 }) {
    const active = parseInt(num, 10);
    const chs = Array.from({ length: chaptersTotal }, (_, i) => i + 1);
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "night", origin: "50% 50%" }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: 70, right: 70, transform: "translateY(-50%)", textAlign: "center" } }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.4, dy: 20 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 100, fontWeight: 700, color: t.nightAccent || t.accent } }, t.flags.cinema ? ROMAN_V[num] || num : num)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.8, dy: 24 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 62, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg, marginTop: 18, letterSpacing: t.flags.serif || t.flags.cinema ? 2 : -1, lineHeight: 1.4 } }, title)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 1.3, dy: 12 }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, justifyContent: "center", marginTop: 50 } }, chs.map((i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { width: 72, height: t.flags.cinema ? 2 : 8, borderRadius: 4, background: i === active ? t.nightAccent || t.signal : t.night.line } }))))));
  }
  function Bar({ t, delay, h, label, value, fill, border, valueColor, badge }) {
    const { localTime: lt } = useSprite();
    const p = Easing.easeOutCubic(clamp((lt - delay) / 0.9, 0, 1));
    const d = t.day;
    const fillMap = { tint: d.tint, frost: d.active };
    const borderMap = { lineStrong: d.lineStrong || d.line, ice: d.activeBorder };
    return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 12, height: 400, minWidth: 170 } }, /* @__PURE__ */ React.createElement("div", { style: { opacity: p, fontFamily: t.fd, fontSize: 44, fontWeight: t.flags.pop ? 400 : 800, color: t.tokens[valueColor] || valueColor || d.fg, fontVariantNumeric: "tabular-nums", display: "flex", alignItems: "center", gap: 10, whiteSpace: "nowrap" } }, value, badge && /* @__PURE__ */ React.createElement("span", { style: { fontFamily: t.fm, fontSize: 22, fontWeight: 700, color: t.flags.pop ? "#111111" : t.tokens.deep, background: t.flags.pop ? "#FFD43A" : "rgba(34,211,238,0.18)", border: t.flags.pop ? "2px solid #111111" : `1px solid ${t.signal}`, borderRadius: 999, padding: "4px 14px" } }, badge)), /* @__PURE__ */ React.createElement("div", { style: { width: 170, height: Math.max(4, h * 0.8 * p), background: fillMap[fill] || fill || d.tint, border: t.flags.pop ? "3px solid #111111" : `1px solid ${borderMap[border] || border || d.line}`, borderRadius: t.flags.cinema ? 0 : 10 } }), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 26, color: d.fg2 } }, label));
  }
  function CaseScene({ t, chapter, chaptersTotal, label, title, items = [], footer, chart }) {
    const { localTime: lt } = useSprite();
    const d = t.day;
    const boxBase = t.flags.pop ? { background: "#FFFFFF", border: "3px solid #111111", borderRadius: 12 } : t.flags.chalk ? { background: "transparent", border: "2px dashed #54746A", borderRadius: 10 } : t.flags.cinema ? { background: d.card, border: `1px solid ${d.line}`, borderRadius: 2 } : { background: d.tint, borderLeft: `6px solid ${t.accent}`, borderRadius: t.radius };
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "day", chapter, chaptersTotal, origin: "50% 40%" }, /* @__PURE__ */ React.createElement(DayHeader, { t, label, title }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 70, right: 70, top: 320, padding: "38px 42px", display: "flex", flexDirection: "column", gap: 26, ...boxBase } }, items.map((it, i) => it.quote ? /* @__PURE__ */ React.createElement(FadeIn, { key: i, delay: it.delay }, /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: t.fd,
      fontSize: 38,
      fontWeight: t.flags.pop ? 400 : 700,
      lineHeight: 1.6,
      padding: "24px 30px",
      ...card(t, !!(it.win && lt >= it.win[0] && lt < it.win[1])),
      /* 左アクセントバーは card() のまま活かす */
      opacity: 1,
      color: d.fg,
      transition: "background 0.3s ease, border 0.3s ease"
    } }, it.quote.map((l, j) => /* @__PURE__ */ React.createElement(React.Fragment, { key: j }, j > 0 && /* @__PURE__ */ React.createElement("br", null), l)))) : /* @__PURE__ */ React.createElement(FadeIn, { key: i, delay: it.delay }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 36, color: d.fg, lineHeight: 1.7 } }, R(it.runs, t)))), footer && /* @__PURE__ */ React.createElement(FadeIn, { delay: footer.delay }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 30, color: d.fg3, borderTop: `1px dashed ${d.lineStrong || d.line}`, paddingTop: 20 } }, footer.text))), chart && /* @__PURE__ */ React.createElement(FadeIn, { delay: 4, style: { position: "absolute", left: 70, right: 70, top: 1030 } }, /* @__PURE__ */ React.createElement("div", { style: { background: d.card, border: t.flags.pop ? "3px solid #111111" : `1px solid ${d.line}`, borderRadius: t.flags.cinema ? 2 : t.radius, padding: "34px 40px", boxShadow: t.flags.pop ? "6px 6px 0 #111111" : "none" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 22, letterSpacing: 5, color: t.flags.pop ? "#111111" : t.tokens.iris, fontWeight: 700, marginBottom: 26 } }, !t.flags.serif && !t.flags.cinema && /* @__PURE__ */ React.createElement("span", { style: { color: t.signal } }, "▸ "), chart.label), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 100, alignItems: "flex-end" } }, chart.bars.map((b, i) => /* @__PURE__ */ React.createElement(Bar, { key: i, t, ...b })))), chart.conclusion && /* @__PURE__ */ React.createElement(FadeIn, { delay: chart.conclusion.delay }, /* @__PURE__ */ React.createElement("div", { style: { marginTop: 26, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 36, fontWeight: t.flags.pop ? 400 : 700, color: t.flags.chalk || t.flags.cinema ? t.nightAccent : t.tokens.iris } }, chart.conclusion.text), /* @__PURE__ */ React.createElement("div", { style: { width: 240, height: 3, background: t.sig || t.nightAccent, margin: "14px auto 0" } })))));
  }
  function PointsScene({ t, chapter, chaptersTotal, label, title, items = [] }) {
    const { localTime: lt } = useSprite();
    const d = t.day;
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "day", chapter, chaptersTotal, origin: "50% 40%" }, /* @__PURE__ */ React.createElement(DayHeader, { t, label, title }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 70, right: 70, top: 420, display: "flex", flexDirection: "column", gap: 34 } }, items.map((p) => {
      const active = lt >= p.win[0] && lt < p.win[1];
      return /* @__PURE__ */ React.createElement(FadeIn, { key: p.n, delay: p.at, dy: 32 }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 36, padding: "40px 44px", ...card(t, active), transition: "background 0.3s ease, border-color 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 50, fontWeight: 700, color: t.flags.pop ? "#111111" : active ? t.tokens.deep : t.tokens.iris, fontVariantNumeric: "tabular-nums" } }, p.n), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 44, fontWeight: t.flags.pop ? 400 : 700, color: d.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 1 : -0.5 } }, p.title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 32, color: d.fg2, marginTop: 10, lineHeight: 1.6 } }, p.sub))));
    })));
  }
  function FlowScene({ t, chapter, chaptersTotal, label, title, steps = [], note }) {
    const { localTime: lt } = useSprite();
    const d = t.day;
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "day", chapter, chaptersTotal, origin: "50% 45%" }, /* @__PURE__ */ React.createElement(DayHeader, { t, label, title }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 70, right: 70, top: 380, display: "flex", flexDirection: "column" } }, steps.map((s, i) => {
      const active = lt >= s.win[0] && lt < s.win[1];
      const arrowColor = active ? t.flags.chalk || t.flags.cinema ? t.nightAccent : t.accent : d.lineStrong || d.line;
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: s.n }, i > 0 && /* @__PURE__ */ React.createElement(FadeIn, { delay: s.at, dy: 0, style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 3, height: 34, background: arrowColor, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: -2, left: -7, borderTop: `14px solid ${arrowColor}`, borderLeft: "8.5px solid transparent", borderRight: "8.5px solid transparent" } }))), /* @__PURE__ */ React.createElement(FadeIn, { delay: s.at, dy: 24 }, /* @__PURE__ */ React.createElement("div", { style: { padding: "30px 40px", display: "flex", alignItems: "center", gap: 32, boxSizing: "border-box", ...card(t, active), transition: "all 0.3s ease" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 24, letterSpacing: 4, fontWeight: 700, color: t.flags.pop ? "#111111" : active ? t.tokens.deep : t.tokens.iris, whiteSpace: "nowrap" } }, active && !t.flags.serif && !t.flags.cinema && /* @__PURE__ */ React.createElement("span", { style: { color: t.flags.pop ? "#111111" : t.signal } }, "◉ "), s.n), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 40, fontWeight: t.flags.pop ? 400 : 700, color: d.fg } }, s.title), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 30, color: d.fg2, marginTop: 6, lineHeight: 1.6 } }, s.sub)))));
    })), note && /* @__PURE__ */ React.createElement(FadeIn, { delay: note.delay, style: { position: "absolute", left: 70, right: 70, top: 1420, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 34, fontWeight: t.flags.pop ? 400 : 700, color: t.flags.chalk || t.flags.cinema ? t.nightAccent : t.tokens.iris, textAlign: "center", lineHeight: 1.6, opacity: lt >= note.win[0] && lt < note.win[1] ? 1 : 0.4, transition: "opacity 0.4s ease" } }, note.text)));
  }
  function RoleList({ t, mono, title, items, base, emph }) {
    const d = t.day;
    return /* @__PURE__ */ React.createElement("div", { style: { padding: "34px 40px", boxSizing: "border-box", ...card(t, false), opacity: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: 24 } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 22, letterSpacing: 5, color: t.flags.pop ? "#111111" : t.tokens.iris, fontWeight: 700 } }, !t.flags.serif && !t.flags.cinema && /* @__PURE__ */ React.createElement("span", { style: { color: t.signal } }, "▸ "), mono), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 42, fontWeight: t.flags.pop ? 400 : 700, color: d.fg } }, title)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14, marginTop: 24 } }, items.map((it, i) => /* @__PURE__ */ React.createElement(FadeIn, { key: i, delay: base + i * 1.2, dy: 22 }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20, padding: "20px 26px", ...card(t, emph), opacity: 1 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: t.fm, fontSize: 26, fontWeight: 700, color: t.flags.pop ? "#111111" : emph ? t.tokens.deep : t.tokens.iris } }, String(i + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: t.fb, fontSize: 34, color: d.fg } }, it))))));
  }
  function RoleScene({ t, chapter, chaptersTotal, label, title, columns = [], conclusion }) {
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "day", chapter, chaptersTotal, origin: "50% 40%" }, /* @__PURE__ */ React.createElement(DayHeader, { t, label, title }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 70, right: 70, top: 380, display: "flex", flexDirection: "column", gap: 40 } }, columns.map((c, i) => /* @__PURE__ */ React.createElement(RoleList, { key: i, t, ...c }))), conclusion && /* @__PURE__ */ React.createElement(FadeIn, { delay: conclusion.delay, style: { position: "absolute", left: 70, right: 70, top: 1470, display: "flex", justifyContent: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 38, fontWeight: t.flags.pop ? 400 : 800, color: t.day.fg, textAlign: "center", lineHeight: 1.6 } }, R(conclusion.runs, t))));
  }
  function KeyMessage({ t, line1, line2 }) {
    const { localTime: lt } = useSprite();
    const lineW = Easing.easeOutCubic(clamp((lt - 6.5) / 1, 0, 1));
    if (t.flags.pop) {
      return /* @__PURE__ */ React.createElement(Shell, { t, bg: "night", origin: "50% 50%" }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "#FFD43A" } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: 40, right: 40, transform: "translateY(-50%)", textAlign: "center" } }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.8, dy: 16 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 32, color: "#111111", marginBottom: 40 } }, "＼ きょうのまとめ ／")), /* @__PURE__ */ React.createElement(FadeIn, { delay: 1.8, dy: 30 }, /* @__PURE__ */ React.createElement("div", { style: { display: "inline-block", background: "#FFFDF4", border: "4px solid #111111", borderRadius: 16, padding: "44px 50px", boxShadow: "10px 10px 0 #111111" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 58, color: "#111111", lineHeight: 1.8 } }, line1, /* @__PURE__ */ React.createElement("br", null), line2)))));
    }
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "night", origin: "50% 50%", glow: t.night.glowB }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "50%", left: 70, right: 70, transform: "translateY(-50%)", textAlign: "center" } }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.8, dy: 16 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 26, letterSpacing: 10, color: t.nightAccent || t.signal, fontWeight: 700, marginBottom: 60 } }, t.flags.serif || t.flags.chalk ? "今日のひとこと" : t.flags.cinema ? "" : "▸ KEY MESSAGE")), /* @__PURE__ */ React.createElement(FadeIn, { delay: 1.8, dy: 34 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 74, fontWeight: 800, color: t.night.fg, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -1, lineHeight: 1.6 } }, line1)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 4.4, dy: 34 }, /* @__PURE__ */ React.createElement(NightAccentText, { t, style: { fontFamily: t.fd, fontSize: 74, fontWeight: 800, letterSpacing: t.flags.serif || t.flags.cinema ? 3 : -1, lineHeight: 1.6, marginTop: 20 } }, line2)), /* @__PURE__ */ React.createElement("div", { style: { width: `${lineW * 300}px`, height: 2, background: t.nightAccent || "#1E5BE6", margin: "64px auto 0" } })));
  }
  function Ending({ t, logoChar, name, tagline, disclaimer = [] }) {
    return /* @__PURE__ */ React.createElement(Shell, { t, bg: "night", origin: "50% 45%" }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "42%", left: 70, right: 70, transform: "translateY(-50%)", textAlign: "center" } }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.8, dy: 20 }, /* @__PURE__ */ React.createElement("div", { style: { width: 120, height: 120, margin: "0 auto 36px", borderRadius: t.flags.serif || t.flags.cinema ? "50%" : 24, border: `3px solid ${t.nightAccent || t.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: t.fd, fontSize: 54, fontWeight: 700, color: t.nightAccent || "#8AD9FF" } }, logoChar || "学")), /* @__PURE__ */ React.createElement(FadeIn, { delay: 1.6, dy: 20 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fd, fontSize: 56, fontWeight: t.flags.pop ? 400 : 800, color: t.night.fg } }, name)), /* @__PURE__ */ React.createElement(FadeIn, { delay: 2.3, dy: 14 }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fm, fontSize: 21, letterSpacing: 8, color: t.night.fg2, marginTop: 20 } }, tagline))), /* @__PURE__ */ React.createElement(FadeIn, { delay: 3.4, style: { position: "absolute", left: 70, right: 70, bottom: 300, textAlign: "center" } }, /* @__PURE__ */ React.createElement("div", { style: { fontFamily: t.fb, fontSize: 24, color: t.night.fg3, lineHeight: 2 } }, disclaimer.map((l, i) => /* @__PURE__ */ React.createElement(React.Fragment, { key: i }, i > 0 && /* @__PURE__ */ React.createElement("br", null), l)))));
  }
  const SCENE_TYPES = {
    opening: Opening,
    divider: Divider,
    case: CaseScene,
    points: PointsScene,
    flow: FlowScene,
    roles: RoleScene,
    keymessage: KeyMessage,
    ending: Ending
  };
  window.ManabiyaVideoVertical = function ManabiyaVideoVertical(props) {
    const epId = props.episodeId || "ep01";
    const ep = props.episode || (window.MANABIYA_EPISODES || {})[epId];
    const themes = window.MANABIYA_THEMES || {};
    const t = themes[props.theme] || themes.duotone;
    React.useEffect(() => {
      const ts = [300, 900, 2e3].map((ms) => setTimeout(() => window.dispatchEvent(new Event("resize")), ms));
      return () => ts.forEach(clearTimeout);
    }, []);
    if (!ep || !t) {
      return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "#030712", color: "#8AA0C2", fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, letterSpacing: 2 } }, !ep ? `EPISODE NOT FOUND: ${epId}` : "THEMES NOT LOADED", " — 読み込みスクリプトを確認してください");
    }
    const showCaps = props.showCaptions !== false;
    return /* @__PURE__ */ React.createElement("div", { "data-video-root-v": true, "data-screen-label": "藪医者の学舎 縦型動画", style: { position: "fixed", inset: 0, background: t.night.bg } }, /* @__PURE__ */ React.createElement(Stage, { width: 1080, height: 1920, duration: ep.duration, background: t.night.bg, fps: 30 }, ep.scenes.map((s, i) => {
      const Scene = SCENE_TYPES[s.type];
      if (!Scene) return null;
      return /* @__PURE__ */ React.createElement(Sprite, { key: i, start: s.start, end: s.end }, /* @__PURE__ */ React.createElement(Scene, { ...s.props, t, chaptersTotal: ep.chaptersTotal || 4 }));
    }), /* @__PURE__ */ React.createElement(Sprite, { start: 0, end: ep.duration, keepMounted: true }, /* @__PURE__ */ React.createElement(Captions, { t, captions: ep.captions, show: showCaps }), /* @__PURE__ */ React.createElement(TimeStamp, null))));
  };
})();
