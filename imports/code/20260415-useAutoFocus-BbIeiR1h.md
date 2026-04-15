---
title: useAutoFocus-BbIeiR1h
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: useAutoFocus-BbIeiR1h.js
---

# useAutoFocus-BbIeiR1h

```js
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"1.0.0"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f564f6e0-64b0-4f25-a131-dd633320b41b",e._sentryDebugIdIdentifier="sentry-dbid-f564f6e0-64b0-4f25-a131-dd633320b41b")}catch(f){}}();import{r as e}from"./vendor-zustand-BrQ0TVkT.js";function n(n,f={}){const{enabled:r=!0,defer:t="none"}=f;e.useEffect(()=>{if(r){if("raf"===t){const e=requestAnimationFrame(()=>{n.current?.focus()});return()=>{cancelAnimationFrame(e)}}n.current?.focus()}},[t,r,n])}export{n as u};

```
