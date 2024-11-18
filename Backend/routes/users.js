import express from "express";
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", isAuthenticated, getUserDetails);
router.put("/:id", isAuthenticated, updateUser);

export default router;
