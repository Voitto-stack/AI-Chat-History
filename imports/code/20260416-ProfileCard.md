---
title: ProfileCard
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: ProfileCard.tsx
---

# ProfileCard

```tsx
import { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import type { ProfileCard as ProfileCardData } from "../api/discover";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
export const CARD_WIDTH = SCREEN_WIDTH - 32;
export const CARD_HEIGHT = CARD_WIDTH * 1.4;

interface Props {
  card: ProfileCardData;
}

export function ProfileCard({ card }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const total = card.photos.length;

  const handleTap = (side: "left" | "right") => {
    if (side === "left" && photoIndex > 0) setPhotoIndex(photoIndex - 1);
    if (side === "right" && photoIndex < total - 1) setPhotoIndex(photoIndex + 1);
  };

  return (
    <View style={s.card}>
      <Image source={{ uri: card.photos[photoIndex] }} style={s.image} />
      <PhotoTapZones onTap={handleTap} />
      {total > 1 && <DotIndicator total={total} current={photoIndex} />}
      <CardInfo card={card} />
    </View>
  );
}

function PhotoTapZones({ onTap }: { onTap: (side: "left" | "right") => void }) {
  return (
    <View style={s.tapZones}>
      <TouchableWithoutFeedback onPress={() => onTap("left")}>
        <View style={s.tapZoneLeft} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => onTap("right")}>
        <View style={s.tapZoneRight} />
      </TouchableWithoutFeedback>
    </View>
  );
}

function DotIndicator({ total, current }: { total: number; current: number }) {
  return (
    <View style={s.dots}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[s.dot, i === current && s.dotActive]} />
      ))}
    </View>
  );
}

function CardInfo({ card }: { card: ProfileCardData }) {
  return (
    <View style={s.info}>
      <Text style={s.name}>
        {card.name}, {card.age}
      </Text>
      <Text style={s.bio}>{card.bio}</Text>
      <Text style={s.distance}>{card.distance}</Text>
    </View>
  );
}

export function SwipeLabel({ type }: { type: "like" | "pass" | "super" }) {
  const config = LABEL_CONFIG[type];
  return (
    <View style={[s.label, config.position, { borderColor: config.color, transform: [{ rotate: config.rotate }] }]}>
      <Text style={[s.labelText, { color: config.color }]}>{config.text}</Text>
    </View>
  );
}

const LABEL_CONFIG = {
  like: { text: "LIKE", color: "#4ADE80", position: { left: 24 } as const, rotate: "-15deg" },
  pass: { text: "PASS", color: "#F87171", position: { right: 24 } as const, rotate: "15deg" },
  super: { text: "SUPER", color: "#60A5FA", position: { left: 24 } as const, rotate: "-15deg" },
};

const s = StyleSheet.create({
  card: { width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: 16, overflow: "hidden", backgroundColor: "#1A1A1A" },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  tapZones: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  tapZoneLeft: { flex: 1 },
  tapZoneRight: { flex: 1 },
  dots: { position: "absolute", top: 8, left: 0, right: 0, flexDirection: "row", justifyContent: "center", gap: 4 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.4)" },
  dotActive: { backgroundColor: "#fff", width: 8, height: 8, borderRadius: 4 },
  info: { position: "absolute", bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: "rgba(0,0,0,0.55)" },
  name: { fontSize: 24, fontWeight: "700", color: "#fff" },
  bio: { fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4 },
  distance: { fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 6 },
  label: { position: "absolute", top: 40, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 3 },
  labelText: { fontSize: 28, fontWeight: "800", letterSpacing: 2 },
});

```
