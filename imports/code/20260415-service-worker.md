---
title: service-worker
date: 2026-04-15T17:05:30+08:00
source: import
language: ts
original: service-worker.ts
---

# service-worker

```ts
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

/**
 * Service Worker - 预缓存和推送通知处理
 */

import { clientsClaim } from "workbox-core";
import { createHandlerBoundToURL, precacheAndRoute, PrecacheEntry } from "workbox-precaching";
import { registerRoute } from "workbox-routing";

const TAG = "ServiceWorker";

interface WorkboxGlobal {
  __WB_MANIFEST: Array<PrecacheEntry | string>;
}

declare const self: ServiceWorkerGlobalScope & WorkboxGlobal;

clientsClaim();

// 预缓存构建产物（由 vite-plugin-pwa 注入 manifest）
precacheAndRoute(self.__WB_MANIFEST, {
  ignoreURLParametersMatching: [/.*/],
});

// App Shell 路由：导航请求回退到 index.html
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== "navigate") return false;
    if (url.pathname.startsWith("/_")) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    if (url.pathname.endsWith(".apk")) return false;
    return true;
  },
  createHandlerBoundToURL(`${import.meta.env.BASE_URL}index.html`),
);

// 通知点击处理
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const firebaseData = event.notification.data?.FCM_MSG?.data;
      const url = firebaseData?.url ?? event.notification.data?.url ?? "/";

      console.log(TAG, `通知点击: clients=${clientList.length}, url=${url}`);

      if (clientList.length > 0) {
        const client = clientList[0];
        client.focus();
        client.postMessage({ type: "NAVIGATE_TO", url });
      } else {
        self.clients.openWindow(url);
      }
    }),
  );
});

// 监听 SKIP_WAITING 消息，立即激活新 SW
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

```
