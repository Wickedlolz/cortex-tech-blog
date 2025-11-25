export function errorHandler(err, _req, res, _next) {
  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details = err.errors || undefined;

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation Error";
    details = Object.values(err.errors).map((e) => e.message);
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    status = 409;
    message = "Duplicate Key Error";
    details = Object.keys(err.keyPattern).map((key) => `${key} already exists`);
  }

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({ success: false, message, details });
}
