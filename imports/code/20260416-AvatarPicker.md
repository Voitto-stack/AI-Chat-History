---
title: AvatarPicker
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: AvatarPicker.tsx
---

# AvatarPicker

```tsx
import { View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface Props {
  uri: string | null;
  size?: number;
  onPress?: () => void;
}

export function AvatarPicker({ uri, size = 100, onPress }: Props) {
  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    Alert.alert("Coming soon", "Photo upload will be available when the backend is ready.");
  };

  const borderRadius = size / 2;

  return (
    <TouchableOpacity style={s.wrapper} onPress={handlePress} activeOpacity={0.7}>
      <View style={[s.container, { width: size, height: size, borderRadius }]}>
        {uri ? (
          <Image source={{ uri }} style={[s.image, { width: size, height: size, borderRadius }]} />
        ) : (
          <FontAwesome name="user" size={size * 0.4} color="#555" />
        )}
      </View>
      <View style={s.badge}>
        <FontAwesome name="camera" size={12} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    position: "relative",
  },
  container: {
    backgroundColor: "#1A1A1A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#2A2A2A",
  },
  image: {
    resizeMode: "cover",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E84D7A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#0A0A0A",
  },
});

```
