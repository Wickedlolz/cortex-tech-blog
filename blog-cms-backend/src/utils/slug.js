export function toSlug(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()_+={}|\\\[\]\\:;"'<>,.?/]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function uniqueSlug(base, exists) {
  return (async () => {
    let slug = toSlug(base);
    let n = 0;
    while (await exists(slug)) {
      n += 1;
      slug = `${toSlug(base)}-${n}`;
    }
    return slug;
  })();
}
