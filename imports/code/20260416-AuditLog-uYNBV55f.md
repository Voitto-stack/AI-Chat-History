---
title: AuditLog-uYNBV55f
date: 2026-04-16T11:07:55+08:00
source: import
language: js
original: AuditLog-uYNBV55f.js
---

# AuditLog-uYNBV55f

```js
import{r as e}from"./rolldown-runtime-Dw2cE7zH.js";import{P as t,V as n,g as r,k as i,m as a,y as o}from"./vendor-antd-D2OY8gyT.js";import{r as s}from"./vendor-codemirror-CDEiZDLp.js";import{t as c}from"./client-DP1wUUNV.js";var l=e(n()),u=e=>c.post(`/logs/list`,e),d=s(),f=()=>{let[e,n]=(0,l.useState)([]),[s,c]=(0,l.useState)(!1),[f,p]=(0,l.useState)({limit:50,offset:0}),[m,h]=(0,l.useState)(null),g=async e=>{c(!0);try{n(await u(e))}catch{}finally{c(!1)}};return(0,l.useEffect)(()=>{g(f)},[]),(0,d.jsxs)(i,{direction:`vertical`,style:{width:`100%`},children:[(0,d.jsx)(i,{wrap:!0,children:(0,d.jsx)(t,{type:`primary`,onClick:()=>g(f),children:`刷新`})}),(0,d.jsx)(r,{columns:[{title:`用户`,dataIndex:`username`,key:`username`},{title:`操作`,dataIndex:`action`,key:`action`},{title:`SQL 语句`,dataIndex:`sql_text`,key:`sql_text`,ellipsis:!0,render:e=>e?(0,d.jsx)(a.Link,{onClick:()=>h(e),children:e}):null},{title:`执行结果`,dataIndex:`result_summary`,key:`result_summary`,ellipsis:!0},{title:`创建时间`,dataIndex:`created_at`,key:`created_at`}],dataSource:e,rowKey:`id`,loading:s,pagination:{pageSize:f.limit,onChange:e=>{let t={...f,offset:(e-1)*(f.limit??50)};p(t),g(t)}}}),(0,d.jsx)(o,{title:`SQL 语句`,open:!!m,onCancel:()=>h(null),footer:null,width:720,children:(0,d.jsx)(a.Text,{code:!0,copyable:!0,style:{whiteSpace:`pre-wrap`,display:`block`},children:m})})]})};export{f as AuditLogPage};
```
