import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Business from "../models/Business";

const generateToken = (id: string, role: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const loginAdmin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin account required.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            token: generateToken(user._id.toString(), user.role),
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error,
        });
    }
};

export const getAllBusinesses = async (req: Request, res: Response) => {
    try {
        const businesses = await Business.find().sort({ createdAt: -1 });
        return res.status(200).json(businesses);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch businesses",
        });
    }
};

export const updateBusinessStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { accountStatus } = req.body as {
            accountStatus: "pending" | "approved" | "rejected";
        };

        if (!accountStatus) {
            return res.status(400).json({ message: "accountStatus is required" });
        }

        if (!["pending", "approved", "rejected"].includes(accountStatus)) {
            return res.status(400).json({ message: "Invalid accountStatus value" });
        }

        const business = await Business.findById(id);

        if (!business) {
            return res.status(404).json({ message: "Business not found" });
        }

        const user = await User.findById(business.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.accountStatus = accountStatus;
        await user.save();

        return res.status(200).json({
            message: `Business status updated to ${accountStatus}`,
            business,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update business status",
        });
    }
};

export const getPendingBusinesses = async (req: Request, res: Response) => {
    try {
        const businesses = await Business.find({ isOnBoarded: false }).sort({
            createdAt: -1,
        });

        return res.status(200).json(businesses);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch pending businesses",
        });
    }
};