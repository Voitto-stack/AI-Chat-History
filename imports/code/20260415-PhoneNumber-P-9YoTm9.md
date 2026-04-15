---
title: PhoneNumber-P-9YoTm9
date: 2026-04-15T17:04:50+08:00
source: import
language: js
original: PhoneNumber-P-9YoTm9.js
---

# PhoneNumber-P-9YoTm9

```js
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{};e.SENTRY_RELEASE={id:"1.0.0"};var s=(new e.Error).stack;s&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[s]="4ebf4f52-5c93-4c7d-9b18-1965c07ab65d",e._sentryDebugIdIdentifier="sentry-dbid-4ebf4f52-5c93-4c7d-9b18-1965c07ab65d")}catch(t){}}();import{bO as e,bP as s,bQ as t,bK as a,cx as r,bL as o,ch as n,bS as i}from"./main-BAGg6ga3.js";import{r as l}from"./vendor-zustand-BrQ0TVkT.js";import{L as d}from"./Layout-CeUOMI75.js";import{u as f}from"./useAutoFocus-BbIeiR1h.js";import{p as u,U as c,f as m}from"./phone-D89kNvEw.js";import{I as p}from"./Input-CWgdAL8p.js";import{u as b}from"./vendor-react-DwIZYPhg.js";import"./BytePlusManager-v1Z9XOMx.js";import"./vendor-proto-ByVKYZSo.js";import"./vendor-image-BPMeYV9u.js";import"./vendor-im-DKnro8vw.js";import"./vendor-tuicall-Byz_elCv.js";import"./vendor-utils-DVJro8Vm.js";import"./FormErrorMessage-DkzHdeXw.js";function x(){const x=b(),{userInfo:h,updateProfile:j}=e(),{showLoading:g,hideLoading:v}=s(),[y,w]=l.useState(()=>u(h?.phoneNumber)),N=l.useRef(null);f(N);const _=y.length>=c,k=l.useCallback(e=>{w(m(e))},[]),I=t(async()=>{if(_){g();try{await j({phoneNumber:`+1 ${y}`}),n(x)}catch{i.error("Save failed")}finally{v()}}});return a.jsx(d,{showTabBar:!1,children:a.jsxs("div",{className:"flex flex-col h-full bg-surface",children:[a.jsx(r,{title:""}),a.jsxs("div",{className:"flex-1 flex flex-col p-6",children:[a.jsx(p,{title:"Your Phone Number",titleClassName:"text-xl font-bold capitalize text-brand-dark",children:a.jsxs("div",{className:"flex items-center justify-center w-[80%] h-14 mt-10 border-b-[0.5px] border-b-[#e5e5ea] overflow-hidden",children:[a.jsx("span",{className:"text-black/30 font-medium text-[22px] leading-7 mr-2 shrink-0",children:"+1"}),a.jsx("input",{ref:N,type:"tel",inputMode:"numeric",autoComplete:"off",value:y,onChange:e=>k(e.target.value),className:"flex-1 min-w-0 h-full p-0 border-0 bg-transparent text-black font-medium text-[28px] leading-7 text-left focus:outline-none autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent]"})]})}),a.jsx(o,{onClick:I,disabled:!_,variant:"primary",className:"shrink-0",children:"Save"})]})]})})}export{x as default};

```
