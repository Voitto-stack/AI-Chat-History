---
title: activity-BHNrWZxc
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: activity-BHNrWZxc.js
---

# activity-BHNrWZxc

```js
import{g as o,B as e,a as n}from"./BytePlusManager-C3IUa--3.js";const t=["AddPaymentInfo","AddToCart","AddToWishlist","CompleteRegistration","Contact","CustomizeProduct","Donate","FindLocation","InitiateCheckout","Lead","Purchase","Schedule","Search","StartTrial","SubmitApplication","Subscribe","ViewContent","PageView"];async function a(n,a={}){const c=o();try{"tt"===c?await async function(o,e={}){try{"function"==typeof window.ttq?.track?(window.ttq.track(o,e),console.log(`[TikTok] Event: ${o}`,e)):console.warn("[TikTok] SDK not loaded, event dropped:",o)}catch(n){console.error("[TikTok] Track error:",n)}}(n,a.trackConfig):"fb"===c?await async function(o,e={}){try{if("function"==typeof window.fbq){const n=t.includes(o)?"track":"trackCustom";window.fbq(n,o,e),console.log(`[FB Pixel] ${n}: ${o}`,e)}else console.warn("[FB Pixel] SDK not loaded, event dropped:",o)}catch(n){console.error("[FB Pixel] Track error:",n)}}(n,a.trackConfig):"af"===c&&await async function(o,e={}){try{"function"==typeof window.AF?(window.AF("pba","event",{eventType:"EVENT",eventName:o,eventValue:e}),console.log(`[AppsFlyer] Event: ${o}`,e)):console.warn("[AppsFlyer] SDK not loaded, event dropped:",o)}catch(n){console.error("[AppsFlyer] Track error:",n)}}(n,a.trackConfig),await async function(n,t={}){const a=`ad_${n}`,c={channel:o()||"None",...t};e.getInstance().trackEvent(a,c)}(n,a.trackConfig),console.log(`[AdTrack] Event: ${n}, Channel: ${c||"None"}`)}catch(r){console.error("[AdTrack] Error:",r)}}setTimeout(()=>{e.getInstance().init(n.appId,n.channel),console.log("[Tracking] Activity module initialized")},100);export{a};

```
