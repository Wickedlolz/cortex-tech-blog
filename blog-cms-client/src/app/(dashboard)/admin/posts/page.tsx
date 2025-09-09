"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/fetcher";
import { PaginatedPosts, Post } from "@/types";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await apiFetch<PaginatedPosts>(`/posts`);

        setPosts(res.items || []);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Posts</h2>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Author</th>
                <th className="p-3 border-b">Created</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{post.title}</td>
                  <td className="p-3 border-b">
                    {post.author?.username || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b space-x-3">
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
