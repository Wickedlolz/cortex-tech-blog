"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/fetcher";
import { useRouter, useParams } from "next/navigation";
import { Post } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await apiFetch<Post>(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        console.error("Error loading post:", err);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    await apiFetch<Post>(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        coverImage: post.coverImage,
      }),
    });

    router.push("/admin/posts");
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (!post) return <p className="p-6 text-red-500">Post not found.</p>;

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <Textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="h-40"
            />
            <Input
              value={post.coverImage || ""}
              onChange={(e) => setPost({ ...post, coverImage: e.target.value })}
            />
            <Button type="submit" className="w-full">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
