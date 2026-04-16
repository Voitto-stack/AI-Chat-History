---
title: PhoneNumber-CR9yrjbB
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: PhoneNumber-CR9yrjbB.js
---

# PhoneNumber-CR9yrjbB

```js
import{c3 as e,c4 as a,c5 as s,b$ as t,cM as r,c0 as o,cx as i,c7 as l}from"./main-BcomqkE8.js";import{r as n}from"./vendor-zustand-CLAZo2La.js";import{L as m}from"./Layout-BrbKO8PE.js";import{u as c}from"./useAutoFocus-D-3VEQ6H.js";import{p as d,U as u,f}from"./phone-QZnozle7.js";import{I as p}from"./Input-DmESim1f.js";import{u as x}from"./vendor-react-54E4_waN.js";import"./BytePlusManager-C3IUa--3.js";import"./vendor-proto-C-lnwXQR.js";import"./vendor-image-DqRj4WXi.js";import"./vendor-im-7n5L8jf0.js";import"./vendor-tuicall-CoI_IVso.js";import"./vendor-utils-Di1-0pO8.js";import"./FormErrorMessage-d7a6so4b.js";function h(){const h=x(),{userInfo:j,updateProfile:b}=e(),{showLoading:v,hideLoading:g}=a(),[N,y]=n.useState(()=>d(j?.phoneNumber)),k=n.useRef(null);c(k);const w=N.length>=u,C=n.useCallback(e=>{y(f(e))},[]),_=s(async()=>{if(w){v();try{await b({phoneNumber:`+1 ${N}`}),i(h)}catch{l.error("Save failed")}finally{g()}}});return t.jsx(m,{showTabBar:!1,children:t.jsxs("div",{className:"flex flex-col h-full bg-surface",children:[t.jsx(r,{title:""}),t.jsxs("div",{className:"flex-1 flex flex-col p-6",children:[t.jsx(p,{title:"Your Phone Number",titleClassName:"text-xl font-bold capitalize text-brand-dark",children:t.jsxs("div",{className:"flex items-center justify-center w-[80%] h-14 mt-10 border-b-[0.5px] border-b-[#e5e5ea] overflow-hidden",children:[t.jsx("span",{className:"text-black/30 font-medium text-[22px] leading-7 mr-2 shrink-0",children:"+1"}),t.jsx("input",{ref:k,type:"tel",inputMode:"numeric",autoComplete:"off",value:N,onChange:e=>C(e.target.value),className:"flex-1 min-w-0 h-full p-0 border-0 bg-transparent text-black font-medium text-[28px] leading-7 text-left focus:outline-none autofill:bg-transparent autofill:shadow-[inset_0_0_0_1000px_transparent]"})]})}),t.jsx(o,{onClick:_,disabled:!w,variant:"primary",className:"shrink-0",children:"Save"})]})]})})}export{h as default};

```
