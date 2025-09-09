import { z } from "zod";
import { Comment } from "../models/Comment.js";
import { Post } from "../models/Post.js";
import { ok } from "../utils/responses.js";

export async function listAllComments(req, res) {
  const [items, total] = await Promise.all([
    Comment.find()
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("postId")
      .lean(),
    Comment.countDocuments(),
  ]);

  res.json(ok({ success: true, data: items, total }));
}

export async function listComments(req, res) {
  const schema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  });
  const { page, limit } = schema.parse(req.query);
  const { id } = req.params;

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Comment.find({ postId: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "username")
      .lean(),
    Comment.countDocuments({ postId: id }),
  ]);

  res.json(ok({ items, page, limit, total, pages: Math.ceil(total / limit) }));
}

export async function addComment(req, res) {
  const schema = z.object({ content: z.string().min(1).max(2000).trim() });
  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      details: parsed.error.flatten(),
    });
  }

  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post)
    return res.status(404).json({ success: false, message: "Post not found" });

  const comment = await Comment.create({
    postId: id,
    userId: req.user._id,
    content: parsed.data.content,
  });
  res.status(201).json(ok(comment));
}

export async function deleteComment(req, res) {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res
      .status(404)
      .json({ success: false, message: "Comment not found" });
  }

  if (comment.userId.toString() !== req.user.id && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Not authorized to delete" });
  }

  await comment.deleteOne();

  res.json(ok({ success: true, message: "Comment deleted" }));
}
