---
title: Settings-Cs59s0Rj
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: Settings-Cs59s0Rj.js
---

# Settings-Cs59s0Rj

```js
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"1.0.0"};var s=(new e.Error).stack;s&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[s]="9ea03142-1774-472e-8baa-e4063cc93b18",e._sentryDebugIdIdentifier="sentry-dbid-9ea03142-1774-472e-8baa-e4063cc93b18")}catch(t){}}();import{bX as e,bI as s,bJ as t,c1 as n,bK as l,cx as a}from"./main-BAGg6ga3.js";import{r as o}from"./vendor-zustand-BrQ0TVkT.js";import{L as i}from"./Layout-CeUOMI75.js";import{u as r}from"./vendor-react-DwIZYPhg.js";import"./BytePlusManager-v1Z9XOMx.js";import"./vendor-proto-ByVKYZSo.js";import"./vendor-image-BPMeYV9u.js";import"./vendor-im-DKnro8vw.js";import"./vendor-tuicall-Byz_elCv.js";import"./vendor-utils-DVJro8Vm.js";function c(){const c=r(),{isTaskFinished:d,handleTaskAction:u}=e(),b=o.useRef(0),f=o.useRef(void 0);o.useEffect(()=>{s(t.pwa_profile_page_show)},[]);const m=[{label:"PhoneNumber",onClick:()=>c("/phoneNumber")},{label:"Profession",onClick:()=>c("/profession")},{label:"Bio",onClick:()=>c("/bio")},{label:"Tags",onClick:()=>c("/tags")},{label:"Link Instagram",statusText:d(n.BindInsAccount)?"Linked":"Not Connected",onClick:()=>u(n.BindInsAccount)},{label:"Debug",onClick:()=>c("/debug")}];return l.jsx(i,{showTabBar:!1,children:l.jsxs("div",{className:"flex flex-col h-full bg-surface",children:[l.jsx(a,{title:"Settings",onTitleClick:()=>{if(b.current+=1,clearTimeout(f.current),b.current>=5)return b.current=0,void c("/debug");f.current=setTimeout(()=>{b.current=0},2e3)}}),l.jsxs("div",{className:"flex flex-col mt-6 gap-0.5",children:[l.jsx("span",{className:"ml-6 mb-1.5 text-black/50 text-[13px] font-normal",children:"Account Information"}),m.map(e=>l.jsxs("button",{onClick:()=>{s(t.pwa_profile_edit_click,{field:e.label}),e.onClick()},className:"flex items-center mx-3 py-3 pl-3 rounded-xl bg-black/[0.03] text-black/95 text-left",children:[l.jsx("span",{className:"flex-1 min-w-0 block font-semibold text-[15px] capitalize",children:e.label}),l.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[e.statusText&&l.jsx("span",{className:"text-[12px] text-black/60",children:e.statusText}),l.jsx("svg",{className:"w-4 h-6 mr-3 text-black/70",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:l.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]},e.label))]})]})})}export{c as default};

```
