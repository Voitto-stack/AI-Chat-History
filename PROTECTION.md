# GitMemo Skills 保护机制

## 已部署的保护措施

### 1. Pre-commit Hook ✅
**位置**: `.git/hooks/pre-commit`

**功能**:
- 检测 SKILL.md 文件删除超过 50 行
- 检测 SKILL.md 文件被清空（0 字节）
- 阻止提交并给出警告

**绕过方式**（仅在确认无误时使用）:
```bash
git commit --no-verify
```

### 2. 定期备份脚本
**位置**: `/tmp/skill-backup.sh`

**使用方法**:
```bash
/tmp/skill-backup.sh
```

**备份目录**: `~/.gitmemo/backups/skills-YYYYMMDD/`

### 3. Git 历史恢复方法

如果文件再次丢失，使用以下命令恢复：

```bash
# 查找文件的历史版本
cd ~/.gitmemo
git log --all --full-history --oneline -- "claude-config/skills/*/SKILL.md"

# 恢复到指定提交的版本
git show <commit-hash>:claude-config/skills/<skill-name>/SKILL.md > claude-config/skills/<skill-name>/SKILL.md

# 提交恢复
git add claude-config/skills/<skill-name>/SKILL.md
git commit -m "restore: recover <skill-name> from git history"
```

## 历史事件记录

### 2026-04-21 大规模清空事件
- **时间**: 2026-04-21 01:06:52
- **提交**: a190b38
- **影响**: 4 个 skill 文件被清空（576 行）
  - feishu-doc (178 行)
  - lark-im (139 行)
  - lark-wiki (34 行)
  - multi-model-debate (225 行)
- **原因**: GitMemo 从桌面端同步时源文件已被清空
- **恢复**: 2026-04-24 从提交 6deb993 恢复

### 2026-04-24 保护机制部署
- 部署 pre-commit hook
- 创建备份脚本
- 恢复所有丢失内容
