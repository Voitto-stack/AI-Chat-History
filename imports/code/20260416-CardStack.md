---
title: CardStack
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: CardStack.tsx
---

# CardStack

```tsx
import { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { ProfileCard as ProfileCardData } from "../api/discover";
import { CARD_HEIGHT } from "./ProfileCard";
import { SwipeableCard, type SwipeDirection } from "./SwipeableCard";

interface Props {
  cards: ProfileCardData[];
  canRewind: boolean;
  onLike: (card: ProfileCardData) => void;
  onPass: (card: ProfileCardData) => void;
  onSuperLike: (card: ProfileCardData) => void;
  onRewind: () => void;
}

export function CardStack({ cards, canRewind, onLike, onPass, onSuperLike, onRewind }: Props) {
  const topCard = cards[0];
  const nextCard = cards[1];

  const handleSwipe = useCallback(
    (direction: SwipeDirection) => {
      if (!topCard) return;
      if (direction === "right") onLike(topCard);
      else if (direction === "up") onSuperLike(topCard);
      else onPass(topCard);
    },
    [topCard, onLike, onPass, onSuperLike],
  );

  if (!topCard) return <EmptyState />;

  return (
    <GestureHandlerRootView style={s.container}>
      <View style={s.cardArea}>
        {nextCard && (
          <View style={s.nextCard}>
            <SwipeableCard card={nextCard} onSwipe={() => {}} />
          </View>
        )}
        <SwipeableCard key={topCard.id} card={topCard} onSwipe={handleSwipe} />
      </View>
      <ActionButtons
        canRewind={canRewind}
        onRewind={onRewind}
        onPass={() => handleSwipe("left")}
        onSuperLike={() => handleSwipe("up")}
        onLike={() => handleSwipe("right")}
      />
    </GestureHandlerRootView>
  );
}

function EmptyState() {
  return (
    <View style={s.empty}>
      <FontAwesome name="heart-o" size={48} color="#333" />
      <Text style={s.emptyTitle}>No more cards</Text>
      <Text style={s.emptySubtitle}>Check back later for new people</Text>
    </View>
  );
}

interface ActionProps {
  canRewind: boolean;
  onRewind: () => void;
  onPass: () => void;
  onSuperLike: () => void;
  onLike: () => void;
}

function ActionButtons({ canRewind, onRewind, onPass, onSuperLike, onLike }: ActionProps) {
  return (
    <View style={s.actions}>
      <TouchableOpacity style={[s.actionBtn, s.rewindBtn, !canRewind && s.disabledBtn]} onPress={onRewind} disabled={!canRewind}>
        <FontAwesome name="undo" size={20} color={canRewind ? "#F59E0B" : "#444"} />
      </TouchableOpacity>
      <TouchableOpacity style={[s.actionBtn, s.passBtn]} onPress={onPass}>
        <FontAwesome name="times" size={28} color="#F87171" />
      </TouchableOpacity>
      <TouchableOpacity style={[s.actionBtn, s.superBtn]} onPress={onSuperLike}>
        <FontAwesome name="star" size={22} color="#60A5FA" />
      </TouchableOpacity>
      <TouchableOpacity style={[s.actionBtn, s.likeBtn]} onPress={onLike}>
        <FontAwesome name="heart" size={24} color="#4ADE80" />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  cardArea: { height: CARD_HEIGHT, alignItems: "center", justifyContent: "center" },
  nextCard: { position: "absolute", transform: [{ scale: 0.95 }], opacity: 0.6 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  emptyTitle: { fontSize: 20, fontWeight: "700", color: "#555" },
  emptySubtitle: { fontSize: 14, color: "#444" },
  actions: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20, paddingTop: 24 },
  actionBtn: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", borderWidth: 2 },
  rewindBtn: { borderColor: "rgba(245,158,11,0.4)", backgroundColor: "rgba(245,158,11,0.1)" },
  passBtn: { width: 60, height: 60, borderRadius: 30, borderColor: "rgba(248,113,113,0.4)", backgroundColor: "rgba(248,113,113,0.1)" },
  superBtn: { borderColor: "rgba(96,165,250,0.4)", backgroundColor: "rgba(96,165,250,0.1)" },
  likeBtn: { width: 60, height: 60, borderRadius: 30, borderColor: "rgba(74,222,128,0.4)", backgroundColor: "rgba(74,222,128,0.1)" },
  disabledBtn: { borderColor: "rgba(68,68,68,0.3)", backgroundColor: "rgba(68,68,68,0.1)" },
});

```
