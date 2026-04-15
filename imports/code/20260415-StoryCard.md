---
title: StoryCard
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: StoryCard.tsx
---

# StoryCard

```tsx
import { Card, Image, Space, Button, Typography, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { StoryResponse } from '@sitin/minerva-schemas';
import { parseImageUrl } from '../utils';

const { Text, Paragraph } = Typography;

interface StoryCardProps {
  story: StoryResponse;
  onEdit?: (story: StoryResponse) => void;
  onDelete?: (story: StoryResponse) => void;
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  /** 是否显示选择框（用于批量操作时预留左侧空间） */
  selectable?: boolean;
}

/**
 * 故事卡片组件
 * 展示单条故事的内容、图片和操作按钮
 */
const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onEdit,
  onDelete,
  showEditButton = false,
  showDeleteButton = false,
  selectable = false,
}) => {
  const formatTime = (timestamp: number) => {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
  };

  const actions = [];

  if (showEditButton && onEdit) {
    actions.push(
      <Button
        key="edit"
        type="text"
        icon={<EditOutlined />}
        onClick={() => onEdit(story)}
      >
        编辑
      </Button>
    );
  }

  if (showDeleteButton && onDelete) {
    actions.push(
      <Popconfirm
        key="delete"
        title="确认删除"
        description="确定要删除这条故事吗？"
        onConfirm={() => onDelete(story)}
        okText="确认"
        cancelText="取消"
      >
        <Button type="text" danger icon={<DeleteOutlined />}>
          删除
        </Button>
      </Popconfirm>
    );
  }

  return (
    <Card
      style={{ marginBottom: 16 }}
      styles={selectable ? { body: { paddingLeft: 48 } } : undefined}
      actions={actions.length > 0 ? actions : undefined}
    >
      {/* 用户信息 */}
      <Space style={{ marginBottom: 16 }}>
        <Tag icon={<UserOutlined />} color="blue">
          发送者: {story.fromUserId}
        </Tag>
        <Tag icon={<HeartOutlined />} color="pink">
          接收者: {story.toUserId}
        </Tag>
        <Text type="secondary">{formatTime(story.createdAt)}</Text>
      </Space>

      {/* 标题（如果有） */}
      {story.title && (
        <Typography.Title level={5} style={{ marginBottom: 8 }}>
          {story.title}
        </Typography.Title>
      )}

      {/* 故事内容 */}
      <Paragraph
        style={{ marginBottom: 16, whiteSpace: 'pre-wrap' }}
        ellipsis={{ rows: 5, expandable: true, symbol: '展开' }}
      >
        {story.content}
      </Paragraph>

      {/* 图片展示 */}
      {story.pictures && story.pictures.length > 0 && (
        <Image.PreviewGroup>
          <Space wrap size={8}>
            {story.pictures.map((pic, index) => (
              <Image
                key={index}
                width={120}
                height={120}
                src={parseImageUrl(pic.url)}
                style={{ objectFit: 'cover', borderRadius: 8 }}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgesGAAAAO2lUWHRSYXcgcHJvZmlsZSB0eXBlIGltYWdlIGFwbmcAACgAawBkAGcAAABtYWMgaW1hZ2UvcG5nAAAAN0lEQVR4nO3BAQ0AAADCoPd"
              />
            ))}
          </Space>
        </Image.PreviewGroup>
      )}
    </Card>
  );
};

export default StoryCard;

```
