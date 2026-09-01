import { useState } from "react";
import { ArrowDown, ArrowUpRight, Github, Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import {
  experience,
  principles,
  profile,
  projects,
  publications,
} from "@/data/portfolio";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const navigation = [
  ["work", "Work"],
  ["background", "Background"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

const featuredProjects = [projects[1], projects[0], projects[2]];
const selectedTools = [
  { title: "AI / ML", items: ["Python", "PyTorch", "Transformers"] },
  { title: "Multimodal", items: ["Qwen", "VLM", "vLLM"] },
  { title: "Retrieval", items: ["RAG", "Vector Search", "Graph Retrieval"] },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/88 text-paper backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1540px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-3" aria-label="YH portfolio home">
          <span className="grid h-8 w-8 place-items-center bg-signal text-xs font-black text-ink">YH</span>
          <span className="hidden text-[11px] font-bold uppercase leading-[1.35] tracking-[0.16em] text-paper/60 sm:block">
            AI / ML
            <br />Engineer
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-[11px] font-bold uppercase tracking-[0.14em] text-paper/60 transition hover:text-signal">
              {label}
            </a>
          ))}
        </nav>

        <a href={profile.github} target="_blank" rel="noreferrer" className="hidden items-center gap-2 border-b border-paper/25 pb-1 text-xs font-bold transition hover:border-signal hover:text-signal md:flex">
          GitHub <ArrowUpRight size={14} />
        </a>

        <button type="button" className="grid h-11 w-11 place-items-center border border-white/15 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "メニューを閉じる" : "メニューを開く"} aria-expanded={open}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink px-5 py-6 lg:hidden">
          <nav className="grid gap-4">
            {navigation.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="text-2xl font-semibold text-paper">
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden bg-ink text-paper">
      <div className="grid lg:min-h-[100svh] lg:grid-cols-[0.46fr_0.54fr]">
        <div className="order-2 flex flex-col justify-center px-5 pb-16 pt-14 sm:px-8 sm:pb-20 lg:order-1 lg:min-h-[100svh] lg:px-10 lg:pb-20 lg:pt-28 xl:px-14 2xl:px-16">
          <p className="section-label text-signal">AI / Machine Learning Engineer</p>
          <h1 className="mt-7 max-w-[760px] font-display text-[clamp(3rem,13vw,4.8rem)] font-semibold leading-[0.86] tracking-[-0.075em] sm:text-[clamp(4.2rem,9vw,6rem)] lg:text-[clamp(4rem,5.3vw,6rem)]">
            AIを、
            <span className="mt-2 block text-signal">動く仕組みに。</span>
          </h1>

          <div className="mt-8 max-w-xl border-t border-white/14 pt-6">
            <p className="text-base font-bold text-paper">{profile.affiliation}</p>
            <p className="mt-1 text-sm text-paper/55">{profile.nextStep}</p>
            <p className="mt-5 text-sm leading-7 text-paper/68 sm:text-base sm:leading-8">{profile.summary}</p>
          </div>

          <div className="mt-6 inline-flex w-fit items-center border border-signal/40 bg-signal/10 px-3 py-2 text-sm font-semibold text-signal">
            {profile.availability}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="group inline-flex h-12 items-center gap-5 bg-signal px-5 text-sm font-extrabold text-ink transition hover:bg-paper">
              Selected Work
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-3 border border-white/18 px-5 text-sm font-bold transition hover:border-paper">
              <Github size={16} /> GitHub
            </a>
          </div>
        </div>

        <div className="relative order-1 mt-[68px] h-[clamp(400px,56svh,590px)] overflow-hidden sm:h-[clamp(480px,62svh,680px)] lg:order-2 lg:mt-0 lg:h-auto lg:min-h-[100svh]">
          <div className="absolute inset-0 bg-[#050605]" />
          <Spotlight className="-left-[80%] -top-[48%] sm:-left-[45%] lg:-left-[18%] lg:-top-[25%]" fill="#ffffff" />
          <div className="absolute inset-0" aria-hidden="true">
            {reduceMotion ? (
              <img src={withBase("assets/portfolio/hero-workspace.webp")} alt="" className="h-full w-full object-cover grayscale brightness-[.42]" />
            ) : (
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="spline-interactive h-full w-full" />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/70 lg:via-transparent lg:to-transparent" />
          <div className="pointer-events-none absolute left-5 top-5 font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-paper/50 sm:left-8 sm:top-8 lg:left-10 lg:top-24">
            Interactive / 3D
            <br />Drag to explore
          </div>
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 border-t border-white/15 pt-4 sm:bottom-8 sm:left-8 sm:right-8 lg:left-10 lg:right-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/50">Current focus</p>
            <p className="mt-2 max-w-lg text-sm font-semibold text-paper/80">Video Understanding · Multimodal AI · Retrieval</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="grid gap-6 border-b border-ink/18 pb-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="section-label text-ink/50">{eyebrow}</p>
        <h2 className="mt-5 font-display text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.88] tracking-[-0.07em]">{title}</h2>
      </div>
      {description && <p className="max-w-md text-sm leading-7 text-ink/58 lg:col-span-4">{description}</p>}
    </div>
  );
}

function WorkSection() {
  return (
    <section id="work" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionIntro eyebrow="Selected work" title="Research & Engineering" description="結果・役割・主要技術を先に。設計判断や評価の詳細は各Case Studyにまとめています。" />

        <div>
          {featuredProjects.map((project, index) => {
            const evaluated = project.status === "Evaluated";
            return (
              <article key={project.title} className="grid gap-8 border-b border-ink/18 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16">
                <div className="lg:col-span-1">
                  <p className="font-mono text-[11px] tracking-[0.16em] text-ink/45">/0{index + 1}</p>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-[10px] uppercase leading-5 tracking-[0.1em] text-ink/50">{project.category}</p>
                  <h3 className="mt-4 max-w-xl font-display text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.06em]">{project.title}</h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-ink/64 sm:text-base sm:leading-8">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                    {project.stack.slice(0, 4).map((item) => (
                      <span key={item} className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink/50">+ {item}</span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 lg:border-l lg:border-ink/15 lg:pl-8">
                  <p className="section-label text-ink/45">{evaluated ? "Result" : "What I did"}</p>
                  {evaluated ? (
                    <>
                      <p className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">{project.result}</p>
                      <p className="mt-5 text-sm leading-7 text-ink/58">{project.contributions[4]}</p>
                    </>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {project.contributions.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-6 text-ink/62"><span className="mt-2 h-1 w-1 shrink-0 bg-ink" />{item}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex items-end justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink/48">{project.status}</span>
                  <a href={withBase(project.href)} className="group inline-flex min-h-11 items-center gap-3 bg-ink px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-paper transition hover:bg-signal hover:text-ink">
                    View case study
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BackgroundSection() {
  return (
    <section id="background" className="bg-[#11120f] text-paper">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="section-label text-signal">Background</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Research,<span className="block text-paper/35">tools & output.</span></h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-paper/58">経歴・研究発表・技術スタックは、判断に必要な情報だけをまとめています。</p>
          </div>

          <div className="grid gap-8 lg:col-span-8 lg:grid-cols-2">
            <div className="border-t border-white/15 pt-5">
              <p className="section-label text-paper/45">Experience</p>
              <div className="mt-6 space-y-7">
                {experience.map((item) => {
                  const collaborative = item.role.includes("Industry–University");
                  return (
                    <div key={item.role}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-paper/42">{item.period}</p>
                      <h3 className="mt-2 text-lg font-bold">{collaborative ? "企業との共同研究" : item.role}</h3>
                      <p className="mt-1 text-sm text-signal">{collaborative ? "Industry–University Collaborative Research" : item.organization}</p>
                      <p className="mt-3 text-sm leading-6 text-paper/58">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/15 pt-5">
              <p className="section-label text-paper/45">Research output</p>
              <div className="mt-6">
                {publications.map((item) => (
                  <div key={`${item.year}-${item.venue}`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-paper/42">{item.year}</p>
                    <h3 className="mt-2 text-lg font-bold">{item.venue}</h3>
                    <p className="mt-1 text-sm text-paper/60">{item.type}</p>
                    <p className="mt-3 text-sm leading-6 text-paper/58">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/15 pt-5 lg:col-span-2">
              <p className="section-label text-paper/45">Selected tools</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {selectedTools.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-sm font-bold text-paper/85">{group.title}</h3>
                    <p className="mt-2 font-mono text-[10px] leading-5 tracking-[0.04em] text-paper/50">{group.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [primaryPrinciple] = principles;
  return (
    <section id="about" className="bg-paper text-ink">
      <div className="mx-auto grid max-w-[1540px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-28">
        <div className="lg:col-span-6">
          <p className="section-label text-ink/45">About</p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">研究と実装を、<span className="block text-ink/40">一つの流れで。</span></h2>
        </div>

        <div className="lg:col-span-6 lg:pt-8">
          <p className="max-w-2xl text-base leading-8 text-ink/62">映像理解やマルチモーダルAIを中心に、研究とソフトウェア開発の両方に取り組んでいます。問題設定、データ設計、実装、評価、失敗分析までをつなげて考え、小さく動かしてから改善する進め方を重視しています。</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink/62">将来的には、研究成果を実際に使われるプロダクトへ落とし込めるAIエンジニア・研究開発者を目指しています。</p>

          <div className="mt-10 border-y border-ink/15 py-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink/42">Working principle</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr] sm:items-center">
              <p className="font-display text-2xl font-semibold tracking-[-0.04em]">{primaryPrinciple[1]}</p>
              <p className="text-sm text-ink/55 sm:text-right">{primaryPrinciple[2]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-signal text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="section-label">Contact</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,9vw,7rem)] font-semibold leading-[0.86] tracking-[-0.07em]">Let&apos;s talk.</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-ink/65 sm:text-base">AI・機械学習領域の長期インターン、研究開発、共同研究などについてご連絡いただけます。</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <a href={profile.github} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center gap-4 bg-ink px-6 py-4 text-sm font-extrabold text-paper transition hover:bg-paper hover:text-ink">
              GitHub profile
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });

  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-signal" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <BackgroundSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1540px] flex-col gap-2 px-5 py-8 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/45 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} YH</p>
          <p>AI / Machine Learning Engineer</p>
        </div>
      </footer>
    </div>
  );
}
