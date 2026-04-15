---
title: postApi-RBEzU9gV
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: postApi-RBEzU9gV.js
---

# postApi-RBEzU9gV

```js
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"1.0.0"};var t=(new e.Error).stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="2361bab8-d2ee-4530-96f1-108a3c56822e",e._sentryDebugIdIdentifier="sentry-dbid-2361bab8-d2ee-4530-96f1-108a3c56822e")}catch(s){}}();import{df as e,dU as t,dV as s,dW as n,dX as r,dY as i,dZ as a}from"./main-BAGg6ga3.js";async function o(t){const s={userId:t.userId,cursor:t.cursor??0,limit:t.limit};return await e.requestPost2(i,s,a)}async function d(t){const s={clientToken:crypto.randomUUID(),content:t.content||"",pictures:t.pictures};return await e.requestPost2(n,s,r)}async function u(n){const r={pictures:n.pictures,timezoneOffsetMinutes:n.timezoneOffsetMinutes};return await e.requestPost2(t,r,s)}export{d as c,o as g,u as p};

```
