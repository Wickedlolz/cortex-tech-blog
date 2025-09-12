import { apiFetch } from "@/lib/fetcher";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";
import { PaginatedPosts } from "@/types";

import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const data = await apiFetch<PaginatedPosts>("/posts");
  const posts = data.items;

  if (!posts) {
    return <p className="p-6 text-gray-500">Loading...</p>;
  }

  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Featured Posts
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={post.coverImage || ""}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <div
                  className="text-gray-600 mb-4 flex-1 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(post.content || ""),
                  }}
                />
                <Link
                  href={`/post/${post.slug}`}
                  className="text-indigo-600 font-medium hover:underline mt-auto"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Latest Articles</h3>
          <p className="text-gray-600">Stay up to date with fresh content.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-gray-600">Join and share your knowledge.</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
          <p className="text-gray-600">Boost your skills with tutorials.</p>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Why Join Our Blog Community?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3">Latest Knowledge</h3>
              <p className="text-gray-600">
                Stay ahead with curated articles on web development & tech.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3">Active Community</h3>
              <p className="text-gray-600">
                Connect with other developers, share your insights & learn.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-3">Hands-on Tutorials</h3>
              <p className="text-gray-600">
                Get practical guides you can apply directly in your projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-indigo-600 py-16 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="mb-8 text-white/90">
          Create your free account today and unlock access to exclusive content.
        </p>
        <Link href="/register">
          <Button
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-200"
          >
            Get Started
          </Button>
        </Link>
      </section>

      {/* <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post._id} className="overflow-hidden shadow-lg">
                {post.coverImage && (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    width={120}
                    height={192}
                  />
                )}
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    by {post.author?.username || "Unknown"} on{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 line-clamp-3">{post.content}</p>
                  <Link href={`/post/${post.slug}`}>
                    <Button className="mt-4">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div> */}
    </>
  );
}
