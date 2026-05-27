import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Bot, Send, Sparkles } from "lucide-react";
import api from "../api";
import { PageTitle } from "../components/UI";

export default function AiChat() {
  const [params] = useSearchParams();
  const topic = params.get("topic");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I am MedEase AI. Ask me any MBBS 2nd year doubt and I will explain it in simple exam-friendly English." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (topic) setInput(`Explain ${topic} in easy English with exam points, viva questions, mnemonics and a flowchart.`);
  }, [topic]);

  const send = async () => {
    if (!input.trim()) return;
    const prompt = input.trim();
    setMessages((items) => [...items, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await api.post("/ai/chat", { prompt, history: messages });
      setMessages((items) => [...items, { role: "assistant", content: data.answer }]);
    } catch {
      setMessages((items) => [...items, { role: "assistant", content: "AI server is not connected yet. Add your API key in server/.env and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 pb-10">
      <PageTitle eyebrow="Doubt Solver" title="AI Chat Assistant" subtitle="Ask for explanations, short notes, MCQs, mnemonics, viva questions, flowcharts, and study plans." />
      <div className="glass flex min-h-[68vh] flex-col rounded-[2rem] p-4">
        <div className="flex-1 space-y-4 overflow-y-auto p-2">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-[1.4rem] p-4 font-semibold shadow-sm ${message.role === "user" ? "bg-clinic-950 text-white dark:bg-cyan-300 dark:text-clinic-950" : "bg-white dark:bg-white/10"}`}>
                <div className="mb-2 flex items-center gap-2 text-sm font-black">
                  {message.role === "user" ? <Sparkles size={16} /> : <Bot size={16} />}
                  {message.role === "user" ? "You" : "MedEase AI"}
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && <p className="px-4 font-black text-clinic-700 dark:text-cyan-300">AI is preparing an exam-friendly answer...</p>}
        </div>
        <div className="mt-4 flex gap-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
            placeholder="Ask: Generate MCQs on anemia, explain beta blockers, create microbiology viva..."
            className="min-h-16 flex-1 resize-none rounded-2xl border-0 bg-white p-4 font-bold outline-none ring-1 ring-slate-100 focus:ring-clinic-500 dark:bg-white/10 dark:ring-white/10"
          />
          <button onClick={send} className="rounded-2xl bg-clinic-950 px-5 text-white dark:bg-cyan-300 dark:text-clinic-950">
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
