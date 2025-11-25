import { apiFetch } from "@/lib/fetcher";
import Link from "next/link";
import { PaginatedPosts, Post } from "@/types";

import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import CTASection from "@/components/CTASection";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";

export default async function HomePage() {
  let posts: Post[] = [];

  try {
    const data = await apiFetch<PaginatedPosts>("/posts");
    posts = data.items || [];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    // Fallback to empty posts array
  }

  return (
    <>
      <Hero />

      {/* Featured Posts Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Articles
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Discover the latest insights, tutorials, and trends from our
                community of developers.
              </p>
            </div>
            <Link href="/posts">
              <Button variant="outline" className="group">
                View All Posts
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {!posts.length ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg">
                No posts found. Be the first to write one!
              </p>
              <Link href="/admin/posts/new" className="mt-4 inline-block">
                <Button>Create Post</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(0, 6).map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Latest Tech
              </h3>
              <p className="text-muted-foreground">
                Stay ahead of the curve with articles on the newest frameworks,
                libraries, and tools.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                Community Driven
              </h3>
              <p className="text-muted-foreground">
                Connect with other developers, share your knowledge, and grow
                together.
              </p>
            </div>
            <div className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                In-Depth Tutorials
              </h3>
              <p className="text-muted-foreground">
                Master complex topics with our step-by-step guides and practical
                examples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <CTASection />
    </>
  );
}
