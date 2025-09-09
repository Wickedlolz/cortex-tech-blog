import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Share Knowledge. Inspire Growth.
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          A modern blog platform built with Next.js & Express. Explore articles,
          tutorials and join our growing developer community.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/posts">
            <Button
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-200"
            >
              Browse Posts
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
