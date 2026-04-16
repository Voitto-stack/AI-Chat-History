---
title: SavedSqlsDrawer
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: SavedSqlsDrawer.tsx
---

# SavedSqlsDrawer

```tsx
import { useState, useEffect } from "react";
import { Drawer, Input, List, Dropdown, Button, Typography, Modal, message } from "antd";
import type { MenuProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  listSavedSqls,
  updateSavedSql,
  deleteSavedSql,
  type SavedSql,
} from "../../api/saved-sqls";

interface SavedSqlsDrawerProps {
  open: boolean;
  onClose: () => void;
  onLoad: (sqlText: string, dataSourceId?: string | null, database?: string | null) => void;
}

interface SavedSqlItemProps {
  item: SavedSql;
  editingId: string | null;
  editingName: string;
  onEditingNameChange: (v: string) => void;
  onCommitEdit: (item: SavedSql) => void;
  onLoad: (sqlText: string, dsId?: string | null, db?: string | null) => void;
  onStartEdit: (item: SavedSql) => void;
  onDelete: (id: string) => void;
}

const SavedSqlItem = ({
  item, editingId, editingName, onEditingNameChange, onCommitEdit, onLoad, onStartEdit, onDelete,
}: SavedSqlItemProps) => {
  const menuItems: MenuProps["items"] = [
    { key: "edit", label: "重命名", onClick: ({ domEvent }) => { domEvent.stopPropagation(); onStartEdit(item); } },
    { key: "delete", label: "删除", danger: true, onClick: ({ domEvent }) => { domEvent.stopPropagation(); onDelete(item.id); } },
  ];
  return (
    <List.Item
      style={{ cursor: "pointer", padding: "8px 0", alignItems: "flex-start" }}
      onClick={() => onLoad(item.sql_text, item.data_source_id, item.database)}
      actions={[
        <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
          <Button type="text" size="small" icon={<EllipsisOutlined />} onClick={(e) => e.stopPropagation()} />
        </Dropdown>,
      ]}
    >
      <List.Item.Meta
        title={
          editingId === item.id ? (
            <Input size="small" value={editingName} autoFocus onChange={(e) => onEditingNameChange(e.target.value)} onBlur={() => onCommitEdit(item)} onPressEnter={() => onCommitEdit(item)} onClick={(e) => e.stopPropagation()} />
          ) : (
            <Typography.Text style={{ fontSize: 13 }}>{item.name}</Typography.Text>
          )
        }
        description={
          <Typography.Text type="secondary" style={{ fontSize: 12 }} ellipsis={{ tooltip: item.sql_text }}>
            {item.sql_text}
          </Typography.Text>
        }
      />
    </List.Item>
  );
};

export const SavedSqlsDrawer = ({ open, onClose, onLoad }: SavedSqlsDrawerProps) => {
  const [items, setItems] = useState<SavedSql[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    if (open) listSavedSqls().then((data) => setItems(Array.isArray(data) ? data : [])).catch(() => {});
  }, [open]);

  const filtered = items.filter(
    (i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.sql_text.toLowerCase().includes(search.toLowerCase())
  );
  const startEdit = (item: SavedSql) => { setEditingId(item.id); setEditingName(item.name); };
  const commitEdit = async (item: SavedSql) => {
    const name = editingName.trim();
    setEditingId(null);
    if (!name || name === item.name) return;
    try {
      await updateSavedSql({ id: item.id, name });
      setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, name } : i)));
    } catch { /* error handled by client.ts */ }
  };
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "确认删除该 SQL？",
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk: async () => {
        try { await deleteSavedSql(id); removeItem(id); message.success("删除成功"); }
        catch { /* error handled by client.ts */ }
      },
    });
  };

  return (
    <Drawer title="常用 SQL" placement="right" width={360} open={open} onClose={onClose} styles={{ body: { padding: "12px 16px" } }}>
      <Input.Search placeholder="搜索名称或 SQL..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 12 }} allowClear />
      <List
        dataSource={filtered}
        locale={{ emptyText: "暂无常用 SQL" }}
        renderItem={(item) => (
          <SavedSqlItem item={item} editingId={editingId} editingName={editingName} onEditingNameChange={setEditingName} onCommitEdit={commitEdit} onLoad={onLoad} onStartEdit={startEdit} onDelete={handleDelete} />
        )}
      />
    </Drawer>
  );
};

```
