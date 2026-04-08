import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getCurrentUser, saveBusinessVerification, completeOnboarding } from "../controllers/businessController";

const router = Router();

router.get("/me", authMiddleware, getCurrentUser)
router.post("/verification", authMiddleware, saveBusinessVerification);
router.post("/complete-onboarding", authMiddleware, completeOnboarding);

export default router;
