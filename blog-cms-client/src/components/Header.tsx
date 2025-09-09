"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

import { Button } from "./ui/button";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          MyBlog
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/posts">
            <Button variant="ghost">Blog</Button>
          </Link>
          {user && (
            <Link href="/admin">
              <Button variant="ghost">Admin</Button>
            </Link>
          )}

          {/* 🔑 Auth Section */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">
                Welcome, <b>{user?.username || user?.email}</b>
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" variant="outline">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
