---
title: CustomMessageBubble
date: 2026-04-23T20:05:12+08:00
source: import
language: tsx
original: CustomMessageBubble.tsx
---

# CustomMessageBubble

```tsx
import { PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

interface CustomMessageBubbleProps {
  message: any;
}

export function CustomMessageBubble({ message }: CustomMessageBubbleProps) {
  const { payload, flow } = message;
  if (!payload) return <FallbackPayload payload={payload} flow={flow} />;

  let payloadData: any;
  try {
    payloadData = payload.data ? JSON.parse(payload.data) : {};
  } catch {
    payloadData = {};
  }

  // av_call invitation card
  if (payloadData?.businessID === 1 && payloadData?.data) {
    try {
      const callData = JSON.parse(payloadData.data);
      if (callData?.businessID === 'av_call') {
        return (
          <Bubble flow={flow}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <VideoCameraOutlined style={{ fontSize: 16, color: '#1677ff' }} />
              <span>Video Call Invitation</span>
            </div>
          </Bubble>
        );
      }
    } catch {
      // ignore
    }
  }

  // videoCall entry
  if (typeof payloadData?.data === 'string' && payloadData.data.includes('videoCall')) {
    return (
      <Bubble flow={flow}>
        <span>She started a conversation with you. Don't miss this chance!</span>
      </Bubble>
    );
  }

  // video cancelled / declined
  if (payloadData?.type === 'video' && payloadData?.status === 'cancelled') {
    return (
      <Bubble flow={flow} muted>
        <VideoCameraOutlined style={{ marginRight: 4 }} />
        Canceled
      </Bubble>
    );
  }
  if (payloadData?.type === 'video' && payloadData?.status === 'declined') {
    return (
      <Bubble flow={flow} muted>
        <VideoCameraOutlined style={{ marginRight: 4 }} />
        Declined
      </Bubble>
    );
  }

  // audio cancelled
  if (payloadData?.type === 'audio' && payloadData?.status === 'cancelled') {
    const dur = payloadData?.duration;
    return (
      <Bubble flow={flow} muted>
        <PhoneOutlined style={{ marginRight: 4 }} />
        {dur ? `Canceled after ${dur}s` : 'Canceled'}
      </Bubble>
    );
  }

  // Giphy
  if (payload.description === 'Giphy' && payload.data) {
    let url = '';
    try {
      url = JSON.parse(payload.data).url;
    } catch {
      // ignore
    }
    if (url) {
      return (
        <Bubble flow={flow}>
          <img
            src={url}
            alt="Giphy"
            style={{ maxHeight: 120, borderRadius: 8 }}
          />
        </Bubble>
      );
    }
  }

  // Greeting
  if (payload.description === 'Greeting' && payload.data) {
    return (
      <Bubble flow={flow}>
        <span>{payload.data}</span>
      </Bubble>
    );
  }

  // phone_call_message / NOTIFICATION_* and other known description types
  if (payload.description) {
    return (
      <Bubble flow={flow} muted>
        <Tag color="blue" style={{ margin: 0 }}>{payload.description}</Tag>
        {payload.extension && (
          <span style={{ marginLeft: 6, color: '#666', fontSize: 12 }}>
            {truncate(payload.extension, 80)}
          </span>
        )}
      </Bubble>
    );
  }

  // Unknown custom message — show compact JSON
  return <FallbackPayload payload={payload} flow={flow} />;
}

function Bubble({
  flow,
  muted,
  children,
}: {
  flow: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  const isOut = flow === 'out';
  return (
    <div
      style={{
        display: 'inline-block',
        maxWidth: 320,
        padding: '8px 12px',
        borderRadius: 8,
        background: isOut ? '#1677ff' : '#f4f4f4',
        color: muted ? (isOut ? 'rgba(255,255,255,0.7)' : '#999') : (isOut ? '#fff' : '#333'),
        fontSize: 14,
        lineHeight: '20px',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </div>
  );
}

function FallbackPayload({ payload, flow }: { payload: any; flow: string }) {
  return (
    <Bubble flow={flow} muted>
      <pre
        style={{
          margin: 0,
          fontSize: 11,
          maxHeight: 120,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
      >
        {JSON.stringify(payload, null, 2)}
      </pre>
    </Bubble>
  );
}

function truncate(str: string, max: number) {
  return str.length > max ? str.slice(0, max) + '...' : str;
}

/**
 * Extract a human-readable preview string from a custom message payload
 * for the conversation list sidebar.
 */
export function getCustomMessagePreview(lastMessage: any): string | null {
  if (lastMessage?.type !== 'TIMCustomElem') return null;
  const description = lastMessage?.payload?.description;
  if (description) return description;
  return null;
}

```
