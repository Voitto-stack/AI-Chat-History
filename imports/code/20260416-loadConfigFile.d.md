---
title: loadConfigFile.d
date: 2026-04-16T11:07:55+08:00
source: import
language: ts
original: loadConfigFile.d.ts
---

# loadConfigFile.d

```ts
import type { LogHandler, MergedRollupOptions, RollupLog } from './rollup';

export interface BatchWarnings {
	add: (warning: RollupLog) => void;
	readonly count: number;
	flush: () => void;
	log: LogHandler;
	readonly warningOccurred: boolean;
}

export type LoadConfigFile = typeof loadConfigFile;

export function loadConfigFile(
	fileName: string,
	commandOptions: any,
	watchMode?: boolean
): Promise<{
	options: MergedRollupOptions[];
	warnings: BatchWarnings;
}>;

```
