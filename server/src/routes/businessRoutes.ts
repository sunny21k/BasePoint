import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getCurrentUser, saveBusinessVerification, completeOnboarding, updateBusinessSettings } from "../controllers/businessController";

const router = Router();

router.get("/me", authMiddleware, getCurrentUser)
router.post("/verification", authMiddleware, saveBusinessVerification);
router.post("/complete-onboarding", authMiddleware, completeOnboarding);
router.put("/update-settings", authMiddleware, updateBusinessSettings);

export default router;
