import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import StudyPlanner from "./pages/StudyPlanner";
import MockTest from "./pages/MockTest";
import RecentActivity from "./pages/RecentActivity";
//import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat" element={<AIChat />} />

      <Route path="/study-planner" element={<StudyPlanner />} />

      <Route path="/mock-test" element={<MockTest />} />

      <Route path="/recent-activity" element={<RecentActivity />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;