import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("User not found.");
      return;
    }

    if (user.email !== email || user.password !== password) {
      alert("Invalid Email or Password.");
      return;
    }

    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("isLoggedIn", "true");

    const activities =
      JSON.parse(localStorage.getItem("recentActivities")) || [];

    activities.unshift({
      title: "🔑 Logged In",
      time: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "recentActivities",
      JSON.stringify(activities)
    );

    alert("Login Successful!");

    navigate("/dashboard");

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 to-purple-600">
      <div className="bg-white shadow-xl rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800"
        >
          Login
        </button>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-700 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;