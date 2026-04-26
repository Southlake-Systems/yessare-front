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
    // If Django returns {"specifications": ["..."]}, we want to see that.
    const errorDetail = data && typeof data === 'object'
      ? JSON.stringify(data)
      : "Something went wrong";

    throw new Error(data?.error || errorDetail);
  }

  return data;
}