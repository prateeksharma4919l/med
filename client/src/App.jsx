import { Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Subjects from "./pages/Subjects";
import TopicDetail from "./pages/TopicDetail";
import AiChat from "./pages/AiChat";
import McqPractice from "./pages/McqPractice";
import RevisionNotes from "./pages/RevisionNotes";
import PyqSection from "./pages/PyqSection";
import Flashcards from "./pages/Flashcards";
import ProgressTracker from "./pages/ProgressTracker";
import StudyPlanner from "./pages/StudyPlanner";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:subjectId" element={<Subjects />} />
          <Route path="/topic/:topicId" element={<TopicDetail />} />
          <Route path="/ai-chat" element={<AiChat />} />
          <Route path="/mcqs" element={<McqPractice />} />
          <Route path="/revision" element={<RevisionNotes />} />
          <Route path="/pyq" element={<PyqSection />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/progress" element={<ProgressTracker />} />
          <Route path="/planner" element={<StudyPlanner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}
