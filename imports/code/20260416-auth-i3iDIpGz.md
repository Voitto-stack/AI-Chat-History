---
title: auth-i3iDIpGz
date: 2026-04-16T11:07:55+08:00
source: import
language: js
original: auth-i3iDIpGz.js
---

# auth-i3iDIpGz

```js
import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{V as t}from"./vendor-antd-D2OY8gyT.js";var n=e(t(),1),r=e=>{let t,n=new Set,r=(e,r)=>{let i=typeof e==`function`?e(t):e;if(!Object.is(i,t)){let e=t;t=r??(typeof i!=`object`||!i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,a={setState:r,getState:i,getInitialState:()=>o,subscribe:e=>(n.add(e),()=>n.delete(e))},o=t=e(r,i,a);return a},i=(e=>e?r(e):r),a=e=>e;function o(e,t=a){let r=n.useSyncExternalStore(e.subscribe,n.useCallback(()=>t(e.getState()),[e,t]),n.useCallback(()=>t(e.getInitialState()),[e,t]));return n.useDebugValue(r),r}var s=e=>{let t=i(e),n=e=>o(t,e);return Object.assign(n,t),n},c=(e=>e?s(e):s),l=c((e,t)=>({user:null,setUser:t=>e({user:t}),isAuthenticated:()=>t().user!==null}));export{c as n,l as t};
```
