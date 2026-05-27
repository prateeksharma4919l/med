import { PageTitle, SectionCard } from "../components/UI";
import { topicBank } from "../data/syllabus";

export default function PyqSection() {
  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Exam Prep" title="Previous Year Questions" subtitle="Subject-wise PYQs mapped to study topics so students know what matters most." />
      <div className="grid gap-4 lg:grid-cols-2">
        {topicBank.slice(0, 24).map((topic) => (
          <SectionCard key={topic.id} title={`${topic.subjectName}: ${topic.title}`}>
            <ul className="space-y-3">
              {topic.pyqs.map((item) => <li key={item} className="rounded-2xl bg-white p-4 font-bold dark:bg-white/10">{item}</li>)}
            </ul>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
