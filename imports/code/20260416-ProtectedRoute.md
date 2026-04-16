---
title: ProtectedRoute
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: ProtectedRoute.tsx
---

# ProtectedRoute

```tsx
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { useAuthStore } from "../store/auth";
import { me } from "../api/auth";

export const ProtectedRoute = () => {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(user === null);
  const authChecked = useRef(false);

  useEffect(() => {
    if (authChecked.current) return;
    if (user) {
      authChecked.current = true;
      return;
    }
    me()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => {
        authChecked.current = true;
        setLoading(false);
      });
  }, [user, setUser]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

```
