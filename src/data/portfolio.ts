export const profile = {
  name: "YH",
  role: "AI / Machine Learning Engineer",
  affiliation: "明星大学 情報学部 4年",
  nextStep: "2027年4月 大学院進学予定",
  summary:
    "映像理解・マルチモーダルAI・検索技術を中心に、研究設計から実装・評価まで一貫して取り組んでいます。",
  interests: ["Video Understanding", "Multimodal AI", "RAG", "Retrieval"],
  availability: "長期インターン / AI・ML研究開発ポジションに関心があります。",
  github: "https://github.com/yh-256",
};

export const stats = [
  { value: "03", label: "Featured Projects" },
  { value: "75,441", label: "Indexed Frames" },
  { value: "104.75h", label: "Largest Video Dataset" },
];

export const projects = [
  {
    number: "01",
    title: "Agentic Video QA",
    category: "Long-form Video Understanding / Multimodal AI",
    description:
      "長時間映像に対する質問について、必要な証拠を検索し、候補回答を生成・検証する映像質問応答システム。",
    problem:
      "長時間映像では、すべての映像情報を一度にVLMへ入力することが難しく、質問ごとに必要な根拠も異なります。",
    contributions: [
      "長時間映像QAのシステムアーキテクチャ設計",
      "映像・ASR・OCR・視覚情報のオフライン処理",
      "質問に応じたEvidence Retrieval",
      "候補回答生成・Reranking・Verification",
      "Qwen3-VL + vLLMによるGPU推論基盤",
      "評価Viewer・ログ設計とFailure Analysis",
    ],
    status: "Research in progress",
    result: "根拠取得・回答生成・検証の各段階を分離し、失敗箇所を観測可能な構成で評価中。",
    stack: ["Python", "Qwen3-VL", "vLLM", "RAG", "SQLite", "Multimodal Retrieval"],
    href: "projects/agentic-vqa.html",
  },
  {
    number: "02",
    title: "Laparoscopic Frame Search",
    category: "Semantic Retrieval / Medical Video",
    description:
      "104.75時間の腹腔鏡動画から、自然言語で目的の術中場面を検索する映像検索システム。",
    problem:
      "長時間の手術動画では目的場面の探索コストが高く、視覚類似度だけでは手術工程の時間的文脈を十分に扱えません。",
    contributions: [
      "75本・104.75時間の動画データ処理",
      "5秒間隔で75,441フレームを索引化",
      "Qwen3-VL-Embeddingによる意味検索",
      "クラスタを利用した再検索",
      "時間情報を組み込んだReranking",
      "MRR・Hit@K・nDCG等の評価パイプライン設計",
    ],
    status: "Evaluated",
    result: "MRR@10 0.755 → 0.815",
    stack: ["Python", "Qwen3-VL", "Vector Search", "Temporal Ranking", "Evaluation"],
    href: "projects/laparoscopic-search.html",
  },
  {
    number: "03",
    title: "Anomaly Anticipation",
    category: "Video Intelligence / Generative Data",
    description:
      "収集が難しい異常発生前の映像を生成し、実データと組み合わせることで予兆検知性能への効果を検証する研究。",
    problem:
      "異常予兆検知では、実際の異常発生前データを大量かつ多様に収集することが難しいという課題があります。",
    contributions: [
      "UCF-Crimeを用いた実験データ設計",
      "Gen-train / Det-train / Testの分離",
      "LTX-Video LoRAによる動画生成",
      "実映像・生成映像の混合率実験",
      "RTFM / UMIL / VadCLIPによる比較",
      "AUC / AP / LaAPによる評価設計",
    ],
    status: "Research in progress",
    result: "実データのみのTestを固定し、生成データが現実映像への汎化に与える効果を評価中。",
    stack: ["Python", "PyTorch", "LTX-Video", "LoRA", "RTFM", "VadCLIP"],
    href: "projects/anomaly-anticipation.html",
  },
];

export const experience = [
  {
    period: "2024 — Present",
    role: "Undergraduate Researcher",
    organization: "Meisei University / AI Laboratory",
    description:
      "映像理解・マルチモーダルAIを中心に、研究テーマの設計、モデル実装、GPU環境での実験、評価・分析まで取り組んでいます。",
    tags: ["Video Understanding", "Multimodal AI", "Generative AI", "Retrieval"],
  },
  {
    period: "2026 — Present",
    role: "Industry–University Collaborative Research",
    organization: "Graph-based Retrieval / RAG",
    description:
      "構造化データ・グラフ検索・GNNを利用したRAG検索方式について、検索手法と評価方法を検討しています。公開可能な範囲のみ掲載しています。",
    tags: ["Graph Retrieval", "RAG", "GNN", "Evaluation"],
  },
];

export const publications = [
  {
    year: "2025",
    venue: "DIA 2025",
    type: "Poster Presentation",
    title: "人物画像の年齢分類に関する研究",
    note: "人物画像分類・深層学習に関する研究成果をポスター発表。",
  },
];

export const skillGroups = [
  { title: "AI / Machine Learning", items: ["Python", "PyTorch", "Transformers", "PEFT / LoRA", "Unsloth"] },
  { title: "LLM / Multimodal", items: ["Qwen", "VLM", "Video QA", "RAG", "vLLM"] },
  { title: "Retrieval / Data", items: ["Vector Search", "Graph Retrieval", "GNN", "SQLite", "MySQL"] },
  { title: "Infrastructure", items: ["Linux", "CUDA", "Git", "Docker", "GPU Inference"] },
  { title: "Frontend", items: ["React", "TypeScript", "Vite", "Tailwind CSS"] },
];

export const principles = [
  ["01", "Evidence before confidence.", "確信より先に、根拠をつくる。"],
  ["02", "Systems over demos.", "デモで終わらない仕組みにする。"],
  ["03", "The interface is part of the model.", "UIまで含めてAIシステムを考える。"],
] as const;
