import { useMemo, useState } from "react";
import { BarChart3, Clock, Target, Trophy } from "lucide-react";
import { PageTitle, SectionCard } from "../components/UI";
import { topicBank } from "../data/syllabus";

export default function McqPractice() {
  const questions = useMemo(
    () => topicBank.flatMap((topic) => topic.mcqs.map((mcq) => ({ ...mcq, topic: topic.title, subject: topic.subjectName, difficulty: topic.difficulty }))).slice(0, 30),
    []
  );
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const question = questions[current];

  const choose = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  };

  const next = () => {
    setSelected("");
    setCurrent((value) => (value + 1) % questions.length);
  };

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Practice" title="MCQ Practice with Timer" subtitle="Topic-wise questions, difficulty labels, instant explanation and weak-topic tracking." />
      <div className="grid gap-4 md:grid-cols-4">
        <SectionCard title="Timer">
          <p className="flex items-center gap-2 text-3xl font-black"><Clock /> 14:52</p>
          <p className="mt-2 font-semibold text-slate-500">Exam-mode timer ready.</p>
        </SectionCard>
        <SectionCard title="Score">
          <p className="flex items-center gap-2 text-3xl font-black"><Trophy /> {score}/{current + (selected ? 1 : 0)}</p>
          <p className="mt-2 font-semibold text-slate-500">Instant feedback.</p>
        </SectionCard>
        <SectionCard title="Mode">
          <p className="text-3xl font-black">Daily Quiz</p>
          <p className="mt-2 font-semibold text-slate-500">Mock test ready.</p>
        </SectionCard>
        <SectionCard title="Weak Topic">
          <p className="flex items-center gap-2 text-xl font-black"><Target /> {selected && selected !== question.answer ? question.topic : "None"}</p>
          <p className="mt-2 font-semibold text-slate-500">Wrong answers become targets.</p>
        </SectionCard>
      </div>
      <SectionCard title={`Question ${current + 1} of ${questions.length} - ${question.topic}`}>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">{question.subject}</span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700 dark:bg-white/10 dark:text-amber-200">{question.difficulty}</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-white/10 dark:text-emerald-200">Explanation included</span>
        </div>
        <p className="text-xl font-black">{question.question}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => choose(option)}
              className={`rounded-2xl p-4 text-left font-black transition ${
                selected && option === question.answer
                  ? "bg-emerald-500 text-white"
                  : selected === option
                    ? "bg-rose-500 text-white"
                    : "bg-white hover:bg-clinic-50 dark:bg-white/10 dark:hover:bg-white/15"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-5 rounded-2xl bg-white p-4 dark:bg-white/10">
            <p className="flex items-center gap-2 font-black text-clinic-700 dark:text-cyan-300"><BarChart3 size={18} /> AI-style Explanation</p>
            <p className="mt-2 font-semibold text-slate-600 dark:text-slate-300">{question.explanation || "Revise definition, classification and the most important exam clue."}</p>
            <button onClick={next} className="mt-4 rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white dark:bg-cyan-300 dark:text-clinic-950">
              Next Question
            </button>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
