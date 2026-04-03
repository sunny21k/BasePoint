import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getCurrentUser } from "../controllers/businessController";

const router = Router();

router.get("/me", authMiddleware, getCurrentUser)

export default router;
