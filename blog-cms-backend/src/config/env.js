import dotenv from "dotenv";
dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 4000),
  MONGO_URI: process.env.MONGO_URI ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  COOKIE_SECURE:
    (process.env.COOKIE_SECURE ?? "false").toLowerCase() === "true",
};

if (!env.MONGO_URI) {
  throw new Error("MONGO_URI is required");
}

if (!env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}

export default env;
