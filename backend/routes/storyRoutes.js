import express from "express";
import multer from "multer";
import { createStory, getStories } from "../controllers/storyController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), createStory);
router.get("/", getStories);

export default router;