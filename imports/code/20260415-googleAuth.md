---
title: googleAuth
date: 2026-04-15T17:04:50+08:00
source: import
language: ts
original: googleAuth.ts
---

# googleAuth

```ts
// 生成随机 nonce 用于 OAuth
export function generateNonce(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// 从 Google ID Token 中解析用户信息
export function getGoogleToken(idToken: string): { id: string; email?: string } {
  try {
    const payload = idToken.split(".")[1];
    // JWT payload 使用 base64url 编码，需要转换为标准 base64
    // 替换 URL-safe 字符：- 变成 +，_ 变成 /
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );
    const decoded = JSON.parse(jsonPayload);
    return {
      id: decoded.sub || decoded.user_id,
      email: decoded.email,
    };
  } catch (e) {
    console.error("Failed to parse ID token:", e);
    return { id: "" };
  }
}

// 启动 Google OAuth 流程（获取 Google ID）
export function startGoogleOAuth(): void {
  try {
    const googleOAuthURL = new URL("https://accounts.google.com/o/oauth2/v2/auth");

    // 使用当前页面的 origin + pathname 作为 redirect_uri（不包含 hash 和 query）
    let redirectUri = `${window.location.origin}${window.location.pathname}`;
    // 移除末尾的斜杠以保持一致性（除非是根路径）
    if (redirectUri.endsWith("/") && redirectUri !== `${window.location.origin}/`) {
      redirectUri = redirectUri.slice(0, -1);
    }

    const params = {
      client_id: "928752046408-lhfab3bh0ipqv99pufickist6osfv9pt.apps.googleusercontent.com",
      redirect_uri: redirectUri,
      response_type: "id_token",
      scope: "openid email profile",
      nonce: generateNonce(),
      prompt: "select_account",
      browser: "true",
      embedded: "true",
    };

    Object.entries(params).forEach(([key, value]) => {
      googleOAuthURL.searchParams.append(key, value);
    });

    window.location.replace(googleOAuthURL.toString());
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
}

// 清理 URL 中的 OAuth hash 参数
export function clearGoogleOAuthHash(): void {
  if (window.location.hash) {
    // 使用 history.replaceState 清除 hash，避免触发页面刷新
    const url = window.location.href.split("#")[0];
    window.history.replaceState(null, "", url);
  }
}

```
