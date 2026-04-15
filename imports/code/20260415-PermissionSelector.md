---
title: PermissionSelector
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: PermissionSelector.tsx
---

# PermissionSelector

```tsx
import { ProFormTreeSelect } from '@ant-design/pro-components';
import { TreeSelect } from 'antd';
import type { PermissionsGrouped } from '@/api';
import { buildPermissionTreeData } from '../config';

interface PermissionSelectorProps {
  name: string;
  label: string;
  grouped: PermissionsGrouped;
  required?: boolean;
}

const PermissionSelector = ({
  name,
  label,
  grouped,
  required = false,
}: PermissionSelectorProps) => {
  const treeData = buildPermissionTreeData(grouped);

  return (
    <ProFormTreeSelect
      name={name}
      label={label}
      rules={required ? [{ required: true, message: '请选择权限' }] : []}
      fieldProps={{
        treeData,
        treeCheckable: true,
        showCheckedStrategy: TreeSelect.SHOW_CHILD,
        placeholder: '请选择权限',
        treeDefaultExpandAll: true,
      }}
    />
  );
};

export default PermissionSelector;

```
