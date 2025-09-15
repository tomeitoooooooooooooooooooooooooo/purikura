# Mobile Responsiveness Implementation

このドキュメントでは、駒澤大学高等学校写真部のウェブサイトに実装されたモバイル対応について説明します。

## 概要

既存のHTMLとCSSファイルを変更することなく、モバイルデバイス専用のCSSファイルを作成し、JavaScript自動検出システムを使用してモバイル対応を実現しました。

## ファイル構成

### モバイル専用CSSファイル
- `mobile-index.css` - トップページ用モバイルCSS
- `mobile-about.css` - About usページ用モバイルCSS
- `mobile-price.css` - Priceページ用モバイルCSS
- `mobile-book.css` - Bookページ用モバイルCSS
- `mobile-news.css` - Newsページ用モバイルCSS
- `mobile-ourworks.css` - Our worksページ用モバイルCSS

### 自動検出システム
- `mobile-loader.js` - モバイルデバイス検出とCSS読み込み自動化スクリプト

## 機能

### 1. 自動モバイル検出
- ユーザーエージェント検出
- 画面幅検出（768px以下）
- タッチデバイス検出
- これらの条件のいずれかを満たす場合、モバイルとして認識

### 2. 動的CSS読み込み
- 現在のページに応じて適切なモバイルCSSを自動読み込み
- 既存のデスクトップCSSを上書きせず、追加で適用

### 3. レスポンシブ最適化
- **ナビゲーション**: コンパクトなモバイル表示
- **レイアウト**: 縦並び配置への自動変更
- **画像**: モバイル画面に最適化されたサイズ
- **テキスト**: 読みやすい文字サイズに調整
- **ボタン**: タッチ操作に適した大きさ

### 4. 画面向き対応
- 縦向き（Portrait）
- 横向き（Landscape）
- タブレット向け調整

## 実装されたモバイル最適化

### レイアウト調整
```css
/* デスクトップ: 横並び → モバイル: 縦並び */
flex-direction: column;

/* 画面幅に合わせたコンテナサイズ */
width: calc(100vw - 30px);
max-width: 400px;
```

### タイポグラフィ最適化
```css
/* モバイル向け文字サイズ調整 */
.title-1 { font-size: 50px; }  /* デスクトップ: 90px */
.title-2 { font-size: 55px; }  /* デスクトップ: 100px */
```

### タッチ操作最適化
```css
/* 最小タッチターゲットサイズ（44px以上） */
min-height: 44px;
display: flex;
align-items: center;
justify-content: center;
```

## 使用方法

### 自動適用
モバイルデバイスでサイトにアクセスすると、自動的にモバイル専用CSSが適用されます。追加の設定は不要です。

### 手動制御（開発者向け）
```javascript
// モバイル検出
if (window.MobileCSS.isMobile()) {
    console.log('モバイルデバイスです');
}

// 手動でモバイルCSS読み込み
window.MobileCSS.loadCSS();

// 初期化の再実行
window.MobileCSS.init();
```

## ブレークポイント

### 画面サイズ別対応
- **スマートフォン（縦）**: 〜480px
- **スマートフォン（横）・小型タブレット**: 481px〜768px
- **タブレット（縦）**: 768px〜1024px

### メディアクエリ
```css
/* 基本モバイル対応 */
@media screen and (max-width: 768px) { ... }

/* 超小型画面 */
@media screen and (max-width: 480px) { ... }

/* 横向き調整 */
@media screen and (max-width: 768px) and (orientation: landscape) { ... }
```

## パフォーマンス最適化

### 1. 条件付き読み込み
モバイルデバイスでのみCSS読み込みを行い、デスクトップでの不要な読み込みを防止

### 2. 効果の無効化
```css
/* モバイルでの重いエフェクト無効化 */
.card__shine,
.card__glow {
    display: none;
}
```

### 3. パッシブイベントリスナー
```javascript
// スムーズなスクロールのための最適化
document.addEventListener('touchstart', function() {}, {passive: true});
```

## トラブルシューティング

### CSS適用されない場合
1. ブラウザの開発者ツールでJavaScriptエラーを確認
2. ネットワークタブでCSSファイルの読み込み状況を確認
3. コンソールで `window.MobileCSS.isMobile()` の結果を確認

### レイアウト崩れの場合
1. 画面幅を768px以下に設定してテスト
2. デバイスエミュレーションモードでテスト
3. 実機での確認

## カスタマイズ

### 新しいページの追加
1. 新しいページ用のモバイルCSSファイルを作成
2. `mobile-loader.js` の `mobileCSS` オブジェクトに追加
3. HTMLファイルに `mobile-loader.js` を読み込み

### スタイル調整
各ページの `mobile-*.css` ファイルを編集してスタイルをカスタマイズできます。

## ブラウザサポート

- **iOS Safari**: 9.0+
- **Android Chrome**: 4.4+
- **Firefox Mobile**: 最新版
- **Edge Mobile**: 最新版

## 備考

- 既存のデスクトップCSSは一切変更されていません
- モバイル専用CSSは既存スタイルを上書きする形で適用されます
- JavaScript無効環境では基本的なレスポンシブ対応のみ動作します
- すべてのモバイルCSSファイルは独立しており、個別に編集可能です

## 更新履歴

- **2025-09-15**: 初回実装完了
  - 全ページのモバイル対応CSS作成
  - 自動検出システム実装
  - パフォーマンス最適化実装