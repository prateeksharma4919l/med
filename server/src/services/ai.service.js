import OpenAI from "openai";

const systemPrompt = `You are MedEase AI, an expert MBBS 2nd year tutor for Pathology, Pharmacology, and Microbiology.
Teach like a patient, beginner-friendly medical teacher. Use simple English first, then exam depth.
When answering, prefer this structure:
1. Easy explanation
2. Step-by-step concept
3. Exam-focused notes
4. Important keywords
5. Mnemonic or memory trick
6. Viva questions
7. MCQs if asked
8. Quick revision summary
Use clinical examples and analogies. Avoid unsafe patient-specific diagnosis or treatment.`;

function fallbackAnswer(prompt) {
  return `Demo AI response for: ${prompt}

Easy explanation:
This topic should be understood from definition, cause/classification, mechanism, clinical importance, diagnosis or uses, and exam points.

Step-by-step:
1. Read the definition.
2. Identify the cause or class.
3. Follow the mechanism in arrows.
4. Connect it with morphology, use, adverse effect, or lab diagnosis.
5. End with clinical relevance.

Exam points:
1. Start with a clean definition.
2. Add a flowchart to show sequence.
3. Mention 3-5 high-yield facts.
4. End with viva or clinical correlation.

Mnemonic:
C-M-E-V = Concept, Mechanism, Exam points, Viva.

Quick revision:
Definition -> mechanism -> key table -> viva -> MCQ practice.

Connect an OpenAI or Gemini API key in server/.env to get live AI responses.`;
}

export async function askAi(prompt, history = []) {
  if (process.env.AI_PROVIDER === "gemini" && process.env.GEMINI_API_KEY) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL || "gemini-1.5-flash"}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }]
        })
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || fallbackAnswer(prompt);
  }

  if (process.env.OPENAI_API_KEY) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.slice(-8).map((item) => ({ role: item.role, content: item.content })),
        { role: "user", content: prompt }
      ],
      temperature: 0.4
    });
    return completion.choices[0]?.message?.content || fallbackAnswer(prompt);
  }

  return fallbackAnswer(prompt);
}

export async function makeStudyPlan({ examDate, weakSubject }) {
  const prompt = `Create a practical daily MBBS 2nd year study plan. Exam date: ${examDate || "not set"}. Weak subject: ${weakSubject}. Return 6 short tasks only.`;
  const answer = await askAi(prompt);
  return answer
    .split("\n")
    .map((line) => line.replace(/^[-*\d.\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}
