"use client";

import { useEffect, useState } from "react";
import { getRole, getUser } from "@/lib/auth";

export function useAuth() {
  const [role, setRole] = useState<"admin" | "viewer" | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRole(getRole());
    setUser(getUser());
    setReady(true);
  }, []);

  return { role, user, ready, isAdmin: role === "admin" };
}
