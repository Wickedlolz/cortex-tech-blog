export interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "editor" | "user";
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: User;
  tags: string[];
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  postId: string;
  userId: User;
  content: string;
  createdAt: string;
}

export type PaginatedPosts = {
  items: Post[];
  limit: number;
  page: number;
  pages: number;
  total: number;
};
