import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  FileText,
  History,
  MessageSquareText,
  PenTool,
  Sparkles,
  Zap,
} from "lucide-react";

const tools = [
  { icon: PenTool, title: "Long-form writing", text: "Turn a topic into blog outlines, full articles, and polished rewrites." },
  { icon: MessageSquareText, title: "Social content", text: "Create captions, hashtags, ad copy, and platform-ready ideas in seconds." },
  { icon: Code2, title: "Developer helpers", text: "Explain code, generate snippets, and make technical concepts easier to understand." },
  { icon: FileText, title: "Everyday communication", text: "Draft emails, improve text, summarize ideas, and remove blank-page friction." },
];

const steps = [
  ["01", "Choose a template", "Pick the format that matches what you want to create."],
  ["02", "Add your context", "Give ContGen a topic, tone, audience, or source text."],
  ["03", "Generate and refine", "Get an editable draft, copy it, and revisit it from history."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070b14]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="ContGen home">
            <Image src="/logo.svg" alt="" width={42} height={42} className="h-9 w-9 rounded-xl sm:h-10 sm:w-10" priority />
            <span className="text-lg font-bold tracking-tight">ContGen</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <Link href="#features" className="transition hover:text-white">Features</Link>
            <Link href="#how-it-works" className="transition hover:text-white">How it works</Link>
            <Link href="/contact" className="transition hover:text-white">Contact</Link>
          </div>
          <Link href="/dashboard" className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 sm:px-5">
            Go To Dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-[34rem] max-w-5xl rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" /> AI content workspace
            </div>
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Go from a rough idea to <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">ready-to-use content.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              ContGen is a focused AI writing toolkit for creators, students, marketers, and developers. Choose a template, add context, and generate a strong first draft without wrestling with prompts.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5">
                Start creating <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#features" className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 font-semibold transition hover:bg-white/10">
                Explore the toolkit
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              {["Multiple content templates", "Editable output", "Saved generation history"].map((item) => (
                <span key={item} className="flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-3 shadow-2xl shadow-black/40 backdrop-blur">
              <div className="rounded-[1.4rem] border border-white/10 bg-[#0d1422] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div><p className="text-xs uppercase tracking-[0.18em] text-slate-500">Content studio</p><h2 className="mt-1 font-semibold">Blog idea & outline</h2></div>
                  <div className="rounded-xl bg-cyan-300/10 p-2.5 text-cyan-300"><Sparkles className="h-5 w-5" /></div>
                </div>
                <div className="space-y-5 py-6">
                  <div><p className="mb-2 text-xs font-medium text-slate-400">Your topic</p><div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">How small teams can build a sustainable content system</div></div>
                  <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-xs text-slate-500">Tone</p><p className="mt-1 text-sm">Clear & practical</p></div><div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-xs text-slate-500">Audience</p><p className="mt-1 text-sm">Startup teams</p></div></div>
                  <div className="rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 p-[1px]"><div className="rounded-[11px] bg-[#101827] p-4"><div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Zap className="h-4 w-4 text-cyan-300" />Generated outline</div><div className="space-y-2">{["Start with one repeatable workflow", "Build a useful idea backlog", "Measure signal, not noise"].map((line) => <div key={line} className="h-8 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300">{line}</div>)}</div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-white/10 bg-white/[0.025] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">One workspace, many formats</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Useful tools for the work you already do.</h2><p className="mt-5 text-slate-400">Skip generic chat threads. Each template asks for the context needed to produce a more relevant first draft.</p></div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.07]"><div className="mb-5 inline-flex rounded-xl bg-white/10 p-3 text-cyan-300"><Icon className="h-5 w-5" /></div><h3 className="font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
            <div className="lg:sticky lg:top-28"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">A simple workflow</p><h2 className="mt-4 text-3xl font-bold sm:text-5xl">Less prompting. More creating.</h2><p className="mt-5 leading-7 text-slate-400">ContGen keeps generation, editing, credit tracking, and history together so your ideas do not disappear into scattered chats.</p></div>
            <div className="space-y-4">{steps.map(([number, title, text]) => <article key={number} className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-[4rem_1fr] sm:p-7"><span className="text-2xl font-bold text-cyan-300">{number}</span><div><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 leading-7 text-slate-400">{text}</p></div></article>)}</div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/20 via-violet-500/15 to-transparent p-7 sm:p-12 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-2xl"><div className="mb-4 flex items-center gap-2 text-cyan-200"><History className="h-5 w-5" /><span className="text-sm font-semibold uppercase tracking-wider">Your ideas, organized</span></div><h2 className="text-3xl font-bold sm:text-4xl">Create your next draft while the idea is fresh.</h2><p className="mt-4 text-slate-300">Open the dashboard, choose a template, and let ContGen get the first version moving.</p></div>
          <Link href="/dashboard" className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-slate-950 transition hover:bg-cyan-100 lg:mt-0">Launch ContGen <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p>© {new Date().getFullYear()} ContGen. Create faster. Think further.</p><div className="flex gap-5"><Link href="/contact" className="hover:text-white">Contact</Link><Link href="/dashboard/Privacy_Policy" className="hover:text-white">Privacy</Link><Link href="/dashboard/T&C" className="hover:text-white">Terms</Link></div></div>
      </footer>
    </main>
  );
}
