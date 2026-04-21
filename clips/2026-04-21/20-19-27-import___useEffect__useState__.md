---
date: 2026-04-21T20:19:27+08:00
source: clipboard
chars: 5045
---

import { useEffect, useState } from "react";
import { Spin } from "antd";
import { getFeishuUrl } from "../../api/auth";
import { BrandPanel } from "./BrandPanel";
import { loginKeyframes } from "./styles";

const QR_SDK_URL =
  "https://lf-package-cn.feishucdn.com/obj/feishu-static/lark/passport/qrcode/LarkSSOSDKWebQRCode-1.0.3.js";

export const LoginPage = () => (
  <>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap"
    />
    <style>{loginKeyframes}</style>

    <div style={containerStyle}>
      <BrandPanel />
      <RightPanel />
    </div>

    <style>{responsiveStyle}</style>
  </>
);

const containerStyle: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'DM Sans', sans-serif",
  background: "#fafaf9",
};

const responsiveStyle = `
@media (max-width: 860px) {
  .login-brand-panel { display: none !important; }
}`;

const RightPanel = () => (
  <div style={formPanelStyle}>
    <div style={dotGridStyle} />
    <div style={formWrapperStyle}>
      <div style={{ marginBottom: 32 }}>
        <h2 style={headingStyle}>欢迎回来</h2>
        <p style={subHeadingStyle}>使用飞书扫码登录</p>
      </div>
      <FeishuQR />
    </div>
    <div style={versionTagStyle}>DMS v1.0</div>
  </div>
);

const FeishuQR = () => {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const { url } = await getFeishuUrl();
        if (cancelled) return;

        await loadScript(QR_SDK_URL);
        if (cancelled) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const QRLogin = (window as any).QRLogin;
        if (!QRLogin) throw new Error("QR SDK not loaded");

        const qrObj = QRLogin({
          id: "login-feishu-qr",
          goto: url,
          width: "300",
          height: "300",
          style: "border: none;",
        });

        const handleMessage = (event: MessageEvent) => {
          if (qrObj.matchOrigin(event.origin) && qrObj.matchData(event.data)) {
            window.location.href = `${url}&tmp_code=${event.data.tmp_code}`;
          }
        };

        window.addEventListener("message", handleMessage);
        setStatus("ready");
        return () => window.removeEventListener("message", handleMessage);
      } catch {
        if (!cancelled) {
          setError("Failed to load QR code");
          setStatus("error");
        }
      }
    };

    init();
    return () => { cancelled = true; };
  }, []);

  if (status === "error") {
    return (
      <div style={qrCenterStyle}>
        <p style={errorTipStyle}>{error}</p>
        <a href="/login" style={retryStyle}>Retry</a>
      </div>
    );
  }

  return (
    <div style={qrCenterStyle}>
      <div id="login-feishu-qr" style={qrBoxStyle} />
      {status === "loading" && <Spin />}
    </div>
  );
};

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

const formPanelStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "48px 40px",
  position: "relative",
};

const dotGridStyle: React.CSSProperties = {
  position: "absolute",
  top: 40,
  right: 40,
  width: 48,
  height: 48,
  backgroundImage: "radial-gradient(circle, rgba(99,144,255,0.18) 1.5px, transparent 1.5px)",
  backgroundSize: "12px 12px",
  opacity: 0.6,
};

const formWrapperStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 380,
  animation: "fadeInUp 0.8s ease-out 0.15s both",
};

const headingStyle: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontSize: 28,
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
  letterSpacing: -0.5,
};

const subHeadingStyle: React.CSSProperties = {
  fontSize: 14.5,
  color: "#94a3b8",
  marginTop: 8,
  marginBottom: 0,
};

const qrCenterStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 300,
};

const qrBoxStyle: React.CSSProperties = { width: 300, height: 300 };

const errorTipStyle: React.CSSProperties = {
  color: "#ef4444",
  fontSize: 13.5,
  textAlign: "center",
  marginBottom: 12,
};

const retryStyle: React.CSSProperties = { color: "#2563eb", fontSize: 14, textDecoration: "none", fontWeight: 500 };

const versionTagStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 28,
  fontSize: 12,
  color: "#cbd5e1",
  fontFamily: "'DM Sans', sans-serif",
};

