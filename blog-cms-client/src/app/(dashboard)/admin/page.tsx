"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/fetcher";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, MessageSquare } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Stats {
  posts: number;
  users: number;
  comments: number;
  postsMonthly: { _id: { year: number; month: number }; count: number }[];
  commentsMonthly: { _id: { year: number; month: number }; count: number }[];
}

function formatMonthlyData(
  postsMonthly: Stats["postsMonthly"],
  commentsMonthly: Stats["commentsMonthly"]
) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Merge posts + comments into one array for chart
  const data: { name: string; posts: number; comments: number }[] = [];

  for (let i = 1; i <= 12; i++) {
    data.push({
      name: months[i - 1],
      posts: postsMonthly.find((p) => p._id.month === i)?.count || 0,
      comments: commentsMonthly.find((c) => c._id.month === i)?.count || 0,
    });
  }

  return data;
}

export default function PostsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await apiFetch<Stats>("/admin/stats");

        if (
          res &&
          Object.keys(res).length > 0 &&
          "posts" in res &&
          "users" in res &&
          "comments" in res
        ) {
          setStats(res);
        } else {
          console.log("Stats response is empty or invalid");
          setStats(null);
        }
      } catch (err) {
        console.error("Failed to load stats", err);
        setStats(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const chartData =
    stats?.postsMonthly && stats?.commentsMonthly
      ? formatMonthlyData(stats.postsMonthly, stats.commentsMonthly)
      : [];

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stat Cards */}
      {!stats ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Posts</CardTitle>
              <FileText className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.posts}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Users</CardTitle>
              <Users className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.users}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Comments</CardTitle>
              <MessageSquare className="h-6 w-6 text-purple-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.comments}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Posts & Comments (per month)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#9333ea"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
