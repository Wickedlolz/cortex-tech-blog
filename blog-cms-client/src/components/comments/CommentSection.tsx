"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/fetcher";
import { MessageSquare, Trash2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await apiFetch<CommentResponse>(`/comments/post/${postId}`);
        setComments(res.items || []);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, [postId]);

  // Add comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);

    try {
      const res = await apiFetch<Comment>(`/comments/post/${postId}`, {
        method: "POST",
        body: JSON.stringify({ content: newComment }),
      });

      setComments([
        { ...res, userId: { username: user!.username, _id: user!._id } },
        ...comments,
      ]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await apiFetch<CommentDeleteResponse>(`/comments/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        setComments(comments.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  return (
    <div className="mt-12 bg-secondary/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-8">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-10 relative">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[100px] pr-12 resize-none bg-background border-border/50 focus:border-primary/50 transition-colors"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isSubmitting || !newComment.trim()}
            className="absolute bottom-3 right-3 h-8 w-8 rounded-full shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      ) : (
        <div className="bg-background border border-border/50 rounded-xl p-6 text-center mb-10">
          <p className="text-muted-foreground mb-4">
            Join the discussion! Please login to leave a comment.
          </p>
          <Button variant="outline" asChild>
            <a href="/login">Login to Comment</a>
          </Button>
        </div>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8 italic">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="group flex gap-4 animate-fade-in-up">
              <Avatar className="w-10 h-10 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {c.userId?.username?.substring(0, 2).toUpperCase() || "AN"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="bg-background border border-border/50 rounded-2xl rounded-tl-none p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-semibold text-sm block">
                        {c.userId?.username || "Anonymous"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {user &&
                      (user._id === c.userId?._id || user.role === "admin") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDelete(c._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {c.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
