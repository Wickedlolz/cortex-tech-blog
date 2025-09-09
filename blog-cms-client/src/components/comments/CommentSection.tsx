"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/fetcher";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  userId: { username: string; _id: string };
}

type CommentResponse = {
  items: Comment[];
  page: number;
  limit: number;
  total: number;
  pages: number;
};

type CommentDeleteResponse = {
  success: boolean;
  message: string;
};

export default function CommentSection({ postId }: { postId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const res = await apiFetch<CommentResponse>(`/comments/post/${postId}`);
      setComments(res.items);
    };
    fetchComments();
  }, [postId]);

  // Add comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const res = await apiFetch<Comment>(`/comments/post/${postId}`, {
      method: "POST",
      body: JSON.stringify({ content: newComment }),
    });

    setComments([
      { ...res, userId: { username: user!.username, _id: user!._id } },
      ...comments,
    ]);
    setNewComment("");
  };

  const handleDelete = async (id: string) => {
    const res = await apiFetch<CommentDeleteResponse>(`/comments/${id}`, {
      method: "DELETE",
    });

    if (res.success) {
      setComments(comments.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <Button type="submit">Post</Button>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Please login to add a comment.
        </p>
      )}

      <div className="space-y-4">
        {comments.length === 0 && (
          <p className="text-sm text-gray-500">No comments yet.</p>
        )}
        {comments.map((c) => (
          <div
            key={c._id}
            className="border p-3 rounded-lg bg-white shadow-sm flex justify-between items-start"
          >
            <div>
              <p className="text-sm text-gray-700">{c.content}</p>
              <span className="text-xs text-gray-400">
                {c.userId?.username} • {new Date(c.createdAt).toLocaleString()}
              </span>
            </div>

            {user && (user._id === c.userId?._id || user.role === "admin") && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
