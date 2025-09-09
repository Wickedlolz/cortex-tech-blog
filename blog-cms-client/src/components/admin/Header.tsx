"use client";

import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div className="flex items-center gap-3">
        {/* Later we can show user avatar or name */}
        <span className="text-gray-600">Welcome, {user?.username}</span>
      </div>
    </header>
  );
}
