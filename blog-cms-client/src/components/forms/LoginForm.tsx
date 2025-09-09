import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.username, form.password);
      router.push("/admin");
    } catch (err: unknown) {
      setError((err as Error).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
