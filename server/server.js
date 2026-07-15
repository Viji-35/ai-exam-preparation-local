import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

dotenv.config();

//console.log("Mongo URI:", process.env.MONGODB_URI);
//console.log("Groq:", process.env.GROQ_API_KEY ? "Loaded" : "Missing");

mongoose
    .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
    })
    .then(() => {
      console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
      console.error("===== MONGODB ERROR =====");
        console.error(err);
        console.error("Reason:", err.reason);
        if (err.reason?.servers) {
            for (const [host, server] of err.reason.servers) {
                console.log(host, server.error);
            }
        }
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// =========================
// AI Question Generator
// =========================
app.post("/generate-questions", async (req, res) => {
    try {
        const { subject } = req.body;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "user",
                    content: `Generate 10 multiple choice questions on ${subject}. Each question should have four options (A, B, C, D) and mention the correct answer.`,
                },
            ],
        });

        res.json({
            result: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate questions",
        });
    }
});

// =========================
// AI Chat Assistant
// =========================
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a helpful AI tutor. Explain concepts clearly and simply.",
                },
                {
                    role: "user",
                    content: message,
                },
            ],
        });

        res.json({
            reply: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to get AI response",
        });
    }
});

// =========================
// AI Study Planner
// =========================
app.post("/study-plan", async (req, res) => {
    try {
        const { subject, hours, examDate } = req.body;

        // Today's date
        const today = new Date();

        // Exam date
        const exam = new Date(examDate);

        // Remaining days calculation
        const diffTime = exam.getTime() - today.getTime();
        const remainingDays = Math.max(
            1,
            Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        );

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert study planner. Always create a realistic day-wise study timetable based on the exact number of remaining days provided.",
                },
                {
                    role: "user",
                    content: `
Today's Date: ${today.toISOString().split("T")[0]}

Exam Date: ${examDate}

Remaining Days: ${remainingDays}

Subject: ${subject}

Study Hours Per Day: ${hours}

Create a study plan ONLY for ${remainingDays} day(s).

Include:

📅 Day-wise timetable

📚 Topics to study

🔁 Revision schedule

📝 Mock Test

✅ Final Revision before Exam

Do NOT assume 30 days.
Use ONLY ${remainingDays} day(s).
Make the timetable neat and easy to read.
`,
                },
            ],
        });

        res.json({
            plan: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate study plan",
        });
    }
});

// =========================
// AI Mock Test
// =========================
app.post("/mock-test", async (req, res) => {
    try {
        const { subject, difficulty, questions } = req.body;

        const completion = await groq.chat.completions.create({
            model: "openai/gpt-oss-120b",
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert exam paper setter. Return ONLY valid JSON. Do not include markdown, explanations, or extra text.",
                },
                {
                    role: "user",
                    content: `
Generate exactly ${questions} multiple-choice questions.

Subject: ${subject}
Difficulty: ${difficulty}

Return ONLY valid JSON.

Format:

[
  {
    "question": "Question text",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": 0
  }
]

Rules:

- answer must be 0,1,2 or 3.
- Do not write explanations.
- Do not write Answer:.
- Do not use markdown.
- Output only the JSON array.
`,
                },
            ],
        });

        const generatedQuestions = JSON.parse(
            completion.choices[0].message.content
        );

        res.json({
            questions: generatedQuestions,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to generate mock test",
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});