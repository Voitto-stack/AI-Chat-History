---
title: Settings-M6XBKp3G
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: Settings-M6XBKp3G.js
---

# Settings-M6XBKp3G

```js
import{cc as e,bZ as s,b_ as t,ch as l,b$ as n,cM as o}from"./main-BcomqkE8.js";import{r as a}from"./vendor-zustand-CLAZo2La.js";import{L as r}from"./Layout-BrbKO8PE.js";import{u as i}from"./vendor-react-54E4_waN.js";import"./BytePlusManager-C3IUa--3.js";import"./vendor-proto-C-lnwXQR.js";import"./vendor-image-DqRj4WXi.js";import"./vendor-im-7n5L8jf0.js";import"./vendor-tuicall-CoI_IVso.js";import"./vendor-utils-Di1-0pO8.js";function c(){const c=i(),{isTaskFinished:m,handleTaskAction:d}=e(),u=a.useRef(0),x=a.useRef(void 0);a.useEffect(()=>{s(t.pwa_profile_page_show)},[]);const p=[{label:"PhoneNumber",onClick:()=>c("/phoneNumber")},{label:"Profession",onClick:()=>c("/profession")},{label:"Bio",onClick:()=>c("/bio")},{label:"Tags",onClick:()=>c("/tags")},{label:"Link Instagram",statusText:m(l.BindInsAccount)?"Linked":"Not Connected",onClick:()=>d(l.BindInsAccount)}];return n.jsx(r,{showTabBar:!1,children:n.jsxs("div",{className:"flex flex-col h-full bg-surface",children:[n.jsx(o,{title:"Settings",onTitleClick:()=>{if(u.current+=1,clearTimeout(x.current),u.current>=5)return u.current=0,void c("/debug");x.current=setTimeout(()=>{u.current=0},2e3)}}),n.jsxs("div",{className:"flex flex-col mt-6 gap-0.5",children:[n.jsx("span",{className:"ml-6 mb-1.5 text-black/50 text-[13px] font-normal",children:"Account Information"}),p.map(e=>n.jsxs("button",{onClick:()=>{s(t.pwa_profile_edit_click,{field:e.label}),e.onClick()},className:"flex items-center mx-3 py-3 pl-3 rounded-xl bg-black/[0.03] text-black/95 text-left",children:[n.jsx("span",{className:"flex-1 min-w-0 block font-semibold text-[15px] capitalize",children:e.label}),n.jsxs("div",{className:"flex items-center gap-1.5 shrink-0",children:[e.statusText&&n.jsx("span",{className:"text-[12px] text-black/60",children:e.statusText}),n.jsx("svg",{className:"w-4 h-6 mr-3 text-black/70",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:n.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5l7 7-7 7"})})]})]},e.label))]})]})})}export{c as default};

```
