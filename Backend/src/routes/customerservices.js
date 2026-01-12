import express from "express";
import { 
  getCustomerServices, 
  getCustomerServiceById 
} from "../controllers/customerService.controller.js";

const router = express.Router();

router.get("/", getCustomerServices);
router.get("/:id", getCustomerServiceById);

export default router;
