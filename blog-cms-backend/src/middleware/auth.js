import jwt from "jsonwebtoken";
import env from "../config/env.js";

export async function authRequired(req, res, next) {
  const header = req.headers.authorization;
  const bearer =
    header && header.startsWith("Bearer ") ? header.split(" ")[1] : undefined;
  const cookie = req.cookies?.token;
  const token = bearer || cookie;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const payload = await jwt.verify(token.replace(/"/g, ""), env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ success: false, message: "Forbidden" });
    next();
  };
}
