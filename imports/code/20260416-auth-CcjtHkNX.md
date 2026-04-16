---
title: auth-CcjtHkNX
date: 2026-04-16T11:07:55+08:00
source: import
language: js
original: auth-CcjtHkNX.js
---

# auth-CcjtHkNX

```js
import{n as e,r as t,t as n}from"./client-DP1wUUNV.js";var r=async(e,r)=>{let i=await n.post(`/auth/login`,{username:e,password:r});return t(i.token),{id:i.id,username:i.username,email:i.email,role:i.role}},i=async()=>{await n.post(`/auth/logout`),e()},a=()=>n.post(`/auth/me`),o=async(t,r)=>{let i=await n.post(`/auth/change-password`,{currentPassword:t,newPassword:r});return e(),i};export{a as i,r as n,i as r,o as t};
```
