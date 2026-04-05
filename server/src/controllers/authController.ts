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

export const registerCustomer = async (req: Request, res: Response) => {
    try {
        const { ownerName, email, password, phone } = req.body;

        if (!ownerName || !email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: "customer",
            ownerName,
            phone,
            accountStatus: "active",
        });

        return res.status(201).json({
            message: "Customer account created successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                ownerName: user.ownerName,
                phone: user.phone,
                accountStatus: user.accountStatus,
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

export const registerBusiness = async (req: Request, res: Response) => {
    try {
        const { businessName, ownerName, email, password, phone } = req.body;

        if (!businessName || !ownerName || !email || !password || !phone) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: "business",
            businessName,
            ownerName,
            phone,
            accountStatus: "pending",
        });

        return res.status(201).json({
            message: "Business account created successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                businessName: user.businessName,
                ownerName: user.ownerName,
                phone: user.phone,
                accountStatus: user.accountStatus,
            },
            token: generateToken(user._id.toString(), user.role),
        });
    } catch (error: any) {
        console.error("registerBusiness error:", error);
        return res.status(500).json({
            message: "Server error",
            errorMessage: error?.message || "Unknown error",
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
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
                businessName: user.businessName,
                ownerName: user.ownerName,
                phone: user.phone,
                accountStatus: user.accountStatus,
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