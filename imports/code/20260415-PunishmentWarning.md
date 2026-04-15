---
title: PunishmentWarning
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: PunishmentWarning.tsx
---

# PunishmentWarning

```tsx
import { useRequest } from 'ahooks';
import { Button, Card, Input, message, Modal, Space, Tag } from 'antd';
import { useState } from 'react';
import { UserStatus } from '@/types/user';
import { PwaDailyDataItem } from '../../config';
import { punishmentPwa, PunishmentTypeEnum, queryPunishmentMessage } from './api';

const { TextArea } = Input;

interface PunishmentWarningProps {
  data: PwaDailyDataItem;
}

const PunishmentWarning = ({ data }: PunishmentWarningProps) => {
  const { userId, user } = data;
  const [messageApi, contextHolder] = message.useMessage();

  // 查询处罚原因
  const { data: punishmentData, refresh: refreshPunishment } = useRequest(
    () => queryPunishmentMessage({ user_id: userId }),
    {
      refreshDeps: [userId],
    },
  );

  // 封禁状态（优先使用查询接口的 banned 字段）
  const isBanned = punishmentData?.banned ?? user?.userStatus === UserStatus.BANNED;

  // 封禁原因
  const [banReason, setBanReason] = useState('');
  const [banModalVisible, setBanModalVisible] = useState(false);

  // 警告文案
  const [warningText, setWarningText] = useState('');

  // 封禁接口
  const { runAsync: banUser, loading: banLoading } = useRequest(punishmentPwa, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 'Success') {
        messageApi.success(res.message || '封禁成功');
        setBanModalVisible(false);
        setBanReason('');
        refreshPunishment();
      } else {
        messageApi.error(res.message || '封禁失败');
      }
    },
    onError: () => {
      messageApi.error('封禁失败，请稍后重试');
    },
  });

  // 解封接口
  const { runAsync: unbanUser, loading: unbanLoading } = useRequest(
    punishmentPwa,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 'Success') {
          messageApi.success(res.message || '解封成功');
          refreshPunishment();
        } else {
          messageApi.error(res.message || '解封失败');
        }
      },
      onError: () => {
        messageApi.error('解封失败，请稍后重试');
      },
    },
  );

  // 警告接口
  const { runAsync: warnUser, loading: warnLoading } = useRequest(
    punishmentPwa,
    {
      manual: true,
      onSuccess: (res) => {
        if (res.code === 'Success') {
          messageApi.success(res.message || '警告发送成功');
          setWarningText('');
          refreshPunishment();
        } else {
          messageApi.error(res.message || '警告发送失败');
        }
      },
      onError: () => {
        messageApi.error('警告发送失败，请稍后重试');
      },
    },
  );

  // 处理封禁
  const handleBan = async () => {
    if (!banReason.trim()) {
      messageApi.warning('请输入封禁原因');
      return;
    }

    await banUser({
      userId: userId,
      type: PunishmentTypeEnum.BAN,
      message: banReason,
    });
  };

  // 处理解封
  const handleUnban = async () => {
    Modal.confirm({
      title: '确认解封',
      content: `确定要解封用户 ${user?.nickname || userId} 吗？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await unbanUser({
          userId: userId,
          type: PunishmentTypeEnum.UNBAN,
        });
      },
    });
  };

  // 发送警告
  const handleSendWarning = async () => {
    if (!warningText.trim()) {
      messageApi.warning('请输入警告文案');
      return;
    }

    await warnUser({
      userId: userId,
      type: PunishmentTypeEnum.WARN,
      message: warningText,
    });
  };

  return (
    <div>
      {contextHolder}
      {/* 封禁/解封 */}
      <Card
        title={
          <Space>
            <span>封禁/解封</span>
          </Space>
        }
        style={{ marginBottom: '24px' }}
      >
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <div>
            <span style={{ fontWeight: 500, marginRight: '8px' }}>
              当前状态：
            </span>
            <Tag
              color={isBanned ? 'red' : 'green'}
              style={{ fontSize: '14px' }}
            >
              {isBanned ? '已封禁' : '正常'}
            </Tag>
          </div>

          {isBanned && punishmentData?.bannedMessage && (
            <div>
              <span style={{ fontWeight: 500, marginRight: '8px' }}>
                封禁原因：
              </span>
              <span style={{ color: '#ff4d4f' }}>
                {punishmentData.bannedMessage}
              </span>
            </div>
          )}

          {isBanned ? (
            <Button
              type="primary"
              onClick={handleUnban}
              loading={unbanLoading}
              style={{ width: '100%' }}
            >
              解封账号
            </Button>
          ) : (
            <Button
              danger
              onClick={() => setBanModalVisible(true)}
              style={{ width: '100%' }}
            >
              封禁账号
            </Button>
          )}
        </Space>
      </Card>

      {/* 发送警告 */}
      <Card
        title={
          <Space>
            <span>⚠️ 发送警告</span>
          </Space>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <TextArea
            rows={6}
            placeholder="请输入警告文案..."
            value={warningText}
            onChange={(e) => setWarningText(e.target.value)}
            maxLength={500}
            showCount
            style={{ marginBottom: '12px' }}
          />

          <Button
            type="primary"
            size="large"
            onClick={handleSendWarning}
            loading={warnLoading}
            disabled={!warningText.trim()}
            style={{ width: '100%' }}
          >
            发送警告
          </Button>
        </Space>
      </Card>

      {/* 封禁弹窗 */}
      <Modal
        title="封禁账号"
        open={banModalVisible}
        onOk={handleBan}
        onCancel={() => {
          setBanModalVisible(false);
          setBanReason('');
        }}
        okText="确认封禁"
        cancelText="取消"
        okButtonProps={{ danger: true, loading: banLoading }}
      >
        <div style={{ marginBottom: '16px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 500 }}>
            封禁用户：{user?.nickname || '未知用户'} (ID: {userId})
          </div>
          <div style={{ color: '#999', fontSize: '12px' }}>
            封禁后，该用户将无法登录和使用应用
          </div>
        </div>

        <TextArea
          rows={4}
          placeholder="请输入封禁原因（必填）"
          value={banReason}
          onChange={(e) => setBanReason(e.target.value)}
          maxLength={200}
          showCount
          style={{ marginBottom: '12px' }}
        />
      </Modal>
    </div>
  );
};

export default PunishmentWarning;

```
