import mongoose from "mongoose";

const testHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TestHistory", testHistorySchema);