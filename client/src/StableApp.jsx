import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bot,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Layers,
  Menu,
  Microscope,
  Moon,
  Pill,
  Search,
  Sparkles,
  Sun,
  Trophy,
  User,
  X
} from "lucide-react";
import { subjects, topicBank } from "./data/syllabus";

const navItems = [
  { id: "home", label: "Home", icon: Activity },
  { id: "subjects", label: "Subjects", icon: Layers },
  { id: "ai", label: "AI Chat", icon: Bot },
  { id: "mcq", label: "MCQs", icon: ClipboardList },
  { id: "revision", label: "Revision", icon: BookOpen },
  { id: "flashcards", label: "Flashcards", icon: Brain },
  { id: "progress", label: "Progress", icon: Trophy },
  { id: "planner", label: "Planner", icon: CalendarDays },
  { id: "profile", label: "Profile", icon: User }
];

const subjectIcons = {
  pathology: Activity,
  pharmacology: Pill,
  microbiology: Microscope
};

const demoUser = {
  name: "Doctor Gouri Sharma",
  username: "doctor gouri sharma",
  password: "1234"
};

function Card({ children, className = "" }) {
  return <div className={`glass premium-card rounded-[1.7rem] p-5 ${className}`}>{children}</div>;
}

function Button({ children, onClick, variant = "dark" }) {
  const styles =
    variant === "light"
      ? "bg-white text-clinic-700 dark:bg-white/10 dark:text-cyan-200"
      : "bg-clinic-950 text-white shadow-glow dark:bg-cyan-300 dark:text-clinic-950";
  return (
    <button onClick={onClick} className={`rounded-2xl px-5 py-3 font-black transition hover:-translate-y-1 ${styles}`}>
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <section className="mb-5">
      {eyebrow && <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.24em] text-clinic-700 dark:text-cyan-300">{eyebrow}</p>}
      <h2 className="text-balance font-display text-3xl font-extrabold tracking-tight text-clinic-950 dark:text-white sm:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-3xl text-base font-semibold text-slate-600 dark:text-slate-300">{subtitle}</p>}
    </section>
  );
}

function TopicCard({ topic, onOpen, completed, onDone }) {
  return (
    <Card>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-clinic-700 dark:text-cyan-300">{topic.subjectName}</p>
          <h3 className="mt-1 font-display text-xl font-extrabold">{topic.title}</h3>
        </div>
        {completed && <CheckCircle2 className="shrink-0 text-emerald-500" />}
      </div>
      <p className="line-clamp-2 text-sm font-semibold text-slate-600 dark:text-slate-300">{topic.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Button onClick={() => onOpen(topic)}>Study</Button>
        <Button onClick={() => onDone(topic.id)} variant="light">{completed ? "Done" : "Mark Done"}</Button>
      </div>
    </Card>
  );
}

function HomePage({ setPage, completed, openTopic }) {
  const featured = topicBank.slice(0, 6);
  return (
    <div className="space-y-6">
      <section className="glass premium-card overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">
              AI-powered MBBS 2nd Year study cockpit
            </p>
            <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight text-clinic-950 dark:text-white sm:text-6xl">
              Study Pathology, Pharmacology and Microbiology without getting lost.
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold text-slate-600 dark:text-slate-300">
              Notes, exam points, mnemonics, MCQs, viva questions, diagrams, PYQs, flashcards, planner, and AI-style explanations in one premium dashboard.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button onClick={() => setPage("subjects")}>Start Studying</Button>
              <Button onClick={() => setPage("ai")} variant="light">Ask AI Doubt</Button>
            </div>
          </div>
          <div className="animated-gradient rounded-[2rem] bg-gradient-to-br from-clinic-950 via-ocean-700 to-cyan-500 p-6 text-white shadow-glow">
            <div className="mb-8 flex items-center justify-between">
              <div className="pulse-ring rounded-2xl bg-white/15 p-3"><Bot size={34} /></div>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">Exam Mode</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold">Today's Smart Plan</h2>
            <div className="mt-5 space-y-3">
              {["Cell Injury rapid revision", "Antibiotics classification table", "Staining techniques flashcards"].map((item, index) => (
                <div key={item} className="rounded-2xl bg-white/12 p-4 font-bold backdrop-blur">{index + 1}. {item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card><Layers className="mb-4 text-clinic-700 dark:text-cyan-300" /><p className="text-3xl font-black">{topicBank.length}</p><p className="font-extrabold text-slate-600 dark:text-slate-300">High-yield topics</p></Card>
        <Card><BookOpen className="mb-4 text-clinic-700 dark:text-cyan-300" /><p className="text-3xl font-black">{subjects.length}</p><p className="font-extrabold text-slate-600 dark:text-slate-300">Subjects</p></Card>
        <Card><Trophy className="mb-4 text-clinic-700 dark:text-cyan-300" /><p className="text-3xl font-black">{completed.length}</p><p className="font-extrabold text-slate-600 dark:text-slate-300">Completed</p></Card>
        <Card><Sparkles className="mb-4 text-clinic-700 dark:text-cyan-300" /><p className="text-3xl font-black">7</p><p className="font-extrabold text-slate-600 dark:text-slate-300">Daily streak</p></Card>
      </div>

      <SectionTitle eyebrow="Continue" title="High-Yield Topics" subtitle="Beginner-friendly cards with complete exam sections." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((topic) => <TopicCard key={topic.id} topic={topic} onOpen={openTopic} completed={completed.includes(topic.id)} onDone={() => {}} />)}
      </div>
    </div>
  );
}

function SubjectsPage({ openTopic, completed, toggleCompleted }) {
  const [subjectId, setSubjectId] = useState("all");
  const topics = subjectId === "all" ? topicBank : topicBank.filter((topic) => topic.subjectId === subjectId);

  return (
    <div className="space-y-6">
      <SectionTitle eyebrow="Syllabus" title="Subjects" subtitle="Complete MBBS 2nd year syllabus organised into easy, exam-focused topics." />
      <div className="grid gap-4 lg:grid-cols-3">
        {subjects.map((subject) => {
          const Icon = subjectIcons[subject.id] || BookOpen;
          return (
            <button key={subject.id} onClick={() => setSubjectId(subject.id)} className={`premium-card animated-gradient rounded-[1.8rem] bg-gradient-to-br ${subject.color} p-6 text-left text-white shadow-glow transition hover:-translate-y-1`}>
              <div className="pulse-ring grid h-14 w-14 place-items-center rounded-2xl bg-white/18 backdrop-blur"><Icon size={34} /></div>
              <h3 className="mt-5 font-display text-2xl font-extrabold">{subject.name}</h3>
              <p className="mt-2 font-bold text-white/85">{subject.tagline}</p>
              <p className="mt-5 text-sm font-black">{subject.topics.length} topics</p>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setSubjectId("all")} variant={subjectId === "all" ? "dark" : "light"}>All Topics</Button>
        {subjects.map((subject) => <Button key={subject.id} onClick={() => setSubjectId(subject.id)} variant={subjectId === subject.id ? "dark" : "light"}>{subject.name}</Button>)}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic) => <TopicCard key={topic.id} topic={topic} onOpen={openTopic} completed={completed.includes(topic.id)} onDone={toggleCompleted} />)}
      </div>
    </div>
  );
}

function TopicDetail({ topic, toggleCompleted, completed }) {
  if (!topic) return null;
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow={topic.subjectName} title={topic.title} subtitle={topic.summary} />
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toggleCompleted(topic.id)}>{completed.includes(topic.id) ? "Completed" : "Mark Complete"}</Button>
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-5">
          <Card><h3 className="mb-3 font-display text-xl font-extrabold">Definition</h3><p className="font-semibold text-slate-700 dark:text-slate-300">{topic.definition}</p></Card>
          <Card><h3 className="mb-3 font-display text-xl font-extrabold">Causes</h3><ul className="space-y-2">{topic.causes.map((item) => <li key={item} className="rounded-2xl bg-white p-3 font-bold dark:bg-white/10">{item}</li>)}</ul></Card>
          <Card><h3 className="mb-3 font-display text-xl font-extrabold">Pathogenesis Flowchart</h3><div className="grid gap-2 sm:grid-cols-3">{topic.flowchart.map((step, index) => <div key={step} className="rounded-2xl bg-cyan-50 p-4 text-center font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">{index + 1}. {step}</div>)}</div></Card>
          <Card><h3 className="mb-3 font-display text-xl font-extrabold">Morphology / Important Table</h3><p className="font-semibold text-slate-700 dark:text-slate-300">{topic.morphology}</p></Card>
        </div>
        <div className="space-y-5">
          <Card><h3 className="mb-3 font-display text-xl font-extrabold">Clinical Features</h3><ul className="space-y-2">{topic.clinicalFeatures.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul></Card>
          <Card><h3 className="mb-3 font-display text-xl font-extrabold">Diagnosis</h3><ul className="space-y-2">{topic.diagnosis.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul></Card>
          <Card><h3 className="mb-3 font-display text-xl font-extrabold">Diagram Section</h3><div className="rounded-[1.5rem] border-2 border-dashed border-cyan-300 p-8 text-center font-black text-slate-500 dark:border-cyan-700 dark:text-slate-300">{topic.diagram}</div></Card>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card><h3 className="mb-3 font-display text-xl font-extrabold">Important Exam Points</h3><ul className="space-y-2">{topic.examPoints.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul></Card>
        <Card><h3 className="mb-3 font-display text-xl font-extrabold">Viva Questions</h3><ul className="space-y-2">{topic.viva.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul></Card>
        <Card><h3 className="mb-3 font-display text-xl font-extrabold">Mnemonics</h3><ul className="space-y-2">{topic.mnemonics.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul></Card>
      </div>
    </div>
  );
}

function AiPage() {
  const [messages, setMessages] = useState([{ role: "assistant", text: "Ask me any MBBS 2nd year doubt. I can explain topics, generate notes, MCQs, viva questions and mnemonics." }]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    const prompt = input.trim();
    setMessages((items) => [...items, { role: "user", text: prompt }, { role: "assistant", text: `Easy explanation for "${prompt}": start with definition, then mechanism, then exam points, viva questions and a quick mnemonic. For real AI answers, add API key in Render env.` }]);
    setInput("");
  };
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow="Doubt Solver" title="AI Chat Assistant" subtitle="Simple exam-friendly explanations and generated study material." />
      <Card className="min-h-[62vh]">
        <div className="space-y-3">
          {messages.map((message, index) => <div key={index} className={`rounded-2xl p-4 font-bold ${message.role === "user" ? "ml-auto bg-clinic-950 text-white dark:bg-cyan-300 dark:text-clinic-950" : "bg-white dark:bg-white/10"} max-w-3xl`}>{message.text}</div>)}
        </div>
        <div className="mt-5 flex gap-2">
          <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Explain anemia, beta blockers, HIV lab diagnosis..." className="flex-1 rounded-2xl bg-white p-4 font-bold outline-none ring-1 ring-slate-100 dark:bg-white/10 dark:ring-white/10" />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </div>
  );
}

function ToolsPage({ page, topics }) {
  const titleMap = {
    mcq: "MCQ Practice",
    revision: "Revision Notes",
    flashcards: "Flashcards",
    progress: "Progress Tracker",
    planner: "Daily Study Planner",
    profile: "Profile"
  };
  return (
    <div className="space-y-5">
      <SectionTitle eyebrow="Study Tool" title={titleMap[page]} subtitle="Fast, mobile-friendly tools for MBBS 2nd year revision." />
      {page === "profile" && <Card><h3 className="font-display text-2xl font-extrabold">{demoUser.name}</h3><p className="mt-2 font-bold text-slate-600 dark:text-slate-300">Username: {demoUser.username}</p><p className="font-bold text-slate-600 dark:text-slate-300">Password: {demoUser.password}</p></Card>}
      {page === "progress" && <div className="grid gap-4 md:grid-cols-3"><Card><p className="text-3xl font-black">7</p><p className="font-bold">Daily streak</p></Card><Card><p className="text-3xl font-black">{topics.length}</p><p className="font-bold">Topics available</p></Card><Card><p className="text-3xl font-black">Exam Ready</p><p className="font-bold">Mode active</p></Card></div>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.slice(0, 12).map((topic) => (
          <Card key={topic.id}>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-clinic-700 dark:text-cyan-300">{topic.subjectName}</p>
            <h3 className="mt-1 font-display text-xl font-extrabold">{topic.title}</h3>
            <p className="mt-3 font-semibold text-slate-600 dark:text-slate-300">{topic.summary}</p>
            <p className="mt-3 font-black text-clinic-700 dark:text-cyan-300">{topic.mnemonics[0]}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function StableApp() {
  const [page, setPage] = useState("home");
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    window.__MEDEASE_READY__ = true;
    document.getElementById("root")?.setAttribute("data-medease-ready", "true");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return topicBank.filter((topic) => topic.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  }, [query]);

  const openTopic = (topic) => {
    setSelectedTopic(topic);
    setPage("topic");
    setOpen(false);
    setQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCompleted = (topicId) => {
    setCompleted((items) => (items.includes(topicId) ? items.filter((id) => id !== topicId) : [...items, topicId]));
  };

  const content =
    page === "home" ? <HomePage setPage={setPage} completed={completed} openTopic={openTopic} /> :
    page === "subjects" ? <SubjectsPage openTopic={openTopic} completed={completed} toggleCompleted={toggleCompleted} /> :
    page === "topic" ? <TopicDetail topic={selectedTopic} completed={completed} toggleCompleted={toggleCompleted} /> :
    page === "ai" ? <AiPage /> :
    <ToolsPage page={page} topics={topicBank} />;

  const Sidebar = () => (
    <aside className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center gap-3 px-2">
        <div className="pulse-ring animated-gradient grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-clinic-500 via-cyan-400 to-ocean-600 text-white shadow-glow"><Sparkles size={24} /></div>
        <div><h1 className="font-display text-xl font-extrabold">MedEase AI</h1><p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">MBBS Year 2</p></div>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setPage(id); setOpen(false); }} className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-extrabold transition ${page === id ? "bg-clinic-950 text-white shadow-glow dark:bg-cyan-400 dark:text-clinic-950" : "text-slate-600 hover:bg-white hover:text-clinic-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"}`}>
            <Icon size={18} /> {label}
          </button>
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="medical-grid min-h-screen">
      <div className="aurora-field"><span /><span /><span /></div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px]">
        <div className="sticky top-0 hidden h-screen w-72 shrink-0 p-4 lg:block"><div className="glass h-full rounded-[2rem]"><Sidebar /></div></div>
        {open && <div className="fixed inset-0 z-50 bg-clinic-950/40 p-4 backdrop-blur-sm lg:hidden"><div className="glass h-full max-w-80 rounded-[2rem]"><button className="absolute right-7 top-7 rounded-full bg-white/80 p-2 dark:bg-white/10" onClick={() => setOpen(false)}><X size={18} /></button><Sidebar /></div></div>}
        <main className="w-full px-4 py-4 sm:px-6 lg:px-4">
          <header className="glass premium-card sticky top-3 z-30 mb-6 rounded-[1.6rem] p-3">
            <div className="flex items-center gap-3">
              <button className="rounded-2xl bg-white p-3 shadow-sm dark:bg-white/10 lg:hidden" onClick={() => setOpen(true)}><Menu size={20} /></button>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Cell Injury, Antibiotics, HIV..." className="w-full rounded-2xl border-0 bg-white px-12 py-3 font-bold outline-none ring-1 ring-slate-100 transition focus:ring-clinic-500 dark:bg-white/10 dark:ring-white/10" />
                {results.length > 0 && <div className="absolute left-0 right-0 top-14 z-40 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-100 dark:bg-clinic-950 dark:ring-white/10">{results.map((topic) => <button key={topic.id} onClick={() => openTopic(topic)} className="flex w-full items-center justify-between px-4 py-3 text-left font-bold hover:bg-clinic-50 dark:hover:bg-white/10"><span>{topic.title}</span><span className="text-xs text-slate-500">{topic.subjectName}</span></button>)}</div>}
              </div>
              <button onClick={() => setDarkMode(!darkMode)} className="rounded-2xl bg-clinic-950 p-3 text-white shadow-sm dark:bg-cyan-300 dark:text-clinic-950">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
            </div>
          </header>
          {content}
          <div className="fixed bottom-4 left-4 right-4 z-40 grid grid-cols-4 gap-2 rounded-[1.4rem] bg-clinic-950/90 p-2 text-white shadow-glow backdrop-blur-xl lg:hidden">
            {navItems.slice(0, 4).map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setPage(id)} className={`flex flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-black ${page === id ? "bg-cyan-300 text-clinic-950" : "text-white/80"}`}><Icon size={17} />{label.split(" ")[0]}</button>)}
          </div>
        </main>
      </div>
    </div>
  );
}
