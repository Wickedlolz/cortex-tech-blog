import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-secondary mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-secondary-foreground">
            Discover the future of tech
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-4xl mx-auto leading-tight animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Share Knowledge. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            Inspire Growth.
          </span>
        </h1>

        <p
          className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          A modern blog platform built for developers. Explore in-depth
          tutorials, share your insights, and join a thriving community of
          creators.
        </p>

        <div
          className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Link href="/posts">
            <Button
              size="lg"
              className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1"
            >
              Start Reading
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/register">
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 transition-all"
            >
              Join Community
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
