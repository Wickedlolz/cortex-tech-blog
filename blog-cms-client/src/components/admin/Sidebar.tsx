"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/comments", label: "Comments" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0 flex flex-col">
      <div className="p-6 text-xl font-bold border-b">Admin Panel</div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "block px-4 py-2 rounded-md hover:bg-gray-200 transition",
              pathname === link.href ? "bg-gray-300 font-semibold" : ""
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </aside>
  );
}
