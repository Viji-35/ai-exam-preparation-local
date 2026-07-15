import { useState } from "react";

export default function StudyPlanner() {
    const [subject, setSubject] = useState("");
    const [hours, setHours] = useState("");
    const [examDate, setExamDate] = useState("");
    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        if (!subject || !hours || !examDate) {
            alert("Please fill all fields");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/study-plan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject,
                    hours,
                    examDate,
                }),
            });

            const data = await response.json();

            setPlan(data.plan);
            // Update Dashboard Streak
            const stats = JSON.parse(
                localStorage.getItem("dashboardStats") || "{}"
            );

            stats.streak = (stats.streak || 15) + 1;

            localStorage.setItem(
                "dashboardStats",
                JSON.stringify(stats)
            );

            // Save Recent Activity
            const activities = JSON.parse(
                localStorage.getItem("recentActivities") || "[]"
            );

            activities.unshift({
                title: `Created ${subject} Study Plan`,
                time: new Date().toLocaleString(),
            });

            // Keep only latest 10 activities
            activities.splice(10);

            localStorage.setItem(
                "recentActivities",
                JSON.stringify(activities)
            );

        } catch (error) {
            alert("Failed to generate study plan");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="bg-purple-700 text-white py-8 text-center shadow-lg">
                <h1 className="text-4xl font-bold">📅 AI Study Planner</h1>

                <p className="mt-2 text-purple-100">
                    Generate a personalized AI study schedule.
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">

                <label className="font-semibold">Subject</label>

                <input
                    type="text"
                    placeholder="Example: Java"
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />

                <label className="font-semibold mt-6 block">
                    Study Hours Per Day
                </label>

                <input
                    type="number"
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                />

                <label className="font-semibold mt-6 block">
                    Exam Date
                </label>

                <input
                    type="date"
                    className="w-full mt-2 p-3 border rounded-lg"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                />

                <button
                    onClick={generatePlan}
                    className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold"
                >
                    {loading ? "Generating..." : "Generate Study Plan"}
                </button>

            </div>

            {plan && (
                <div className="max-w-3xl mx-auto mt-10 mb-10 bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold text-purple-700 mb-4">
                        📖 Your AI Study Plan
                    </h2>

                    <div className="whitespace-pre-wrap text-gray-700">
                        {plan}
                    </div>

                </div>
            )}

        </div>
    );
}