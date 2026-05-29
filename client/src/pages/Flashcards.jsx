import { useState } from "react";
import { Bookmark, Brain, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from "lucide-react";
import { PageTitle, SectionCard } from "../components/UI";
import { subjects, topicBank } from "../data/syllabus";

export default function Flashcards() {
  const [subject, setSubject] = useState("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [saved, setSaved] = useState([]);
  const cards = topicBank
    .filter((topic) => subject === "all" || topic.subjectId === subject)
    .slice(0, 36)
    .map((topic) => ({
      id: topic.id,
      subjectName: topic.subjectName,
      front: topic.title,
      back: topic.summary,
      mnemonic: topic.mnemonic,
      keywords: topic.keywords || [],
      quickRevision: topic.quickRevision || [],
      difficulty: topic.difficulty || "Medium"
    }));
  const card = cards[index];

  const moveCard = (direction) => {
    setFlipped(false);
    setIndex((value) => (value + direction + cards.length) % cards.length);
  };

  const changeSubject = (value) => {
    setSubject(value);
    setIndex(0);
    setFlipped(false);
  };

  if (!card) {
    return (
      <div className="space-y-5 pb-10">
        <PageTitle eyebrow="Active Recall" title="Flashcards" subtitle="No cards found for this subject yet." />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Active Recall" title="Flashcards" subtitle="Flip, recall, save weak cards and revise topic-wise before exams." />

      <div className="glass sticky top-3 z-10 flex flex-wrap items-center justify-between gap-3 rounded-[1.6rem] p-3">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => changeSubject("all")} className={`rounded-2xl px-4 py-2 text-sm font-black ${subject === "all" ? "bg-clinic-950 text-white dark:bg-cyan-300 dark:text-clinic-950" : "bg-white text-slate-600 dark:bg-white/10 dark:text-slate-200"}`}>
            All
          </button>
          {subjects.map((item) => (
            <button key={item.id} onClick={() => changeSubject(item.id)} className={`rounded-2xl px-4 py-2 text-sm font-black ${subject === item.id ? "bg-clinic-950 text-white dark:bg-cyan-300 dark:text-clinic-950" : "bg-white text-slate-600 dark:bg-white/10 dark:text-slate-200"}`}>
              {item.name}
            </button>
          ))}
        </div>
        <p className="rounded-2xl bg-cyan-100 px-4 py-2 text-sm font-black text-clinic-800 dark:bg-white/10 dark:text-cyan-200">
          {index + 1} / {cards.length} cards
        </p>
      </div>

      <button onClick={() => setFlipped(!flipped)} className={`glass premium-card flex min-h-[390px] w-full items-center justify-center rounded-[2rem] p-6 text-center transition duration-300 hover:-translate-y-1 sm:p-10 ${flipped ? "ring-2 ring-cyan-300/70" : ""}`}>
        <div className="max-w-4xl">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-clinic-700 dark:bg-white/10 dark:text-cyan-200">{flipped ? "Answer" : "Prompt"}</span>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700 dark:bg-amber-300/15 dark:text-amber-200">{card.difficulty}</span>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-black text-clinic-700 dark:bg-cyan-300/15 dark:text-cyan-200">{card.subjectName}</span>
          </div>

          {!flipped ? (
            <>
              <Brain className="mx-auto mb-4 text-cyan-400" size={42} />
              <h2 className="font-display text-4xl font-extrabold sm:text-6xl">{card.front}</h2>
              <p className="mt-5 font-bold text-slate-500 dark:text-slate-300">Say the definition, 3 exam points and one viva answer before flipping.</p>
            </>
          ) : (
            <div className="space-y-5 text-left">
              <h2 className="text-center font-display text-3xl font-extrabold sm:text-5xl">{card.back}</h2>
              {card.mnemonic && (
                <div className="rounded-3xl bg-cyan-100 p-4 font-bold text-clinic-900 dark:bg-cyan-300/15 dark:text-cyan-100">
                  <Sparkles className="mr-2 inline" size={18} /> Memory trick: {card.mnemonic}
                </div>
              )}
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 dark:bg-white/10">
                  <p className="mb-2 font-black">Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {card.keywords.slice(0, 5).map((keyword) => <span key={keyword} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">{keyword}</span>)}
                  </div>
                </div>
                <div className="rounded-3xl bg-white p-4 dark:bg-white/10">
                  <p className="mb-2 font-black">Rapid Recall</p>
                  <ul className="space-y-1 text-sm font-bold text-slate-600 dark:text-slate-300">
                    {card.quickRevision.slice(0, 3).map((point) => <li key={point}>- {point}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </button>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => moveCard(-1)} className="rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
          <ChevronLeft className="mr-2 inline" size={18} /> Previous
        </button>
        <button onClick={() => setFlipped(false)} className="rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
          <RotateCcw className="mr-2 inline" size={18} /> Reset
        </button>
        <button
          onClick={() => {
            setSaved((items) => (items.includes(card.id) ? items.filter((item) => item !== card.id) : [...items, card.id]));
          }}
          className="rounded-2xl bg-white px-5 py-3 font-black text-amber-600 shadow-sm dark:bg-white/10"
        >
          <Bookmark className="mr-2 inline" size={18} /> {saved.includes(card.id) ? "Saved" : "Save Card"}
        </button>
        <button
          onClick={() => moveCard(1)}
          className="rounded-2xl bg-clinic-950 px-5 py-3 font-black text-white dark:bg-cyan-300 dark:text-clinic-950"
        >
          Next Card <ChevronRight className="ml-2 inline" size={18} />
        </button>
      </div>

      <SectionCard title="Smart Flashcard Method">
        <div className="grid gap-3 md:grid-cols-3">
          {["Recall first, flip later", "Save weak cards", "Revise saved cards before sleep"].map((tip, tipIndex) => (
            <div key={tip} className="rounded-2xl bg-white p-4 font-bold dark:bg-white/10">
              <span className="mb-2 grid h-8 w-8 place-items-center rounded-full bg-cyan-100 text-sm font-black text-clinic-700 dark:bg-cyan-300 dark:text-clinic-950">{tipIndex + 1}</span>
              {tip}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
