import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { z } from "zod";
import { ok } from "../utils/responses.js";

const registerSchema = z.object({
  username: z.string().min(3).max(32).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(128),
});

const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6),
});

function sign(user) {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
      email: user.email,
      username: user.username,
    },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export async function register(req, res) {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      details: parsed.error.flatten(),
    });

  const { username, email, password } = parsed.data;
  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists)
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hash,
    role: "user",
  });
  const token = sign(user);

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: env.COOKIE_SECURE,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json(
      ok({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      })
    );
}

export async function login(req, res) {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({
      success: false,
      message: "Invalid data",
      details: parsed.error.flatten(),
    });

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const okPass = await bcrypt.compare(password, user.password);
  if (!okPass)
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });

  const token = sign(user);
  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: env.COOKIE_SECURE,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(
      ok({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
        token,
      })
    );
}

export async function me(req, res) {
  if (!req.user)
    return res.status(401).json({ success: false, message: "Unauthorized" });
  res.json(ok({ user: req.user }));
}

export async function logout(_req, res) {
  res.clearCookie("token").json(ok({ message: "Logged out" }));
}
