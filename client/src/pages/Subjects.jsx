import { Link, useParams } from "react-router-dom";
import * as Icons from "lucide-react";
import { motion } from "../motion.jsx";
import { PageTitle, TopicCard } from "../components/UI";
import { getSubject, subjects, topicBank } from "../data/syllabus";
import { useApp } from "../context/AppContext";

export default function Subjects() {
  const { subjectId } = useParams();
  const activeSubject = subjectId ? getSubject(subjectId) : null;
  const { completed, bookmarks } = useApp();
  const topics = activeSubject ? topicBank.filter((topic) => topic.subjectId === activeSubject.id) : topicBank;

  return (
    <div className="space-y-6 pb-10">
      <PageTitle
        eyebrow="Syllabus"
        title={activeSubject ? activeSubject.name : "Subjects"}
        subtitle="Complete MBBS 2nd year syllabus organised into easy, exam-focused topics."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {subjects.map((subject) => {
          const Icon = Icons[subject.icon] || Icons.BookOpen;
          return (
            <motion.div key={subject.id} whileHover={{ y: -9, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to={`/subjects/${subject.id}`} className={`premium-card animated-gradient block rounded-[1.8rem] bg-gradient-to-br ${subject.color} p-6 text-white shadow-glow transition`}>
              <div className="pulse-ring grid h-14 w-14 place-items-center rounded-2xl bg-white/18 backdrop-blur">
                <Icon size={34} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-extrabold">{subject.name}</h3>
              <p className="mt-2 font-bold text-white/85">{subject.tagline}</p>
              <p className="mt-5 text-sm font-black">{subject.topics.length} topics</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} completed={completed.includes(topic.id)} bookmarked={bookmarks.includes(topic.id)} />
        ))}
      </div>
    </div>
  );
}
