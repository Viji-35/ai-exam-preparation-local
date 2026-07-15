import { useState } from "react";

function AIChat() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      alert("Please enter your question.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        setReply(data.reply);

        // Save Recent Activity
        const activities = JSON.parse(
          localStorage.getItem("recentActivities") || "[]"
        );

        activities.unshift({
          title: `Asked AI: ${message.substring(0, 40)}...`,
          time: new Date().toLocaleString(),
        });

        activities.splice(10);

        localStorage.setItem(
          "recentActivities",
          JSON.stringify(activities)
        );

      } else {
        setReply(data.error || "Something went wrong.");
      }
    } catch (error) {
      setReply("Unable to connect to the AI server.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-2">
          🤖 AI Chat Assistant
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Ask any exam-related question and get instant AI-powered answers.
        </p>

        <textarea
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Example: Explain Operating System in simple terms..."
          className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleSend}
          className="mt-5 w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        {reply && (
          <div className="mt-8 bg-gray-100 rounded-xl p-5">
            <h2 className="text-xl font-bold text-green-700 mb-3">
              AI Response
            </h2>

            <p className="whitespace-pre-wrap text-gray-800">
              {reply}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default AIChat;