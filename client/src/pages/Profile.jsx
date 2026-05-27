import { Bookmark, LogOut, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { PageTitle, SectionCard } from "../components/UI";
import { useApp } from "../context/AppContext";
import { topicBank } from "../data/syllabus";

export default function Profile() {
  const { user, logout, bookmarks, completed } = useApp();
  const saved = topicBank.filter((topic) => bookmarks.includes(topic.id));

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Account" title="Profile" subtitle="Your study identity, saved topics, progress, streaks and preferences." />
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Student Profile">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[1.5rem] bg-clinic-950 text-white dark:bg-cyan-300 dark:text-clinic-950">
              <UserRound size={34} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-extrabold">{user?.name || "Guest Student"}</h3>
              <p className="font-bold text-slate-500">{user?.email || "Login to sync progress with MongoDB"}</p>
            </div>
          </div>
          {user ? (
            <button onClick={logout} className="mt-6 rounded-2xl bg-white px-5 py-3 font-black text-rose-600 shadow-sm dark:bg-white/10">
              <LogOut className="mr-2 inline" size={18} /> Logout
            </button>
          ) : (
            <Link to="/login" className="mt-6 inline-block rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white dark:bg-cyan-300 dark:text-clinic-950">Login / Register</Link>
          )}
        </SectionCard>
        <SectionCard title="Stats">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 dark:bg-white/10"><p className="text-3xl font-black">{completed.length}</p><p className="font-bold text-slate-500">Completed</p></div>
            <div className="rounded-2xl bg-white p-4 dark:bg-white/10"><p className="text-3xl font-black">{bookmarks.length}</p><p className="font-bold text-slate-500">Bookmarks</p></div>
            <div className="rounded-2xl bg-white p-4 dark:bg-white/10"><p className="text-3xl font-black">7</p><p className="font-bold text-slate-500">Streak</p></div>
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
