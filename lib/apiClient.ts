// lib/apiClient.ts
import { authFetch } from "./http";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export async function apiClient(
  url: string,
  options: RequestInit = {}
) {
  const res = await authFetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    let errorMsg = `API Error: ${res.status}`;
    try {
      const text = await res.text();
      console.error("❌ Server Error Response:", text);

      if (text) {
        try {
          const errorData = JSON.parse(text);
          if (typeof errorData === 'string') {
            errorMsg = errorData;
          } else if (errorData.error) {
            errorMsg = errorData.error;
          } else if (errorData.message) {
            errorMsg = errorData.message;
          } else if (errorData.detail) {
            errorMsg = errorData.detail;
          } else {
            errorMsg = JSON.stringify(errorData);
          }
        } catch {
          errorMsg = text;
        }
      }
    } catch (e) {
      console.error("Error reading response:", e);
    }
    throw new Error(errorMsg);
  }

  const data = await res.json();
  return data;
}