import { loginUser, registerBusiness, registerCustomer } from "../controllers/authController";
import { Router } from "express";

const router = Router();

router.post("/customer-signup", registerCustomer);
router.post("/business-signup", registerBusiness);
router.post('/login', loginUser);

export default router;

