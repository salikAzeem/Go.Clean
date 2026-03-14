import express from "express";
import multer from "multer";
import { createReport, getReports } from "../controllers/reportController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* Submit Report */
router.post("/", upload.single("image"), createReport);

/* Get All Reports (Admin Dashboard) */
router.get("/reports", getReports);

export default router;