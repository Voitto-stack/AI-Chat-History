---
name: feishu-chart
description: Generate AI-powered illustrations and insert them into Feishu documents. Use when the user wants to add beautiful concept images, scene illustrations, or decorative charts to Feishu docs.
---

## Feishu AI Chart Generation

**Purpose**: Generate beautiful AI illustrations using Replicate and insert them into Feishu documents.

**When to use**:
- User wants to add concept illustrations to Feishu documents
- User needs decorative images for reports/presentations
- User asks to "beautify" or "add images" to Feishu docs

---

## Workflow

### 1. Generate Image with Replicate

Use Replicate MCP tools to generate images. Recommended models:

**SDXL (Stable Diffusion XL)** - Best for general illustrations:
```
Model: stability-ai/sdxl
Use for: Business concepts, abstract scenes, professional illustrations
```

**Flux Schnell** - Fast, high-quality:
```
Model: black-forest-labs/flux-schnell
Use for: Quick iterations, concept art, creative scenes
```

**Example prompts**:
- "Professional business team collaborating in a modern office, clean illustration style"
- "Stock market chart visualization with upward trend, blue and green colors"
- "Technology innovation concept, abstract digital network"

**Tips**:
- Add style keywords: "professional", "clean", "minimalist", "modern"
- Specify colors that match Feishu's design language
- Keep prompts clear and specific
- For Chinese concepts, translate to English for better results

### 2. Upload to Feishu

Use the image uploader tool:

```javascript
const uploader = require(process.env.HOME + '/.claude/tools/feishu-image-uploader.js');
const token = await uploader.getToken();
const fileToken = await uploader.uploadFromUrl(token, imageUrl);
```

The uploader supports:
- Remote URLs (from Replicate output)
- Local file paths

### 3. Insert into Document

Use the block builder:

```javascript
const fb = require(process.env.HOME + '/.claude/tools/feishu-block-builder.js');

// Create image block
const imageBlock = fb.image(fileToken, 800, 600);  // width, height optional

// Add to document
await fb.addBlocks(token, docId, [
  fb.h2("Concept Illustration"),
  imageBlock,
  fb.txt("Caption or description here")
]);
```

---

## Complete Example

```javascript
#!/usr/bin/env node

const fb = require(process.env.HOME + '/.claude/tools/feishu-block-builder.js');
const uploader = require(process.env.HOME + '/.claude/tools/feishu-image-uploader.js');

async function main() {
  // 1. Generate image with Replicate (done by Claude via MCP)
  const imageUrl = "https://replicate.delivery/...";  // from Replicate output

  // 2. Upload to Feishu
  const token = await fb.getToken();
  const fileToken = await uploader.uploadFromUrl(token, imageUrl);

  // 3. Create document or add to existing
  const docId = await fb.createDoc(token, "AI Illustrated Report");
  await fb.setPermission(token, docId);

  // 4. Build content with image
  const blocks = [
    fb.h1("Market Analysis Report"),
    fb.txt("Q1 2026 Performance Overview"),
    fb.divider(),
    fb.h2("Key Trends"),
    fb.image(fileToken, 800),  // Insert image
    fb.txt("The market shows strong upward momentum..."),
  ];

  await fb.addBlocks(token, docId, blocks);

  const url = `https://presence.feishu.cn/docx/${docId}`;
  console.log(url);
}

main();
```

---

## Replicate Model Selection Guide

| Use Case | Model | Prompt Style |
|----------|-------|--------------|
| **Business illustrations** | stability-ai/sdxl | "professional business concept, clean style" |
| **Abstract concepts** | black-forest-labs/flux-schnell | "abstract representation of [concept], modern" |
| **Realistic scenes** | stability-ai/sdxl | "photorealistic [scene], high quality" |
| **Charts/diagrams** | ❌ Not recommended | Use Python matplotlib instead |

**IMPORTANT**: Replicate AI is best for **concept art and illustrations**, NOT precise data charts. For data visualization, use Python tools.

---

## Integration with Morning Brief

Add to your morning brief workflow:

```javascript
// In morning-brief script
const marketImageUrl = await generateMarketIllustration();
const fileToken = await uploader.uploadFromUrl(token, marketImageUrl);

blocks.push(
  fb.h2("📊 Market Overview"),
  fb.image(fileToken, 700),
  fb.txt("Today's market sentiment...")
);
```

---

## Tips for Best Results

1. **Prompt Engineering**:
   - Use English prompts (better model training)
   - Include style keywords: "professional", "clean", "illustration"
   - Specify aspect ratio if needed

2. **Feishu Integration**:
   - Images auto-resize to fit document width
   - Specify width for consistency: `fb.image(token, 800)`
   - Add captions for context

3. **Performance**:
   - Replicate generation takes 10-30 seconds
   - Cache common images to avoid regeneration
   - Consider batch generation for multiple charts

4. **Fallbacks**:
   - If Replicate fails, skip image and add placeholder text
   - Use stock images as backup
   - Log errors for debugging

---

## Available Tools

**Installed in `~/.claude/tools/`**:
- `feishu-block-builder.js` - Document block construction
- `feishu-image-uploader.js` - Image upload to Feishu (NEW)

**MCP Tools** (via Replicate MCP):
- Use Claude Code's MCP integration to call Replicate models
- Check available tools with: list MCP resources

---

## Typical Workflow

1. **User request**: "Add a beautiful market trend illustration to today's report"

2. **Generate image**:
   - Use Replicate MCP to generate with prompt: "stock market upward trend, professional business illustration, blue and green color scheme"
   - Get image URL from Replicate output

3. **Upload and insert**:
   ```javascript
   const token = await fb.getToken();
   const fileToken = await uploader.uploadFromUrl(token, replicateImageUrl);
   const block = fb.image(fileToken, 800);
   await fb.addBlocks(token, docId, [block]);
   ```

4. **Return document URL** to user

---

## Troubleshooting

**Image not showing**:
- Check file_token is valid
- Ensure document has correct permissions (anyone_editable)
- Verify image was uploaded successfully

**Replicate timeout**:
- Some models take longer (30+ seconds)
- Use faster models like flux-schnell for quick iterations
- Check Replicate API status

**Upload fails**:
- Verify FEISHU_APP_ID and FEISHU_APP_SECRET are set
- Check bot has drive:drive scope permission
- Ensure image file is accessible

---

## Future Enhancements

- [ ] Add caching for common images
- [ ] Support batch image generation
- [ ] Add style templates (corporate, creative, minimal)
- [ ] Integrate with data chart generation (matplotlib)
- [ ] Support image editing and variations
