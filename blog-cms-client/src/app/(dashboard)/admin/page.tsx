"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/fetcher";
import { PaginatedPosts, Post } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await apiFetch<PaginatedPosts>("/posts");
        setPosts(data.items);
      } catch (err) {
        console.error("Error loading posts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/admin/posts/new">
          <Button>Create Post</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Card key={post._id} className="shadow-md">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  by {post.author?.username || "Unknown"} on{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex gap-3">
                  <Link href={`/admin/posts/${post.slug}/edit`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      if (!confirm("Delete this post?")) return;
                      await apiFetch(`/posts/${post._id}`, {
                        method: "DELETE",
                      });
                      setPosts(posts.filter((p) => p._id !== post._id));
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
