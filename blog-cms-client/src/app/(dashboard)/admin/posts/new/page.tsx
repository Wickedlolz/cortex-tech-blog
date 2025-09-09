"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        content,
        imageUrl,
        tags: tags.split(",").map((t) => t.trim()),
      }),
    });
    router.push("/admin/posts");
  };

  return (
    <div className="p-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Editor content={content} onUpdate={(html) => setContent(html)} />
            <Input
              type="text"
              placeholder="Tags (comma separated)"
              className="w-full p-2 border rounded"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Publish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
