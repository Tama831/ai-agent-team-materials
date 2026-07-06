// ============================================================
// 藪医者の学舎 — 動画テーマ定義（横型・縦型エンジン共用）
// ------------------------------------------------------------
// theme プロップ: duotone / broadcast / paper / chalk / pop / cinema
// トークンを差し替えるだけで見た目が全部変わる。原則、編集しない。
// ============================================================

(function () {
  const GOTHIC = "'Zen Kaku Gothic New','Hiragino Sans','Noto Sans JP',sans-serif";
  const SYSTEM = "-apple-system,'Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP',sans-serif";
  const MONO = "'JetBrains Mono','SF Mono',monospace";
  const MINCHO = "'Shippori Mincho','Hiragino Mincho ProN','Yu Mincho',serif";

  const NF_NIGHT = {
    bg: '#030712', fg: '#F5FAFF', fg2: '#8AA0C2', fg3: '#4A5C7A',
    line: '#1B2A47', card: '#0E1B33',
    glowA: 'radial-gradient(ellipse at 18% 8%, rgba(30,91,230,0.22) 0%, transparent 55%)',
    glowB: 'radial-gradient(ellipse at 80% 90%, rgba(34,211,238,0.08) 0%, transparent 60%)',
  };
  const NF_DAY = {
    bg: '#FFFFFF', fg: '#030712', fg2: '#4A5568', fg3: '#8A94A6',
    line: '#E4ECF5', lineStrong: '#C9D6E6', tint: '#F5F8FC', card: '#FFFFFF',
    active: '#DFF0FF', activeBorder: '#8AD9FF',
  };
  const NF_TOKENS = { iris: '#1E5BE6', deep: '#0B2B6B', signal: '#22D3EE', voidc: '#030712', fg2: '#4A5568', fg3: '#8A94A6' };

  window.MANABIYA_THEMES = {
    // 1c — Neo Futura Duotone（既定・ブランド標準）
    duotone: {
      label: 'Neo Futura Duotone',
      fd: GOTHIC, fb: SYSTEM, fm: MONO,
      accent: '#1E5BE6', signal: '#22D3EE',
      sig: 'linear-gradient(90deg,#22D3EE 0%,#1E5BE6 60%,transparent 100%)',
      gradText: 'linear-gradient(90deg,#1E5BE6,#22D3EE)',
      nightAccent: null,
      night: NF_NIGHT, day: NF_DAY, tokens: NF_TOKENS,
      radius: 12, flags: {},
    },
    // 2d — 放送局のローワーサード（Neo Futuraトークン＋報道帯文法）
    broadcast: {
      label: 'Broadcast',
      fd: GOTHIC, fb: SYSTEM, fm: MONO,
      accent: '#1E5BE6', signal: '#22D3EE',
      sig: 'linear-gradient(90deg,#22D3EE 0%,#1E5BE6 60%,transparent 100%)',
      gradText: 'linear-gradient(90deg,#1E5BE6,#22D3EE)',
      nightAccent: null,
      night: NF_NIGHT, day: NF_DAY, tokens: NF_TOKENS,
      radius: 8, flags: { chyron: true },
    },
    // 3a — 温かい紙と明朝
    paper: {
      label: 'Warm Paper',
      fd: MINCHO, fb: SYSTEM, fm: MINCHO,
      accent: '#C4633A', signal: '#C4633A',
      sig: null, gradText: null, nightAccent: '#E09B72',
      night: { bg: '#2E2A24', fg: '#F7F2E8', fg2: '#B8A98C', fg3: '#8A7C64', line: '#4A4438', card: '#3A342B' },
      day: { bg: '#F7F2E8', fg: '#2E2A24', fg2: '#6B5F4D', fg3: '#A08967', line: '#E5DCCB', lineStrong: '#D8C7AC', tint: '#FFFDF8', card: '#FFFDF8', active: '#FBEFE5', activeBorder: '#DBA987' },
      tokens: { iris: '#C4633A', deep: '#8A4623', signal: '#C4633A', voidc: '#2E2A24', fg2: '#6B5F4D', fg3: '#A08967' },
      radius: 8, flags: { serif: true },
    },
    // 3b — 放課後の黒板
    chalk: {
      label: 'Chalkboard',
      fd: GOTHIC, fb: GOTHIC, fm: "'Yomogi','Zen Kaku Gothic New',cursive",
      accent: '#E8C468', signal: '#E8C468',
      sig: null, gradText: null, nightAccent: '#E8C468',
      night: { bg: '#22433B', fg: '#F2EFE4', fg2: '#C9D6C4', fg3: '#8FA697', line: '#3B5A50', card: 'rgba(242,239,228,0.05)' },
      day: { bg: '#22433B', fg: '#F2EFE4', fg2: '#C9D6C4', fg3: '#8FA697', line: '#54746A', lineStrong: '#8FA697', tint: 'rgba(242,239,228,0.04)', card: 'rgba(242,239,228,0.04)', active: 'rgba(232,196,104,0.10)', activeBorder: '#E8C468' },
      tokens: { iris: '#E8C468', deep: '#E8C468', signal: '#E8C468', voidc: '#F2EFE4', fg2: '#C9D6C4', fg3: '#8FA697' },
      radius: 8, flags: { chalk: true, frame: '#6B4F35' },
    },
    // 3c — 太枠とマーカー
    pop: {
      label: 'Bold Pop',
      fd: "'Mochiy Pop One','Zen Kaku Gothic New',sans-serif", fb: GOTHIC, fm: "'Mochiy Pop One',sans-serif",
      accent: '#111111', signal: '#FFD43A',
      sig: null, gradText: null, nightAccent: '#FFD43A',
      night: { bg: '#111111', fg: '#FFFDF4', fg2: '#D8D4C4', fg3: '#8A8778', line: '#3A3830', card: '#1E1D18' },
      day: { bg: '#FFFDF4', fg: '#111111', fg2: '#4A4840', fg3: '#8A8778', line: '#111111', lineStrong: '#111111', tint: '#FFFFFF', card: '#FFFFFF', active: '#FFD43A', activeBorder: '#111111' },
      tokens: { iris: '#111111', deep: '#111111', signal: '#FFD43A', voidc: '#111111', fg2: '#4A4840', fg3: '#8A8778' },
      radius: 10, flags: { pop: true },
    },
    // 4a — ドキュメンタリー映画
    cinema: {
      label: 'Cinema',
      fd: MINCHO, fb: MINCHO, fm: MONO,
      accent: '#C8A96A', signal: '#C8A96A',
      sig: null, gradText: null, nightAccent: '#C8A96A',
      night: { bg: '#0A0A0A', fg: '#F5F1E8', fg2: '#B8B2A2', fg3: '#5A564A', line: '#3A382F', card: '#1C1B18' },
      day: { bg: '#0A0A0A', fg: '#F5F1E8', fg2: '#B8B2A2', fg3: '#5A564A', line: '#3A382F', lineStrong: '#3A382F', tint: '#14130F', card: '#1C1B18', active: '#26241D', activeBorder: '#C8A96A' },
      tokens: { iris: '#C8A96A', deep: '#C8A96A', signal: '#C8A96A', voidc: '#F5F1E8', fg2: '#B8B2A2', fg3: '#5A564A' },
      radius: 2, flags: { cinema: true, placeholder: '#1C1B18' },
    },
  };
})();
