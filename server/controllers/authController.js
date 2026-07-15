import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ========================
// SIGNUP
// ========================

export const signup = async (req, res) => {

    try {

        const {
            fullName,
            email,
            password,
        } = req.body;

        // Check existing user

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists",
            });

        }

        // Encrypt Password

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User

        const user = new User({

            fullName,

            email,

            password: hashedPassword,

        });

        await user.save();

        res.status(201).json({

            message: "Signup Successful",

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};

// ========================
// LOGIN
// ========================

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found",
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password",
            });

        }

        const token = jwt.sign(

            {
                id: user._id,
            },

            "secretkey",

            {
                expiresIn: "7d",
            }

        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                fullName: user.fullName,

                email: user.email,

            },

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server Error",

        });

    }

};

// ========================
// GET PROFILE
// ========================

export const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });

        }

        res.status(200).json(user);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};

// ========================
// UPDATE PROFILE
// ========================

export const updateProfile = async (req, res) => {

    try {

        const {
            fullName,
            email,
            college,
            department,
            year,
            profileImage,
            bio,
        } = req.body;

        const updatedUser = await User.findByIdAndUpdate(

            req.user.id,

            {
                fullName,
                email,
                college,
                department,
                year,
                profileImage,
                bio,
            },

            {
                new: true,
                runValidators: true,
            }

        ).select("-password");

        res.status(200).json(updatedUser);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });

    }

};