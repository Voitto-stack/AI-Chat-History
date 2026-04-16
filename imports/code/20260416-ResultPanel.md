---
title: ResultPanel
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: ResultPanel.tsx
---

# ResultPanel

```tsx
import { Table, Button, Space, Typography, Pagination } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { ExecuteResult } from "../../api/sql";

interface ResultPanelProps {
  result: ExecuteResult;
  onPageChange: (page: number, pageSize: number) => void;
}

function getColumns(rows: Record<string, unknown>[]): string[] {
  if (rows.length === 0) return [];
  return Object.keys(rows[0]);
}

const exportCSV = (columns: string[], rows: Record<string, unknown>[]) => {
  const header = columns.join(",");
  const lines = rows.map((row) => columns.map((col) => JSON.stringify(row[col] ?? "")).join(","));
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "result.csv";
  a.click();
  URL.revokeObjectURL(url);
};

export const ResultPanel = ({ result, onPageChange }: ResultPanelProps) => {
  const cols = getColumns(result.rows);
  const columns = cols.map((col) => ({
    title: col,
    dataIndex: col,
    key: col,
    ellipsis: true,
  }));

  return (
    <div style={wrapperStyle}>
      <div style={toolbarStyle}>
        <Space>
          <Typography.Text type="secondary">{result.total} 行</Typography.Text>
          <Button
            icon={<DownloadOutlined />}
            size="small"
            onClick={() => exportCSV(cols, result.rows)}
          >
            导出 CSV
          </Button>
        </Space>
        <Pagination
          size="small"
          current={result.page}
          pageSize={result.pageSize}
          total={result.total}
          showSizeChanger
          onChange={onPageChange}
        />
      </div>
      <div style={tableWrapperStyle}>
        <Table
          columns={columns}
          dataSource={result.rows.map((row, i) => ({ ...row, key: i }))}
          size="small"
          scroll={{ x: true }}
          pagination={false}
        />
      </div>
    </div>
  );
};

const wrapperStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const toolbarStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "4px 0 8px",
  flexShrink: 0,
};

const tableWrapperStyle: React.CSSProperties = {
  flex: 1,
  overflow: "auto",
  minHeight: 0,
};

```
