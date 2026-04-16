---
title: BrandPanel
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: BrandPanel.tsx
---

# BrandPanel

```tsx
import { features } from "./features";
import {
  brandPanelStyle,
  gridOverlayStyle,
  glowOrbStyle,
  diamonds,
  tagLabelStyle,
  titleStyle,
  subtitleStyle,
  dividerStyle,
  bottomTagStyle,
} from "./styles";

export const BrandPanel = () => (
  <div style={brandPanelStyle} className="login-brand-panel">
    <div style={gridOverlayStyle} />
    <div style={glowOrbStyle} />
    <Diamonds />
    <BrandContent />
    <div style={bottomTagStyle}>安全 · 可审计 · 可控</div>
  </div>
);

const Diamonds = () => (
  <>
    {diamonds.map((d, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: d.top,
          left: d.left,
          width: d.size,
          height: d.size,
          border: "1px solid rgba(99,144,255,0.12)",
          transform: "rotate(45deg)",
          animation: `floatDiamond ${d.duration} ease-in-out ${d.delay} infinite`,
          pointerEvents: "none",
        }}
      />
    ))}
  </>
);

const BrandContent = () => (
  <div style={{ position: "relative", zIndex: 1 }}>
    <div style={{ animation: "fadeInUp 0.8s ease-out both" }}>
      <div style={tagLabelStyle}>欢迎使用</div>
      <h1 style={titleStyle}>DMS</h1>
      <p style={subtitleStyle}>数据库管理系统</p>
    </div>
    <div style={dividerStyle} />
    <FeatureGrid />
  </div>
);

const featureCardStyle = (i: number): React.CSSProperties => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 14,
  padding: "16px 18px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  backdropFilter: "blur(8px)",
  animation: `fadeInUp 0.7s ease-out ${0.3 + i * 0.1}s both`,
});

const FeatureGrid = () => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 480 }}>
    {features.map((f, i) => (
      <div key={f.title} style={featureCardStyle(i)}>
        <span
          style={{ fontSize: 20, color: "#60a5fa", lineHeight: 1, flexShrink: 0, marginTop: 2 }}
        >
          {f.icon}
        </span>
        <div>
          <div style={featureTitleStyle}>{f.title}</div>
          <div style={featureDescStyle}>{f.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

const featureTitleStyle: React.CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontSize: 14,
  fontWeight: 700,
  color: "#e2e8f0",
  marginBottom: 4,
};

const featureDescStyle: React.CSSProperties = {
  fontSize: 12.5,
  color: "rgba(255,255,255,0.35)",
  lineHeight: 1.5,
};

```
