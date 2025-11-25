import Image from "next/image";
import Link from "next/link";
import { apiFetch } from "@/lib/fetcher";
import { Post } from "@/types";
import { ArrowLeft, Calendar, User } from "lucide-react";

import CommentSection from "@/components/comments/CommentSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await apiFetch<Post>(`/posts/${resolvedParams.slug}`);

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src={
              post.coverImage ||
              "https://images.unsplash.com/photo-1499750310159-5b5f38e31638?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            }
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-6 pb-12">
          <Link href="/posts">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag, idx) => (
                <Badge
                  key={idx}
                  className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-medium text-foreground">
                  {post.author?.username || "Anonymous"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <article className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <hr className="my-12 border-border" />

          <CommentSection postId={post._id} />
        </div>
      </article>
    </>
  );
}
