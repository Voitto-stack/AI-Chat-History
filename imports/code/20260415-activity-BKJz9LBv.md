---
title: activity-BKJz9LBv
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: activity-BKJz9LBv.js
---

# activity-BKJz9LBv

```js
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"1.0.0"};var n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="184e4987-1cce-416b-a844-5c4b7372b4f3",e._sentryDebugIdIdentifier="sentry-dbid-184e4987-1cce-416b-a844-5c4b7372b4f3")}catch(o){}}();import{g as e,B as n,a as o}from"./BytePlusManager-v1Z9XOMx.js";const t=["AddPaymentInfo","AddToCart","AddToWishlist","CompleteRegistration","Contact","CustomizeProduct","Donate","FindLocation","InitiateCheckout","Lead","Purchase","Schedule","Search","StartTrial","SubmitApplication","Subscribe","ViewContent","PageView"];async function a(o,a={}){const c=e();try{"tt"===c?await async function(e,n={}){try{"function"==typeof window.ttq?.track?(window.ttq.track(e,n),console.log(`[TikTok] Event: ${e}`,n)):console.warn("[TikTok] SDK not loaded, event dropped:",e)}catch(o){console.error("[TikTok] Track error:",o)}}(o,a.trackConfig):"fb"===c?await async function(e,n={}){try{if("function"==typeof window.fbq){const o=t.includes(e)?"track":"trackCustom";window.fbq(o,e,n),console.log(`[FB Pixel] ${o}: ${e}`,n)}else console.warn("[FB Pixel] SDK not loaded, event dropped:",e)}catch(o){console.error("[FB Pixel] Track error:",o)}}(o,a.trackConfig):"af"===c&&await async function(e,n={}){try{"function"==typeof window.AF?(window.AF("pba","event",{eventType:"EVENT",eventName:e,eventValue:n}),console.log(`[AppsFlyer] Event: ${e}`,n)):console.warn("[AppsFlyer] SDK not loaded, event dropped:",e)}catch(o){console.error("[AppsFlyer] Track error:",o)}}(o,a.trackConfig),await async function(o,t={}){const a=`ad_${o}`,c={channel:e()||"None",...t};n.getInstance().trackEvent(a,c)}(o,a.trackConfig),console.log(`[AdTrack] Event: ${o}, Channel: ${c||"None"}`)}catch(r){console.error("[AdTrack] Error:",r)}}setTimeout(()=>{n.getInstance().init(o.appId,o.channel),console.log("[Tracking] Activity module initialized")},100);export{a};

```
