import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { createService, createServicesBulk, getServices, updateService, deleteService } from "../controllers/serviceController";

const router = Router();

router.post("/", authMiddleware, createService);
router.post("/create-services-bulk", authMiddleware, createServicesBulk);
router.get("/", authMiddleware, getServices);

router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

export default router;