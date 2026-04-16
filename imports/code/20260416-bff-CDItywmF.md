---
title: bff-CDItywmF
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: bff-CDItywmF.js
---

# bff-CDItywmF

```js
import{ds as t}from"./main-BcomqkE8.js";import{bJ as e,bK as a,bL as r,bM as i}from"./vendor-proto-C-lnwXQR.js";const n=t=>{if(!t)return"W1";return{1:"W1",2:"W2",3:"W3",4:"W4",5:"W5",6:"DONE"}[t]??"W1"},o=(t,e)=>t[e]??0,s=(t,e)=>t[e],l=(t,e)=>{return{relationId:String(t.relationshipId??`member-${e}`),nickname:t.nickname||"",avatar:t.avatar||"",currentStage:n(t.currentStage),stageProgress:[],inactiveHours:t.lastActiveTime?Math.max(0,Math.floor((Date.now()/1e3-t.lastActiveTime)/3600)):0,pokeAvailable:!0,riskFlag:t.riskStatus||"NONE",taskText:"",mainBtnText:"Poke Her",stageReminderCopy:t.stageReminderCopy||"",activeStatus:(a=t.activeStatus,["active","idle","inactive","very_inactive"].includes(a??"")?t.activeStatus:"active"),activeStatusCopy:t.activeStatusCopy||""};var a},u=async()=>{try{const r=await t.requestPost2(e,{},a);return console.log("[BFF API] getOverview response:",r),{lockedAmount:o(r,"lockedAmountDollars"),availableAmount:o(r,"availableAmountDollars"),entryStatus:r.entryStatus??"NO_INVITE",totalInviteCount:r.totalInviteCount??0,inviteCode:r.inviteCode||"",bannerGiftAmount:r.inviteeSignupRewardDollars??0,bannerRewardAmount:r.inviterSignupRewardDollars??0,inviteeSignupReward:r.inviteeSignupRewardDollars??0,inviterSignupReward:r.inviterSignupRewardDollars??0,content:r.content?{title:r.content.title,subTitle:r.content.subTitle}:void 0,squadActivityStatus:void 0,recentEarnerNickname:void 0,recentEarnerAmount:void 0}}catch(r){throw console.error("[BFF API] getOverview error:",r),r}},d=async()=>{try{const e=await t.requestPost2(r,{},i);return console.log("[BFF API] getDashboard response:",e),{lockedAmount:Number(s(e,"lockedAmountDollars")??0),availableAmount:Number(s(e,"availableAmountDollars")??0),inviteUrl:"",shareText:e.shareText||"",hasPendingCoinAnimation:e.hasPendingCoinAnimation??!1,animationRewardDelta:void 0,squadList:(e.squadList||[]).map(l),inviteCode:e.inviteCode||"",defaultCopy:e.defaultContent||"",defaultReward:e.defaultRewards?.[0]?{taskName:e.defaultRewards[0].title||"",rewardAmount:Number((e.defaultRewards[0].subTitle||"").replace(/[^\d.]/g,""))||60}:void 0,historicalWithdrawAmount:Number(s(e,"historicalWithdrawAmountDollars")??0),defaultRewards:(e.defaultRewards||[]).map(t=>({title:t.title||"",subTitle:t.subTitle||""})),buttonText:String(s(e,"buttonText")??"")}}catch(e){throw console.error("[BFF API] getDashboard error:",e),e}};export{d as a,u as g};

```
