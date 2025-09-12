import { Router } from "express";
import { authRequired, requireRole } from "../middleware/auth.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import { Comment } from "../models/Comment.js";
import { ok } from "../utils/responses.js";

const router = Router();

function monthlyAggregation(model) {
  return model.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
}

// Admin stats
router.get("/stats", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const [posts, users, comments, postsMonthly, commentsMonthly] =
      await Promise.all([
        Post.countDocuments(),
        User.countDocuments(),
        Comment.countDocuments(),
        monthlyAggregation(Post),
        monthlyAggregation(Comment),
      ]);

    res.json(
      ok({
        posts,
        users,
        comments,
        postsMonthly,
        commentsMonthly,
      })
    );
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch stats" });
  }
});

export default router;
