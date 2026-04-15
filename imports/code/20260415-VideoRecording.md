---
title: VideoRecording
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: VideoRecording.tsx
---

# VideoRecording

```tsx
import { PlayCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Card, Empty, List, message, Modal, Tag } from 'antd';
import { useState } from 'react';
import { PwaDailyDataItem } from '../../config';
import { PwaVideoInfo, queryPwaVideo } from './api';

interface VideoRecordingProps {
  data: PwaDailyDataItem;
}

const VideoRecording = ({ data }: VideoRecordingProps) => {
  const { userId } = data;
  const [messageApi, contextHolder] = message.useMessage();

  // 分页状态
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // 调用视频列表接口
  const { data: videoData, loading } = useRequest(
    () =>
      queryPwaVideo({
        user_id: userId,
        page_num: pageNum,
        page_size: pageSize,
      }),
    {
      refreshDeps: [userId, pageNum, pageSize],
      onSuccess: (res) => {
        if (res.code !== 'Success') {
          messageApi.error(res.message || '获取视频列表失败');
        }
      },
      onError: () => {
        messageApi.error('获取视频列表失败，请稍后重试');
      },
    },
  );

  const videoList = videoData?.videoInfo || [];
  const total = videoData?.total || 0;

  // 视频播放弹窗
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  // 播放视频
  const handlePlay = (videoUrl: string) => {
    setPlayingUrl(videoUrl);
  };

  // 分页变化
  const handlePageChange = (page: number, size: number) => {
    setPageNum(page);
    setPageSize(size);
  };

  return (
    <div>
      {contextHolder}
      <Card>
        <List
          loading={loading}
          dataSource={videoList}
          locale={{
            emptyText: <Empty description="暂无视频录像" />,
          }}
          pagination={{
            current: pageNum,
            pageSize,
            total,
            onChange: handlePageChange,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total: number) => `共 ${total} 条`,
            pageSizeOptions: [10, 20, 50, 100],
          }}
          renderItem={(item: PwaVideoInfo) => (
            <List.Item
              style={{
                padding: '16px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: '16px',
                }}
              >
                {/* 左侧播放图标 */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <PlayCircleOutlined
                    style={{ fontSize: '24px', color: '#fff' }}
                  />
                </div>

                {/* 中间信息 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontWeight: 500, color: '#333' }}>
                      {item.targetUserName||'-'} (ID: {item.targetUserId||'-'})
                    </span>
                    {item.mock && (
                      <Tag color="orange" style={{ margin: 0 }}>
                        Mock
                      </Tag>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    Order #{item.orderId}
                    {item.callDuration !== null && (
                      <span style={{ marginLeft: '12px' }}>
                        通话时长: {Math.floor(item.callDuration / 60)}分{item.callDuration % 60}秒
                      </span>
                    )}
                    {item.startTime && (
                      <span style={{ marginLeft: '12px' }}>
                        开始时间: {item.startTime}
                      </span>
                    )}
                  </div>
                </div>

                {/* 右侧播放按钮 */}
                <Button
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  onClick={() => handlePlay(item.videoUrl)}
                  disabled={!item.videoUrl}
                >
                  播放
                </Button>
              </div>
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title="视频播放"
        open={!!playingUrl}
        onCancel={() => setPlayingUrl(null)}
        footer={null}
        destroyOnHidden
      >
        {playingUrl && (
          <video
            src={playingUrl}
            controls
            autoPlay
            style={{ width: '100%', borderRadius: 8, maxHeight: '500px' }}
          />
        )}
      </Modal>
    </div>
  );
};

export default VideoRecording;

```
