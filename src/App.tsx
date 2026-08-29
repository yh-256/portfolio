import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Menu, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  experience,
  principles,
  profile,
  projects,
  publications,
  skillGroups,
  stats,
} from "@/data/portfolio";

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const navigation = [
  ["work", "Work"],
  ["experience", "Experience"],
  ["publications", "Publications"],
  ["skills", "Skills"],
  ["about", "About"],
  ["contact", "Contact"],
] as const;

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/90 text-paper backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1540px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-3" aria-label="YH portfolio home">
          <span className="grid h-8 w-8 place-items-center bg-signal text-xs font-black text-ink">YH</span>
          <span className="hidden text-[10px] font-bold uppercase leading-[1.35] tracking-[0.18em] text-paper/60 sm:block">
            AI / ML
            <br />Engineer
          </span>
        </a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-[10px] font-bold uppercase tracking-[0.16em] text-paper/60 transition hover:text-signal">
              {label}
            </a>
          ))}
        </nav>
        <a href={profile.github} target="_blank" rel="noreferrer" className="hidden items-center gap-2 border-b border-paper/25 pb-1 text-xs font-bold md:flex">
          GitHub <ArrowUpRight size={14} />
        </a>
        <button type="button" className="grid h-11 w-11 place-items-center border border-white/15 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="メニュー">
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
    <section id="home" className="bg-ink text-paper">
      <div className="grid min-h-[100svh] lg:grid-cols-[0.54fr_0.46fr]">
        <div className="flex flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:px-12 xl:px-16">
          <p className="section-label text-signal">AI Research / Software Engineering</p>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">{profile.name}</p>
          <h1 className="mt-3 max-w-4xl font-display text-[clamp(3.1rem,11vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
            AI / Machine
            <span className="block text-signal">Learning Engineer</span>
          </h1>
          <div className="mt-8 grid max-w-3xl gap-5 border-t border-white/15 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="text-base font-bold text-paper">{profile.affiliation}</p>
              <p className="mt-1 text-sm text-paper/55">{profile.nextStep}</p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-paper/65 sm:text-base sm:leading-8">{profile.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:max-w-[260px] sm:justify-end">
              {profile.interests.map((item) => (
                <span key={item} className="border border-white/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-paper/60">{item}</span>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm font-semibold text-signal">{profile.availability}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="group inline-flex h-12 items-center gap-5 bg-signal px-5 text-sm font-extrabold text-ink">
              View Projects <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-3 border border-white/20 px-5 text-sm font-bold">
              <Github size={16} /> GitHub
            </a>
            <a href="#contact" className="inline-flex h-12 items-center gap-3 border border-white/20 px-5 text-sm font-bold">Contact</a>
          </div>
        </div>
        <div className="relative min-h-[460px] overflow-hidden border-l border-white/10 lg:min-h-[100svh]">
          <img src={withBase("assets/portfolio/hero-workspace.webp")} alt="" className="absolute inset-0 h-full w-full object-cover grayscale brightness-[.38]" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent lg:bg-gradient-to-r lg:from-ink/70 lg:to-transparent" />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-x-5 bottom-5 border border-white/15 bg-black/35 p-5 backdrop-blur-md sm:inset-x-8 sm:bottom-8"
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-signal">Current focus</p>
            <div className="mt-4 grid grid-cols-2 gap-px bg-white/10">
              {["Video QA", "Multimodal Retrieval", "Generative Video", "Graph RAG"].map((item) => (
                <div key={item} className="bg-ink/80 p-4 text-sm font-semibold text-paper">{item}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-white/12">
        <div className="mx-auto grid max-w-[1540px] sm:grid-cols-3">
          {stats.map((item, index) => (
            <div key={item.label} className={`px-5 py-6 sm:px-8 lg:px-12 ${index ? "border-t border-white/12 sm:border-l sm:border-t-0" : ""}`}>
              <p className="font-display text-4xl font-semibold tracking-[-0.05em]">{item.value}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="grid gap-6 border-b border-ink/20 pb-10 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <p className="section-label text-ink/55">{eyebrow}</p>
        <h2 className="mt-5 font-display text-[clamp(3.1rem,10vw,7rem)] font-semibold leading-[0.87] tracking-[-0.07em]">{title}</h2>
      </div>
      {description && <p className="max-w-md text-sm leading-7 text-ink/60 lg:col-span-4">{description}</p>}
    </div>
  );
}

function WorkSection() {
  return (
    <section id="work" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionHeading eyebrow="Selected work / 2024—Present" title="Selected Work" description="研究テーマの説明だけでなく、問題・自分の担当・結果まで分かる形で掲載しています。" />
        <div>
          {projects.map((project) => (
            <article key={project.title} className="grid gap-10 border-b border-ink/20 py-14 lg:grid-cols-12 lg:py-20">
              <div className="lg:col-span-4">
                <div className="flex justify-between gap-5">
                  <p className="font-mono text-[10px] text-ink/50">/{project.number}</p>
                  <p className="max-w-[250px] text-right font-mono text-[9px] uppercase leading-5 tracking-[0.1em] text-ink/50">{project.category}</p>
                </div>
                <h3 className="mt-8 font-display text-[clamp(2.8rem,5vw,5.3rem)] font-semibold leading-[0.9] tracking-[-0.065em]">{project.title}</h3>
                <p className="mt-6 text-sm leading-7 text-ink/65">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((item) => <span key={item} className="border border-ink/15 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-ink/55">{item}</span>)}
                </div>
                <a href={withBase(project.href)} className="group mt-8 inline-flex items-center gap-3 border-b border-ink pb-2 text-xs font-extrabold uppercase tracking-[0.1em]">
                  Read case study <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
              <div className="grid gap-px bg-ink/15 lg:col-span-8 lg:grid-cols-2">
                <div className="bg-[#ece9e1] p-6 sm:p-8">
                  <p className="section-label text-ink/45">Problem</p>
                  <p className="mt-5 text-base font-semibold leading-8">{project.problem}</p>
                </div>
                <div className="bg-ink p-6 text-paper sm:p-8">
                  <p className="section-label text-signal">Result / Status</p>
                  <p className="mt-5 font-display text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">{project.result}</p>
                  <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/45">{project.status}</p>
                </div>
                <div className="bg-paper p-6 sm:p-8 lg:col-span-2">
                  <p className="section-label text-ink/45">My Contribution</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {project.contributions.map((item) => (
                      <p key={item} className="flex gap-3 text-sm leading-6 text-ink/65"><span className="mt-2 h-1 w-1 shrink-0 bg-ink" />{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#11120f] text-paper">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <p className="section-label text-signal">Experience</p>
        <h2 className="mt-5 font-display text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Research & Collaboration</h2>
        <div className="mt-14 border-b border-white/12">
          {experience.map((item) => (
            <div key={item.role} className="grid gap-5 border-t border-white/12 py-8 lg:grid-cols-12 lg:items-start">
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/45 lg:col-span-2">{item.period}</p>
              <div className="lg:col-span-4">
                <h3 className="font-display text-3xl font-semibold tracking-[-0.045em]">{item.role}</h3>
                <p className="mt-2 text-sm font-semibold text-signal">{item.organization}</p>
              </div>
              <div className="lg:col-span-6">
                <p className="max-w-2xl text-sm leading-7 text-paper/65">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="border border-white/15 px-2.5 py-1.5 font-mono text-[8px] uppercase text-paper/50">{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationsSection() {
  return (
    <section id="publications" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <SectionHeading eyebrow="Publications & Presentations" title="Research Output" description="公開可能な研究成果・発表実績を掲載しています。正式な書誌情報や公開リンクは確認できたものから追加します。" />
        <div className="mt-10 border-b border-ink/20">
          {publications.map((item) => (
            <div key={`${item.year}-${item.title}`} className="grid gap-4 border-t border-ink/20 py-7 sm:grid-cols-[100px_1fr_auto] sm:items-center">
              <p className="font-mono text-sm font-bold">{item.year}</p>
              <div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-ink/55">{item.venue} · {item.type}</p>
                <p className="mt-2 text-sm text-ink/55">{item.note}</p>
              </div>
              <span className="w-fit border border-ink/15 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-ink/45">Presentation</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="bg-[#e7e4dc] text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <p className="section-label text-ink/50">Skills</p>
        <h2 className="mt-5 font-display text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Tools I actually use.</h2>
        <div className="mt-14 grid gap-px bg-ink/15 md:grid-cols-2 xl:grid-cols-5">
          {skillGroups.map((group) => (
            <div key={group.title} className="bg-paper p-6 sm:p-7">
              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]">{group.title}</h3>
              <div className="mt-7 grid gap-3">
                {group.items.map((item) => <p key={item} className="border-t border-ink/12 pt-3 text-sm font-semibold text-ink/65">{item}</p>)}
              </div>
            </div>
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
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="section-label text-ink/55">About</p>
            <h2 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.07em]">Research, build, evaluate.</h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-ink/62 lg:col-span-7 lg:pt-12">
            <p>映像理解やマルチモーダルAIを中心に、研究とソフトウェア開発の両方に取り組んでいます。</p>
            <p>研究ではモデルを動かすこと自体を目的にせず、問題設定、データ設計、評価方法、失敗分析まで含めてシステム全体を考えることを重視しています。</p>
            <p>未知のテーマでは、まず問題を評価可能な単位へ分解し、小さな構成で動かしてから改善する進め方を好みます。将来的には、研究成果を実際に使われるプロダクトへ落とし込めるAIエンジニア・研究開発者を目指しています。</p>
          </div>
        </div>
        <div className="mt-16 border-b border-ink/20">
          {principles.map(([number, title, translation]) => (
            <div key={number} className="grid gap-3 border-t border-ink/20 py-6 sm:grid-cols-[60px_1fr_1fr] sm:items-center">
              <p className="font-mono text-[10px] text-ink/50">/{number}</p>
              <p className="font-display text-2xl font-semibold tracking-[-0.04em]">{title}</p>
              <p className="text-sm text-ink/55 sm:text-right">{translation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-signal text-ink">
      <div className="mx-auto max-w-[1540px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <p className="section-label">Contact</p>
        <h2 className="mt-8 font-display text-[clamp(4rem,13vw,11rem)] font-semibold leading-[0.8] tracking-[-0.075em]">Let's talk.</h2>
        <div className="mt-12 grid gap-8 border-t border-ink/25 pt-7 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-base leading-8 text-ink/65">AI・機械学習領域の長期インターン、研究開発、共同研究などについてご連絡ください。公開連絡先は確認後に追加し、現時点ではGitHubを主要な公開窓口としています。</p>
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className="group flex items-center justify-between bg-ink px-6 py-5 text-sm font-extrabold text-paper lg:col-span-5">
            Open GitHub <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const navIds = useMemo(() => navigation.map(([id]) => id), []);
  void navIds;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });
  return (
    <div className="min-h-screen overflow-x-clip bg-ink">
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-signal" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <WorkSection />
        <ExperienceSection />
        <PublicationsSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <footer className="bg-ink text-paper">
        <div className="mx-auto flex max-w-[1540px] flex-col gap-3 px-5 py-8 font-mono text-[9px] uppercase tracking-[0.14em] text-paper/50 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} YH · AI / Machine Learning Engineer</p>
          <a href="#home" className="inline-flex items-center gap-2 hover:text-signal">Back to top <ArrowRight size={12} className="-rotate-90" /></a>
        </div>
      </footer>
    </div>
  );
}
