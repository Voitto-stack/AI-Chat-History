---
title: useCardDeck
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: useCardDeck.ts
---

# useCardDeck

```ts
import { useState, useCallback, useRef } from "react";
import type { ProfileCard } from "../api/discover";

interface HistoryEntry {
  card: ProfileCard;
  action: "like" | "pass" | "super";
}

export function useCardDeck() {
  const [cards, setCards] = useState<ProfileCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchedUser, setMatchedUser] = useState<ProfileCard | null>(null);
  const historyRef = useRef<HistoryEntry[]>([]);

  const removeTop = useCallback((action: HistoryEntry["action"]) => {
    setCards((prev) => {
      if (prev.length === 0) return prev;
      historyRef.current.push({ card: prev[0], action });
      return prev.slice(1);
    });
  }, []);

  const rewind = useCallback(() => {
    const entry = historyRef.current.pop();
    if (!entry) return;
    setCards((prev) => [entry.card, ...prev]);
  }, []);

  const canRewind = historyRef.current.length > 0;

  return { cards, setCards, loading, setLoading, matchedUser, setMatchedUser, removeTop, rewind, canRewind };
}

```
