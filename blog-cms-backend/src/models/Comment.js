import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    postId: { type: Types.ObjectId, ref: "Post", required: true, index: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

CommentSchema.index({ createdAt: -1 });

export const Comment = model("Comment", CommentSchema);
