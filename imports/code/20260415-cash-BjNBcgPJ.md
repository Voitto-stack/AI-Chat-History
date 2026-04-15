---
title: cash-BjNBcgPJ
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: cash-BjNBcgPJ.js
---

# cash-BjNBcgPJ

```js
var e=Object.defineProperty,s=(s,t,r)=>((s,t,r)=>t in s?e(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r)(s,"symbol"!=typeof t?t+"":t,r);!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"1.0.0"};var s=(new e.Error).stack;s&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[s]="cecd867c-83af-4ae5-842d-42db270d4e9a",e._sentryDebugIdIdentifier="sentry-dbid-cecd867c-83af-4ae5-842d-42db270d4e9a")}catch(t){}}();import{ep as t,eq as r,dc as a}from"./main-BAGg6ga3.js";import"./BytePlusManager-v1Z9XOMx.js";import"./vendor-zustand-BrQ0TVkT.js";import"./vendor-react-DwIZYPhg.js";import"./vendor-proto-ByVKYZSo.js";import"./vendor-image-BPMeYV9u.js";import"./vendor-im-DKnro8vw.js";import"./vendor-tuicall-Byz_elCv.js";import"./vendor-utils-DVJro8Vm.js";const n="CashWsHandler";const o=new class{constructor(){s(this,"wsManager",null)}getWsManager(){return this.wsManager||(this.wsManager=t.getInstance()),this.wsManager}init(){this.registerCashListener()}registerCashListener(){const e={onMessage:e=>{console.log(n,"收到余额更新推送:",e);const s=parseFloat(e.cash||"0");a.getState().setCash(s),e.reason&&console.log(n,"余额变更原因:",e.reason)},resType:()=>r};this.getWsManager().addMessageListener("S2C_CashUpdate",e)}};export{o as cashHandler};

```
