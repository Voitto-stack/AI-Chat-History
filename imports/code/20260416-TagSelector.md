---
title: TagSelector
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: TagSelector.tsx
---

# TagSelector

```tsx
/* eslint-disable react-refresh/only-export-components */
import "react";
import type { InterestTab as TagTab, InterestTag as TagItem } from "@heyhru/business-pwa-proto/gen/archat_api/user_api";

export interface TagGroup {
  key: string;
  name: string;
  tags: TagItem[];
}

interface TagSelectorProps {
  list: TagGroup[];
  selectedList: TagTab[];
  onChange: (tabs: TagTab[]) => void;
  maxSelected?: number;
}

function buildSelectedMap(selectedList: TagTab[]) {
  const map = new Map<string, Set<string>>();
  selectedList.forEach((tab) => {
    const groupKey = tab.key ?? "defaultKey";
    const tags = tab.tags ?? [];
    if (!map.has(groupKey)) map.set(groupKey, new Set());
    const set = map.get(groupKey);
    tags.forEach((tag) => {
      if (tag.key && set) set.add(tag.key);
    });
  });
  return map;
}

export function countSelectedTags(selectedList: TagTab[]) {
  return selectedList.reduce((count, tab) => count + (tab.tags?.length || 0), 0);
}

function mapToSelectedTabs(map: Map<string, Set<string>>): TagTab[] {
  return Array.from(map.entries())
    .map(([groupKey, tagKeys]) => ({
      key: groupKey,
      tags: Array.from(tagKeys).map((tagKey) => ({
        key: tagKey,
        sortKey: undefined,
        picUrls: undefined,
      })),
    }))
    .filter((tab) => (tab.tags?.length || 0) > 0);
}

export default function TagSelector({ list, selectedList, onChange, maxSelected = 5 }: TagSelectorProps) {
  const selectedCount = countSelectedTags(selectedList);
  const selectedMap = buildSelectedMap(selectedList);

  const handleTagClick = (groupKey: string, tagKey: string) => {
    const currentCount = selectedCount;
    const groupSet = new Set(selectedMap.get(groupKey) ?? []);
    const isSelected = groupSet.has(tagKey);

    if (!isSelected && currentCount >= maxSelected) return;

    if (isSelected) {
      groupSet.delete(tagKey);
    } else {
      groupSet.add(tagKey);
    }

    const nextMap = new Map(selectedMap);
    if (groupSet.size === 0) {
      nextMap.delete(groupKey);
    } else {
      nextMap.set(groupKey, groupSet);
    }

    onChange(mapToSelectedTabs(nextMap));
  };

  return (
    <div className="mx-3 flex flex-col gap-10 pb-[150px]">
      {list.map((item) => (
        <div key={item.key} className="flex flex-col">
          <h2 className="text-[15px] font-semibold text-brand-dark">{item.name}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => {
              const tagKey = tag.key ?? "";
              const groupKey = item.key;
              const isSelected = selectedMap.get(groupKey)?.has(tagKey) ?? false;
              const isDisabled = !isSelected && selectedCount >= maxSelected;

              return (
                <button
                  key={`${groupKey}-${tagKey}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleTagClick(groupKey, tagKey)}
                  className={`flex h-10 items-center justify-center rounded-[30px] px-4 text-[13px] capitalize transition-colors ${
                    isSelected ? "bg-[#6bc4ff] text-brand-dark" : "bg-[rgba(107,196,255,0.12)] text-brand-dark/50"
                  } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {tagKey || "Unknown"}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

```
