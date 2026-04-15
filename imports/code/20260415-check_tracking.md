---
title: check_tracking
date: 2026-04-15T17:05:29+08:00
source: import
language: py
original: check_tracking.py
---

# check_tracking

```py
#!/usr/bin/env python3
"""
PWA & react-haven 双项目埋点核对脚本

功能：
  1. 核对 CSV 要求的事件在 PWA 中是否有定义 + 实际调用
  2. 扫描 react-haven 中同一事件是否也有调用
  3. 对两个项目都调用了同一事件的情况，比对传参是否一致
  4. 列出 haven 已实现但 PWA 未调用的事件（需要补埋）
  5. 列出 PWA 实际调用但不在「需要的埋点」CSV 里的事件（可清理）

用法: python3 check_tracking.py
输出: 终端报告 + tracking_audit_result.csv
"""

import ast
import csv
import re
import difflib
from pathlib import Path
from collections import defaultdict

# ─── 路径配置 ────────────────────────────────────���───────────────────────────
SCRIPT_DIR   = Path(__file__).parent
CSV_FILE     = SCRIPT_DIR / "docs" / "PWA埋点核对——0327 - 我们需要的埋点.csv"

# PWA
PWA_EVENTS_TS = SCRIPT_DIR / "src" / "tracking" / "events.ts"
PWA_SRC_DIR   = SCRIPT_DIR / "src"
PWA_ACTIVITY_DIR = SCRIPT_DIR / "activity"  # activity 目录单独声明

# react-haven（与 sitin-monorepo 同级的独立项目）
HAVEN_ROOT      = SCRIPT_DIR.parent.parent.parent / "react-haven-feat-video"
HAVEN_EVENTS_TS = HAVEN_ROOT / "src" / "track" / "EventName.ts"
HAVEN_SRC_DIR   = HAVEN_ROOT / "src"

OUTPUT_CSV = SCRIPT_DIR / "tracking_audit_result.csv"

# 服务端 / 原生端事件 — 客户端不调用属正常
SERVER_PREFIXES = (
    "pwa_server_",
    "pwa_native_",
    "join_hatching_pool",
    "join_the_racing_pool",
    "join_main_flow_pool",
    "disuse_pool",
    "the_racing_pool_settle_hour_wage",
    "ins_query_user_misc",
    "ins_message_send",
    "generate_ins_message",
    "get_ins_chat_reward",
    "gc_apk_ai_onboarding_reward_toast",
    "pwa_auto_call_task_disabled",
    "pwa_start_foreground_service",
    "pwa_script_action",
    "pwa_call_begin_from_native",
    "pwa_audio_call_started",
    "pwa_native_voice_data_received",
)

# 颜色
GREEN  = "\033[92m"
YELLOW = "\033[93m"
RED    = "\033[91m"
BLUE   = "\033[94m"
CYAN   = "\033[96m"
RESET  = "\033[0m"
BOLD   = "\033[1m"
DIM    = "\033[2m"


# ═══════════════════════════════════════════════════════════════════════════════
# Step 1: 读取 CSV
# ═══════════════════════════════════════════════════════════════════════════════
def load_csv_events(csv_path: Path) -> list[dict]:
    events, seen = [], set()
    for enc in ["utf-8-sig", "utf-8", "gbk"]:
        try:
            with open(csv_path, encoding=enc) as f:
                reader = csv.reader(f)
                for i, row in enumerate(reader):
                    if i == 0:
                        continue
                    if len(row) < 3:
                        continue
                    name = row[2].strip()
                    if not name or name == "事件名称":
                        continue
                    if name not in seen:
                        events.append({
                            "event_name": name,
                            "business_module": row[0].strip(),
                            "seq": row[1].strip(),
                        })
                        seen.add(name)
            print(f"CSV 读取成功（{enc}），共 {len(events)} 个唯一事件名")
            return events
        except Exception:
            continue
    raise RuntimeError(f"无法读取 CSV: {csv_path}")


# ═══════════════════════════════════════════════════════════════════════════════
# Step 2: 解析 EventName 注册表
# ═══════════════════════════════════════════════════════════════════════════════
EVENT_PREFIXES = (
    "pwa_", "web_", "ad_", "gc_",
    "join_", "the_", "disuse_", "ins_", "get_", "generate_",
)

def load_event_registry(ts_path: Path) -> set[str]:
    """从 events.ts / EventName.ts 提取所有定义的事件名字符串值"""
    content = ts_path.read_text(encoding="utf-8")
    pattern = re.compile(r':\s*"([a-zA-Z][a-zA-Z0-9_]*)"')
    defined = set()
    for m in pattern.findall(content):
        if any(m.startswith(p) for p in EVENT_PREFIXES):
            defined.add(m)
    return defined


# ═══════════════════════════════════════════════════════════════════════════════
# Step 3: 搜索实际调用 + 提取参数
# ═══════════════════════════════════════════════════════════════════════════════

# 匹配调用行：抓事件名 key（EventName.KEY 或直接字符串）
CALL_RE = re.compile(
    r'(?:bpTrack|trackEvent|adTrack|adBytePlusTrack|ttTrack|fbTrack|afTrack|window\.bytePlusTrack)\s*\('
    r'\s*(?:EventName\.(\w+)|"([a-zA-Z0-9_]+)")',
)
BPM_RE = re.compile(
    r'\.trackEvent\s*\(\s*(?:EventName\.(\w+)|"([a-zA-Z0-9_]+)")',
)

# 提取行内 { key: ... } 参数对象的 key 名
PARAM_KEY_RE = re.compile(r'\b([a-zA-Z_][a-zA-Z0-9_]*)\s*:(?!:)')

# 多行调用块终止符
BLOCK_END_RE = re.compile(r'\)\s*;?\s*$')


def _extract_param_keys_from_block(lines: list[str], start: int) -> set[str]:
    """
    从 start 行开始，往后最多扫 10 行，提取 { ... } 内的参数 key。
    遇到调用结束符 ); 停止。
    """
    block = []
    for i in range(start, min(start + 10, len(lines))):
        block.append(lines[i])
        if BLOCK_END_RE.search(lines[i]) and i > start:
            break
    combined = " ".join(block)
    # 只取花括号内的部分
    brace_match = re.search(r'\{([^}]*)\}', combined)
    if not brace_match:
        return set()
    inner = brace_match.group(1)
    # 排除 spread (...)、数字值等
    keys = set()
    for k in PARAM_KEY_RE.findall(inner):
        if not k.startswith("...") and not k[0].isdigit():
            keys.add(k)
    # 排除常见误匹配词
    noise = {"true", "false", "null", "undefined", "new", "return", "const", "let", "var"}
    return keys - noise


def find_call_sites_with_params(
    src_dir: Path,
    all_event_names: set[str],
    project_label: str,
    extra_dirs: list[Path] = None,  # 额外的扫描目录
) -> dict[str, list[dict]]:
    """
    返回 { event_name: [ { "loc": "rel/path.tsx:N", "params": set[str] } ] }
    """
    result: dict[str, list[dict]] = defaultdict(list)

    # 收集所有要扫描的文件
    scan_dirs = [src_dir]
    if extra_dirs:
        scan_dirs.extend(extra_dirs)

    ts_files = []
    for scan_dir in scan_dirs:
        if not scan_dir.exists():
            continue
        ts_files.extend(scan_dir.rglob("*.ts"))
        ts_files.extend(scan_dir.rglob("*.tsx"))
        ts_files.extend(scan_dir.rglob("*.js"))  # 支持 .js 文件

    for fpath in ts_files:
        try:
            content = fpath.read_text(encoding="utf-8")
        except Exception:
            continue
        rel = str(fpath.relative_to(src_dir.parent))
        lines = content.splitlines()

        for lineno, line in enumerate(lines, 1):
            for pattern in (CALL_RE, BPM_RE):
                for m in pattern.finditer(line):
                    key = m.group(1) or m.group(2)
                    if not key or key not in all_event_names:
                        continue
                    loc = f"{rel}:{lineno}"
                    # 避免重复记录同一位置
                    existing_locs = [e["loc"] for e in result[key]]
                    if loc in existing_locs:
                        continue
                    params = _extract_param_keys_from_block(lines, lineno - 1)
                    result[key].append({"loc": loc, "params": params})

    called = sum(1 for v in result.values() if v)
    print(f"[{project_label}] {len(ts_files)} 个文件，{called} 个事件有调用记录")
    return dict(result)


# ═══════════════════════════════════════════════════════════════════════════════
# Step 4: 跨项目参数比对
# ═══════════════════════════════════════════════════════════════════════════════

def compare_params(
    pwa_calls: list[dict],
    haven_calls: list[dict],
) -> dict:
    """
    汇总两个项目对同一事件的所有参数 key，返回比对结果。
    """
    pwa_all  = set().union(*(c["params"] for c in pwa_calls))   if pwa_calls   else set()
    haven_all = set().union(*(c["params"] for c in haven_calls)) if haven_calls else set()

    only_pwa   = pwa_all - haven_all
    only_haven = haven_all - pwa_all
    common     = pwa_all & haven_all

    if not pwa_all and not haven_all:
        param_status = "两端均无参数"
    elif pwa_all == haven_all:
        param_status = "✅ 参数一致"
    elif not only_pwa and not only_haven:
        param_status = "✅ 参数一致"
    else:
        param_status = "⚠️ 参数有差异"

    return {
        "param_status": param_status,
        "pwa_params":   sorted(pwa_all),
        "haven_params": sorted(haven_all),
        "only_pwa":     sorted(only_pwa),
        "only_haven":   sorted(only_haven),
        "common":       sorted(common),
    }


# ═══════════════════════════════════════════════════════════════════════════════
# Step 5: 分类
# ═══════════════════════════════════════════════════════════════════════════════

def is_server_event(name: str) -> bool:
    return name in SERVER_PREFIXES or any(
        name.startswith(p) for p in SERVER_PREFIXES if "_" in p
    )


def classify(
    csv_events:    list[dict],
    pwa_defined:   set[str],
    haven_defined: set[str],
    pwa_calls:     dict[str, list[dict]],
    haven_calls:   dict[str, list[dict]],
) -> list[dict]:
    all_defined = pwa_defined | haven_defined
    results = []

    for item in csv_events:
        name = item["event_name"]

        in_pwa_ts    = name in pwa_defined
        in_haven_ts  = name in haven_defined
        pwa_sites    = pwa_calls.get(name, [])
        haven_sites  = haven_calls.get(name, [])
        pwa_called   = bool(pwa_sites)
        haven_called = bool(haven_sites)
        server       = is_server_event(name)

        # ── PWA 状态 ──
        if in_pwa_ts and pwa_called:
            pwa_status = "✅ 已实现"
        elif in_pwa_ts and not pwa_called:
            pwa_status = "🖥️  服务端" if server else "⚠️ 已定义未调用"
        else:
            pwa_status = "🖥️  服务端" if server else "❌ 缺失"

        # ── haven 状态 ──
        if in_haven_ts and haven_called:
            haven_status = "✅ 已实现"
        elif in_haven_ts and not haven_called:
            haven_status = "🖥️  服务端" if server else "⚠️ 已定义未调用"
        else:
            haven_status = "🖥️  服务端" if server else "❌ 缺失"

        # ── 参数比对（仅当两端都有调用时） ──
        param_cmp = None
        if pwa_called and haven_called:
            param_cmp = compare_params(pwa_sites, haven_sites)

        # ── fuzzy 建议（针对 PWA 完全缺失的） ──
        suggestions = []
        if not in_pwa_ts and not server:
            suggestions = difflib.get_close_matches(name, all_defined, n=3, cutoff=0.75)

        results.append({
            **item,
            "in_pwa_ts":    in_pwa_ts,
            "in_haven_ts":  in_haven_ts,
            "pwa_called":   pwa_called,
            "haven_called": haven_called,
            "pwa_status":   pwa_status,
            "haven_status": haven_status,
            "pwa_sites":    pwa_sites,
            "haven_sites":  haven_sites,
            "param_cmp":    param_cmp,
            "suggestions":  suggestions,
        })
    return results


# ═══════════════════════════════════════════════════════════════════════════════
# Step 6: 打印报告
# ═══════════════════════════════════════════════════════════════════════════════

def print_report(results: list[dict], pwa_called_not_needed: list[str], csv_needed_names: set[str]):
    total = len(results)

    pwa_ok     = sum(1 for r in results if r["pwa_status"]   == "✅ 已实现")
    pwa_warn   = sum(1 for r in results if r["pwa_status"]   == "⚠️ 已定义未调用")
    pwa_miss   = sum(1 for r in results if r["pwa_status"]   == "❌ 缺失")
    haven_ok   = sum(1 for r in results if r["haven_status"] == "✅ 已实现")
    haven_warn = sum(1 for r in results if r["haven_status"] == "⚠️ 已定义未调用")
    haven_miss = sum(1 for r in results if r["haven_status"] == "❌ 缺失")

    both_called   = [r for r in results if r["pwa_called"] and r["haven_called"]]
    param_diff    = [r for r in both_called if r["param_cmp"] and r["param_cmp"]["param_status"] == "⚠️ 参数有差异"]
    fuzzy_matches = [r for r in results if r["suggestions"]]

    W = 64
    print()
    print(f"{BOLD}{'═' * W}{RESET}")
    print(f"{BOLD}  PWA & react-haven 埋点核对报告{RESET}")
    print(f"{BOLD}{'═' * W}{RESET}")
    print(f"  CSV 唯一事件总数: {BOLD}{total}{RESET}")
    print()
    print(f"  {'项目':<20} {'✅ 已实现':>10} {'⚠️ 已定义未调用':>16} {'❌ 缺失':>8}")
    print(f"  {'-'*56}")
    print(f"  {'PWA':<20} {GREEN}{pwa_ok:>10}{RESET} {YELLOW}{pwa_warn:>16}{RESET} {RED}{pwa_miss:>8}{RESET}")
    print(f"  {'react-haven':<20} {GREEN}{haven_ok:>10}{RESET} {YELLOW}{haven_warn:>16}{RESET} {RED}{haven_miss:>8}{RESET}")
    print()
    print(f"  两端都有调用的事件: {BOLD}{len(both_called)}{RESET}")
    print(f"  其中参数有差异:     {YELLOW if param_diff else GREEN}{BOLD}{len(param_diff)}{RESET}")
    print(f"  命名疑似差异:       {BLUE}{BOLD}{len(fuzzy_matches)}{RESET}")

    # ── ⚠️ PWA 已定义未调用 ──
    items = [r for r in results if r["pwa_status"] == "⚠️ 已定义未调用"]
    if items:
        print()
        print(f"{YELLOW}{BOLD}--- ⚠️  PWA 已定义但未在前端调用 ({len(items)}) ---{RESET}")
        for r in items:
            haven_hint = f"  {DIM}[haven: {r['haven_status']}]{RESET}" if r["in_haven_ts"] else ""
            print(f"  {YELLOW}{r['event_name']}{RESET}  [{r['business_module']}]{haven_hint}")

    # ── ❌ PWA 完全缺失 ──
    items = [r for r in results if r["pwa_status"] == "❌ 缺失"]
    if items:
        print()
        print(f"{RED}{BOLD}--- ❌ PWA events.ts 中完全缺失 ({len(items)}) ---{RESET}")
        for r in items:
            haven_hint = f"  {DIM}[haven: {r['haven_status']}]{RESET}"
            print(f"  {RED}{r['event_name']}{RESET}  [{r['business_module']}]{haven_hint}")

    # ── 🔄 命名差异 ──
    if fuzzy_matches:
        print()
        print(f"{BLUE}{BOLD}--- 🔄 命名疑似有差异 ({len(fuzzy_matches)}) ---{RESET}")
        for r in fuzzy_matches:
            print(f"  {BLUE}{r['event_name']}{RESET}  [{r['business_module']}]")
            for s in r["suggestions"]:
                print(f"      → 疑似对应: {s}")

    # ── ⚠️ 参数差异（两端都调用但参数不一致） ──
    if param_diff:
        print()
        print(f"{YELLOW}{BOLD}--- ⚠️  参数差异事件 ({len(param_diff)}) ---{RESET}")
        for r in param_diff:
            cmp = r["param_cmp"]
            print(f"  {YELLOW}{r['event_name']}{RESET}  [{r['business_module']}]")
            if cmp["only_pwa"]:
                print(f"    {GREEN}PWA 独有参数:{RESET}   {', '.join(cmp['only_pwa'])}")
            if cmp["only_haven"]:
                print(f"    {CYAN}haven 独有参数:{RESET} {', '.join(cmp['only_haven'])}")
            if cmp["common"]:
                print(f"    {DIM}共同参数:       {', '.join(cmp['common'])}{RESET}")

    # ── 🎯 haven 已实现但 PWA 未调用（需补埋） ──
    haven_not_pwa = [
        r for r in results
        if r["haven_status"] == "✅ 已实现" and r["pwa_status"] != "✅ 已实现"
    ]
    if haven_not_pwa:
        # 按业务模块分组
        by_module: dict[str, list[dict]] = defaultdict(list)
        for r in haven_not_pwa:
            by_module[r["business_module"]].append(r)
        print()
        print(f"{CYAN}{BOLD}--- 🎯 haven 已实现但 PWA 未调用，需补埋 ({len(haven_not_pwa)}) ---{RESET}")
        for module, items in sorted(by_module.items()):
            print(f"  {BOLD}[{module}]{RESET}")
            for r in items:
                haven_loc = _sites_str(r["haven_sites"], limit=1) if r["haven_sites"] else ""
                pwa_hint = f"{YELLOW}{r['pwa_status']}{RESET}"
                loc_hint = f"  {DIM}{haven_loc}{RESET}" if haven_loc else ""
                print(f"    {CYAN}{r['event_name']}{RESET}  {pwa_hint}{loc_hint}")

    # ── 🗑️ PWA 独有，不在需要埋点清单（可清理） ──
    if pwa_called_not_needed:
        print()
        print(f"{DIM}{BOLD}--- 🗑️  PWA 调用但不在需要清单，可从 events.ts 清理 ({len(pwa_called_not_needed)}) ---{RESET}")
        for name in pwa_called_not_needed:
            print(f"  {DIM}{name}{RESET}")

    print()
    print(f"{BOLD}{'═' * W}{RESET}")


# ═══════════════════════════════════════════════════════════════════════════════
# Step 7: 写 CSV 报告
# ═══════════════════════════════════════════════════════════════════════════════

def _sites_str(sites: list[dict], limit=3) -> str:
    locs = [s["loc"] for s in sites[:limit]]
    out = " | ".join(locs)
    if len(sites) > limit:
        out += f" … (+{len(sites)-limit})"
    return out


def write_output_csv(results: list[dict], out_path: Path):
    with open(out_path, "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow([
            "序号", "业务模块", "事件名称",
            "PWA状态", "haven状态",
            "PWA调用文件", "haven调用文件",
            "参数比对", "PWA独有参数", "haven独有参数", "共同参数",
            "命名建议",
        ])
        for r in results:
            cmp = r["param_cmp"] or {}
            w.writerow([
                r["seq"],
                r["business_module"],
                r["event_name"],
                r["pwa_status"],
                r["haven_status"],
                _sites_str(r["pwa_sites"]),
                _sites_str(r["haven_sites"]),
                cmp.get("param_status", "—"),
                ", ".join(cmp.get("only_pwa", [])),
                ", ".join(cmp.get("only_haven", [])),
                ", ".join(cmp.get("common", [])),
                " | ".join(r["suggestions"]),
            ])
    print(f"\n报告已写入: {out_path}")


# ═══════════════════════════════════════════════════════════════════════════════
# Main
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    print(f"\n{BOLD}PWA & react-haven 埋点核对开始...{RESET}\n")

    # 1. CSV
    csv_events = load_csv_events(CSV_FILE)
    csv_needed_names = {e["event_name"] for e in csv_events}

    # 2. 注册表
    pwa_defined   = load_event_registry(PWA_EVENTS_TS)
    print(f"[PWA]         events.ts 定义事件数: {len(pwa_defined)}")

    haven_defined = set()
    if HAVEN_EVENTS_TS.exists():
        haven_defined = load_event_registry(HAVEN_EVENTS_TS)
        print(f"[react-haven] EventName.ts 定义事件数: {len(haven_defined)}")
    else:
        print(f"{YELLOW}[react-haven] 未找到 EventName.ts，路径: {HAVEN_EVENTS_TS}{RESET}")

    # 3. 调用扫描
    all_names = pwa_defined | haven_defined
    pwa_calls   = find_call_sites_with_params(PWA_SRC_DIR, all_names, "PWA", extra_dirs=[PWA_ACTIVITY_DIR])
    haven_calls: dict = {}
    if HAVEN_SRC_DIR.exists():
        haven_calls = find_call_sites_with_params(HAVEN_SRC_DIR, all_names, "react-haven")

    # 4. 分类
    results = classify(csv_events, pwa_defined, haven_defined, pwa_calls, haven_calls)

    # 5. 扫描 PWA 实际调用了但不在 CSV 里的事件
    pwa_called_all: set[str] = set()
    call_re_full = re.compile(
        r'(?:bpTrack|trackEvent|adTrack|adBytePlusTrack|ttTrack|fbTrack|afTrack|window\.bytePlusTrack)\s*\('
        r'\s*(?:EventName\.(\w+)|["\']([a-zA-Z0-9_]+)["\'])',
    )
    scan_dirs = [PWA_SRC_DIR, PWA_ACTIVITY_DIR]
    for scan_dir in scan_dirs:
        if not scan_dir.exists():
            continue
        for ext in ("*.ts", "*.tsx", "*.js"):
            for fpath in scan_dir.rglob(ext):
                try:
                    text = fpath.read_text(encoding="utf-8", errors="ignore")
                except Exception:
                    continue
                for m in call_re_full.finditer(text):
                    name = m.group(1) or m.group(2)
                    if name:
                        # 还原 EventName key → 实际事件名字符串
                        pwa_called_all.add(name)

    # EventName key 可能是 key（如 pwa_live_stop），也可能是字符串值（相同），统一用 pwa_defined 映射
    # events.ts 里 key == value，所以直接用即可
    pwa_called_not_needed = sorted(
        n for n in pwa_called_all
        if n not in csv_needed_names
        and not is_server_event(n)
        and any(n.startswith(p) for p in EVENT_PREFIXES)
    )

    # 6. 打印
    print_report(results, pwa_called_not_needed, csv_needed_names)

    # 7. 写 CSV
    write_output_csv(results, OUTPUT_CSV)


if __name__ == "__main__":
    main()

```
