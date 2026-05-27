import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Bot,
  BookOpen,
  Brain,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Home,
  Layers,
  LogIn,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  Target,
  Trophy,
  User,
  X
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { topicBank } from "../data/syllabus";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/subjects", label: "Subjects", icon: Layers },
  { to: "/ai-chat", label: "AI Chat", icon: Bot },
  { to: "/mcqs", label: "MCQs", icon: ClipboardList },
  { to: "/revision", label: "Revision", icon: BookOpen },
  { to: "/pyq", label: "PYQ", icon: GraduationCap },
  { to: "/flashcards", label: "Flashcards", icon: Brain },
  { to: "/progress", label: "Progress", icon: Trophy },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/profile", label: "Profile", icon: User }
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { darkMode, setDarkMode, user } = useApp();
  const navigate = useNavigate();

  const results = query.trim()
    ? topicBank.filter((topic) => topic.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  const Sidebar = () => (
    <aside className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center gap-3 px-2">
        <div className="pulse-ring animated-gradient grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-clinic-500 via-cyan-400 to-ocean-600 text-white shadow-glow">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="font-display text-xl font-extrabold">MedEase AI</h1>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">MBBS Year 2</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {nav.map(({ to, label, icon: Icon }, index) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm font-extrabold transition duration-300 ${
                isActive
                  ? "bg-clinic-950 text-white shadow-glow dark:bg-cyan-400 dark:text-clinic-950"
                  : "text-slate-600 hover:bg-white hover:text-clinic-700 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <motion.span layoutId="activeNav" className="absolute inset-0 -z-10 rounded-2xl bg-clinic-950 dark:bg-cyan-400" transition={{ type: "spring", stiffness: 320, damping: 28 }} />}
                <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.025 }} className="flex items-center gap-3">
                  <Icon size={18} />
                  {label}
                </motion.span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/login"
        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200"
      >
        <LogIn size={18} />
        {user ? "Account" : "Login / Register"}
      </NavLink>
    </aside>
  );

  return (
    <div className="medical-grid min-h-screen">
      <div className="aurora-field">
        <span />
        <span />
        <span />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px]">
        <div className="sticky top-0 hidden h-screen w-72 shrink-0 p-4 lg:block">
          <div className="glass h-full rounded-[2rem]">
            <Sidebar />
          </div>
        </div>

        <AnimatePresence>
          {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-clinic-950/40 p-4 backdrop-blur-sm lg:hidden">
            <motion.div initial={{ x: -60, opacity: 0, scale: 0.98 }} animate={{ x: 0, opacity: 1, scale: 1 }} exit={{ x: -60, opacity: 0, scale: 0.98 }} transition={{ type: "spring", stiffness: 260, damping: 24 }} className="glass h-full max-w-80 rounded-[2rem]">
              <button className="absolute right-7 top-7 rounded-full bg-white/80 p-2 dark:bg-white/10" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
              <Sidebar />
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>

        <main className="w-full px-4 py-4 sm:px-6 lg:px-4">
          <header className="glass premium-card sticky top-3 z-30 mb-6 rounded-[1.6rem] p-3">
            <div className="flex items-center gap-3">
              <button className="rounded-2xl bg-white p-3 shadow-sm transition hover:scale-105 dark:bg-white/10 lg:hidden" onClick={() => setOpen(true)}>
                <Menu size={20} />
              </button>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search Cell Injury, Antibiotics, HIV..."
                  className="w-full rounded-2xl border-0 bg-white px-12 py-3 font-bold outline-none ring-1 ring-slate-100 transition duration-300 focus:-translate-y-0.5 focus:shadow-glow focus:ring-clinic-500 dark:bg-white/10 dark:ring-white/10"
                />
                <AnimatePresence>
                  {results.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} className="absolute left-0 right-0 top-14 z-40 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-100 dark:bg-clinic-950 dark:ring-white/10">
                    {results.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => {
                          setQuery("");
                          navigate(`/topic/${topic.id}`);
                        }}
                        className="flex w-full items-center justify-between px-4 py-3 text-left font-bold hover:bg-clinic-50 dark:hover:bg-white/10"
                      >
                        <span>{topic.title}</span>
                        <span className="text-xs text-slate-500">{topic.subjectName}</span>
                      </button>
                    ))}
                  </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-2xl bg-clinic-950 p-3 text-white shadow-sm transition hover:rotate-6 hover:scale-105 dark:bg-cyan-300 dark:text-clinic-950"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>
          <Outlet />
          <div className="fixed bottom-4 left-4 right-4 z-40 grid grid-cols-4 gap-2 rounded-[1.4rem] bg-clinic-950/90 p-2 text-white shadow-glow backdrop-blur-xl lg:hidden">
            {nav.slice(0, 4).map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `flex flex-col items-center rounded-2xl px-2 py-2 text-[11px] font-black ${isActive ? "bg-cyan-300 text-clinic-950" : "text-white/80"}`}>
                <Icon size={17} />
                {label.split(" ")[0]}
              </NavLink>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
