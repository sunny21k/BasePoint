import { Request, Response } from "express";
import User from "../models/User";

interface AuthRequest extends Request {
    user?: {
        id: string;
    }
}

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            });
        }

        return res.status(200).json({
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error", 
            error}
        );
    }
}