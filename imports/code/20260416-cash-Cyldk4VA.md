---
title: cash-Cyldk4VA
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: cash-Cyldk4VA.js
---

# cash-Cyldk4VA

```js
var e=Object.defineProperty,s=(s,r,t)=>((s,r,t)=>r in s?e(s,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[r]=t)(s,"symbol"!=typeof r?r+"":r,t);import{eg as r,dq as t}from"./main-BcomqkE8.js";import{bT as a}from"./vendor-proto-C-lnwXQR.js";import"./BytePlusManager-C3IUa--3.js";import"./vendor-zustand-CLAZo2La.js";import"./vendor-react-54E4_waN.js";import"./vendor-image-DqRj4WXi.js";import"./vendor-im-7n5L8jf0.js";import"./vendor-tuicall-CoI_IVso.js";import"./vendor-utils-Di1-0pO8.js";const o="CashWsHandler";const n=new class{constructor(){s(this,"wsManager",null)}getWsManager(){return this.wsManager||(this.wsManager=r.getInstance()),this.wsManager}init(){this.registerCashListener()}registerCashListener(){const e={onMessage:e=>{console.log(o,"收到余额更新推送:",e);const s=parseFloat(e.cash||"0");t.getState().setCash(s),e.reason&&console.log(o,"余额变更原因:",e.reason)},resType:()=>a};this.getWsManager().addMessageListener("S2C_CashUpdate",e)}};export{n as cashHandler};

```
