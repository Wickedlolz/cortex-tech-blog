import { apiFetch } from "@/lib/fetcher";
import { PaginatedPosts } from "@/types";
import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const q = (params.q as string) || "";
  const limit = 9;

  let data: PaginatedPosts = {
    items: [],
    page: 1,
    limit,
    total: 0,
    pages: 0,
  };

  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(q && { q }),
    });
    data = await apiFetch<PaginatedPosts>(`/posts?${queryParams.toString()}`);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-secondary/30 border-b border-border/50 py-16 mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Articles</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Explore our collection of thoughts, tutorials, and insights.
          </p>
          <SearchInput />
        </div>
      </div>

      <div className="container mx-auto px-6">
        {data.items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No posts found matching your criteria.
            </p>
            {q && (
              <Link href="/posts">
                <Button variant="link" className="mt-2">
                  Clear search
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {data.items.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {data.pages > 1 && (
              <div className="flex justify-center gap-2">
                <Link
                  href={`/posts?page=${page - 1}${q ? `&q=${q}` : ""}`}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                >
                  <Button variant="outline" size="icon" disabled={page <= 1}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center px-4 font-medium">
                  Page {page} of {data.pages}
                </div>

                <Link
                  href={`/posts?page=${page + 1}${q ? `&q=${q}` : ""}`}
                  className={
                    page >= data.pages ? "pointer-events-none opacity-50" : ""
                  }
                >
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={page >= data.pages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
