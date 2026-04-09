import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", async (req, res) => {
  const { name, email, photo } = req.body;

  try {
    // 1. check if user exists
    let user = await User.findOne({ email });

    // 2. if not → create user
    if (!user) {
      user = new User({
        name,
        email,
        photo,
        password: "" // no password for google users
      });

      await user.save();
    }

    // 3. return user (IMPORTANT 🔥)
    res.status(200).json({
      message: "Google login success",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;