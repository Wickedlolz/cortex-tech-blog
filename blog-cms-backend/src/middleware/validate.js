export const validate = (schema, source) => (req, _res, next) => {
  const data = req[source];
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const err = new Error("Validation failed");
    err.statusCode = 400;
    err.errors = parsed.error.flatten();
    return next(err);
  }
  req[source] = parsed.data; // assign parsed (trimmed/coerced) data
  next();
};
