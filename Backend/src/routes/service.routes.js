import express from "express";
import upload from "../middleware/upload.middleware.js";
import { createService } from "../controllers/service.controller.js";

const router = express.Router();

// POST /admin/services
router.post(
  "/admin/services",
  upload.array("images", 5),
  createService
);

export default router;
