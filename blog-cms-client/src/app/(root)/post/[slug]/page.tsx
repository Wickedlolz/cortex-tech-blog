import Image from "next/image";
import { apiFetch } from "@/lib/fetcher";
import { Post } from "@/types";

import CommentSection from "@/components/comments/CommentSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await apiFetch<Post>(`/posts/${resolvedParams.slug}`);

  return (
    <article className="max-w-3xl mx-auto p-8 prose prose-lg">
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-xl mb-6 shadow"
          width={250}
          height={256}
        />
      )}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-8">
        by {post.author?.username || "Unknown"} on{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <CommentSection postId={post._id} />
    </article>
  );
}
