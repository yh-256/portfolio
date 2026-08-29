# YH Portfolio

AI / Machine Learning領域の研究・開発実績をまとめた個人ポートフォリオです。

映像理解、マルチモーダルAI、RAG・検索技術を中心に、問題設定、実装、GPU推論、評価・分析まで一貫して取り組んだプロジェクトを掲載しています。

## Featured Work

- Agentic Video QA
- Laparoscopic Frame Search
- Anomaly Anticipation with Synthetic Video

## Portfolio structure

トップページでは、採用・長期インターン応募時に短時間で人物像と実績を把握できるよう、以下の情報をまとめています。

- Profile / current focus
- Selected work
- Research experience
- Publications & presentations
- Skills
- About
- Contact

各研究プロジェクトには、研究概要だけでなくProblem / My Contribution / ResultまたはStatusを掲載しています。

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GitHub Pages

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

## Deployment

GitHub Pagesで公開しています。`.github/workflows/deploy.yml` がリポジトリ名に応じたViteのbase pathを設定してビルド・デプロイします。

```bash
VITE_BASE_PATH=/your-repository-name/ npm run build
```

User Pagesまたは独自ドメインのルートへ配置する場合:

```bash
VITE_BASE_PATH=/ npm run build
```

## Main files

- `src/App.tsx` — ページ構造と各セクション
- `src/data/portfolio.ts` — プロフィール、プロジェクト、経験、発表、スキルの表示データ
- `src/index.css` — 共通スタイルとテーマ
- `public/projects/` — 各研究プロジェクトの詳細ページ
- `.github/workflows/deploy.yml` — GitHub Pagesデプロイ

## Publishing policy

氏名、公開メールアドレス、履歴書、正式な書誌情報、共同研究先などは、公開してよいことを確認できた情報だけを掲載します。
