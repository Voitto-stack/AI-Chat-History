---
title: userInfo-C2WcI-1X
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: userInfo-C2WcI-1X.js
---

# userInfo-C2WcI-1X

```js
var e=Object.defineProperty,s=(s,r,t)=>((s,r,t)=>r in s?e(s,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[r]=t)(s,"symbol"!=typeof r?r+"":r,t);import{eg as r,dq as t,dM as o}from"./main-BcomqkE8.js";import{bU as n,bV as a}from"./vendor-proto-C-lnwXQR.js";import"./BytePlusManager-C3IUa--3.js";import"./vendor-zustand-CLAZo2La.js";import"./vendor-react-54E4_waN.js";import"./vendor-image-DqRj4WXi.js";import"./vendor-im-7n5L8jf0.js";import"./vendor-tuicall-CoI_IVso.js";import"./vendor-utils-Di1-0pO8.js";const i="UserInfoWsHandler";const g=new class{constructor(){s(this,"wsManager",null)}getWsManager(){return this.wsManager||(this.wsManager=r.getInstance()),this.wsManager}init(){this.registerUserInfoListener(),this.registerMaleUserInfoListener()}registerUserInfoListener(){const e={onMessage:e=>{console.log(i,"收到用户信息更新推送:",e);const s=t.getState(),r=s.userInfo?.userId;r&&e.userId===r&&e.user?(s.setUserInfo(e.user),console.log(i,"用户信息已更新:",{userId:e.userId,updateTime:e.updateTime})):console.log(i,"忽略其他用户的信息更新:",e.userId)},resType:()=>n};this.getWsManager().addMessageListener("S2C_UserInfoUpdate",e)}registerMaleUserInfoListener(){const e={onMessage:e=>{console.log(i,"收到对方用户信息更新推送:",e),e.userId&&e.user&&(o.getState().setUserInfo(e.user),console.log(i,"对方用户信息已更新:",{userId:e.userId,updateTime:e.updateTime}))},resType:()=>a};this.getWsManager().addMessageListener("S2C_MaleUserInfoUpdate",e)}destroy(){this.wsManager&&(this.wsManager.removeMessageListener("S2C_UserInfoUpdate"),this.wsManager.removeMessageListener("S2C_MaleUserInfoUpdate"),console.log(i,"用户信息监听器已移除"))}};export{g as userInfoHandler};

```
