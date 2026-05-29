import { Bookmark, CheckCircle2, Download, LogOut, Moon, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTitle, SectionCard } from "../components/UI";
import { useApp } from "../context/AppContext";
import { topicBank } from "../data/syllabus";

export default function Profile() {
  const { user, logout, bookmarks, completed, darkMode, setDarkMode } = useApp();
  const saved = topicBank.filter((topic) => bookmarks.includes(topic.id));
  const completion = Math.round((completed.length / topicBank.length) * 100);

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Account" title="Profile" subtitle="Your study identity, saved topics, progress, streaks and preferences." />
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Student Profile">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[1.5rem] bg-clinic-950 text-white shadow-xl shadow-cyan-900/20 dark:bg-cyan-300 dark:text-clinic-950">
              <UserRound size={34} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-extrabold">{user?.name || "Guest Student"}</h3>
              <p className="font-bold text-slate-500">{user?.email || "Login to sync progress with MongoDB"}</p>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-300/15 dark:text-emerald-200">
                <ShieldCheck size={14} /> Demo secure login active
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {user ? (
              <button onClick={logout} className="rounded-2xl bg-white px-5 py-3 font-black text-rose-600 shadow-sm dark:bg-white/10">
                <LogOut className="mr-2 inline" size={18} /> Logout
              </button>
            ) : (
              <Link to="/login" className="inline-block rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white dark:bg-cyan-300 dark:text-clinic-950">Login / Register</Link>
            )}
            <button onClick={() => setDarkMode(!darkMode)} className="rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
              <Moon className="mr-2 inline" size={18} /> {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </SectionCard>
        <SectionCard title="Stats">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 dark:bg-white/10"><p className="text-3xl font-black">{completed.length}</p><p className="font-bold text-slate-500">Completed</p></div>
            <div className="rounded-2xl bg-white p-4 dark:bg-white/10"><p className="text-3xl font-black">{bookmarks.length}</p><p className="font-bold text-slate-500">Bookmarks</p></div>
            <div className="rounded-2xl bg-white p-4 dark:bg-white/10"><p className="text-3xl font-black">7</p><p className="font-bold text-slate-500">Streak</p></div>
          </div>
          <div className="mt-5 rounded-3xl bg-cyan-100 p-4 dark:bg-cyan-300/15">
            <div className="mb-2 flex items-center justify-between font-black">
              <span>Overall completion</span>
              <span>{completion}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/70 dark:bg-white/10">
              <div className="h-full rounded-full bg-clinic-950 dark:bg-cyan-300" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </SectionCard>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Study Preferences">
          <div className="space-y-3">
            {["Exam mode first", "Beginner explanations", "Daily MCQ practice"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold dark:bg-white/10">
                <CheckCircle2 className="text-emerald-500" size={18} /> {item}
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Offline Notes">
          <p className="font-semibold text-slate-600 dark:text-slate-300">PDF download hooks are ready for deployment. Use this card as the student-facing notes export area.</p>
          <button className="mt-4 rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
            <Download className="mr-2 inline" size={18} /> Download Revision Pack
          </button>
        </SectionCard>
        <SectionCard title="Demo Credentials">
          <div className="rounded-3xl bg-clinic-950 p-5 text-white dark:bg-white/10">
            <p className="font-black">Username: doctor gouri sharma</p>
            <p className="mt-2 font-black">Password: 1234</p>
            <p className="mt-3 text-sm font-semibold text-cyan-100">Temporary login remains active for Render testing.</p>
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Bookmarked Topics">
        <div className="grid gap-3 md:grid-cols-2">
          {saved.length ? saved.map((topic) => (
            <Link key={topic.id} to={`/topic/${topic.id}`} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-black dark:bg-white/10">
              <Bookmark className="text-amber-500" size={18} /> {topic.title}
            </Link>
          )) : <p className="font-semibold text-slate-500">No bookmarks yet.</p>}
        </div>
      </SectionCard>
    </div>
  );
}
