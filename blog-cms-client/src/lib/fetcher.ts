export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

const BASE_URL = "http://localhost:4000/api";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
      ...(typeof window !== "undefined" && localStorage.getItem("token")
        ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
        : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success) {
    throw new Error(json.message || "Unknown API error");
  }

  return json.data; // ✅ unwraps "data"
}
