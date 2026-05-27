import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Flame, Target, Trophy } from "lucide-react";
import { PageTitle, SectionCard, StatCard } from "../components/UI";
import { subjects, topicBank } from "../data/syllabus";
import { useApp } from "../context/AppContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ProgressTracker() {
  const { completed } = useApp();
  const chartData = {
    labels: subjects.map((subject) => subject.name),
    datasets: [
      {
        label: "Completed Topics",
        data: subjects.map((subject) => completed.filter((id) => id.startsWith(subject.id)).length),
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
        <StatCard icon={Target} label="Exam Readiness" value={`${Math.round((completed.length / topicBank.length) * 100)}%`} note="Based on completion" />
      </div>
      <SectionCard title="Subject-wise Progress">
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }} />
      </SectionCard>
    </div>
  );
}
