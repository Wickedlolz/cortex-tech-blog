import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
  {
    postId: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

export const Comment = model("Comment", CommentSchema);
