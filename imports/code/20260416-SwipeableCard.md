---
title: SwipeableCard
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: SwipeableCard.tsx
---

# SwipeableCard

```tsx
import { Dimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import type { ProfileCard as ProfileCardData } from "../api/discover";
import { ProfileCard, SwipeLabel, CARD_WIDTH } from "./ProfileCard";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const SWIPE_UP_THRESHOLD = SCREEN_HEIGHT * 0.15;
const OUT_X = SCREEN_WIDTH * 1.2;
const OUT_Y = -SCREEN_HEIGHT * 0.8;

export type SwipeDirection = "left" | "right" | "up";

interface Props {
  card: ProfileCardData;
  onSwipe: (direction: SwipeDirection) => void;
}

export function SwipeableCard({ card, onSwipe }: Props) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY * 0.5;
    })
    .onEnd((e) => {
      if (e.translationX > SWIPE_THRESHOLD) {
        translateX.value = withTiming(OUT_X, { duration: 250 });
        runOnJS(onSwipe)("right");
      } else if (e.translationX < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-OUT_X, { duration: 250 });
        runOnJS(onSwipe)("left");
      } else if (e.translationY < -SWIPE_UP_THRESHOLD) {
        translateY.value = withTiming(OUT_Y, { duration: 250 });
        runOnJS(onSwipe)("up");
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(translateX.value, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-15, 0, 15], Extrapolation.CLAMP);
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotate: `${rotate}deg` }],
    };
  });

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP),
  }));

  const passOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  const superOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [-SWIPE_UP_THRESHOLD, 0], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[{ position: "absolute", width: CARD_WIDTH, alignSelf: "center" }, cardStyle]}>
        <ProfileCard card={card} />
        <Animated.View style={[{ position: "absolute" }, likeOpacity]}>
          <SwipeLabel type="like" />
        </Animated.View>
        <Animated.View style={[{ position: "absolute" }, passOpacity]}>
          <SwipeLabel type="pass" />
        </Animated.View>
        <Animated.View style={[{ position: "absolute" }, superOpacity]}>
          <SwipeLabel type="super" />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
}

```
