import { useParams } from "react-router-dom";
import { Bookmark, CheckCircle2, Download, Sparkles } from "lucide-react";
import { PageTitle, Pill, SectionCard } from "../components/UI";
import { getTopic } from "../data/syllabus";
import { useApp } from "../context/AppContext";

export default function TopicDetail() {
  const { topicId } = useParams();
  const topic = getTopic(topicId);
  const { bookmarks, completed, toggleBookmark, toggleCompleted } = useApp();

  if (!topic) {
    return <PageTitle title="Topic not found" subtitle="Try searching from the top bar." />;
  }

  return (
    <div className="space-y-5 pb-10">
      <PageTitle
        eyebrow={topic.subjectName}
        title={topic.title}
        subtitle={topic.summary}
        action={
          <div className="flex flex-wrap gap-2">
            <button onClick={() => toggleBookmark(topic.id)} className="rounded-2xl bg-white px-4 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
              <Bookmark className="mr-2 inline" size={18} /> {bookmarks.includes(topic.id) ? "Saved" : "Bookmark"}
            </button>
            <button onClick={() => toggleCompleted(topic.id)} className="rounded-2xl bg-clinic-950 px-4 py-3 font-black text-white shadow-glow dark:bg-cyan-300 dark:text-clinic-950">
              <CheckCircle2 className="mr-2 inline" size={18} /> {completed.includes(topic.id) ? "Completed" : "Mark Done"}
            </button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Pill>{topic.difficulty}</Pill>
        <Pill>{topic.duration} min</Pill>
        <Pill>Viva ready</Pill>
        <Pill>Exam points</Pill>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-5">
          <SectionCard title="Definition">
            <p className="font-semibold text-slate-700 dark:text-slate-300">{topic.definition}</p>
          </SectionCard>
          <SectionCard title="Causes">
            <ul className="space-y-2">
              {topic.causes.map((item) => <li key={item} className="rounded-2xl bg-white p-3 font-bold dark:bg-white/10">{item}</li>)}
            </ul>
          </SectionCard>
          <SectionCard title="Pathogenesis Flowchart">
            <div className="grid gap-2 sm:grid-cols-3">
              {topic.flowchart.map((step, index) => (
                <div key={step} className="rounded-2xl bg-cyan-50 p-4 text-center font-black text-clinic-700 dark:bg-white/10 dark:text-cyan-200">
                  {index + 1}. {step}
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Morphology / Important Table">
            <p className="font-semibold text-slate-700 dark:text-slate-300">{topic.morphology}</p>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="AI One-Click Explanation">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-clinic-950 to-ocean-700 p-5 text-white">
              <Sparkles className="mb-3" />
              <p className="font-bold">
                Explain {topic.title} as: definition, mechanism, diagram idea, exam answer, viva questions, and 5-minute revision.
              </p>
              <a href={`/ai-chat?topic=${encodeURIComponent(topic.title)}`} className="mt-4 inline-block rounded-2xl bg-white px-4 py-3 font-black text-clinic-700">
                Ask AI Now
              </a>
            </div>
          </SectionCard>
          <SectionCard title="Clinical Features">
            <ul className="space-y-2">{topic.clinicalFeatures.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul>
          </SectionCard>
          <SectionCard title="Diagnosis">
            <ul className="space-y-2">{topic.diagnosis.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul>
          </SectionCard>
          <SectionCard title="Diagram Section">
            <div className="rounded-[1.5rem] border-2 border-dashed border-cyan-300 p-8 text-center font-black text-slate-500 dark:border-cyan-700 dark:text-slate-300">
              {topic.diagram}
            </div>
          </SectionCard>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <SectionCard title="Important Exam Points">
          <ul className="space-y-2">{topic.examPoints.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul>
        </SectionCard>
        <SectionCard title="Viva Questions">
          <ul className="space-y-2">{topic.viva.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul>
        </SectionCard>
        <SectionCard title="Mnemonics">
          <ul className="space-y-2">{topic.mnemonics.map((item) => <li key={item} className="font-bold">- {item}</li>)}</ul>
        </SectionCard>
      </div>

      <SectionCard title="MCQs">
        {topic.mcqs.map((mcq) => (
          <div key={mcq.question} className="rounded-2xl bg-white p-4 dark:bg-white/10">
            <p className="font-black">{mcq.question}</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {mcq.options.map((option) => <span key={option} className="rounded-xl bg-clinic-50 p-3 font-bold dark:bg-clinic-950">{option}</span>)}
            </div>
            <p className="mt-3 font-black text-emerald-600">Answer: {mcq.answer}</p>
          </div>
        ))}
      </SectionCard>

      <button className="rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
        <Download className="mr-2 inline" size={18} /> Download Notes as PDF
      </button>
    </div>
  );
}
