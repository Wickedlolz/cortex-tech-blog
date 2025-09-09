"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/fetcher";
import { Post, User } from "@/types";

interface Comment {
  _id: string;
  postId: Post;
  userId: User;
  content: string;
  createdAt: string;
}

type CommentsResponse = {
  success: boolean;
  items: Comment[];
  total: number;
};

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await apiFetch<CommentsResponse>(`/comments`);
        const data = res;
        setComments(data.items || []);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setComments((prev) => prev.filter((comment) => comment._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Comments</h2>

      {comments.length === 0 ? (
        <p className="text-gray-600">No comments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Comment</th>
                <th className="p-3 border-b">Author</th>
                <th className="p-3 border-b">Post</th>
                <th className="p-3 border-b">Created</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b max-w-xs truncate">
                    {comment.content}
                  </td>
                  <td className="p-3 border-b">
                    {comment.userId?.username || "N/A"}
                  </td>
                  <td className="p-3 border-b">
                    {comment.postId?.title || "Unknown"}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleDelete(comment._id)}
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
