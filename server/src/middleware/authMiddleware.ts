import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}

const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized - No token",
            });
        }

        const token = authHeader.split(" ")[1];

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "Not authorized - User not found",
            });
        }

        req.user = {
            id: user._id.toString(),
            role: user.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized - Invalid token",
        });
    }
};

export default authMiddleware;