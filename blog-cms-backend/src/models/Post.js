import { Schema, model, Types } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
    coverImage: { type: String },
  },
  { timestamps: true }
);

export const Post = model("Post", PostSchema);
