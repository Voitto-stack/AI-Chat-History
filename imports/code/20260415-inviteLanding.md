---
title: inviteLanding
date: 2026-04-15T17:04:49+08:00
source: import
language: html
original: inviteLanding.html
---

# inviteLanding

```html
<!doctype html>
<html lang="en" style="background-color: #d2f0ff">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="theme-color" content="#d2f0ff" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self'; connect-src 'self' https://app.sitin.ai https://*.sitin.ai https://*.gracechat.com https://*.swapnumber.com; manifest-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';"
    />
    <title>You're Invited - SitIn</title>

    <link rel="preload" as="image" href="/logo192.png" />
    <link rel="manifest" href="/manifest.webmanifest" />

    <!-- BytePlus Rangers SDK -->
    <script>
      (function (win, export_obj) {
        win["LogAnalyticsObject"] = export_obj;
        if (!win[export_obj]) {
          function _collect() {
            _collect.q.push(arguments);
          }
          _collect.q = _collect.q || [];
          win[export_obj] = _collect;
        }
        win[export_obj].l = +new Date();
      })(window, "collectEvent");
    </script>
    <script
      async
      src="https://lf3-data.volccdn.com/obj/data-static/log-sdk/collect/5.0/collect-rangers-v5.1.12.js"
    ></script>

    <!-- 埋点和渠道 JS -->
    <script type="module">
      import * as tracking from "/src/tracking/activity.ts";

      window.adTrack = tracking.adTrack;
      window.setOriginalChannel = tracking.setOriginalChannel;
      window.setAdChannel = tracking.setAdChannel;
      window.getAdChannel = tracking.getAdChannel;
      window.getTtclid = tracking.getTtclid;
      window.setTtclid = tracking.setTtclid;
      window.getFbclid = tracking.getFbclid;
      window.setFbclid = tracking.setFbclid;

      window.bytePlusTrack = (eventName, params) => {
        tracking.BytePlusManager.getInstance().trackEvent(eventName, params);
      };
    </script>

    <link rel="stylesheet" href="./inviteLanding.css" />
  </head>

  <body>
    <div class="page">
      <!-- 蓝色头部 -->
      <div class="header">
        <!-- 头像 + 名字（左右布局） -->
        <div class="header-top">
          <img id="inviterAvatar" class="avatar-img" src="/logo192.png" alt="Inviter" loading="eager" />
          <div class="header-info">
            <span class="inviter-name" id="inviterName">Your friend</span>
            <div class="invite-tag">
              <span class="tag-fire">🔥</span>
              <span class="tag-text" id="inviterTagline">Already earning on SitIn</span>
            </div>
          </div>
        </div>

        <!-- 大标题（接口 title 字段） -->
        <h1 class="header-title" id="headerTitle">Wants You To Join.</h1>
      </div>

      <!-- 白色主体 -->
      <div class="body">
        <!-- 绿色奖励卡片 -->
        <div class="reward-card">
          <div class="reward-left">
            <span class="reward-amount" id="rewardAmount">$20</span>
          </div>
          <div class="reward-right">
            <p class="reward-label">HEAD START</p>
            <p class="reward-label reward-label--bold">BONUS</p>
            <p class="reward-ready" id="rewardSubtitle">Ready to claim</p>
          </div>
        </div>

        <!-- How It Works 步骤 -->
        <h2 class="steps-title">How It Works</h2>
        <div class="steps-list">
          <!-- 步骤 1 -->
          <div class="step">
            <svg
              class="step-icon"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="14" fill="url(#grad-download)" />
              <path
                d="M14 24.6668H26V26.0002H14V24.6668ZM20.6667 20.7812L24.7141 16.7338L25.6569 17.6766L20 23.3335L14.3431 17.6766L15.286 16.7338L19.3333 20.7812V13.3335H20.6667V20.7812Z"
                fill="#0087CD"
              />
              <defs>
                <linearGradient id="grad-download" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#EFFAFF" />
                  <stop offset="1" stop-color="#BBEBFF" />
                </linearGradient>
              </defs>
            </svg>
            <div class="step-content">
              <p class="step-label">Install the App</p>
              <p class="step-desc">Get BFF &amp; create your creator profile</p>
            </div>
          </div>

          <!-- 虚线连接器 -->
          <div class="step-connector">
            <svg width="1" height="116" viewBox="0 0 1 116" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0.5"
                y1="0.5"
                x2="0.5"
                y2="115.5"
                stroke="#CACACA"
                stroke-linecap="round"
                stroke-dasharray="3 3"
              />
            </svg>
          </div>

          <!-- 步骤 2 -->
          <div class="step">
            <svg
              class="step-icon"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="14" fill="url(#grad-verify)" />
              <path
                d="M18.6715 13.4022C17.7371 13.0997 16.7214 13.5204 16.2745 14.395L15.7374 15.4465C15.6735 15.5714 15.5719 15.673 15.447 15.7369L14.3955 16.274C13.5209 16.7209 13.1002 17.7366 13.4027 18.671L13.7663 19.7944C13.8095 19.9278 13.8095 20.0716 13.7663 20.205L13.4027 21.3284C13.1002 22.2628 13.5209 23.2785 14.3955 23.7253L15.447 24.2625C15.5719 24.3264 15.6735 24.428 15.7374 24.5529L16.2745 25.6043C16.7214 26.4789 17.7371 26.8996 18.6715 26.5972L19.7949 26.2336C19.9283 26.1904 20.072 26.1904 20.2055 26.2336L21.3288 26.5972C22.2632 26.8996 23.279 26.4789 23.7258 25.6043L24.263 24.5529C24.3268 24.428 24.4284 24.3264 24.5533 24.2625L25.6048 23.7253C26.4794 23.2785 26.9001 22.2628 26.5977 21.3284L26.234 20.205C26.1908 20.0716 26.1908 19.9278 26.234 19.7944L26.5977 18.671C26.9001 17.7366 26.4794 16.7209 25.6048 16.274L24.5533 15.7369C24.4284 15.673 24.3268 15.5714 24.263 15.4465L23.7258 14.395C23.279 13.5204 22.2632 13.0997 21.3288 13.4022L20.2055 13.7658C20.072 13.809 19.9283 13.809 19.7949 13.7658L18.6715 13.4022ZM17.4619 15.0017C17.6108 14.7101 17.9494 14.5699 18.2609 14.6707L19.3842 15.0343C19.7846 15.164 20.2157 15.164 20.6161 15.0343L21.7395 14.6707C22.0509 14.5699 22.3895 14.7101 22.5385 15.0017L23.0757 16.0531C23.2671 16.4279 23.5719 16.7327 23.9467 16.9242L24.9982 17.4614C25.2897 17.6103 25.43 17.9489 25.3291 18.2604L24.9655 19.3838C24.8359 19.7842 24.8359 20.2152 24.9655 20.6156L25.3291 21.739C25.43 22.0504 25.2897 22.389 24.9982 22.538L23.9467 23.0752C23.5719 23.2666 23.2671 23.5715 23.0757 23.9462L22.5385 24.9977C22.3895 25.2892 22.0509 25.4295 21.7395 25.3286L20.6161 24.965C20.2157 24.8354 19.7846 24.8354 19.3842 24.965L18.2609 25.3286C17.9494 25.4295 17.6108 25.2892 17.4619 24.9977L16.9247 23.9462C16.7332 23.5715 16.4284 23.2666 16.0536 23.0752L15.0022 22.538C14.7106 22.389 14.5704 22.0504 14.6712 21.739L15.0348 20.6156C15.1645 20.2152 15.1645 19.7842 15.0348 19.3838L14.6712 18.2604C14.5704 17.9489 14.7106 17.6103 15.0022 17.4614L16.0536 16.9242C16.4284 16.7327 16.7332 16.4279 16.9247 16.0531L17.4619 15.0017ZM16.5066 19.838L19.335 22.6664L24.0491 17.9523L23.1063 17.0095L19.335 20.7808L17.4494 18.8951L16.5066 19.838Z"
                fill="black"
              />
              <defs>
                <linearGradient id="grad-verify" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFE2F3" />
                  <stop offset="1" stop-color="#FFBBE3" />
                </linearGradient>
              </defs>
            </svg>
            <div class="step-content">
              <p class="step-label">Face Verify</p>
              <p class="step-desc">Quick scan to verify you're human</p>
            </div>
          </div>

          <!-- 虚线连接器 -->
          <div class="step-connector">
            <svg width="1" height="116" viewBox="0 0 1 116" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0.5"
                y1="0.5"
                x2="0.5"
                y2="115.5"
                stroke="#CACACA"
                stroke-linecap="round"
                stroke-dasharray="3 3"
              />
            </svg>
          </div>

          <!-- 步骤 3 -->
          <div class="step">
            <svg
              class="step-icon"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="14" fill="url(#grad-phone)" />
              <g clip-path="url(#clip-phone)">
                <path
                  d="M23.5424 25.88C23.03 25.88 22.3102 25.6947 21.2323 25.0925C19.9217 24.3575 18.9079 23.6789 17.6043 22.3787C16.3474 21.1227 15.7358 20.3094 14.8798 18.7517C13.9127 16.993 14.0776 16.071 14.2618 15.677C14.4813 15.2061 14.8052 14.9244 15.2239 14.6449C15.4617 14.4891 15.7134 14.3555 15.9757 14.2459C16.002 14.2346 16.0264 14.2238 16.0482 14.2141C16.1781 14.1556 16.375 14.0671 16.6244 14.1616C16.7908 14.2241 16.9394 14.3519 17.1719 14.5816C17.6489 15.052 18.3007 16.0996 18.5412 16.6142C18.7026 16.9609 18.8094 17.1898 18.8097 17.4466C18.8097 17.7471 18.6585 17.9789 18.475 18.2291C18.4406 18.2761 18.4065 18.3209 18.3734 18.3645C18.1736 18.627 18.1298 18.7029 18.1587 18.8383C18.2172 19.1106 18.6538 19.9209 19.3712 20.6368C20.0886 21.3526 20.8756 21.7616 21.1489 21.8199C21.2901 21.8501 21.3675 21.8044 21.6384 21.5975C21.6773 21.5679 21.7172 21.5372 21.7589 21.5065C22.0388 21.2983 22.2598 21.151 22.5533 21.151H22.5548C22.8103 21.151 23.0289 21.2618 23.3912 21.4445C23.8637 21.6828 24.9428 22.3262 25.4161 22.8037C25.6463 23.0358 25.7747 23.1838 25.8374 23.35C25.932 23.6002 25.843 23.7962 25.7849 23.9275C25.7752 23.9493 25.7645 23.9732 25.7532 23.9997C25.6427 24.2616 25.5084 24.5127 25.3518 24.7499C25.0728 25.1673 24.7901 25.4905 24.3181 25.7102C24.0757 25.8248 23.8105 25.8829 23.5424 25.88Z"
                  fill="black"
                />
              </g>
              <defs>
                <linearGradient id="grad-phone" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#FFECE2" />
                  <stop offset="1" stop-color="#FFCDB7" />
                </linearGradient>
                <clipPath id="clip-phone">
                  <rect width="12" height="12" fill="white" transform="translate(14 14)" />
                </clipPath>
              </defs>
            </svg>
            <div class="step-content">
              <p class="step-label">Take First Call</p>
              <p class="step-desc">Connect with your first fan &amp; unlock $20</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部 CTA -->
      <div class="footer">
        <div class="cta-wrap breath-animation" id="ctaBtn">
          <div class="cta-progress-bg">
            <div class="cta-progress-fill" id="ctaProgressFill">
              <div class="shimmer"></div>
            </div>
          </div>
          <span class="cta-text" id="ctaText">Claim My $20 &amp; Get Started</span>
        </div>
      </div>
    </div>

    <script src="./inviteLanding.js"></script>
  </body>
</html>

```
