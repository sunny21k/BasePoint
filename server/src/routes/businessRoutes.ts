import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { getCurrentUser } from "../controllers/businessController";
import { saveBusinessVerification } from "../controllers/businessController";

const router = Router();

router.get("/me", authMiddleware, getCurrentUser)
router.post("/verification", authMiddleware, saveBusinessVerification);

export default router;
