---
title: userInfo-BHSZyN1n
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: userInfo-BHSZyN1n.js
---

# userInfo-BHSZyN1n

```js
var e=Object.defineProperty,s=(s,r,t)=>((s,r,t)=>r in s?e(s,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[r]=t)(s,"symbol"!=typeof r?r+"":r,t);!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"1.0.0"};var s=(new e.Error).stack;s&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[s]="480fa96a-1587-4373-ae87-ea78ea44a686",e._sentryDebugIdIdentifier="sentry-dbid-480fa96a-1587-4373-ae87-ea78ea44a686")}catch(r){}}();import{ep as r,er as t,es as n,dc as a,dK as o}from"./main-BAGg6ga3.js";import"./BytePlusManager-v1Z9XOMx.js";import"./vendor-zustand-BrQ0TVkT.js";import"./vendor-react-DwIZYPhg.js";import"./vendor-proto-ByVKYZSo.js";import"./vendor-image-BPMeYV9u.js";import"./vendor-im-DKnro8vw.js";import"./vendor-tuicall-Byz_elCv.js";import"./vendor-utils-DVJro8Vm.js";const i="UserInfoWsHandler";const d=new class{constructor(){s(this,"wsManager",null)}getWsManager(){return this.wsManager||(this.wsManager=r.getInstance()),this.wsManager}init(){this.registerUserInfoListener(),this.registerMaleUserInfoListener()}registerUserInfoListener(){const e={onMessage:e=>{console.log(i,"收到用户信息更新推送:",e);const s=a.getState(),r=s.userInfo?.userId;r&&e.userId===r&&e.user?(s.setUserInfo(e.user),console.log(i,"用户信息已更新:",{userId:e.userId,updateTime:e.updateTime})):console.log(i,"忽略其他用户的信息更新:",e.userId)},resType:()=>t};this.getWsManager().addMessageListener("S2C_UserInfoUpdate",e)}registerMaleUserInfoListener(){const e={onMessage:e=>{console.log(i,"收到对方用户信息更新推送:",e),e.userId&&e.user&&(o.getState().setUserInfo(e.user),console.log(i,"对方用户信息已更新:",{userId:e.userId,updateTime:e.updateTime}))},resType:()=>n};this.getWsManager().addMessageListener("S2C_MaleUserInfoUpdate",e)}destroy(){this.wsManager&&(this.wsManager.removeMessageListener("S2C_UserInfoUpdate"),this.wsManager.removeMessageListener("S2C_MaleUserInfoUpdate"),console.log(i,"用户信息监听器已移除"))}};export{d as userInfoHandler};

```
