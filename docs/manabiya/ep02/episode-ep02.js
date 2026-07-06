// ============================================================
// 藪医者の学舎 — EP.02「お薬を減らす — ポリファーマシーとの向き合い方」
// 全8シーンタイプのカバレッジ試運転 (opening/divider/case/points/flow/roles/keymessage/ending)
// 約137秒。横型: player.html / 縦型: player.html?mode=vertical
// ============================================================

window.MANABIYA_EPISODES = window.MANABIYA_EPISODES || {};

window.MANABIYA_EPISODES['ep02'] = {
  duration: 137,
  chaptersTotal: 3,

  // ---- ナレーションテロップ [開始秒, 終了秒, 本文, n=夜 d=昼] ----
  captions: [
    [0.6, 7, 'こんにちは、家庭医のたまです。今日は…お薬を"減らす"という話を、一緒に考えてみましょう', 'n'],
    [9, 13.5, 'まずは、ある高齢者の処方箋から', 'n'],
    [15, 22, '85歳のBさん。5つの医療機関から、あわせて8種類のお薬が出ていました', 'd'],
    [23, 30, '最近ふらつく、と娘さん。転ぶのが、心配だと…', 'd'],
    [31, 39, 'どの薬にも理由はある。でも「全部で8つ」を見た人は、いなかったのかもしれない', 'd'],
    [41, 45.5, '多剤併用が、なぜ気になるのだろうか', 'n'],
    [47, 53, '一つ目。転倒やふらつきが増える。特に、眠剤や降圧薬が重なると', 'd'],
    [53, 60, '二つ目。薬どうしが、思わぬ相互作用を起こす', 'd'],
    [60, 67, '三つ目。数が多いほど、飲み忘れ・飲み間違いが増える', 'd'],
    [69, 73.5, 'では、減薬のながれを組み立ててみます', 'n'],
    [75, 82, 'ステップ1。まずは全部を、一枚に書き出す。棚卸しから', 'd'],
    [82, 89, 'ステップ2。優先順位をつける。ハイリスクな薬・目的が曖昧な薬から', 'd'],
    [89, 96, 'ステップ3。一度に1剤ずつ、ゆっくり中止する', 'd'],
    [96, 100, 'ステップ4。やめたあとを、必ず観察する', 'd'],
    [101, 108, '見わけ方は、こう整理できます', 'd'],
    [108, 116, '続けたい薬は、明確な目的があり、やめると困るもの', 'd'],
    [116, 123.5, '見直す薬は、目的が曖昧・重複・害が益を上回るかもしれないもの', 'd'],
    [125, 130.5, '足し算の医療から、引き算の医療へ…', 'n'],
    [132, 136, '藪医者の学舎でした。それでは、また', 'n'],
  ],

  scenes: [
    {
      type: 'opening', start: 0, end: 8,
      props: {
        kicker: '▸ YABUISHA NO MANABIYA',
        ep: 'EP.02 / 02:17',
        lead: '家庭医のための解説',
        title: 'お薬を減らす',
        sub: 'ポリファーマシーとの向き合い方',
        presenterIcon: '医',
        presenterName: 'たまさん・家庭医',
      },
    },
    { type: 'divider', start: 8, end: 14, props: { num: '01', title: 'ある処方の風景' } },
    {
      type: 'case', start: 14, end: 40,
      props: {
        chapter: 1,
        label: '01 / CASE',
        title: '8種類のお薬',
        items: [
          { delay: 1, runs: [{ t: '85歳のBさん。' }, { t: '5つの医療機関', b: 1, c: 'deep' }, { t: 'から通院しています' }] },
          { delay: 4, runs: [{ t: '処方は、あわせて' }, { t: '8種類', b: 1, c: 'iris' }, { t: 'に' }] },
          { delay: 8, runs: [{ t: '最近ふらつく、と娘さん。' }, { t: '転倒', b: 1, c: 'deep' }, { t: 'が心配だと…' }] },
          { delay: 13, quote: ['「どの薬にも理由はある。', 'でも全部で8つを見た人は…」'], win: [13, 26] },
        ],
        footer: { delay: 22, text: '足し算はできても、引き算は誰の仕事だろうか' },
        chart: {
          label: 'MEDS',
          bars: [
            { delay: 4, h: 340, label: '現在', value: '8剤', fill: 'tint', border: 'lineStrong', valueColor: 'deep' },
            { delay: 9, h: 160, label: '目標', value: '見直し', fill: 'frost', border: 'ice', valueColor: 'deep', badge: '↓' },
          ],
          conclusion: { delay: 18, text: 'まず"全体"を一人が診る' },
        },
      },
    },
    { type: 'divider', start: 40, end: 46, props: { num: '02', title: '多剤併用の3つのリスク' } },
    {
      type: 'points', start: 46, end: 68,
      props: {
        chapter: 2,
        label: '02 / POINTS',
        title: '多剤併用の3つのリスク',
        items: [
          { n: '01', title: '転倒・ふらつき', sub: '眠剤・降圧薬などが重なると増える', at: 1, win: [1, 7] },
          { n: '02', title: '相互作用', sub: '薬どうしが思わぬ反応を起こす', at: 7, win: [7, 14] },
          { n: '03', title: '飲み間違い', sub: '数が多いほどアドヒアランスが下がる', at: 14, win: [14, 22] },
        ],
      },
    },
    { type: 'divider', start: 68, end: 74, props: { num: '03', title: '減薬のながれ' } },
    {
      type: 'flow', start: 74, end: 100,
      props: {
        chapter: 3,
        label: '03 / FLOW',
        title: '減薬のながれ',
        steps: [
          { n: 'STEP 1', title: '棚卸し', sub: '全部を一枚に書き出す', at: 1.0, win: [1, 8] },
          { n: 'STEP 2', title: '優先順位', sub: 'ハイリスク・目的が曖昧な薬から', at: 1.7, win: [8, 15] },
          { n: 'STEP 3', title: '1剤ずつ中止', sub: '一度に1つ、ゆっくりと', at: 2.4, win: [15, 22] },
          { n: 'STEP 4', title: '観察', sub: 'やめたあとを必ず見る', at: 3.1, win: [22, 26] },
        ],
        note: { delay: 15, win: [15, 22], text: '一度に減らさない — 何が効いたか分からなくなる' },
      },
    },
    {
      type: 'roles', start: 100, end: 124,
      props: {
        chapter: 3,
        label: '03 / ROLES',
        title: '続けたい薬・見直す薬',
        columns: [
          { mono: 'KEEP', title: '続けたい薬', base: 1.5, emph: false, items: ['明確な目的がある', 'やめると困る', '益が害を上回る'] },
          { mono: 'REVIEW', title: '見直す薬', base: 10, emph: true, items: ['目的が曖昧', '重複している', '害が益を上回るかも'] },
        ],
        conclusion: { delay: 20, runs: [{ t: '迷ったら、' }, { t: '目的に立ち返る', c: 'iris' }] },
      },
    },
    {
      type: 'keymessage', start: 124, end: 131,
      props: { line1: '足し算の医療から、', line2: '引き算の医療へ。' },
    },
    {
      type: 'ending', start: 131, end: 137,
      props: {
        logoChar: '学',
        name: '藪医者の学舎',
        tagline: 'MANABIYA / PRINCIPLE OF INTEGRITY',
        disclaimer: [
          'この動画は医療アドバイスではありません。お薬の減量・中止は自己判断せず、必ず主治医にご相談ください。',
          'この動画の作成にはAIアシスタント（Claude）を活用しています。最終的な内容の責任は著者にあります。',
        ],
      },
    },
  ],
};
