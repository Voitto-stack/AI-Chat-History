---
title: Approvals-VySV_bV4
date: 2026-04-16T11:07:55+08:00
source: import
language: js
original: Approvals-VySV_bV4.js
---

# Approvals-VySV_bV4

```js
import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{P as t,V as n,b as r,g as i,h as a,k as o}from"./vendor-antd-D2OY8gyT.js";import{r as s}from"./vendor-codemirror-CDEiZDLp.js";import{t as c}from"./auth-i3iDIpGz.js";import{a as l,i as u,r as d,t as f}from"./approvals-DavOkrSP.js";var p=e(n()),m=s();function h({onApprove:e,onReject:n,onExecute:r,canApprove:i,userId:s}){return[{title:`SQL 语句`,dataIndex:`sql_text`,key:`sql_text`,ellipsis:!0},{title:`状态`,dataIndex:`status`,key:`status`,render:e=>(0,m.jsx)(a,{children:e})},{title:`提交时间`,dataIndex:`created_at`,key:`created_at`},{title:`操作`,key:`action`,render:(a,c)=>i&&c.status===`pending`&&c.submitted_by!==s?(0,m.jsxs)(o,{children:[(0,m.jsx)(t,{type:`primary`,size:`small`,onClick:()=>e(c.id),children:`批准`}),(0,m.jsx)(t,{danger:!0,size:`small`,onClick:()=>n(c.id),children:`驳回`})]}):c.status===`approved`||c.status===`execute_failed`?(0,m.jsx)(t,{size:`small`,onClick:()=>r(c.id),children:`执行`}):null}]}var g=()=>{let[e,t]=(0,p.useState)([]),[n,a]=(0,p.useState)(!1),o=c(e=>e.user),s=o?.role===`admin`||o?.role===`maintainer`,g=async()=>{a(!0);try{t(await u())}catch{}finally{a(!1)}};return(0,p.useEffect)(()=>{g()},[]),(0,m.jsx)(i,{columns:h({onApprove:async e=>{try{await f(e),r.success(`已批准`)}catch{}finally{g()}},onReject:async e=>{try{await l(e),r.success(`已驳回`)}catch{}finally{g()}},onExecute:async e=>{try{await d(e),r.success(`已执行`)}catch{}finally{g()}},canApprove:s,userId:o?.id}),dataSource:e,rowKey:`id`,loading:n})};export{g as ApprovalsPage};
```
