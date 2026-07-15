import { useState, useEffect } from "react";
import axios from "axios";

export default function MockTest() {
    const [subject, setSubject] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [questions, setQuestions] = useState(10);
    const [formattedQuestions, setFormattedQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);


    const generateMockTest = async () => {
        if (!subject.trim()) {
            alert("Please enter a subject.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/mock-test",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        subject,
                        difficulty,
                        questions,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {

                setFormattedQuestions(data.questions);

                setSelectedAnswers({});

                setCurrentQuestion(0);

                setSubmitted(false);

                setScore(null);

            } else {

                alert(data.error);

            }
        } catch (error) {

            alert("Unable to connect to server.");

        }

        setLoading(false);
    };

    const submitTest = async () => {

        let total = 0;

        formattedQuestions.forEach((question, index) => {

            if (selectedAnswers[index] === question.answer) {
                total++;
            }

        });

        setScore(total);
        setSubmitted(true);

        const activities = JSON.parse(
            localStorage.getItem("recentActivities") || "[]"
        );

        activities.unshift({
            title: `📝 Completed ${subject} Mock Test`,
            time: new Date().toLocaleString(),
        });

        activities.splice(10);

        localStorage.setItem(
            "recentActivities",
            JSON.stringify(activities)
        );

        //try {

        //    const token = localStorage.getItem("token");

        //    await axios.post(
        //        "http://localhost:5000/api/history",
        //        {
        //            subject,
        //            difficulty,
        //            totalQuestions: formattedQuestions.length,
        //            score: total,
        //            percentage: Math.round((total / formattedQuestions.length) * 100),
        //        },
        //        {
        //            headers: {
        //                Authorization: `Bearer ${token}`,
        //            },
        //        }
        //    );

        //    console.log("✅ Test history saved");

        //} catch (error) {

        //    console.error("History save failed:", error);

        //}

    };

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="bg-green-700 text-white p-8 shadow-lg">
                <h1 className="text-4xl font-bold">
                    📝 AI Mock Test
                </h1>

                <p className="mt-2">
                    Practice with AI-generated mock tests.
                </p>
            </div>

            {!submitted && (
                <div className="max-w-4xl mx-auto bg-white mt-10 rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Create Mock Test
                    </h2>

                    <input
                        className="w-full border rounded-lg p-3 mb-5"
                        placeholder="Enter Subject (Example: Java)"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <select
                        className="w-full border rounded-lg p-3 mb-5"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <select
                        className="w-full border rounded-lg p-3 mb-5"
                        value={questions}
                        onChange={(e) => setQuestions(Number(e.target.value))}
                    >
                        <option value={5}>5 Questions</option>
                        <option value={10}>10 Questions</option>
                        <option value={20}>20 Questions</option>
                    </select>

                    <button
                        onClick={generateMockTest}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                    >
                        {loading ? "Generating..." : "Create Mock Test"}
                    </button>

                </div>
            )}

            {formattedQuestions.length > 0 && !submitted && (
                <div className="max-w-4xl mx-auto mt-8 mb-10 bg-white rounded-xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold text-green-700 mb-6">
                        Generated Mock Test
                    </h2>
                    <div className="w-full bg-gray-300 rounded-full h-3 mb-6">
                        <div
                            className="bg-green-600 h-3 rounded-full transition-all duration-500"
                            style={{
                                width: `${((currentQuestion + 1) / formattedQuestions.length) * 100}%`,
                            }}
                        ></div>
                    </div>

                    <p className="text-center text-gray-600 mb-6">
                        Question {currentQuestion + 1} of {formattedQuestions.length}
                    </p>
                    <div className="mb-8 border rounded-lg p-5">

                        <h3 className="font-bold text-lg mb-4">
                            Question {currentQuestion + 1} of {formattedQuestions.length}
                        </h3>

                        <h2 className="text-xl font-semibold mb-5">
                            {formattedQuestions[currentQuestion].question}
                        </h2>

                        {formattedQuestions[currentQuestion].options.map((option, i) => (
                            <label
                                key={i}
                                className="block mb-3 cursor-pointer border rounded-lg p-3 hover:bg-gray-100"
                            >
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion}`}
                                    value={i}
                                    checked={
                                        selectedAnswers[currentQuestion] === i
                                    }
                                    onChange={(e) =>
                                        setSelectedAnswers({
                                            ...selectedAnswers,
                                            [currentQuestion]: i,
                                        })
                                    }
                                    className="mr-2"
                                />

                                {option}
                            </label>
                        ))}

                    </div>

                    <div className="flex justify-between mt-6">

                        <button
                            onClick={() => setCurrentQuestion(currentQuestion - 1)}
                            disabled={currentQuestion === 0}
                            className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg"
                        >
                            ⬅ Previous
                        </button>

                        {currentQuestion < formattedQuestions.length - 1 ? (
                            <button
                                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                Next ➡
                            </button>
                        ) : (
                            <button
                                onClick={submitTest}
                                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg"
                            >
                                Submit Test
                            </button>
                        )}

                    </div>
                </div>
            )}

            {submitted && (
                <div className="mt-8 bg-green-100 border border-green-400 rounded-xl p-6">

                    <h2 className="text-3xl font-bold text-green-700 text-center">
                        🎉 Test Completed
                    </h2>

                    <div className="mt-6 text-center">

                        <p className="text-2xl font-semibold">
                            Score
                        </p>

                        <p className="text-5xl font-bold text-green-700 mt-2">
                            {score} / {formattedQuestions.length}
                        </p>

                        <p className="text-xl mt-4">
                            Percentage:
                            <span className="font-bold text-blue-700">
                                {" "}
                                {Math.round((score / formattedQuestions.length) * 100)}%
                            </span>
                        </p>

                        <div className="mt-5">

                            {Math.round((score / formattedQuestions.length) * 100) >= 80 ? (
                                <p className="text-green-700 text-xl font-bold">
                                    🏆 Excellent Performance!
                                </p>
                            ) : Math.round((score / formattedQuestions.length) * 100) >= 50 ? (
                                <p className="text-yellow-600 text-xl font-bold">
                                    👍 Good Job!
                                </p>
                            ) : (
                                <p className="text-red-600 text-xl font-bold">
                                    📚 Keep Practicing!
                                </p>
                            )}

                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={generateMockTest}
                                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg"
                            >
                                🔄 Generate New Test
                            </button>
                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

