import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

const generateToken = (id: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const {email, password, role, businessName} = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassowrd = await bcrypt.hash(password, 10);

        const user = await User.create({
            email, 
            password: hashedPassowrd,
            role,
            businessName,
            accountStatus: "pending",
        });

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                businessName: user.BusinessName, 
                accountStatus: user.accountStatus,
            },
            token: generateToken(user._id.toString()),
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error
        })
    }
}

export const loginUser = async(req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all required fields",
            })
        }

        const user = await User.findOne({email}).select("+password");

        if (!user) {
            return res.status(400).json({ 
                message: "Invalid credentials" 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ 
                message: "Invalid credentials" 
            });
        }

        return res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                businessName: user.businessName,
                accountStatus: user.accountStatus,
            },
            token: generateToken(user._id.toString()),
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Server error", 
            error 
        });
    }
}