import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AIQuestionGenerator from "../components/AIQuestionGenerator";
import Footer from "../components/Footer";

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("token");

        navigate("/login");
    };
    const [userName, setUserName] = useState("");
    const [stats, setStats] = useState({
        subjects: 0,
        mockTests: 0,
        averageScore: 0,
        streak: 1,
    });

    useEffect(() => {
        const savedStats = localStorage.getItem("dashboardStats");

        if (savedStats) {
            setStats(JSON.parse(savedStats));
        } else {
            const defaultStats = {
                subjects: 12,
                mockTests: 28,
                averageScore: 89,
                streak: 15,
            };

            localStorage.setItem(
                "dashboardStats",
                JSON.stringify(defaultStats)
            );

            setStats(defaultStats);
        }

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            setUserName(user.fullName || user.name || "");
        }

    }, []);


    return (
        <div className="min-h-screen bg-slate-100">

            {/* Header */}
            <div className="bg-indigo-700 text-white p-8 shadow-lg flex justify-between items-center">

                <div>
                    <h1 className="text-4xl font-bold">
                        🎓 AI Exam Preparation Dashboard
                    </h1>

                    <div className="mt-3">
                        <p className="text-2xl font-semibold">
                            Welcome, {userName.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())} 👋
                        </p>

                        <p className="text-indigo-100 text-lg mt-1">
                            Learn smarter with Artificial Intelligence.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">

                    <Link to="/profile">
                        <button className="bg-white text-indigo-700 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold">
                            👤 Profile
                        </button>
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                    <h2 className="text-lg font-bold text-indigo-700">
                        📚 Subjects
                    </h2>
                    <p className="text-4xl font-bold mt-4">{stats.subjects}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                    <h2 className="text-lg font-bold text-green-600">
                        📝 Mock Tests
                    </h2>
                    <p className="text-4xl font-bold mt-4">{stats.mockTests}</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                    <h2 className="text-lg font-bold text-orange-500">
                        ⭐ Average Score
                    </h2>
                    <p className="text-4xl font-bold mt-4">{stats.averageScore}%</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                    <h2 className="text-lg font-bold text-purple-600">
                        🔥 Study Streak
                    </h2>
                    <p className="text-4xl font-bold mt-4">{stats.streak} Days</p>
                </div>

            </div>

            {/* AI Tools */}
            <div className="px-8 pb-10">

                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                    🤖 AI Tools
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* AI Question Generator */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-xl font-bold text-indigo-700">
                            🤖 AI Question Generator
                        </h3>

                        <p className="text-gray-600 mt-4">
                            Generate unlimited AI-powered exam questions instantly.
                        </p>

                        <button
                            onClick={() =>
                                window.scrollTo({
                                    top: document.body.scrollHeight,
                                    behavior: "smooth",
                                })
                            }
                            className="mt-6 w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-lg"
                        >
                            Open Generator
                        </button>
                    </div>

                    {/* AI Chat Assistant */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-xl font-bold text-green-600">
                            💬 AI Chat Assistant
                        </h3>

                        <p className="text-gray-600 mt-4">
                            Ask your doubts and get instant AI explanations.
                        </p>

                        <Link to="/chat">
                            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
                                Open AI Chat
                            </button>
                        </Link>
                    </div>

                    {/* AI Study Planner */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-xl font-bold text-purple-600">
                            📅 AI Study Planner
                        </h3>

                        <p className="text-gray-600 mt-4">
                            Generate a personalized AI study timetable.
                        </p>

                        <Link to="/study-planner">
                            <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg">
                                Open Study Planner
                            </button>
                        </Link>
                    </div>

                    {/* AI Mock Test */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-xl font-bold text-red-600">
                            📝 AI Mock Test
                        </h3>

                        <p className="text-gray-600 mt-4">
                            Practice with AI-generated mock tests and evaluate your performance.
                        </p>

                        <Link to="/mock-test">
                            <button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg">
                                Start Mock Test
                            </button>
                        </Link>
                    </div>
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
                        <h3 className="text-xl font-bold text-blue-600">
                            📜 Recent Activity
                        </h3>

                        <p className="text-gray-600 mt-4">
                            View your recently generated questions, AI chats and study plans.
                        </p>

                        <Link to="/recent-activity">
                            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                                View Activity
                            </button>
                        </Link>
                    </div>

                </div>

                {/* AI Question Generator Section */}
                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        📝 Generate Exam Questions
                    </h2>

                    <AIQuestionGenerator />

                </div>

            </div>
            <Footer />

        </div>
    );
}

export default Dashboard;