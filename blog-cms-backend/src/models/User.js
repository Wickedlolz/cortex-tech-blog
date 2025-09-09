import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor", "user"], default: "user" },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
