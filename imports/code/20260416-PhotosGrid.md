---
title: PhotosGrid
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: PhotosGrid.tsx
---

# PhotosGrid

```tsx
import { View, Image, TouchableOpacity, StyleSheet, Alert, Dimensions } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const GRID_GAP = 8;
const GRID_PADDING = 24;
const COLUMNS = 3;
const ITEM_SIZE = (Dimensions.get("window").width - GRID_PADDING * 2 - GRID_GAP * (COLUMNS - 1)) / COLUMNS;

interface Props {
  photos: string[];
  maxPhotos?: number;
}

export function PhotosGrid({ photos, maxPhotos = 6 }: Props) {
  const slots = Array.from({ length: maxPhotos }, (_, i) => photos[i] ?? null);

  const handleAdd = () => {
    Alert.alert("Coming soon", "Photo upload will be available when the backend is ready.");
  };

  return (
    <View style={s.grid}>
      {slots.map((uri, i) => (
        <PhotoSlot key={i} uri={uri} onAdd={handleAdd} />
      ))}
    </View>
  );
}

function PhotoSlot({ uri, onAdd }: { uri: string | null; onAdd: () => void }) {
  if (uri) {
    return (
      <View style={s.slot}>
        <Image source={{ uri }} style={s.photo} />
      </View>
    );
  }

  return (
    <TouchableOpacity style={s.slot} onPress={onAdd} activeOpacity={0.7}>
      <View style={s.addSlot}>
        <FontAwesome name="plus" size={20} color="#555" />
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: GRID_GAP },
  slot: { width: ITEM_SIZE, height: ITEM_SIZE, borderRadius: 12, overflow: "hidden" },
  photo: { width: "100%", height: "100%", resizeMode: "cover" },
  addSlot: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2A2A2A",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
});

```
