import { Router } from "express";
import { authRequired, requireRole } from "../middleware/auth.js";
import {
  listComments,
  addComment,
  deleteComment,
  listAllComments,
} from "../controllers/comments.controller.js";

const router = Router();

router.get("/", authRequired, requireRole("admin", "editor"), listAllComments);

// Public list for a post
router.get("/post/:id", listComments);

// Auth users can comment
router.post("/post/:id", authRequired, addComment);

// Admin/Editor can delete any comment
router.delete(
  "/:commentId",
  authRequired,
  requireRole("admin", "editor"),
  deleteComment
);

export default router;
