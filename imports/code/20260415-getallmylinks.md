---
title: getallmylinks
date: 2026-04-15T17:05:29+08:00
source: import
language: css
original: getallmylinks.css
---

# getallmylinks

```css
/* CSS 变量 */
:root {
  --bg-color: #f8fcff;
  --modal-bg: rgba(68, 186, 255, 0.8);
  --text-dark: #000;
  --text-secondary: rgba(60, 60, 67, 0.6);
  --accent-yellow: #ffd82a;
  --accent-orange: #ff9500;
  --accent-green: #34c759;
  --white: #fff;
}

/* 重置和基础样式 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
  background-color: var(--bg-color);
}

@font-face {
  font-family: "TTFellows";
  font-style: normal;
  font-weight: 900;
  src: url("/fonts/TT-Fellows-Black.ttf") format("truetype");
}

/* 容器 */
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 背景图片 */
.bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f8fcff;
}

/* 弹窗遮罩层 */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(68, 186, 255, 0.95);
  animation: fadeIn 300ms ease-out;
}

/* 旋转光效 */
.rotating-light {
  position: absolute;
  top: 50%;
  left: 50%;
  aspect-ratio: 1;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%) scale(1.5);
  will-change: transform, opacity;
  animation:
    fadeIn 500ms forwards,
    lightRotate 10s linear infinite 500ms;
}

/* 弹窗内容 */
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 314px;
  height: 407px;
  transform: translate(-50%, -50%);
  border-radius: 24px;
  background: var(--white);
  z-index: 10;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  will-change: transform, opacity;
  animation: scaleIn 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 弹窗头部圆圈 */
.modal-head {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 96px;
  height: 96px;
  transform: translate(-50%, -248px);
  border-radius: 50%;
  background-color: var(--white);
  z-index: 9;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* 图标 */
.modal-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 62px;
  height: 62px;
  transform: translate(-50%, -238px);
  z-index: 11;
  animation: bounceIn 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 200ms both;
}

/* 标题 */
.modal-title {
  margin-top: 36px;
  color: var(--text-dark);
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  text-transform: capitalize;
}

/* 描述文字 */
.modal-description {
  margin: 9px 20px 0;
  color: var(--text-secondary);
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
}

/* 金额框 */
.amount-box {
  display: flex;
  flex-direction: column;
  width: 266px;
  height: 144px;
  margin: 24px auto 0;
  border-radius: 12px;
  background: #f2f2f7;
}

/* 金额显示 */
.amount {
  margin: 28px auto 0;
  color: var(--accent-orange);
  font-weight: 900;
  font-size: 44px;
  animation: countUp 1s ease-out;
  font-family: TTFellows;
}

.amount::before {
  content: "$";
}

/* 进度条 */
.progress-container {
  align-self: stretch;
  margin: 30px 34px 0;
  height: 12px;
  background: var(--white);
  border-radius: 6px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--accent-green);
  border-radius: 6px;
  width: 0%;
  animation: progressFill 1.5s ease-out 0.5s forwards;
  transition: width 0.3s ease;
}

/* 按钮 */
.claim-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 266px;
  margin: 38px auto 0;
  padding: 15px 10px;
  border: none;
  border-radius: 999px;
  background: #0c0c0c;
  color: var(--white);
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition:
    transform 0.1s,
    opacity 0.2s;
}

.claim-btn:active {
  transform: scale(0.96);
  opacity: 0.9;
}

/* 关闭按钮 */
.close-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 238px);
  z-index: 20;
  cursor: pointer;
  width: 44px;
  height: 44px;
  -webkit-tap-highlight-color: transparent;
}

/* 装饰性手势动画 */
.hand-decoration {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90px;
  height: 90px;
  transform: translate(60px, 120px);
  z-index: 15;
  font-size: 60px;
  animation: wave 2s ease-in-out infinite;
  cursor: pointer;
}

/* 隐藏状态 */
.hidden {
  display: none !important;
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes lightRotate {
  to {
    transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -238px) scale(0.3);
  }

  50% {
    transform: translate(-50%, -238px) scale(1.1);
  }

  70% {
    transform: translate(-50%, -238px) scale(0.9);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, -238px) scale(1);
  }
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progressFill {
  to {
    width: 50%;
  }
}

@keyframes wave {
  0%,
  100% {
    transform: translate(60px, 120px) rotate(-10deg);
  }

  50% {
    transform: translate(60px, 120px) rotate(10deg);
  }
}

/* PayPal 成功页面 */
.paypal-success {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  background-color: #f8fcff;
  z-index: 9999;
}

/* 加载优化 */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* 性能优化 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

```
