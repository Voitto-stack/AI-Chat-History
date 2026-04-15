---
title: OperationLog
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: OperationLog.tsx
---

# OperationLog

```tsx
import { useRequest } from 'ahooks';
import { Empty, message, Spin, Timeline } from 'antd';
import dayjs from 'dayjs';
import { PwaDailyDataItem } from '../../config';
import { queryOperationLog } from './api';

interface OperationLogProps {
  data: PwaDailyDataItem;
}

const OperationLog = ({ data }: OperationLogProps) => {
  const { userId } = data;
  const [messageApi, contextHolder] = message.useMessage();

  const { data: logList, loading } = useRequest(
    async () => {
      const res = await queryOperationLog({ user_id: userId });
      if (res.code === 'Success') {
        return res.log || [];
      }
      messageApi.error('获取操作日志失败');
      return [];
    },
    { refreshDeps: [userId] },
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Spin tip="加载中..." />
      </div>
    );
  }

  if (!logList?.length) {
    return <Empty description="暂无操作日志" />;
  }

  return (
    <div style={{ padding: '16px 0' }}>
      {contextHolder}
      <Timeline
        items={logList.map((item) => ({
          children: (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <span style={{ fontWeight: 500 }}>{item.operator}</span>
                <span style={{ color: '#999', fontSize: 12 }}>
                  {dayjs(Number(item.createTime) * 1000).format('YYYY-MM-DD HH:mm:ss')}
                </span>
              </div>
              <div style={{ color: '#666' }}>{item.content}</div>
            </div>
          ),
        }))}
      />
    </div>
  );
};

export default OperationLog;

```
