---
title: usePost-DbFI9zvY
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: usePost-DbFI9zvY.js
---

# usePost-DbFI9zvY

```js
!function(){try{var s="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};s.SENTRY_RELEASE={id:"1.0.0"};var e=(new s.Error).stack;e&&(s._sentryDebugIds=s._sentryDebugIds||{},s._sentryDebugIds[e]="99f4253a-89e6-4d0a-8424-c85d0e0756f7",s._sentryDebugIdIdentifier="sentry-dbid-99f4253a-89e6-4d0a-8424-c85d0e0756f7")}catch(r){}}();import{r as s}from"./vendor-zustand-BrQ0TVkT.js";import{db as e,dc as r,dd as o}from"./main-BAGg6ga3.js";import{g as t}from"./postApi-RBEzU9gV.js";const n=()=>{const{myPosts:n,cursor:a,hasMore:d,isLoading:i,setPosts:u,appendPosts:f,setLoading:c}=e(),{userInfo:l}=r(),[y,g]=s.useState(null),p=l?.userId,b=s.useCallback(async(s=!1)=>{if(!p)return;if(i)return;if(!s&&!d)return;const e=s?0:a;c(!0),g(null);try{const r=await t({userId:p,cursor:e});if(r.code===o.Success){const e=r.posts??[],o={cursor:r.nextCursor??0,hasMore:e.length>0};s?u(e,o):f(e,o)}else g(r.message||"Failed to load posts")}catch{g("Network error")}finally{c(!1)}},[p,i,d,a,u,f,c,g]);return{myPosts:n,isLoading:i,hasMore:d,error:y,fetchMyPosts:b}};export{n as u};

```
