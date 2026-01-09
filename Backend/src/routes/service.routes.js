import express from "express";
import upload from "../middleware/upload.middleware.js";
import { createService, getAllServices } from "../controllers/service.controller.js";

const router = express.Router();

/* Create Service */
router.post(
  "/services",
  upload.array("images", 5),
  createService
);

/* ✅ Get All Services */
router.get(
  "/services",
  getAllServices
);

export default router;
