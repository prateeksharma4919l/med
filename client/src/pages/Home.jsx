import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, BookOpen, Brain, CalendarCheck, Clock3, Flame, Layers, Trophy } from "lucide-react";
import { PageTitle, StatCard, TopicCard } from "../components/UI";
import { subjects, topicBank } from "../data/syllabus";
import { useApp } from "../context/AppContext";

export default function Home() {
  const { completed, bookmarks } = useApp();
  const featured = topicBank.slice(0, 6);

  return (
    <div className="space-y-6 pb-10">
      <section className="glass overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-3 inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">
              AI-powered MBBS 2nd Year study cockpit
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-clinic-950 dark:text-white sm:text-6xl">
              Study Pathology, Pharmacology and Microbiology without getting lost.
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold text-slate-600 dark:text-slate-300">
              Notes, exam points, mnemonics, MCQs, viva questions, diagrams, PYQs, flashcards, Pomodoro planning, and AI explanations in one clean dashboard.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/subjects" className="rounded-2xl bg-clinic-950 px-6 py-3 font-black text-white shadow-glow dark:bg-cyan-300 dark:text-clinic-950">
                Start Studying
              </Link>
              <Link to="/ai-chat" className="rounded-2xl bg-white px-6 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
                Ask AI Doubt
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="rounded-[2rem] bg-gradient-to-br from-clinic-950 to-ocean-700 p-6 text-white shadow-glow">
            <div className="mb-8 flex items-center justify-between">
              <Bot size={34} />
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">Exam Mode</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold">Today’s Smart Plan</h2>
            <div className="mt-5 space-y-3">
              {["Cell Injury rapid revision", "Antibiotics classification table", "Staining techniques flashcards"].map((item, index) => (
                <div key={item} className="rounded-2xl bg-white/12 p-4 font-bold">
                  {index + 1}. {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Layers} label="High-yield topics" value={topicBank.length} note="Topic-wise full syllabus base" />
        <StatCard icon={BookOpen} label="Subjects" value={subjects.length} note="Path, Pharma, Micro" />
        <StatCard icon={Trophy} label="Completed" value={completed.length} note="Saved locally and backend-ready" />
        <StatCard icon={Flame} label="Daily streak" value="7" note="Keep the chain alive" />
      </div>

      <PageTitle eyebrow="Continue" title="High-Yield Topics" subtitle="Beginner-friendly cards with AI-ready topic pages." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((topic) => (
          <TopicCard key={topic.id} topic={topic} completed={completed.includes(topic.id)} bookmarked={bookmarks.includes(topic.id)} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { icon: Brain, title: "One-night revision", text: "Condensed summaries, exam bullets, mnemonics and PYQs for fast revision." },
          { icon: Clock3, title: "Pomodoro timer", text: "Plan 25-minute focus rounds and track daily study rhythm." },
          { icon: CalendarCheck, title: "Exam countdown", text: "Build a study plan based on your exam date and weak subjects." }
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass rounded-[1.7rem] p-6">
            <Icon className="mb-4 text-clinic-700 dark:text-cyan-300" size={28} />
            <h3 className="font-display text-xl font-extrabold">{title}</h3>
            <p className="mt-2 font-semibold text-slate-600 dark:text-slate-300">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
