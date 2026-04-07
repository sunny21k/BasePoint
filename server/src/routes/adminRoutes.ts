import { Router } from "express";
import {
    loginAdmin,
    getPendingBusinesses,
    updateBusinessStatus,
    getAllBusinesses,
} from "../controllers/adminController";
import authMiddleware from "../middleware/authMiddleware";
import isAdmin from "../middleware/isAdminMiddleware";

const router = Router();

router.post("/login", loginAdmin);

router.get("/businesses", authMiddleware, isAdmin, getAllBusinesses);
router.get("/businesses/pending", authMiddleware, isAdmin, getPendingBusinesses);
router.patch("/businesses/:id/status", authMiddleware, isAdmin, updateBusinessStatus);

export default router;