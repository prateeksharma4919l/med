import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { PageTitle } from "../components/UI";
import { topicBank } from "../data/syllabus";

export default function Flashcards() {
  const cards = topicBank.slice(0, 30).map((topic) => ({ front: topic.title, back: topic.summary }));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Active Recall" title="Flashcards" subtitle="Tap to reveal quick summaries, then move to the next high-yield topic." />
      <button onClick={() => setFlipped(!flipped)} className="glass flex min-h-[360px] w-full items-center justify-center rounded-[2rem] p-8 text-center transition hover:-translate-y-1">
        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-clinic-700 dark:text-cyan-300">{flipped ? "Answer" : "Prompt"}</p>
          <h2 className="font-display text-3xl font-extrabold sm:text-5xl">{flipped ? card.back : card.front}</h2>
        </div>
      </button>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => setFlipped(false)} className="rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
          <RotateCcw className="mr-2 inline" size={18} /> Reset
        </button>
        <button
          onClick={() => {
            setFlipped(false);
            setIndex((value) => (value + 1) % cards.length);
          }}
          className="rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white dark:bg-cyan-300 dark:text-clinic-950"
        >
          Next Card
        </button>
      </div>
    </div>
  );
}
