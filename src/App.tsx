import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  Github,
  Menu,
  Search,
  X,
} from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const navigation = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

const projects = [
  {
    number: "01",
    title: "Agentic Video QA",
    category: "Multimodal AI / Agent Systems",
    description:
      "長時間映像の質問を分解し、必要なツールと根拠を集め、検証して答えるエージェント型の映像QA。",
    href: "projects/agentic-vqa.html",
    tags: ["Plan", "Retrieve", "Verify"],
    visual: "agent" as const,
  },
  {
    number: "02",
    title: "Anomaly Anticipation",
    category: "Video Intelligence / Generative Data",
    description:
      "不足する異常発生前の映像を生成し、実データと組み合わせながら、より早い予兆検知を検証。",
    href: "projects/anomaly-anticipation.html",
    tags: ["Synthetic data", "AUC / AP", "LaAP"],
    visual: "anomaly" as const,
  },
  {
    number: "03",
    title: "Laparoscopic Search",
    category: "Semantic Retrieval / Medical Video",
    description:
      "自然言語、視覚意味、時間的文脈から、75,441フレームの術中場面を横断検索。",
    href: "projects/laparoscopic-search.html",
    tags: ["Qwen3-VL", "Temporal ranking", "Vector search"],
    visual: "retrieval" as const,
  },
];

const capabilities = [
  {
    number: "01",
    title: "Research design",
    description: "曖昧な問いを、仮説・評価指標・実験計画へ分解します。",
    detail: "Hypothesis / Metrics / Experiments",
  },
  {
    number: "02",
    title: "Multimodal AI systems",
    description: "映像・言語・検索を組み合わせ、根拠を追えるAIを設計します。",
    detail: "VLM / RAG / Retrieval / Agents",
  },
  {
    number: "03",
    title: "Product engineering",
    description: "研究プロトタイプを、速く迷わず使えるプロダクトへ仕立てます。",
    detail: "React / TypeScript / Product UI",
  },
  {
    number: "04",
    title: "Deployment & evaluation",
    description: "推論、ログ、評価パイプラインを再現可能な構成に整えます。",
    detail: "GPU inference / MLOps / Observability",
  },
];

const principles = [
  ["01", "Evidence before confidence.", "確信より先に、根拠をつくる。"],
  ["02", "Systems over demos.", "デモで終わらない仕組みにする。"],
  ["03", "The interface is part of the model.", "UIまで含めて、AIを設計する。"],
];

const stack = ["Python", "PyTorch", "VLM", "RAG", "React", "TypeScript", "Vite", "Tailwind", "vLLM", "Linux"];

function useActiveSection(ids: readonly string[]) {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-24% 0px -64% 0px", threshold: [0.01, 0.2] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return activeSection;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const menuButton = menuButtonRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const menuElements = Array.from(
      mobileMenuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );
    const focusableElements = menuButton ? [menuButton, ...menuElements] : menuElements;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusableElements.length === 0) return;
      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    menuElements[0]?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/88 text-paper backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1540px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="group flex min-h-11 items-center gap-3" aria-label="YH portfolio home">
          <span className="grid h-8 w-8 place-items-center bg-signal text-xs font-black text-ink transition-transform group-hover:rotate-6">
            YH
          </span>
          <span className="hidden text-[10px] font-bold uppercase leading-[1.35] tracking-[0.18em] text-paper/60 sm:block">
            AI + Software
            <br />
            Engineer
          </span>
        </a>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors",
                activeSection === item.id ? "text-signal" : "text-paper/65 hover:text-paper",
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span layoutId="nav-indicator" className="absolute inset-x-0 -bottom-[23px] h-px bg-signal" />
              )}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/yh-256"
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 border-b border-paper/30 pb-1 text-xs font-bold uppercase tracking-[0.14em] transition hover:border-signal hover:text-signal md:flex"
        >
          GitHub <ArrowUpRight size={14} />
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="grid h-11 w-11 place-items-center border border-white/15 md:hidden"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="サイトナビゲーション"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 top-[68px] overflow-y-auto bg-ink px-5 py-8 md:hidden"
          >
            <nav className="flex h-full flex-col" aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-t border-white/12 py-6 text-3xl font-semibold tracking-[-0.04em] text-paper"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-[10px] tracking-widest text-paper/55">0{index + 1}</span>
                </a>
              ))}
              <a
                href="https://github.com/yh-256"
                target="_blank"
                rel="noreferrer"
                className="mt-auto flex items-center justify-between bg-signal p-5 font-bold text-ink"
              >
                GitHubで見る <ArrowUpRight size={19} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-paper">
      <div className="grid lg:min-h-[100svh] lg:grid-cols-[0.46fr_0.54fr]">
        <div className="order-2 flex flex-col justify-center px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16 lg:order-1 lg:min-h-[100svh] lg:px-10 lg:pb-20 lg:pt-32 xl:px-14 2xl:px-16">
          <Reveal>
            <p className="section-label text-signal">AI Research / Software Engineering</p>
            <h1 className="mt-7 max-w-[760px] font-display text-[clamp(2.55rem,12.8vw,4rem)] font-semibold leading-[0.87] tracking-[-0.075em] sm:mt-8 sm:text-[clamp(4rem,9vw,5rem)] lg:text-[clamp(3.5rem,5.2vw,5.6rem)]">
              AIを、
              <span className="mt-2 block text-signal">動く仕組みに。</span>
            </h1>
            <p className="mt-7 max-w-[590px] text-sm leading-7 text-paper/58 sm:mt-9 sm:text-base sm:leading-8 xl:text-lg xl:leading-9">
              映像理解・マルチモーダルAI・検索技術を、検証できるプロダクトへ。仮説設計から実装・評価まで、一つの流れでつくります。
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <a
                href="#work"
                className="group inline-flex h-[52px] items-center justify-between gap-8 bg-signal px-5 text-sm font-extrabold text-ink transition hover:bg-paper sm:justify-center"
              >
                プロジェクトを見る
                <ArrowDown size={17} className="transition-transform group-hover:translate-y-1" />
              </a>
              <a
                href="https://github.com/yh-256"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex h-[52px] items-center justify-between gap-8 border border-white/18 px-5 text-sm font-bold text-paper transition hover:border-paper sm:justify-center"
              >
                GitHubを見る
                <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative order-1 mt-[68px] h-[clamp(340px,52svh,480px)] overflow-hidden sm:h-[clamp(420px,56svh,560px)] lg:order-2 lg:mt-0 lg:h-auto lg:min-h-[100svh]">
          <div className="absolute inset-0 bg-[#050605]" />
          <Spotlight className="-left-[80%] -top-[48%] sm:-left-[45%] lg:-left-[18%] lg:-top-[25%]" fill="#ffffff" />
          <div className="absolute inset-0" aria-hidden="true">
            {reduceMotion ? (
              <img
                src={withBase("assets/portfolio/hero-workspace.webp")}
                alt=""
                className="h-full w-full object-cover grayscale brightness-[.42]"
              />
            ) : (
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="spline-interactive h-full w-full"
              />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/72 lg:via-transparent lg:to-transparent" />
          <div className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] uppercase leading-5 tracking-[0.2em] text-paper/55 sm:left-8 sm:top-8 lg:left-10 lg:top-24">
            Interactive / 3D
            <br />
            AI × Spatial Interface
          </div>
          <div className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55 lg:flex">
            Drag to explore <span className="block h-px w-10 bg-paper/30" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto grid max-w-[1540px] sm:grid-cols-3">
          {[
            ["03", "Research systems"],
            ["75,441", "Indexed frames"],
            ["104.75h", "Video analyzed"],
          ].map(([value, label], index) => (
            <div
              key={label}
              className={cn(
                "flex items-end justify-between border-white/12 px-5 py-6 sm:block sm:px-8 lg:px-12",
                index > 0 && "border-t sm:border-l sm:border-t-0",
              )}
            >
              <p className="font-display text-3xl font-semibold tracking-[-0.05em] text-paper sm:text-4xl">{value}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AgentVisual() {
  const reduceMotion = useReducedMotion();
  const steps = [
    { label: "PLAN", icon: Bot },
    { label: "RETRIEVE", icon: Search },
    { label: "VERIFY", icon: Check },
  ];

  return (
    <div className="relative h-full min-h-[390px] overflow-hidden bg-[#0c0e0d] p-5 text-paper sm:min-h-[500px] sm:p-8">
      <div className="absolute inset-0 editorial-grid-dark opacity-50" />
      <div className="relative flex h-full flex-col border border-white/12 bg-black/25 p-4 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper/60">Agent observation trace</p>
          <span className="flex items-center gap-2 font-mono text-[9px] text-signal">
            <span className="h-1.5 w-1.5 bg-signal" /> LIVE
          </span>
        </div>

        <div className="grid flex-1 place-items-center py-8">
          <div className="relative grid w-full max-w-[620px] grid-cols-3 gap-3 sm:gap-8">
            <div className="absolute left-[16%] right-[16%] top-6 h-px bg-white/15" />
            <motion.div
              className="absolute left-[16%] top-6 h-px bg-signal"
              initial={reduceMotion ? { width: "68%" } : { width: 0 }}
              whileInView={{ width: "68%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            {steps.map(({ label, icon: Icon }, index) => (
              <div key={label} className="relative text-center">
                <div className="relative z-10 mx-auto grid h-12 w-12 place-items-center border border-white/20 bg-[#0c0e0d] text-signal">
                  <Icon size={17} />
                </div>
                <p className="mt-4 font-mono text-[9px] tracking-[0.14em] text-paper/70 sm:text-[10px]">{label}</p>
                <p className="mt-1 font-mono text-[9px] text-paper/55">0{index + 1}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-px bg-white/10 sm:grid-cols-3">
          {["Question decomposed", "Evidence located", "Answer grounded"].map((item) => (
            <div key={item} className="flex items-center gap-2 bg-[#111310] px-3 py-3 font-mono text-[9px] uppercase tracking-[0.08em] text-paper/60">
              <span className="h-1 w-1 bg-signal" /> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnomalyVisual() {
  return (
    <div className="relative h-full min-h-[390px] overflow-hidden bg-[#d9ddd5] sm:min-h-[500px]">
      <img
        src={withBase("assets/portfolio/mountain-app.webp")}
        alt="異常予兆検知の映像シーケンスを表す山岳映像"
        className="absolute inset-0 h-full w-full object-cover grayscale-[.72] contrast-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/5 to-black/15" />
      <div className="absolute inset-x-5 top-5 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/70 sm:inset-x-8 sm:top-8">
        <span>Pre-event / 041</span>
        <span className="text-signal">In progress</span>
      </div>
      <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">T−04s</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">Anticipation window</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            {['AUC', 'AP', 'LaAP'].map((metric) => (
              <span key={metric} className="border border-white/25 px-3 py-2 font-mono text-[9px] text-white/70">{metric}</span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {["T−04", "T−03", "T−02", "T−01", "T0"].map((time, index) => (
            <div key={time}>
              <div className={cn("h-1", index < 4 ? "bg-signal" : "bg-red-400")} />
              <p className="mt-2 font-mono text-[8px] text-white/45">{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RetrievalVisual() {
  return (
    <div className="relative h-full min-h-[430px] overflow-hidden bg-[#e8e6df] p-5 text-ink sm:min-h-[500px] sm:p-8">
      <div className="absolute inset-0 editorial-grid opacity-55" />
      <div className="relative grid h-full gap-5 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="flex flex-col justify-between border border-ink/15 bg-paper p-5 sm:p-6">
          <div>
            <p className="section-label text-ink/42">Dataset scale</p>
            <p className="mt-5 font-display text-[clamp(3.4rem,6vw,6.5rem)] font-semibold leading-none tracking-[-0.07em]">75,441</p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45">Indexed frames</p>
          </div>
          <div className="mt-10 border-t border-ink/15 pt-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-display text-3xl font-semibold tracking-[-0.05em]">104.75h</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-ink/42">Total video</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-semibold tracking-[-0.05em]">75</p>
                <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-ink/42">Videos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col border border-ink/15 bg-[#f7f5ef] p-4 sm:p-5">
          <div className="flex items-center gap-3 border border-ink/15 bg-white px-4 py-3 text-xs text-ink/65">
            <Search size={15} className="text-ink" />
            <span className="truncate">instrument entry during procedure</span>
            <span className="ml-auto font-mono text-[9px]">SEMANTIC</span>
          </div>
          <div className="mt-4 grid flex-1 gap-2">
            {[
              ["00:18:42", "Temporal + visual match"],
              ["00:34:07", "Related surgical context"],
              ["01:02:13", "Candidate frame sequence"],
            ].map(([time, label], index) => (
              <div key={time} className={cn("grid grid-cols-[64px_1fr_auto] items-center gap-3 border p-3", index === 0 ? "border-ink bg-ink text-paper" : "border-ink/12 bg-paper") }>
                <div className={cn("grid h-11 place-items-center font-mono text-[9px]", index === 0 ? "bg-signal text-ink" : "bg-ink/6 text-ink/65")}>{time}</div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold">{label}</p>
                  <p className={cn("mt-1 font-mono text-[9px] uppercase tracking-[0.1em]", index === 0 ? "text-paper/60" : "text-ink/60")}>Rank {index + 1}</p>
                </div>
                <p className="font-mono text-[9px]">0{index + 1}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 border border-ink/15 bg-paper">
            <div className="border-r border-ink/15 p-3">
              <p className="font-display text-2xl font-semibold tracking-[-0.05em]">0.815</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-ink/60">Temporal ranking</p>
            </div>
            <div className="p-3 text-right">
              <p className="font-display text-2xl font-semibold tracking-[-0.05em]">0.755</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.08em] text-ink/60">Text-only baseline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectVisual({ type }: { type: (typeof projects)[number]["visual"] }) {
  if (type === "agent") return <AgentVisual />;
  if (type === "anomaly") return <AnomalyVisual />;
  return <RetrievalVisual />;
}

function WorkSection() {
  return (
    <section id="work" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal className="grid gap-8 border-b border-ink/20 pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="section-label text-ink/60">Selected work / 2024—Present</p>
            <h2 className="mt-7 font-display text-[clamp(3.6rem,16vw,6rem)] font-semibold leading-[0.84] tracking-[-0.075em] sm:text-[clamp(5rem,12vw,7.5rem)] lg:text-[clamp(6.5rem,9vw,9rem)]">
              問いを、
              <br />
              <span className="text-ink/50">成果に。</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-ink/58 sm:text-base sm:leading-8 lg:col-span-4 lg:pb-2">
            モデル精度だけでなく、根拠・検索・評価・可視化まで、一つの体験として設計した研究・開発です。
          </p>
        </Reveal>

        <div>
          {projects.map((project) => (
            <article key={project.title} className="grid border-b border-ink/20 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
              <Reveal className="flex flex-col lg:col-span-4 lg:min-h-[500px] lg:pr-4">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-ink/55">/{project.number}</p>
                  <p className="max-w-[230px] text-right font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-ink/60">{project.category}</p>
                </div>
                <h3 className="mt-12 max-w-md font-display text-[clamp(2.8rem,4.3vw,5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">{project.title}</h3>
                <p className="mt-7 max-w-md text-sm leading-7 text-ink/60 sm:text-base sm:leading-8">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/60">+ {tag}</span>
                  ))}
                </div>
                <a
                  href={withBase(project.href)}
                  className="group mt-8 inline-flex min-h-11 w-fit items-center gap-3 border-b border-ink py-2 text-xs font-extrabold uppercase tracking-[0.12em] lg:mt-auto"
                  aria-label={`${project.title}の詳細を見る`}
                >
                  Read case study
                  <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
              <Reveal className="mt-10 lg:col-span-8 lg:mt-0" delay={0.08}>
                <ProjectVisual type={project.visual} />
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section id="approach" className="bg-[#11120f] text-paper">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <Reveal className="grid gap-8 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="section-label text-signal">How I work</p>
            <h2 className="mt-7 max-w-5xl font-display text-[clamp(2.5rem,12.5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.07em] sm:text-[clamp(4rem,8.5vw,6rem)] lg:text-[clamp(5.5rem,7.2vw,7.5rem)]">
              研究から、
              <span className="block text-paper/40">運用へつなぐ。</span>
            </h2>
          </div>
          <p className="max-w-md self-end text-sm leading-7 text-paper/65 sm:text-base sm:leading-8 lg:col-span-4">
            仮説設計、プロトタイプ、評価、運用基盤。AIプロダクトに必要なレイヤーを横断します。
          </p>
        </Reveal>

        <div className="border-b border-white/12">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 0.04}>
              <div className="group grid gap-5 border-t border-white/12 py-7 transition-colors hover:text-signal sm:py-9 lg:grid-cols-12 lg:items-center">
                <p className="font-mono text-[10px] text-paper/55 lg:col-span-1">/{capability.number}</p>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.045em] sm:text-4xl lg:col-span-4">{capability.title}</h3>
                <p className="max-w-xl text-sm leading-7 text-paper/65 transition-colors group-hover:text-paper/80 lg:col-span-4">{capability.description}</p>
                <p className="font-mono text-[9px] uppercase leading-5 tracking-[0.12em] text-paper/55 lg:col-span-3 lg:text-right">{capability.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <div className="relative min-h-[430px] overflow-hidden bg-ink sm:min-h-[620px]">
              <img
                src={withBase("assets/portfolio/about-workspace.webp")}
                alt="自然光の入る開発ワークスペース"
                className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-ink/12" />
              <p className="absolute bottom-5 left-5 bg-signal px-3 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink sm:bottom-8 sm:left-8">Research / Build / Evaluate</p>
            </div>
          </Reveal>

          <Reveal className="flex flex-col justify-center lg:col-span-5 lg:pl-8" delay={0.08}>
            <p className="section-label text-ink/60">About</p>
            <h2 className="mt-7 font-display text-[clamp(2.5rem,12.5vw,4rem)] font-semibold leading-[0.9] tracking-[-0.07em] sm:text-[clamp(4rem,7vw,5.2rem)] lg:text-[clamp(3.2rem,4.1vw,5rem)]">
              複雑さを、
              <span className="block text-ink/50">確かな設計に。</span>
            </h2>
            <p className="mt-9 max-w-xl text-base leading-8 text-ink/58">
              AI、機械学習、Webの境界で、研究アイデアを再現可能なプロダクトへ変えています。問いを分解し、評価方法を先に定め、インターフェースまで一貫して設計します。
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/18 pt-6">
              {["AI・マルチモーダル研究", "フルスタック実装", "評価起点の問題解決", "再現可能な運用設計"].map((item) => (
                <p key={item} className="flex gap-2 text-xs font-bold leading-5 text-ink/62">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-ink" /> {item}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 border-b border-ink/20 lg:mt-28">
          <p className="section-label mb-8 text-ink/60">Working principles</p>
          {principles.map(([number, title, translation]) => (
            <div key={number} className="grid gap-3 border-t border-ink/20 py-6 sm:grid-cols-[54px_1fr_1fr] sm:items-center sm:gap-8 sm:py-8">
              <p className="font-mono text-[10px] text-ink/60">/{number}</p>
              <p className="font-display text-xl font-semibold tracking-[-0.035em] sm:text-3xl">{title}</p>
              <p className="text-sm text-ink/65 sm:text-right">{translation}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-16 grid gap-6 border-t border-ink/20 pt-7 lg:grid-cols-[220px_1fr]">
          <p className="section-label text-ink/60">Tools & technologies</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
            {stack.map((item) => (
              <span key={item} className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/65">{item}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-signal text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <Reveal>
          <div className="flex items-center justify-between border-b border-ink/25 pb-5">
            <p className="section-label">Contact</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/65">Research → Product</p>
          </div>
          <h2 className="mt-10 max-w-[1280px] font-display text-[clamp(3rem,13.5vw,4.6rem)] font-semibold leading-[0.84] tracking-[-0.075em] sm:mt-12 sm:text-[clamp(4.6rem,11vw,8rem)] lg:text-[clamp(7rem,10vw,11rem)] lg:leading-[0.78]">
            次の問いを、
            <br />
            一緒に形に。
          </h2>
          <div className="mt-14 grid gap-8 border-t border-ink/25 pt-7 lg:grid-cols-12 lg:items-end">
            <p className="max-w-xl text-sm leading-7 text-ink/62 sm:text-base sm:leading-8 lg:col-span-7">
              映像理解、マルチモーダルAI、RAG、研究プロトタイプについて。課題がまだ曖昧でも、GitHubから気軽にご連絡ください。
            </p>
            <a
              href="https://github.com/yh-256"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between bg-ink px-6 py-5 text-sm font-extrabold text-paper transition hover:bg-paper hover:text-ink lg:col-span-5"
            >
              Start a conversation
              <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const navIds = useMemo(() => navigation.map((item) => item.id), []);
  const activeSection = useActiveSection(navIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-signal" style={{ scaleX: progress }} />
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <WorkSection />
        <ApproachSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1540px] flex-col gap-2 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/55 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} YH. Research & Engineering.</p>
          <a href="#home" className="group inline-flex min-h-11 items-center gap-2 transition hover:text-signal">
            Back to top <ArrowRight size={12} className="-rotate-90 transition-transform group-hover:-translate-y-1" />
          </a>
          <a href="https://github.com/yh-256" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 transition hover:text-signal">
            <Github size={12} /> @yh-256
          </a>
        </div>
      </footer>
    </div>
  );
}
