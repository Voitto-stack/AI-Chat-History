---
title: BasicInfo
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: BasicInfo.tsx
---

# BasicInfo

```tsx
import { formatDuration } from '@/utils/format';
import { getAdminUserProfileUrl } from '@/utils/getUrl';
import { Avatar, Badge, Button, Card, Descriptions, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import { PwaDailyDataItem } from '../../config';

interface BasicInfoProps {
  data: PwaDailyDataItem;
}

const BasicInfo = ({ data }: BasicInfoProps) => {
  const { user, userId, videoCallIncome, totalVideoDuration } = data;

  // 格式化地理位置
  const formatLocation = () => {
    const geo = user?.geoLocation;
    if (!geo) return '未知';

    const parts = [];
    if (geo.city && geo.city !== 'unknown') parts.push(geo.city);
    if (geo.region && geo.region !== 'unknown') parts.push(geo.region);
    if (geo.country && geo.country !== 'unknown') parts.push(geo.country);

    return parts.length > 0 ? parts.join(', ') : '未知';
  };

  // 格式化加入时间
  const formatJoinTime = () => {
    const createdAt = user?.createdAt;
    if (!createdAt) return '未知';

    // createdAt 是毫秒时间戳字符串
    const timestamp = Number(createdAt);
    if (isNaN(timestamp) || timestamp <= 0) return '未知';

    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
  };

  // 格式化最近活跃时间
  const formatLastActiveTime = () => {
    const lastActiveTime = Number(user?.lastActiveTime);
    if (!lastActiveTime || lastActiveTime <= 0) return '未知';

    return dayjs(lastActiveTime * 1000).format('YYYY-MM-DD HH:mm:ss');
  };

  // 跳转到用户 Profile
  const handleViewProfile = () => {
    const url = getAdminUserProfileUrl(userId);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      {/* 用户信息卡片 */}
      <Card
        style={{
          marginBottom: '24px',
          background: 'linear-gradient(135deg,rgba(87, 113, 231, 0.45) 0%,rgba(147, 91, 204, 0.53) 100%)',
          color: '#fff',
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Space size={16} align="center">
          <Badge
            status={user?.isOnline ? 'success' : 'default'}
            dot
            offset={[-5, 45]}
          >
            <Avatar
              src={user?.customAvatar?.url || user?.avatarUrl}
              size={64}
              style={{ border: '3px solid #fff' }}
            >
              {user?.nickname?.charAt(0) || 'U'}
            </Avatar>
          </Badge>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              {user?.nickname || '未知用户'}
              <Tag
                color={user?.isOnline ? 'success' : 'default'}
                style={{ marginLeft: '8px' }}
              >
                {user?.isOnline ? 'online' : 'offline'}
              </Tag>
              {user?.isClubUser && (
                <Tag color="gold" style={{ marginLeft: '4px' }}>
                  主播
                </Tag>
              )}
            </div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>
              📍 {formatLocation()}
            </div>
          </div>
        </Space>
      </Card>

      {/* 详细信息 */}
      <Card title="详细信息" style={{ marginBottom: '24px' }}>
        <Descriptions
          column={1}
          labelStyle={{ fontWeight: 500, width: '140px' }}
        >
          <Descriptions.Item label="用户 ID">
            <Tag color="blue">{userId}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="加入时间">
            {formatJoinTime()}
            {user?.createdDays && (
              <Tag color="purple" style={{ marginLeft: '8px' }}>
                {user.createdDays} 天前
              </Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="最近活跃时间">
            {formatLastActiveTime()}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 数据统计 */}
      <Card title="数据统计" style={{ marginBottom: '24px' }}>
        <Descriptions
          column={1}
          labelStyle={{ fontWeight: 500, width: '140px' }}
        >
          <Descriptions.Item label="累计收益">
            <Tag color="green">
              ${parseFloat(videoCallIncome || '0').toFixed(2)}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="累计视频时长">
            <Tag color="blue">{formatDuration(totalVideoDuration)}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 操作按钮 */}
      <div style={{ textAlign: 'center' }}>
        <Button type="primary" onClick={handleViewProfile}>
          查看 Profile
        </Button>
      </div>
    </div>
  );
};

export default BasicInfo;

```
