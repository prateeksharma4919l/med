import { useMemo, useState } from "react";
import { Clock, Trophy } from "lucide-react";
import { PageTitle, SectionCard } from "../components/UI";
import { topicBank } from "../data/syllabus";

export default function McqPractice() {
  const questions = useMemo(() => topicBank.flatMap((topic) => topic.mcqs.map((mcq) => ({ ...mcq, topic: topic.title }))).slice(0, 30), []);
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
      <PageTitle eyebrow="Practice" title="MCQ Practice with Timer" subtitle="Topic-linked questions for daily quiz, exam mode and subject-wise test series." />
      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Timer">
          <p className="flex items-center gap-2 text-3xl font-black"><Clock /> 14:52</p>
          <p className="mt-2 font-semibold text-slate-500">Demo countdown. Backend-ready for test sessions.</p>
        </SectionCard>
        <SectionCard title="Score">
          <p className="flex items-center gap-2 text-3xl font-black"><Trophy /> {score}/{current + (selected ? 1 : 0)}</p>
          <p className="mt-2 font-semibold text-slate-500">Instant feedback after each option.</p>
        </SectionCard>
        <SectionCard title="Mode">
          <p className="text-3xl font-black">Daily Quiz</p>
          <p className="mt-2 font-semibold text-slate-500">Switchable to exam mode and one-night revision mode.</p>
        </SectionCard>
      </div>
      <SectionCard title={`Question ${current + 1} of ${questions.length} - ${question.topic}`}>
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
          <button onClick={next} className="mt-5 rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white dark:bg-cyan-300 dark:text-clinic-950">
            Next Question
          </button>
        )}
      </SectionCard>
    </div>
  );
}
