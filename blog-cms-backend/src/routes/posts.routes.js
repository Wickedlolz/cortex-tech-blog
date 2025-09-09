import { Router } from "express";
import { authRequired, requireRole } from "../middleware/auth.js";
import {
  listPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/posts.controller.js";

const router = Router();

// Public
router.get("/", listPosts);
router.get("/:slug", getPostBySlug);

// Admin/Editor
router.post("/", authRequired, requireRole("admin", "editor"), createPost);
router.put("/:id", authRequired, requireRole("admin", "editor"), updatePost);
router.delete("/:id", authRequired, requireRole("admin"), deletePost);

export default router;
