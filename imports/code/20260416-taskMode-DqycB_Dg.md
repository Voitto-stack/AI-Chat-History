---
title: taskMode-DqycB_Dg
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: taskMode-DqycB_Dg.js
---

# taskMode-DqycB_Dg

```js
const n=["/tags","/bio","/profession"],t=n.reduce((n,t,r)=>(n[t]=r,n),{}),r={0:33.33,1:66.66,2:100};function s(n){return t[n]??0}function e(){return n[0]}function o(t){const r=s(t);return n[r+1]??"/"}function i(t){const r=s(t);return n[r-1]??"/"}function u(n){if(!n)return!1;const t=(n.bio??"").trim().length>0,r=(n.profession??"").trim().length>0,s=(n.interestTabs??[]).some(n=>(n.tags?.length??0)>0);return t&&r&&s}export{r as P,o as a,i as b,e as c,s as g,u as i};

```
