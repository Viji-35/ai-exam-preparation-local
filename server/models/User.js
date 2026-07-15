import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        college: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        department: {
            type: String,
            default: "",
        },

        year: {
            type: String,
            default: "",
        },

        profileImage: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);