# YH Portfolio — Vite + shadcn/ui

モック画像のレイアウトを、スクリーンショット貼り付けではなく **ReactコンポーネントとTailwind CSSで再構築**したポートフォリオです。

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui conventions
- Framer Motionによるスクロール、フロート、ホバーアニメーション
- ライトモード既定／ダークモード切り替え
- モバイル、タブレット、デスクトップ対応
- GitHub Pages用GitHub Actions
- 研究プロジェクトの静的詳細ページ3件
- ローカル画像アセットのみで動作

## Development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
npm run preview
```

## GitHub Pages

1. GitHubへこのフォルダの内容をpush
2. Repository **Settings → Pages** を開く
3. **Source: GitHub Actions** を選択
4. `main` ブランチへpush

`.github/workflows/deploy.yml` がリポジトリ名に応じたViteのbase pathを自動設定します。通常のProject Pagesと `username.github.io` のUser Pagesの両方に対応しています。

手動で本番ビルドする場合は、次のようにbase pathを指定できます。

```bash
VITE_BASE_PATH=/your-repository-name/ npm run build
```

User Pagesまたは独自ドメインのルートへ配置する場合:

```bash
VITE_BASE_PATH=/ npm run build
```

## Main files

- `src/App.tsx` — ページ構造、コンテンツ、アニメーション、コード描画のプロジェクトビジュアル
- `src/index.css` — カラートークン、ライト／ダークテーマ、共通スタイル
- `src/components/ui/` — shadcn/ui形式のButton、Badge、Card
- `public/assets/portfolio/` — ヒーロー／About用のローカル画像
- `public/projects/` — 各プロジェクトの詳細ページ
- `.github/workflows/deploy.yml` — GitHub Pagesデプロイ

## Before publishing

`src/App.tsx` 内の次の値を実データへ変更してください。

- `your-email@example.com`
- GitHub URL `https://github.com/yh-256`
- 自己紹介、サービス、プロジェクト説明

詳細ページの文言は `public/projects/*.html` から編集できます。
