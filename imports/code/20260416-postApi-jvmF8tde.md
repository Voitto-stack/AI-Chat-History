---
title: postApi-jvmF8tde
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: postApi-jvmF8tde.js
---

# postApi-jvmF8tde

```js
import{bN as t,bO as s,bP as e,bQ as n,bR as r,bS as o}from"./vendor-proto-C-lnwXQR.js";import{ds as i}from"./main-BcomqkE8.js";async function a(t){const s={userId:t.userId,cursor:t.cursor??0,limit:t.limit};return await i.requestPost2(r,s,o)}async function c(t){const s={clientToken:crypto.randomUUID(),content:t.content||"",pictures:t.pictures};return await i.requestPost2(e,s,n)}async function u(e){const n={pictures:e.pictures,timezoneOffsetMinutes:e.timezoneOffsetMinutes};return await i.requestPost2(t,n,s)}export{c,a as g,u as p};

```
