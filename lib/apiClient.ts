// lib/apiClient.ts

const BASE_URL = "http://localhost:8000";

export async function apiClient(
  url: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong");
  }

  return data;
}