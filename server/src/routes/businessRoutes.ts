import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
    getCurrentUser,
    saveBusinessVerification,
    completeOnboarding,
    updateBusinessSettings,
    getPublicBusinesses,
    getPublicBusinessBySlug,
    getBusinessReviews,
    createBusinessReview,
    updateBusinessProfile
} from "../controllers/businessController";

const router = Router();

router.get("/me", authMiddleware, getCurrentUser);
router.post("/verification", authMiddleware, saveBusinessVerification);
router.post("/complete-onboarding", authMiddleware, completeOnboarding);
router.put("/update-settings", authMiddleware, updateBusinessSettings);

router.get("/public", getPublicBusinesses);
router.get("/public/:slug", getPublicBusinessBySlug);
router.get("/public/:slug/reviews", getBusinessReviews);
router.post("/public/:slug/reviews", authMiddleware, createBusinessReview);
router.put("/update-profile", authMiddleware, updateBusinessProfile);

export default router;