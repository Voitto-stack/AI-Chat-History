---
title: useAutoFocus-D-3VEQ6H
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: useAutoFocus-D-3VEQ6H.js
---

# useAutoFocus-D-3VEQ6H

```js
import{r as e}from"./vendor-zustand-CLAZo2La.js";function n(n,r={}){const{enabled:t=!0,defer:o="none"}=r;e.useEffect(()=>{if(t){if("raf"===o){const e=requestAnimationFrame(()=>{n.current?.focus()});return()=>{cancelAnimationFrame(e)}}n.current?.focus()}},[o,t,n])}export{n as u};

```
