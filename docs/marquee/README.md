# 電光 — Marquee

> 入院中、書き置きを残したいのに手元にPCしかない…そんな時、これが欲しくなったんです。

iPhone・Android・Mac のホーム画面 (またはデスクトップ) に追加して、フルスクリーンの電光掲示板として使えます。

**Live demo** → <https://tama831.github.io/denko-marquee/>

## ⚠️ 使う前にひとつだけ

PC もスマホも、電光掲示板として表示している間は**画面ロックがかかりません**。席を立っている間に通りすがりの人がメッセージを書き換えたり閉じたりできてしまうので、人目のある場所に置いて離れるときはご注意ください 🙏

## 特徴

- **クラシックモード** (デフォルト): 横にスクロールする昔ながらの電光看板。CSS の text-shadow で柔らかい電光のオーラを再現
- **ドット LED モード**: 駅のホームにあるような本物のドットマトリクス LED 看板。各ドットが ON/OFF でメッセージを象る
- **8 色のパレット** (電光青 / 白氷 / シアン / 藍夜 / 紫電 / 珊瑚 / 琥珀 / 若葉)
- **速度・サイズ・グロー強度** を細かく調整
- 設定は端末の localStorage に保存され、次回起動時に復元
- **オフライン動作** (Service Worker でキャッシュ済)
- 完全にローカル動作、外部通信なし (Google Fonts のロード以外)

## 使い方

### iPhone (Safari)

1. <https://tama831.github.io/denko-marquee/> を Safari で開く
2. 共有ボタン → **ホーム画面に追加**
3. ホーム画面の「電光」アイコンから起動 → 全画面表示

### Android (Chrome / Edge)

1. <https://tama831.github.io/denko-marquee/> を Chrome で開く
2. メニュー → **ホーム画面に追加** / **アプリをインストール**
3. ホーム画面の「電光」アイコンから起動

### Mac / PC (Chrome / Edge)

1. <https://tama831.github.io/denko-marquee/> を開く
2. アドレスバー右端のインストールアイコン → **インストール**
3. アプリとして単独ウィンドウで開く

## 設定

画面のどこかをタップ (またはクリック) すると設定パネルが開きます。

| 項目 | 説明 |
|---|---|
| メッセージ | 流したい文字 (最大 200 字、絵文字は反映されません) |
| モード | クラシック / ドット LED |
| 速度 | 左右スクロールの速さ |
| 大きさ | ドット格子の粗さ (= LED の解像度) |
| 方向 | 左 / 右 / 静止 |
| 電光カラー | 8 色のパレット |
| グロー強度 | 控えめ / 標準 / 眩しい |

## 技術メモ

- 純粋な HTML / CSS / Vanilla JS、ビルド不要
- ドット LED は `<canvas>` でドット格子を描画。メッセージは別 canvas
  に bitmap として描画し、各ドットの中心点に対応するピクセル輝度で
  ON/OFF を判定 (`getImageData` 1 回 → tick 中は配列 lookup だけで軽い)
- 30fps スロットル + Retina dpr 上限 1.5 で iPhone でも熱を持たない設計
- Service Worker は cache-first ではなく **network-first** (オンライン時は
  最新版を取りに行き、オフライン時のみキャッシュ fallback)

## ライセンス

[MIT License](LICENSE) — Copyright (c) 2026 Tama831

## 謝辞

- フォント: [DotGothic16](https://fonts.google.com/specimen/DotGothic16),
  [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P),
  [VT323](https://fonts.google.com/specimen/VT323) (Google Fonts)
- 開発支援: [Claude Code](https://claude.com/claude-code) (Anthropic)
