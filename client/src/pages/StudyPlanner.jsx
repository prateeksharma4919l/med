import { useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Flame, TimerReset, Wand2 } from "lucide-react";
import api from "../api";
import { PageTitle, SectionCard } from "../components/UI";

export default function StudyPlanner() {
  const [examDate, setExamDate] = useState("");
  const [weakSubject, setWeakSubject] = useState("Pathology");
  const [plan, setPlan] = useState([
    "Morning: Cell Injury + Necrosis short notes",
    "Afternoon: Antibiotics classification + MCQs",
    "Evening: Immunology flashcards + PYQs"
  ]);
  const [focus, setFocus] = useState(25);
  const examDays = examDate ? Math.max(0, Math.ceil((new Date(examDate) - new Date()) / 86400000)) : null;

  const generatePlan = async () => {
    try {
      const { data } = await api.post("/ai/study-plan", { examDate, weakSubject });
      setPlan(data.plan);
    } catch {
      setPlan([`Revise ${weakSubject} basics`, "Solve 30 MCQs", "Review PYQs and viva questions", "End with flashcards"]);
    }
  };

  const setOneNightPlan = () => {
    setPlan([
      `${weakSubject}: definitions + most repeated exam points`,
      "Draw 5 flowcharts from memory",
      "Solve PYQ-only mode for 45 minutes",
      "Revise mnemonics, tables and viva questions",
      "Sleep after quick flashcard recall"
    ]);
  };

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Daily Routine" title="Daily Study Planner" subtitle="AI-based schedule, Pomodoro timer, exam countdown, reminders and daily targets." />
      <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Plan Inputs">
          <label className="mb-2 block font-black">Exam Date</label>
          <input type="date" value={examDate} onChange={(event) => setExamDate(event.target.value)} className="mb-4 w-full rounded-2xl bg-white p-3 font-bold outline-none ring-1 ring-slate-100 dark:bg-white/10 dark:ring-white/10" />
          <label className="mb-2 block font-black">Weak Subject</label>
          <select value={weakSubject} onChange={(event) => setWeakSubject(event.target.value)} className="mb-4 w-full rounded-2xl bg-white p-3 font-bold outline-none ring-1 ring-slate-100 dark:bg-white/10 dark:ring-white/10">
            <option>Pathology</option>
            <option>Pharmacology</option>
            <option>Microbiology</option>
          </select>
          <div className="flex flex-wrap gap-3">
            <button onClick={generatePlan} className="rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white dark:bg-cyan-300 dark:text-clinic-950">
              <Wand2 className="mr-2 inline" size={18} /> Generate AI Plan
            </button>
            <button onClick={setOneNightPlan} className="rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
              One-night Plan
            </button>
          </div>
        </SectionCard>
        <SectionCard title="Today's Schedule">
          <div className="space-y-3">
            {plan.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 font-bold transition hover:-translate-y-1 hover:shadow-lg dark:bg-white/10">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-100 text-clinic-700 dark:bg-cyan-300 dark:text-clinic-950">{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Pomodoro">
          <p className="flex items-center gap-2 text-3xl font-black"><TimerReset /> {focus}:00</p>
          <p className="mt-2 text-sm font-bold text-slate-500">{focus === 25 ? "Deep focus: phone away, one topic only." : "Break: water, walk, reset eyes."}</p>
          <button onClick={() => setFocus(focus === 25 ? 5 : 25)} className="mt-4 rounded-2xl bg-white px-4 py-3 font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">Switch Focus/Break</button>
        </SectionCard>
        <SectionCard title="Exam Countdown">
          <p className="flex items-center gap-2 text-3xl font-black"><CalendarDays /> {examDays === null ? "Add date" : `${examDays} days`}</p>
          <p className="mt-2 font-semibold text-slate-500">{examDays === null ? "Set exam date to unlock countdown." : examDays <= 7 ? "Use rapid revision + PYQ mode daily." : "You have time for concept-first study."}</p>
        </SectionCard>
        <SectionCard title="Reminder">
          <p className="flex items-center gap-2 text-3xl font-black"><Clock /> 8 PM</p>
          <p className="mt-2 font-semibold text-slate-500">Notification-ready reminder card.</p>
        </SectionCard>
      </div>
      <SectionCard title="Daily Goal Checklist">
        <div className="grid gap-3 md:grid-cols-4">
          {["2 topics", "30 MCQs", "10 flashcards", "1 PYQ set"].map((goal) => (
            <div key={goal} className="flex items-center gap-3 rounded-2xl bg-white p-4 font-black dark:bg-white/10">
              <CheckCircle2 className="text-emerald-500" size={20} /> {goal}
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 font-bold text-slate-500"><Flame className="text-orange-500" size={18} /> Streak tip: finish the smallest goal first to keep momentum.</p>
      </SectionCard>
    </div>
  );
}
