import { Router } from "express";
import { loginAdmin } from "../controllers/adminController";
import {
    getPendingBusinesses,
    approveBusiness,
    rejectBusiness,
} from "../controllers/adminController";
import authMiddleware from "../middleware/authMiddleware";
import isAdmin from "../middleware/isAdminMiddleware";

const router = Router();

// Public route
router.post("/login", loginAdmin);

// Protected admin routes
router.get("/businesses/pending", authMiddleware, isAdmin, getPendingBusinesses);
router.patch("/businesses/:id/approve", authMiddleware, isAdmin, approveBusiness);
router.patch("/businesses/:id/reject", authMiddleware, isAdmin, rejectBusiness);

export default router;