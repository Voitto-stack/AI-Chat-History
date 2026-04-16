---
title: firebase-messaging-sw
date: 2026-04-16T11:07:55+08:00
source: import
language: js
original: firebase-messaging-sw.js
---

# firebase-messaging-sw

```js
/* eslint-disable */
/**
 * Firebase Messaging Service Worker
 * 处理后台/离线时的消息推送通知
 */

importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

// Firebase 配置（与主应用保持一致）
// 注意：SW 无法访问 import.meta.env，需要硬编码或通过构建注入
const firebaseConfig = {
  apiKey: "AIzaSyDaiBM66S3Jwrrg5-m-R3N2uqN7UjaVGQY",
  authDomain: "gracechat-pwa.firebaseapp.com",
  projectId: "gracechat-pwa",
  storageBucket: "gracechat-pwa.firebasestorage.app",
  messagingSenderId: "236910713106",
  appId: "1:236910713106:web:a142d37666289e84e43bcb",
  measurementId: "G-D46PHQ26WF",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// 后台消息处理：显示通知
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw] 收到后台消息:", payload);

  const notification = payload.notification;
  if (!notification) return;

  const title = notification.title || "New Message";
  const options = {
    body: notification.body || "You received a new message!",
    icon: "/logo192.png",
    badge: "/logo192.png",
    tag: payload.data?.type || "local-message",
    vibrate: [100, 50, 100],
    requireInteraction: false,
    data: payload.data,
  };

  return self.registration.showNotification(title, options);
});

// 通知点击处理
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const data = event.notification.data || {};
      const url = data.url || "/";

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

```
