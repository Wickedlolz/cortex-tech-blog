# 📰 Blog Platform – API + Client

This project is a **full-stack blog platform** built with a **client (Next.js + Tailwind + Shadcn)** and a **server (Express + MongoDB)**. It’s designed as a learning project to practice **frontend + backend integration** and covers many of the features you would expect in a real blog system.

---

## ✨ Features

### 👥 Authentication & Users

- Register and log in with email + password.
- Passwords are securely stored using hashing.
- Each user has a profile and their own posts.

### 📝 Posts

- Create new blog posts with **title, content, and tags**.
- Posts support **Markdown content** (parsed with `marked`), allowing headings, lists, bold, code blocks, and more.
- Posts are displayed on the **Home page** in a card layout.
- Dedicated **Post Preview Page** to read full posts with tags.

### 💬 Comments

- Users can leave comments under posts.
- Comments are linked to both the post and the author.

### 🔖 Tags

- Posts can include one or multiple tags.
- Tags are displayed on the Post Preview Page.

### 📊 Admin Dashboard

- Basic Admin page showing statistics:
  - Total number of posts
  - Total number of users
  - Total number of comments

### 🎨 Frontend (Client)

- Built with **Next.js**.
- Styled with **TailwindCSS + Shadcn UI**.
- Fully responsive for desktop and mobile.
- Markdown rendering with `marked`.

### ⚙️ Backend (API)

- Built with **Node.js + Express**.
- MongoDB + Mongoose for database.
- RESTful API endpoints for users, posts, and comments.
- JWT-based authentication.
- bcrypt for password hashing.

---

## 🚀 Tech Stack

### Client (Frontend)

- Next.js
- TailwindCSS + Shadcn UI
- `marked` (for Markdown parsing)

### Server (Backend)

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt

---

## 📌 Current Status

✅ Implemented:

- Authentication
- Posts (CRUD)
- Comments
- Tags
- Markdown parsing
- Admin stats page

🔜 Future ideas:

- Post likes / reactions
- User roles (admin, editor, reader)
- Rich text editor instead of plain Markdown
- Image uploads for posts

---

## 🛠️ Installation & Run

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog-platform.git
cd blog-platform
```

### 2. Setup the API (Backend)

```bash
cd api
npm install
```

- Create a `.env` file in `/api` with:

```env
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=5000
```

- Run the server:

```bash
npm run dev
```

### 3. Setup the Client (Frontend)

```bash
cd client
npm install
```

- Create a `.env.local` in `/client` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

- Run the Next.js client:

```bash
npm run dev
```

### 4. Open in Browser

Frontend → `http://localhost:3000`  
Backend → `http://localhost:5000`

---

⚡ Now you have a working **blog platform** with authentication, posts, comments, tags, markdown support, and admin stats!
