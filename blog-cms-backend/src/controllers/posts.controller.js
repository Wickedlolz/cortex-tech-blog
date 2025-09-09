import { z } from "zod";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import { uniqueSlug } from "../utils/slug.js";
import { ok } from "../utils/responses.js";

const createPostSchema = z.object({
  title: z.string().min(3).max(120).trim(),
  content: z.string().min(1),
  tags: z.array(z.string().trim().max(24)).optional().default([]),
  coverImage: z.string().url().optional(),
});

const updatePostSchema = z.object({
  title: z.string().min(3).max(120).trim().optional(),
  content: z.string().min(1).optional(),
  tags: z.array(z.string().trim().max(24)).optional(),
  coverImage: z.string().url().optional().nullable(),
});

export async function listPosts(req, res) {
  const schema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    q: z.string().trim().optional(),
    tag: z.string().trim().optional(),
    author: z.string().trim().optional(),
  });
  const { page, limit, q, tag, author } = schema.parse(req.query);

  const filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
    ];
  }

  if (tag) {
    filter.tags = tag;
  }

  if (author) {
    const user = await User.findOne({ username: author });
    if (user) filter.author = user._id;
    else filter.author = null; // no results
  }

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "username role")
      .lean(),
    Post.countDocuments(filter),
  ]);

  res.json(ok({ items, page, limit, total, pages: Math.ceil(total / limit) }));
}

export async function getPostBySlug(req, res) {
  const { slug } = req.params;
  const post = await Post.findOne({ slug })
    .populate("author", "username role")
    .lean();

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  res.json(ok(post));
}

export async function createPost(req, res) {
  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      details: parsed.error.flatten(),
    });
  }

  const { title, content, tags, coverImage } = parsed.data;
  const slug = await uniqueSlug(
    title,
    async (s) => !!(await Post.exists({ slug: s }))
  );

  const post = await Post.create({
    title,
    slug,
    content,
    tags,
    coverImage,
    author: req.user._id,
  });

  res.status(201).json(ok(post));
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const parsed = updatePostSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      details: parsed.error.flatten(),
    });

  const update = { ...parsed.data };

  if (parsed.data.title) {
    update.slug = await uniqueSlug(
      parsed.data.title,
      async (s) => !!(await Post.exists({ slug: s, _id: { $ne: id } }))
    );
  }

  const post = await Post.findByIdAndUpdate(id, update, { new: true });
  if (!post)
    return res.status(404).json({ success: false, message: "Post not found" });

  res.json(ok(post));
}

export async function deletePost(req, res) {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  res.json(ok({ message: "Post deleted" }));
}
