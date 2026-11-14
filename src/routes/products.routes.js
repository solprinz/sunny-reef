import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Públicas
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protegidas con JWT
router.post("/create", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

export default router;
