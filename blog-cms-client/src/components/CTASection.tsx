"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function CTASection() {
  const { user } = useAuth();

  if (user) return null;

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Join thousands of developers sharing their knowledge and building the
          future of the web.
        </p>
        <Link href="/register">
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-10 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            Get Started for Free
          </Button>
        </Link>
      </div>
    </section>
  );
}
