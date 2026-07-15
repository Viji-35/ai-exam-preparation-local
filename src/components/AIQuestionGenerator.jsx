import { useState } from "react";
import { generateQuestions } from "../services/gemini";

function AIQuestionGenerator() {
    const [subject, setSubject] = useState("");
    const [questions, setQuestions] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!subject.trim()) {
            alert("Please enter a subject");
            return;
        }

        try {
            setLoading(true);

            const result = await generateQuestions(subject);

            setQuestions(result);
            // Update Dashboard Progress
            const stats = JSON.parse(
                localStorage.getItem("dashboardStats") || "{}"
            );

            stats.subjects = (stats.subjects || 0) + 1;

            localStorage.setItem(
                "dashboardStats",
                JSON.stringify(stats)
            );

            // Save Recent Activity
            const activities = JSON.parse(
                localStorage.getItem("recentActivities") || "[]"
            );

            activities.unshift({
                title: `Generated ${subject} Questions`,
                time: new Date().toLocaleString(),
            });

            activities.splice(10);

            localStorage.setItem(
                "recentActivities",
                JSON.stringify(activities)
            );

        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                🤖 AI Question Generator
            </h2>

            <input
                type="text"
                placeholder="Enter Subject (Example: Java, Python, AI)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"
            />

            <button
                onClick={handleGenerate}
                className="bg-indigo-700 text-white px-6 py-3 rounded-lg"
            >
                {loading ? "Generating..." : "Generate Questions"}
            </button>

            {questions && (
                <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded-lg">
                    {questions}
                </div>
            )}
        </div>
    );
}

export default AIQuestionGenerator;