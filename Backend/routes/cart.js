import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.put("/update/:productId", isAuthenticated, updateCartItem);
router.delete("/remove/:productId", isAuthenticated, removeFromCart);
router.post("/clear", isAuthenticated, clearCart);

export default router;
