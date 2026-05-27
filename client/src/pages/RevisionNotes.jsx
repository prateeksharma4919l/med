import { Download, Zap } from "lucide-react";
import { PageTitle, SectionCard } from "../components/UI";
import { topicBank } from "../data/syllabus";

export default function RevisionNotes() {
  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Revision" title="Short Notes and One-Night Revision" subtitle="Fast, exam-oriented summaries with mnemonics, important tables and must-write points." />
      <div className="grid gap-4 lg:grid-cols-2">
        {topicBank.slice(0, 12).map((topic) => (
          <SectionCard key={topic.id} title={topic.title}>
            <p className="font-semibold text-slate-700 dark:text-slate-300">{topic.summary}</p>
            <div className="mt-4 rounded-2xl bg-white p-4 dark:bg-white/10">
              <p className="mb-2 flex items-center gap-2 font-black text-clinic-700 dark:text-cyan-300"><Zap size={18} /> Must Write</p>
              <ul className="space-y-1">{topic.examPoints.slice(0, 3).map((item) => <li key={item} className="font-bold">• {item}</li>)}</ul>
            </div>
          </SectionCard>
        ))}
      </div>
      <button className="rounded-2xl bg-white px-5 py-3 font-black text-clinic-700 shadow-sm dark:bg-white/10 dark:text-cyan-200">
        <Download className="mr-2 inline" size={18} /> Download Revision PDF
      </button>
    </div>
  );
}
