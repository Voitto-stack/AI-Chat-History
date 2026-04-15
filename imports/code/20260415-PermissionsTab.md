---
title: PermissionsTab
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: PermissionsTab.tsx
---

# PermissionsTab

```tsx
import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Drawer, List, message, Popconfirm, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useAccess } from '@umijs/max';
import {
  createPermission,
  deletePermission,
  getPermission,
  listPermissions,
  updatePermission,
  type PermissionDetail,
} from '@/api';
import type { PermissionItem } from './config';

const PermissionsTab = () => {
  // Hooks
  const access = useAccess();
  const actionRef = useRef<ActionType>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<PermissionItem | null>(null);
  const [detailPermission, setDetailPermission] = useState<PermissionDetail | null>(null);

  const { runAsync: loadPermissions } = useRequest(listPermissions, { manual: true });
  const { runAsync: loadPermissionDetail } = useRequest(getPermission, { manual: true });

  const requestTable = async () => {
    try {
      const permissions = await loadPermissions();
      return {
        data: permissions || [],
        success: true,
        total: permissions?.length || 0,
      };
    } catch (error) {
      message.error('权限列表加载失败');
      return { data: [], success: false, total: 0 };
    }
  };

  const handleOpenDetail = async (record: PermissionItem) => {
    setDetailOpen(true);
    setDetailPermission(null);
    setCurrentPermission(record);
    try {
      const detail = await loadPermissionDetail(record.id);
      setDetailPermission(detail);
    } catch (error) {
      message.error('权限详情加载失败');
    }
  };

  const columns: ProColumns<PermissionItem>[] = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => record.description || '-',
    },
    {
      title: '角色数',
      dataIndex: 'roleCount',
      key: 'roleCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'actions',
      valueType: 'option',
      render: (_, record) => {
        const canRead = access.can('rbac.permission.read');
        const canWrite = access.can('rbac.permission.write');
        const canDelete = access.can('rbac.permission.delete');
        const hasRoles = record.roleCount > 0;

        return (
          <Space size={8}>
            {canRead && (
              <Button type="link" onClick={() => handleOpenDetail(record)}>
                查看
              </Button>
            )}
            {canWrite && (
              <Button
                type="link"
                onClick={() => {
                  setCurrentPermission(record);
                  setEditOpen(true);
                }}
              >
                编辑描述
              </Button>
            )}
            {canDelete && (
              <Popconfirm
                title={
                  hasRoles
                    ? '权限已被角色使用，需先移除'
                    : '确认删除该权限？'
                }
                onConfirm={async () => {
                  if (hasRoles) return;
                  await deletePermission(record.id);
                  message.success('删除成功');
                  actionRef.current?.reload();
                }}
                okButtonProps={{ disabled: hasRoles }}
              >
                <Button type="link" danger disabled={hasRoles}>
                  删除
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<PermissionItem>
        headerTitle="权限管理"
        actionRef={actionRef}
        columns={columns}
        request={requestTable as any}
        rowKey="id"
        search={false}
        options={false}
        scroll={{ x: 'max-content' }}
        columnsState={{
          persistenceKey: 'rbac-permissions-table-columns',
          persistenceType: 'localStorage',
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        cardBordered
        toolBarRender={() =>
          access.can('rbac.permission.write')
            ? [
                <Button
                  key="create"
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setCreateOpen(true)}
                >
                  新建权限
                </Button>,
              ]
            : []
        }
      />

      <ModalForm
        title="新建权限"
        open={createOpen}
        modalProps={{ destroyOnHidden: true, onCancel: () => setCreateOpen(false) }}
        onFinish={async (values) => {
          await createPermission(values);
          message.success('创建成功');
          setCreateOpen(false);
          actionRef.current?.reload();
          return true;
        }}
      >
        <ProFormText
          name="key"
          label="权限 Key"
          rules={[
            { required: true, message: '请输入权限 Key' },
            { max: 100, message: '最多 100 字' },
            {
              pattern: /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/,
              message: '格式需为小写点分（如 rbac.user.read）',
            },
          ]}
        />
        <ProFormTextArea
          name="description"
          label="描述"
          fieldProps={{ maxLength: 255, showCount: true }}
        />
      </ModalForm>

      <ModalForm
        key={`edit-${currentPermission?.id || 'empty'}`}
        title="编辑描述"
        open={editOpen}
        modalProps={{ destroyOnHidden: true, onCancel: () => setEditOpen(false) }}
        initialValues={{ description: currentPermission?.description || '' }}
        onFinish={async (values) => {
          if (!currentPermission) return false;
          await updatePermission(currentPermission.id, values);
          message.success('更新成功');
          setEditOpen(false);
          actionRef.current?.reload();
          return true;
        }}
      >
        <ProFormTextArea
          name="description"
          label="描述"
          fieldProps={{ maxLength: 255, showCount: true }}
        />
      </ModalForm>

      <Drawer
        title="权限详情"
        width={600}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      >
        <List
          header="绑定角色"
          dataSource={detailPermission?.roles || []}
          renderItem={(role) => (
            <List.Item key={role.id}>
              <Tag>{role.name}</Tag>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
};

export default PermissionsTab;

```
