---
title: getallmylinks-CItVBfSp
date: 2026-04-16T11:07:54+08:00
source: import
language: js
original: getallmylinks-CItVBfSp.js
---

# getallmylinks-CItVBfSp

```js
import{s as n,b as t,g as e,c as o,d as a,e as i,f as c,B as d}from"./BytePlusManager-C3IUa--3.js";import{a as l}from"./activity-BHNrWZxc.js";window.adTrack=l,window.setOriginalChannel=n,window.setAdChannel=t,window.getAdChannel=e,window.getTtclid=o,window.setTtclid=a,window.getFbclid=i,window.setFbclid=c,window.bytePlusTrack=(n,t)=>{d.getInstance().trackEvent(n,t)},console.log("✅ Tracking loaded from src/tracking/activity.ts"),function(){const n=document.getElementById("claimBtn"),t=document.getElementById("closeBtn"),e=document.getElementById("handDecoration"),o=document.getElementById("modalOverlay"),a=document.getElementById("paypalSuccess"),i=new URLSearchParams(window.location.search),c=i.get("chl");if(c&&"function"==typeof window.setOriginalChannel&&window.setOriginalChannel(c),"function"==typeof window.bytePlusTrack){window.bytePlusTrack("pwa_conv_lp_show"),window.bytePlusTrack("ad_pwa_conv_lp_show");window.chrome&&/Chrome/.test(navigator.userAgent)?window.bytePlusTrack("web_ads_link_page_show"):window.bytePlusTrack("web_ads_link_page_show_non_chrome")}function d(){"function"==typeof window.bytePlusTrack&&(window.bytePlusTrack("pwa_conv_lp_clickButton"),window.bytePlusTrack("ad_pwa_conv_lp_clickButton"),window.chrome&&/Chrome/.test(navigator.userAgent)?window.bytePlusTrack("pwa_ad_cashout_click"):window.bytePlusTrack("pwa_ad_cashout_click_non_chrome"));"function"==typeof window.adTrack&&window.adTrack("ClickButton");if(window.chrome&&/Chrome/.test(navigator.userAgent))window.location.href="/activity/installToClaim.html"+window.location.search;else{o.classList.add("hidden"),a.classList.remove("hidden");const n={};i.forEach((t,e)=>{n[e]=t}),c&&(n.chl_trans=c),function(n,t){let e="";t&&(e=Object.keys(t).filter(n=>null!=t[n]).map(n=>`${n}=${t[n]}`).join("&"),e=`?${e}`);const o=`intent://${window.location.host}/${n}${e}#Intent;scheme=https;package=com.android.chrome;end`;window.location.href=o}("activity/installToClaim.html",n)}}n&&n.addEventListener("click",d),t&&t.addEventListener("click",d),e&&e.addEventListener("click",d),document.body.addEventListener("touchmove",function(n){n.preventDefault()},{passive:!1});const l="/activity/install-to-claim.html"+window.location.search,s=document.createElement("link");s.rel="prefetch",s.href=l,document.head.appendChild(s)}();

```
