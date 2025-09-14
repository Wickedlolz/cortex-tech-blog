# Blog CMS Backend (Express + MongoDB)

A clean REST API for a blog + CMS with role-based auth.

## Features

- JWT auth (Bearer token or HttpOnly cookie `token`)
- Users: register, login, me, logout
- Posts: list (search, filter, paginate), get by slug, create/update/delete
- Comments: list by post, add, delete
- Security: Helmet, CORS, rate limiting, cookie httpOnly

## Run locally

```bash
cp .env.example .env
# edit .env and set your values
npm install
npm run dev
```

API: `http://localhost:$PORT`

## Endpoints

- `POST /api/auth/register` { username, email, password }
- `POST /api/auth/login` { email, password }
- `GET /api/auth/me`
- `POST /api/auth/logout`

- `GET /api/posts` query: `page, limit, q, tag, author`
- `GET /api/posts/:slug`
- `POST /api/posts` (admin/editor)
- `PUT /api/posts/:id` (admin/editor)
- `DELETE /api/posts/:id` (admin)

- `GET /api/comments/post/:id`
- `POST /api/comments/post/:id` (auth user)
- `DELETE /api/comments/:id` (admin/editor)

## Notes

- Image handling: only URL via `coverImage`.
- Slugs auto-generate & ensure uniqueness.
- Update title -> slug updates (with collision handling).
