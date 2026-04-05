import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admins only.",
        });
    }

    next();
};

export default isAdmin;