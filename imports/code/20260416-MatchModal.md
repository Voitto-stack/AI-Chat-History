---
title: MatchModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: MatchModal.tsx
---

# MatchModal

```tsx
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { ProfileCard } from "../api/discover";

interface Props {
  visible: boolean;
  matchedUser: ProfileCard | null;
  onClose: () => void;
}

export function MatchModal({ visible, matchedUser, onClose }: Props) {
  if (!matchedUser) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={s.backdrop}>
        <View style={s.content}>
          <FontAwesome name="heart" size={48} color="#E84D7A" style={s.icon} />
          <Text style={s.title}>It's a Match!</Text>
          <Text style={s.subtitle}>You and {matchedUser.name} liked each other</Text>
          <TouchableOpacity style={s.messageBtn} onPress={onClose}>
            <Text style={s.messageBtnText}>Send a Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.continueBtn} onPress={onClose}>
            <Text style={s.continueBtnText}>Keep Swiping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    marginTop: 8,
    marginBottom: 32,
  },
  messageBtn: {
    backgroundColor: "#E84D7A",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 48,
    marginBottom: 12,
  },
  messageBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  continueBtn: {
    paddingVertical: 12,
  },
  continueBtnText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
  },
});

```
