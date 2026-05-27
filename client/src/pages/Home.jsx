import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Bot, BookOpen, Brain, CalendarCheck, Clock3, Flame, Layers, Trophy } from "lucide-react";
import { PageTitle, StatCard, TopicCard } from "../components/UI";
import { subjects, topicBank } from "../data/syllabus";
import { useApp } from "../context/AppContext";

const spring = { type: "spring", stiffness: 220, damping: 22 };

export default function Home() {
  const { completed, bookmarks } = useApp();
  const featured = topicBank.slice(0, 6);

  return (
    <div className="space-y-6 pb-24 lg:pb-10">
      <section className="glass premium-card overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
            <motion.p initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 }} className="mb-3 inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">
              AI-powered MBBS 2nd Year study cockpit
            </motion.p>
            <h1 className="text-balance font-display text-4xl font-extrabold tracking-tight text-clinic-950 dark:text-white sm:text-6xl">
              Study Pathology, Pharmacology and Microbiology without getting lost.
            </h1>
            <p className="mt-4 max-w-3xl text-lg font-semibold text-slate-600 dark:text-slate-300">
              Notes, exam points, mnemonics, MCQs, viva questions, diagrams, PYQs, flashcards, Pomodoro planning, and AI explanations in one clean dashboard.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/subjects" className="animated-gradient rounded-2xl bg-gradient-to-r from-clinic-950 via-ocean-700 to-clinic-950 px-6 py-3 font-black text-white shadow-glow transition hover:-translate-y-1 dark:from-cyan-300 dark:via-white dark:to-cyan-300 dark:text-clinic-950">
                Start Studying
              </Link>
              <Link to="/ai-chat" className="rounded-2xl bg-white px-6 py-3 font-black text-clinic-700 shadow-sm transition hover:-translate-y-1 hover:shadow-glow dark:bg-white/10 dark:text-cyan-200">
                Ask AI Doubt
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94, rotate: -1 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} whileHover={{ y: -6, rotate: 0.8 }} transition={{ type: "spring", stiffness: 180, damping: 18 }} className="animated-gradient rounded-[2rem] bg-gradient-to-br from-clinic-950 via-ocean-700 to-cyan-500 p-6 text-white shadow-glow">
            <div className="mb-8 flex items-center justify-between">
              <div className="pulse-ring rounded-2xl bg-white/15 p-3">
                <Bot size={34} />
              </div>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">Exam Mode</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold">Today's Smart Plan</h2>
            <div className="mt-5 space-y-3">
              {["Cell Injury rapid revision", "Antibiotics classification table", "Staining techniques flashcards"].map((item, index) => (
                <motion.div key={item} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.22 + index * 0.08 }} className="rounded-2xl bg-white/12 p-4 font-bold backdrop-blur">
                  {index + 1}. {item}
                </motion.div>
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
          <motion.div key={title} whileHover={{ y: -8, scale: 1.015 }} className="glass premium-card rounded-[1.7rem] p-6">
            <Icon className="mb-4 text-clinic-700 dark:text-cyan-300" size={28} />
            <h3 className="font-display text-xl font-extrabold">{title}</h3>
            <p className="mt-2 font-semibold text-slate-600 dark:text-slate-300">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
