export function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res
    .status(status)
    .json({ success: false, message, details: err.errors ?? undefined });
}
