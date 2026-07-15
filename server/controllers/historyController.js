import TestHistory from "../models/TestHistory.js";

// Save Test Result
export const saveTestHistory = async (req, res) => {
  try {
    const { subject, difficulty, totalQuestions, score, percentage } = req.body;

    const history = new TestHistory({
      user: req.user.id,
      subject,
      difficulty,
      totalQuestions,
      score,
      percentage,
    });

    await history.save();

    res.status(201).json({
      message: "Test history saved successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to save test history",
    });
  }
};

// Get Logged-in User History
export const getTestHistory = async (req, res) => {
  try {

    const history = await TestHistory.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(history);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch history",
    });

  }
};