---
title: TableBrowser
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: TableBrowser.tsx
---

# TableBrowser

```tsx
import { List, Typography, Spin } from "antd";
import { TableOutlined } from "@ant-design/icons";

interface TableBrowserProps {
  dataSourceId?: string;
  database?: string;
  tables: string[];
  loading: boolean;
  onTableClick: (tableName: string) => void;
}

export const TableBrowser = ({ dataSourceId, database, tables, loading, onTableClick }: TableBrowserProps) => {
  if (!dataSourceId || !database) {
    return (
      <Typography.Text type="secondary" style={{ padding: 12, display: "block" }}>
        请选择数据源和数据库以浏览表。
      </Typography.Text>
    );
  }

  if (loading) {
    return <Spin style={{ padding: 24, display: "block", textAlign: "center" }} />;
  }

  return (
    <div>
      <List
        size="small"
        dataSource={tables}
        locale={{ emptyText: "未找到数据表" }}
        renderItem={(table) => (
          <List.Item
            onClick={() => onTableClick(table)}
            style={{ cursor: "pointer", padding: "4px 12px" }}
          >
            <TableOutlined style={{ marginRight: 8, color: "#999" }} />
            <Typography.Text ellipsis style={{ flex: 1 }}>
              {table}
            </Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

```
