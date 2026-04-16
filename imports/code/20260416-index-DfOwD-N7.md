---
title: index-DfOwD-N7
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: index-DfOwD-N7.js
---

# index-DfOwD-N7

```js
import{c3 as e,c4 as a,bZ as s,b_ as t,c5 as r,b$ as o,cM as i,cx as l,c0 as n,c7 as c}from"./main-BcomqkE8.js";import{r as d}from"./vendor-zustand-CLAZo2La.js";import{L as m}from"./Layout-BrbKO8PE.js";import{F as f}from"./FormErrorMessage-d7a6so4b.js";import{u}from"./useAutoFocus-D-3VEQ6H.js";import{S as p}from"./SkipTaskButton-x9qn575N.js";import{g as x,a as h,b,P as j}from"./taskMode-DqycB_Dg.js";import{u as g,a as v}from"./vendor-react-54E4_waN.js";import"./BytePlusManager-C3IUa--3.js";import"./vendor-proto-C-lnwXQR.js";import"./vendor-image-DqRj4WXi.js";import"./vendor-im-7n5L8jf0.js";import"./vendor-tuicall-CoI_IVso.js";import"./vendor-utils-Di1-0pO8.js";function k(){const k=g(),w=v(),_=!0===w.state?.taskMode,N=x(w.pathname),y=h(w.pathname),M=b(w.pathname),{userInfo:S,updateProfile:B}=e(),{showLoading:L,hideLoading:P}=a(),[z,C]=d.useState(S?.bio||""),[F,T]=d.useState(null),E=d.useRef(null);u(E),d.useEffect(()=>{_&&s(t.pwa_profile_task_bio_show)},[_]);const $=z.trim().length>0&&z.length<=150,A=r(async()=>{if($){L();try{await B({bio:z.trim()}),_&&s(t.pwa_profile_task_bio_continue,{bio:z.trim()}),s(t.pwa_profile_update_success,{field:"bio"}),_?k(y,{state:{taskMode:!0}}):l(k)}catch{c.error("Save failed")}finally{P()}}});return o.jsx(m,{showTabBar:!1,children:o.jsxs("div",{className:"flex flex-col h-full bg-surface",children:[o.jsx(i,{onBack:()=>_?k(M,"/"===M?{replace:!0}:{state:{taskMode:!0}}):l(k),rightSlot:_?o.jsx(p,{to:y}):null}),_?o.jsx("div",{className:"h-1 w-full bg-white",children:o.jsx("div",{className:"h-full bg-[#6bc4ff] transition-all duration-300",style:{width:`${j[N]??j[1]}%`}})}):null,o.jsxs("div",{className:"flex-1 flex flex-col p-6",children:[o.jsxs("div",{className:"flex-1 flex flex-col items-center",children:[o.jsx("h1",{className:"mt-3 text-brand-dark text-xl font-bold text-center capitalize",children:"Your bio"}),o.jsx("textarea",{ref:E,autoComplete:"off",value:z,onChange:e=>{return a=e.target.value,C(a),void T(a.length>150?"Please keep it within 150 characters":null);var a},className:"w-full h-[105px] mt-10 p-5 rounded-[14px] bg-[rgba(107,196,255,0.2)] text-brand-dark text-[15px] resize-none outline-none border border-[0.5px] border-[rgba(35,61,127,0.1)]"}),F&&o.jsx(f,{message:F,className:"mt-[14px]"})]}),o.jsx(n,{onClick:A,disabled:!$,variant:"primary",className:"shrink-0",children:_?"Next":"Save"})]})]})})}export{k as default};

```
