import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Activity, BookOpenCheck, Flame, Target, Trophy } from "lucide-react";
import { PageTitle, SectionCard, StatCard } from "../components/UI";
import { subjects, topicBank } from "../data/syllabus";
import { useApp } from "../context/AppContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ProgressTracker() {
  const { completed } = useApp();
  const subjectProgress = subjects.map((subject) => {
    const total = topicBank.filter((topic) => topic.subjectId === subject.id).length;
    const done = completed.filter((id) => id.startsWith(subject.id)).length;
    return { ...subject, total, done, percent: total ? Math.round((done / total) * 100) : 0 };
  });
  const weakest = subjectProgress.reduce((lowest, subject) => (subject.percent < lowest.percent ? subject : lowest), subjectProgress[0]);
  const readiness = Math.round((completed.length / topicBank.length) * 100);
  const dailyGoal = Math.min(100, Math.round((completed.length / 5) * 100));
  const chartData = {
    labels: subjects.map((subject) => subject.name),
    datasets: [
      {
        label: "Completed Topics",
        data: subjectProgress.map((subject) => subject.done),
        backgroundColor: ["#fb7185", "#38bdf8", "#34d399"],
        borderRadius: 12
      }
    ]
  };

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Analytics" title="Progress Tracker" subtitle="Track completion, streaks, bookmarks, weak topics and subject-wise test readiness." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Trophy} label="Completed Topics" value={completed.length} note={`${topicBank.length} total topics`} />
        <StatCard icon={Flame} label="Daily Streak" value="7 days" note="Demo streak system" />
        <StatCard icon={Target} label="Exam Readiness" value={`${readiness}%`} note="Based on completion" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Subject-wise Progress">
          <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
        </SectionCard>
        <SectionCard title="Today Dashboard">
          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-4 dark:bg-white/10">
              <p className="mb-2 flex items-center gap-2 font-black"><Activity size={18} /> Daily Goal</p>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                <div className="h-full rounded-full bg-cyan-400" style={{ width: `${dailyGoal}%` }} />
              </div>
              <p className="mt-2 text-sm font-bold text-slate-500">Target: complete 5 high-yield topics today.</p>
            </div>
            <div className="rounded-3xl bg-rose-50 p-4 dark:bg-rose-400/10">
              <p className="font-black text-rose-600 dark:text-rose-200">Weak Focus: {weakest?.name}</p>
              <p className="mt-1 text-sm font-bold text-slate-600 dark:text-slate-300">Start with quick notes, then 20 MCQs and one viva drill.</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {subjectProgress.map((subject) => (
          <SectionCard key={subject.id} title={subject.name}>
            <div className="mb-3 flex items-center justify-between font-black">
              <span>{subject.done}/{subject.total} topics</span>
              <span>{subject.percent}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
              <div className="h-full rounded-full bg-cyan-400" style={{ width: `${subject.percent}%` }} />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-500">Next step: revise unfinished topics, mark complete, then attempt topic-wise MCQs.</p>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Exam Readiness Checklist">
        <div className="grid gap-3 md:grid-cols-2">
          {["Definitions + pathogenesis revised", "Drug classifications memorized", "Lab diagnosis tables practiced", "PYQs solved once", "Weak topics bookmarked", "One-night notes ready"].map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold dark:bg-white/10">
              <BookOpenCheck className={index < Math.ceil(readiness / 20) ? "text-emerald-500" : "text-slate-400"} size={20} />
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
