---
date: 2026-04-23T21:41:57+08:00
source: clipboard
chars: 477
---

 孤立包：contract-minerva 和 business-minerva-auth 两个包只有 dist、没有
   src，且没有被 app-minerva-server 引用。要么是迁移到一半遗漏了源码，要么
  dist 是误提交。建议查一下是否计划提取这两块功能但尚未完成。
  2. husky / lint-staged 缺失：web 包的 devDependencies 移除了这俩，git
  hooks 不会生效。不过新仓库根目录可能统一管理 hooks，需要确认根
  package.json 是否在管。
