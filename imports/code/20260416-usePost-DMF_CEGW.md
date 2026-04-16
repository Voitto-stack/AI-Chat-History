---
title: usePost-DMF_CEGW
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: usePost-DMF_CEGW.js
---

# usePost-DMF_CEGW

```js
import{r as s}from"./vendor-zustand-CLAZo2La.js";import{bz as o}from"./vendor-proto-C-lnwXQR.js";import{dp as r,dq as t}from"./main-BcomqkE8.js";import{g as e}from"./postApi-jvmF8tde.js";const a=()=>{const{myPosts:a,cursor:n,hasMore:i,isLoading:u,setPosts:c,appendPosts:d,setLoading:p}=r(),{userInfo:l}=t(),[m,f]=s.useState(null),g=l?.userId,h=s.useCallback(async(s=!1)=>{if(!g)return;if(u)return;if(!s&&!i)return;const r=s?0:n;p(!0),f(null);try{const t=await e({userId:g,cursor:r});if(t.code===o.Success){const o=t.posts??[],r={cursor:t.nextCursor??0,hasMore:o.length>0};s?c(o,r):d(o,r)}else f(t.message||"Failed to load posts")}catch{f("Network error")}finally{p(!1)}},[g,u,i,n,c,d,p,f]);return{myPosts:a,isLoading:u,hasMore:i,error:m,fetchMyPosts:h}};export{a as u};

```
