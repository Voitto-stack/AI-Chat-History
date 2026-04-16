---
title: DetailItems
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: DetailItems.tsx
---

# DetailItems

```tsx
import icLocation from "@/assets/images/profile/location.webp";
import icProfession from "@/assets/images/profile/profession.webp";
import icBio from "@/assets/images/profile/bio.webp";
import icPaypal from "@/assets/images/profile/paypal.webp";
import icPaypalDone from "@/assets/images/profile/paypalDone.webp";

interface DetailItemsProps {
  hometown?: string;
  profession?: string;
  bio?: string;
  paypalAccount?: string;
  tags?: string[];
  onAddTags?: () => void;
}

export default function DetailItems({
  hometown,
  profession,
  bio,
  paypalAccount,
  tags = [],
  onAddTags,
}: DetailItemsProps) {
  const items = [
    {
      show: !!hometown && hometown !== "unknown",
      icon: icLocation,
      alt: "Location",
      label: "Hometown",
      value: hometown,
    },
    { show: !!profession, icon: icProfession, alt: "Profession", label: "Profession", value: profession },
    { show: !!bio, icon: icBio, alt: "Bio", label: "Bio", value: bio },
  ].filter((item) => item.show);

  const showTags = onAddTags || tags.length > 0;

  return (
    <div className="flex flex-col w-full mt-2 text-white text-sm drop-shadow-lg">
      {paypalAccount && (
        <div className="flex items-center gap-2.5 mb-2">
          <img src={icPaypal} alt="PayPal" className="w-4 h-4 shrink-0" />
          <span>{paypalAccount}</span>
          <img src={icPaypalDone} alt="Verified" className="w-4 h-4 shrink-0" />
        </div>
      )}
      {items.map((item) => (
        <div
          key={item.label}
          style={{ display: "flex", alignItems: "flex-start", marginBottom: 8, gap: 10, lineHeight: 1.5 }}
        >
          <img src={item.icon} alt={item.alt} className="w-4 h-4 shrink-0" style={{ marginTop: 2 }} />
          <span className={item.label === "Bio" ? "select-text" : undefined} style={{ wordBreak: "break-word" }}>
            <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{item.label}: </span>
            {item.value}
          </span>
        </div>
      ))}
      {showTags && (
        <div className="flex flex-wrap w-full gap-1.5">
          {onAddTags && (
            <button
              onClick={onAddTags}
              className="flex items-center justify-center px-3 py-1.5 bg-white/25 backdrop-blur-sm text-white text-xs font-medium rounded-xl border-none shadow-sm cursor-pointer hover:bg-white/40 transition-colors"
            >
              + Add tags
            </button>
          )}
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-xl shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

```
