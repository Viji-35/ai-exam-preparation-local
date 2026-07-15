export async function generateQuestions(subject) {
  const response = await fetch("https://ai-exam-preparation-local.onrender.com/mock-test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject,
      difficulty: "medium",
      questions: 10
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate questions");
  }

  const data = await response.json();
  return data.questions;
}