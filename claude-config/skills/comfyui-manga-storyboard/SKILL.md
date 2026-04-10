---
name: comfyui-manga-storyboard
description: Use when generating AI manga/comic storyboard panels in ComfyUI - maintaining character consistency, style consistency, scene consistency across panels, avoiding anatomy errors, designing prompt templates for different art styles
---

# ComfyUI AI 漫画分镜生成

## Overview

为 AI 漫剧制作分镜图片。核心挑战：跨多张图片保持**角色一致性**、**画风一致性**、**场景一致性**，同时避免手指/人脸/解剖结构等常见错误。

---

## 工作流架构

每组分镜共用一套「一致性锚点」：

```
[风格参考图] ──┐
[角色参考图] ──┤→ IPAdapter/InstantID ──→ KSampler ──→ ADetailer ──→ 输出
[场景参考图] ──┘                              ↑
[ControlNet 姿势/线稿] ──────────────────────┘
```

---

## 模型选择（按画风）

| 画风 | 推荐基础模型 | 推荐 LoRA |
|------|------------|-----------|
| 日漫/少女漫 | Animagine XL 3.1 / CounterfeitXL | 角色专属 LoRA |
| 日漫/少年漫 | Anything XL / Kohaku XL | 动作线条 LoRA |
| 写实漫画/美漫 | Juggernaut XL / RealVisXL | comic_style LoRA |
| 国风/水墨漫 | GuoFeng4 / 墨幽人造人 | 国风笔触 LoRA |
| Flux 全风格 | Flux.1-dev / Flux.1-schnell | 风格 LoRA (trigger word 激活) |

---

## 角色一致性（最关键）

### 方案 A：IPAdapter FaceID（推荐，最易用）
```
节点: IPAdapterFaceID
- 输入: 角色正脸参考图 (建议正面、清晰、无遮挡)
- weight: 0.7~0.85 (过高会丢失姿势自由度)
- faceid_v2: true
- 配合 IPAdapter Plus 叠加整体外观一致性
```

### 方案 B：InstantID（写实风格效果更好）
```
节点: ApplyInstantID
- 输入: 参考人脸图
- ip_weight: 0.8, cn_strength: 0.8
- 适合需要高度写实面部一致的场景
```

### 方案 C：角色 LoRA（一致性最强，成本最高）
```
- 需用 20~50 张角色图训练专属 LoRA
- 触发词在 prompt 中调用: <lora:character_name:0.8>
- 适合长期项目/主角
```

---

## 风格一致性

```
1. 固定基础模型 + 固定 LoRA 组合（整部漫画不换）
2. 所有分镜共用相同的 Prompt 前缀（风格标签）:
   - 日漫: "manga style, anime illustration, clean lineart, flat color, "
   - 美漫: "comic book style, bold outlines, dynamic pose, halftone, "
   - 国风: "chinese comic style, ink wash, traditional painting, "
3. 固定 VAE: 同一套 VAE（如 sdxl_vae.safetensors）
4. 固定采样器: DPM++ 2M Karras, steps 25-30, CFG 7
5. 使用 Style Reference 图输入 IPAdapter Style 节点保持色调
```

---

## 场景一致性

```
1. 场景参考图 → IPAdapter (style+composition mode, weight 0.4~0.6)
2. 关键背景元素写入 prompt 并每次复用:
   "coffee shop interior, wooden tables, warm lighting, "
3. 用 ControlNet Depth 固定空间关系（防止构图混乱）
4. 首张场景图生成后保存为「场景锚定图」，后续分镜 img2img 微调
```

---

## Prompt 模板（分镜专用）

```
[风格前缀], [角色描述], [服装], [表��], [动作/姿势],
[景别: close-up/medium shot/wide shot/bird's eye view],
[场景/背景], [光线], [质量标签]
```

示例：
```
manga style, anime illustration, clean lineart,
1girl, long black hair, school uniform, white shirt, blue skirt,
surprised expression, hands on cheeks,
close-up shot,
classroom background, afternoon sunlight through window,
masterpiece, best quality, highres
```

---

## 景别关键词速查

| 景别 | 英文关键词 |
|------|-----------|
| 特写（面部） | extreme close-up, face focus |
| 近景（半身） | upper body, bust shot |
| 中景（全身） | full body, medium shot |
| 远景（环境） | wide shot, establishing shot |
| 俯视 | bird's eye view, top-down angle |
| 仰视 | low angle, worm's eye view |
| 侧面 | profile view, side view |

---

## 负向提示词（防止常见错误）

```
负向 Prompt 标准模板:
ugly, worst quality, low quality, normal quality, jpeg artifacts,
extra fingers, mutated hands, poorly drawn hands, extra limbs,
bad anatomy, deformed, disfigured, missing arms, extra arms,
watermark, text, logo, signature, username,
blurry, out of focus, grain, noise,
bad proportions, distorted face, cross-eyed,
multiple heads, cloned face, extra face
```

---

## ADetailer（自动修脸/修手）

```
必须加 ADetailer 节点:
- face_yolov8n.pt → 自动检测并重绘人脸
  - denoising strength: 0.35~0.45 (过高改变表情)
- hand_yolov8n.pt → 自动修复手部
  - denoising strength: 0.4~0.5
```

---

## 分镜批量生成工作流推荐

```
1. 建立「角色卡」: 每个主角保存 → 参考图 + 触发词 + LoRA 权重
2. 建立「场景卡」: 每个场景保存 → 参考图 + 背景 Prompt 片段
3. 每格分镜 = 角色卡 + 场景卡 + 该格专属动作/表情/构图 Prompt
4. Seed 策略:
   - 同场景连续分镜: 相近 seed (seed ±100) 保持光线/色调
   - 新场景: 重新找最优 seed
5. 生成顺序: 先生成关键帧(重要情绪/动作格)，再生成过渡格
```

---

## 常见错误 & 修复

| 问题 | 原因 | 修复 |
|------|------|------|
| 多余手指 | 基础模型限制 | 加 ADetailer hand + 负向 prompt |
| 人脸变形 | CFG 过高 / seed 差 | CFG 降到 6~7，换 seed |
| 角色换脸 | IPAdapter weight 太低 | FaceID weight 提高到 0.85 |
| 风格漂移 | LoRA 叠加冲突 | 减少 LoRA 数量，只保留 1~2 个 |
| 背景穿帮 | 构图参考不足 | 加 ControlNet Depth/Canny |
| 服装改变 | Prompt 未锁定服装 | 每格必须重复服装关键词 |
| 人物比例失调 | 无姿势控制 | 加 ControlNet OpenPose |

---

## 推荐节点包

```
必装:
- ComfyUI-IPAdapter-plus (IPAdapter 系列)
- ComfyUI-InstantID (写实角色一致性)
- comfyui-adetailer (ADetailer 修脸修手)
- ComfyUI-ControlNet-Aux (姿势/线稿/深度图提取)

可选:
- ComfyUI-AnimateDiff-Evolved (动态分镜/小动画)
- was-node-suite-comfyui (批处理工具节点)
- ComfyUI-Custom-Scripts (Prompt 管理)
```

---

## 快速上手检查清单

生成每一格分镜前确认：
- [ ] 基础模型 + VAE + LoRA 与其他格一致
- [ ] 角色参考图已接入 IPAdapter FaceID
- [ ] 风格前缀 Prompt 与其他格相同
- [ ] 负向 Prompt 已包含解剖错误词
- [ ] ADetailer face + hand 已启用
- [ ] 已指定景别和构图
- [ ] 场景/背景关键词已填写
