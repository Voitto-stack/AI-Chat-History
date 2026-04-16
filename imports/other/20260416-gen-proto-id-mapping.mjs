#!/usr/bin/env node
/**
 * Generate protoIdMapping.json from ProtoConfig*.json files.
 *
 * Each ProtoConfig JSON has:
 *   { startId: number, protos: [{ class_name: string, id?: number }] }
 *
 * Output: { [class_name]: id } mapping for all protos across all services.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_DIR = resolve(__dirname, "..");
const PROTO_DIR = join(PKG_DIR, "proto");
const OUTPUT = join(PKG_DIR, "src", "gen", "protoIdMapping.json");

/** Recursively find all ProtoConfig*.json files */
function findProtoConfigs(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findProtoConfigs(full));
    } else if (entry.startsWith("ProtoConfig") && entry.endsWith(".json")) {
      results.push(full);
    }
  }
  return results;
}

const mapping = {};
const configFiles = findProtoConfigs(PROTO_DIR);

console.log(`  Found ${configFiles.length} ProtoConfig files`);

for (const file of configFiles) {
  const config = JSON.parse(readFileSync(file, "utf-8"));
  const startId = config.startId ?? 0;

  for (let i = 0; i < config.protos.length; i++) {
    const proto = config.protos[i];
    const id = proto.id ?? startId + i;
    mapping[proto.class_name] = id;
  }
}

// Sort by ID for readability
const sorted = Object.fromEntries(
  Object.entries(mapping).sort(([, a], [, b]) => a - b),
);

writeFileSync(OUTPUT, JSON.stringify(sorted, null, 2) + "\n");
console.log(`  Written ${Object.keys(sorted).length} mappings to ${OUTPUT}`);
