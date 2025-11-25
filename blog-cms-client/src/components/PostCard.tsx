import Link from "next/link";
import Image from "next/image";
import { Clock, User } from "lucide-react";
import { Post } from "@/types";
import { marked } from "marked";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link
        href={`/post/${post.slug}`}
        className="block relative w-full aspect-video overflow-hidden"
      >
        <Image
          src={
            post.coverImage ||
            "https://images.unsplash.com/photo-1499750310159-5b5f38e31638?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          }
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-full">
            <User className="w-3 h-3" />
            {post.author?.username || "Anonymous"}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <Link
          href={`/post/${post.slug}`}
          className="group-hover:text-primary transition-colors"
        >
          <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(post.content || ""),
          }}
          className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1"
        ></div>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <Link
            href={`/post/${post.slug}`}
            className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
}
