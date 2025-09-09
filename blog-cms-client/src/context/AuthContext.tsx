"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/fetcher";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User } from "@/types";

// interface User {
//   _id: string;
//   username: string;
//   email: string;
//   role: string;
// }

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // check for user on mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const me = await apiFetch<{ user: User }>("/auth/me");
        setUser(me.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined" && token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const { token, user } = await apiFetch<{ token: string; user: User }>(
      "/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }
    );

    if (typeof window !== "undefined") {
      setToken(token);
    }
    setUser(user);
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    const { token, user } = await apiFetch<{ token: string; user: User }>(
      "/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      }
    );

    if (typeof window !== "undefined") {
      setToken(token);
    }
    setUser(user);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      setToken(null);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
