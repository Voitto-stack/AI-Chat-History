---
title: EditorPanel
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: EditorPanel.tsx
---

# EditorPanel

```tsx
import { useState } from "react";
import { Button, Space, message, Popover, Input, Checkbox, Modal } from "antd";
import { SaveOutlined, UnorderedListOutlined, FormatPainterOutlined } from "@ant-design/icons";
import { format } from "sql-formatter";
import { useAuthStore } from "../../store/auth";
import { useSqlEditorStore } from "../../store/sqlEditor";
import { executeSQL, parseSQL, ExecuteResult } from "../../api/sql";
import { createApproval } from "../../api/approvals";
import { createSavedSql } from "../../api/saved-sqls";
import { SavedSqlsDrawer } from "./SavedSqlsDrawer";
import { SqlEditor } from "./SqlEditor";

interface EditorPanelProps {
  dataSourceId?: string;
  database?: string;
  sql: string;
  tables?: string[];
  pageSize: number;
  onSqlChange: (sql: string) => void;
  onResult: (result: ExecuteResult) => void;
  onPageReset: () => void;
  onLoad?: (sqlText: string, dataSourceId?: string | null, database?: string | null) => void;
}

interface SavePopoverContentProps {
  saveName: string;
  saveAttach: boolean;
  saving: boolean;
  onNameChange: (v: string) => void;
  onAttachChange: (v: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

const SavePopoverContent = ({
  saveName, saveAttach, saving, onNameChange, onAttachChange, onSave, onCancel,
}: SavePopoverContentProps) => (
  <div style={{ width: 280 }}>
    <Input
      placeholder='例如："查询活跃用户"'
      value={saveName}
      onChange={(e) => onNameChange(e.target.value)}
      onPressEnter={onSave}
      autoFocus
    />
    <div style={{ marginTop: 8 }}>
      <Checkbox checked={saveAttach} onChange={(e) => onAttachChange(e.target.checked)}>
        关联当前数据源
      </Checkbox>
    </div>
    <div style={{ marginTop: 8, textAlign: "right" }}>
      <Button size="small" onClick={onCancel} style={{ marginRight: 8 }}>取消</Button>
      <Button type="primary" size="small" onClick={onSave} loading={saving} disabled={!saveName.trim()}>
        保存
      </Button>
    </div>
  </div>
);

function useSaveSql(sql: string, dataSourceId?: string, database?: string) {
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveAttach, setSaveAttach] = useState(true);
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    if (!saveName.trim()) return;
    setSaving(true);
    try {
      await createSavedSql({
        name: saveName.trim(),
        sqlText: sql,
        dataSourceId: saveAttach ? dataSourceId : undefined,
        database: saveAttach ? database : undefined,
      });
      message.success("保存成功");
      setSaveOpen(false);
      setSaveName("");
    } catch (err: unknown) {
      message.error(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };
  const onOpenChange = (v: boolean) => { setSaveOpen(v); if (!v) setSaveName(""); };
  return { saveOpen, saveName, setSaveName, saveAttach, setSaveAttach, saving, handleSave, onOpenChange };
}

interface LoadHandlerOpts {
  dataSourceId?: string;
  onSqlChange: (sql: string) => void;
  onLoad?: (sqlText: string, dsId?: string | null, db?: string | null) => void;
  setDrawerOpen: (open: boolean) => void;
}

function buildLoadHandler({ dataSourceId, onSqlChange, onLoad, setDrawerOpen }: LoadHandlerOpts) {
  return (sqlText: string, dsId?: string | null, db?: string | null) => {
    const needsSwitch = !!dsId && dsId !== dataSourceId;
    const applyLoad = () => {
      if (needsSwitch && onLoad) { onLoad(sqlText, dsId, db); } else { onSqlChange(sqlText); }
      setDrawerOpen(false);
    };
    if (!needsSwitch) { applyLoad(); return; }
    Modal.confirm({
      title: "切换数据源？",
      content: "该 SQL 关联了不同的数据源，是否切换？",
      okText: "切换",
      cancelText: "仅加载 SQL",
      onOk: applyLoad,
      onCancel: () => { onSqlChange(sqlText); setDrawerOpen(false); },
    });
  };
}

type ExecStatus = { ok: true; duration: number } | { ok: false; error: string } | null;

export const EditorPanel = ({
  dataSourceId, database, sql, tables, pageSize, onSqlChange, onResult, onPageReset, onLoad,
}: EditorPanelProps) => {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [execStatus, setExecStatus] = useState<ExecStatus>(null);
  const userRole = useAuthStore((s) => s.user?.role ?? "viewer");
  const isViewer = userRole === "viewer";
  const dataSources = useSqlEditorStore((s) => s.dataSources);
  const save = useSaveSql(sql, dataSourceId, database);
  const handleLoad = buildLoadHandler({ dataSourceId, onSqlChange, onLoad, setDrawerOpen });

  const handleExecute = async () => {
    if (!dataSourceId) { message.warning("请先选择数据源"); return; }
    setLoading(true);
    const start = Date.now();
    try {
      const { category } = await parseSQL(sql);
      if (category === "dml") {
        const dsName = dataSources.find((ds) => ds.id === dataSourceId)?.name ?? "";
        const canDirectDml = dsName.includes("-test") && ["admin", "maintainer", "developer"].includes(userRole);
        if (!canDirectDml) { message.warning("DML/DDL 语句需要审批，请使用「提交审批」"); return; }
      }
      onPageReset();
      onResult(await executeSQL({ dataSourceId, database, sql, page: 1, pageSize }));
      setExecStatus({ ok: true, duration: Date.now() - start });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      const msg = axiosErr.response?.data?.error ?? (err instanceof Error ? err.message : "执行失败");
      setExecStatus({ ok: false, error: msg });
    } finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    if (!dataSourceId) { message.warning("请先选择数据源"); return; }
    setLoading(true);
    try {
      await createApproval({ dataSourceId, database, sql });
      message.success("已提交审批");
    } catch (err: unknown) {
      message.error(err instanceof Error ? err.message : "提交失败");
    } finally { setLoading(false); }
  };

  const handleFormat = () => {
    try {
      onSqlChange(format(sql, { language: "sql" }));
    } catch {
      // ignore parse errors silently
    }
  };

  return (
    <div>
      <SqlEditor value={sql} onChange={onSqlChange} tables={tables} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <Space>
          <Button type="primary" onClick={handleExecute} loading={loading} disabled={!sql}>执行</Button>
          {!isViewer && <Button onClick={handleSubmit} loading={loading} disabled={!sql}>提交审批</Button>}
        </Space>
        <Space>
          <Button icon={<FormatPainterOutlined />} onClick={handleFormat} disabled={!sql}>格式化</Button>
          <Popover
            content={<SavePopoverContent saveName={save.saveName} saveAttach={save.saveAttach} saving={save.saving} onNameChange={save.setSaveName} onAttachChange={save.setSaveAttach} onSave={save.handleSave} onCancel={() => save.onOpenChange(false)} />}
            title="保存 SQL"
            trigger="click"
            open={save.saveOpen}
            onOpenChange={save.onOpenChange}
          >
            <Button icon={<SaveOutlined />} disabled={!sql}>保存</Button>
          </Popover>
          <Button icon={<UnorderedListOutlined />} onClick={() => setDrawerOpen(true)}>常用 SQL</Button>
        </Space>
      </div>
      <div style={resolveStatusStyle(execStatus)}>{resolveStatusText(execStatus)}</div>
      <SavedSqlsDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onLoad={handleLoad} />
    </div>
  );
};

function resolveStatusStyle(status: ExecStatus): React.CSSProperties {
  if (!status) return statusPlaceholderStyle;
  return status.ok ? statusSuccessStyle : statusErrorStyle;
}

function resolveStatusText(status: ExecStatus): string {
  if (!status) return "";
  return status.ok
    ? `Status: success  Duration: ${status.duration}ms`
    : `Status: failed — ${status.error}`;
}

const statusBaseStyle: React.CSSProperties = {
  marginTop: 6, fontSize: 12, padding: "2px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
};
const statusSuccessStyle: React.CSSProperties = { ...statusBaseStyle, color: "#389e0d" };
const statusErrorStyle: React.CSSProperties = { ...statusBaseStyle, color: "#cf1322" };
const statusPlaceholderStyle: React.CSSProperties = { ...statusBaseStyle, visibility: "hidden" };

```
