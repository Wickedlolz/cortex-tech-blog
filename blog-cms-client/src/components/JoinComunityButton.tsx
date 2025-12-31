"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { Button } from "./ui/button";

const JoinComunityButton = () => {
  const { user } = useAuth();

  if (user) {
    return null;
  }

  return (
    <Link href="/register">
      <Button
        size="lg"
        variant="outline"
        className="h-12 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 transition-all"
      >
        Join Community
      </Button>
    </Link>
  );
};

export default JoinComunityButton;
