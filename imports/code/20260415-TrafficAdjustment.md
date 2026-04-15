---
title: TrafficAdjustment
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: TrafficAdjustment.tsx
---

# TrafficAdjustment

```tsx
import { useRequest } from 'ahooks';
import { Button, Card, InputNumber, message, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { PwaDailyDataItem } from '../../config';
import { adjustTraffic, UserExpendInfo } from './api';

interface TrafficAdjustmentProps {
  data: PwaDailyDataItem;
  expendInfo?: UserExpendInfo;
  onSaveSuccess?: () => void;
}

const TrafficAdjustment = ({ data, expendInfo, onSaveSuccess }: TrafficAdjustmentProps) => {
  const { userId } = data;
  const [messageApi, contextHolder] = message.useMessage();

  // 从接口获取基础分、当前系数、当前权重分
  const baseWeight = expendInfo?.basicScore ?? 0;

  // 当前系数（用户未操作时展示服务端值）
  const [coefficient, setCoefficient] = useState<number | null>(null);
  const [customCoefficient, setCustomCoefficient] = useState<number | null>(
    null,
  );

  // 实际展示的系数：用户选择的 > 服务端返回的
  const displayCoefficient = coefficient ?? expendInfo?.weight ?? 1.0;

  // expendInfo 更新后清除本地选择，展示服务端最新值
  useEffect(() => {
    setCoefficient(null);
    setCustomCoefficient(null);
  }, [expendInfo]);

  // 加权预设值
  const increasePresets = [1.1, 1.2, 1.3, 1.5, 1.8, 2.0];

  // 减权预设值
  const decreasePresets = [0.9, 0.8, 0.7, 0.5, 0.3, 0.1];

  // 当前权重分：用户调整过则本地计算，否则展示服务端值
  const currentWeight =
    coefficient !== null
      ? Math.round(baseWeight * coefficient)
      : (expendInfo?.currentScore ?? 0);

  // 计算变化量
  const weightChange = currentWeight - baseWeight;
  const coefficientChange = displayCoefficient - 1.0;

  // 选择系数
  const handleSelectCoefficient = (value: number) => {
    setCoefficient(value);
    setCustomCoefficient(null);
  };

  // 自定义系数输入
  const handleCustomCoefficientChange = (value: number | null) => {
    if (value !== null) {
      setCustomCoefficient(value);
      setCoefficient(value);
    }
  };

  // 重置系数为1
  const handleReset = () => {
    setCoefficient(1);
    setCustomCoefficient(null);
  };

  // 调用流量调整接口
  const { runAsync: saveTraffic, loading } = useRequest(adjustTraffic, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 'Success') {
        messageApi.success(res.message || '权重系数保存成功');
        onSaveSuccess?.();
      } else {
        messageApi.error(res.message || '保存失败');
      }
    },
    onError: () => {
      messageApi.error('保存失败，请稍后重试');
    },
  });

  // 保存调整
  const handleSave = async () =>
    saveTraffic({
      user_id: userId,
      adjust_coefficient: displayCoefficient,
    });

  return (
    <div>
      {contextHolder}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            权重系数调整
          </h3>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            通过调整权重系数控制流量分发，系数越大，分发权重越大
          </p>
        </div>

        {/* 权重数据展示 */}
        <div
          style={{
            background: '#f5f5f5',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '24px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}
              >
                基础权重分
              </div>
              <div
                style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}
              >
                {baseWeight}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}
              >
                当前系数
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                <span
                  style={{ color: displayCoefficient >= 1 ? '#52c41a' : '#ff4d4f' }}
                >
                  ×{displayCoefficient.toFixed(2)}
                </span>
                {displayCoefficient !== 1 && (
                  <Tag
                    color={displayCoefficient >= 1 ? 'green' : 'red'}
                    style={{ marginLeft: '8px', fontSize: '12px' }}
                  >
                    {displayCoefficient >= 1 ? '加权' : '减权'}
                  </Tag>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}
            >
              当前权重分
            </div>
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#722ed1',
                marginBottom: '8px',
              }}
            >
              {currentWeight}
            </div>
            {weightChange !== 0 && (
              <div style={{ fontSize: '14px' }}>
                <span
                  style={{
                    color: weightChange > 0 ? '#52c41a' : '#ff4d4f',
                    marginRight: '8px',
                  }}
                >
                  {weightChange > 0 ? '↑' : '↓'} {Math.abs(weightChange)}
                </span>
                <span style={{ color: '#999' }}>
                  {weightChange > 0 ? '↑' : '↓'}
                  {(Math.abs(coefficientChange) * 100).toFixed(0)}%
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 加权选项 */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <span
              style={{ color: '#52c41a', marginRight: '8px', fontSize: '16px' }}
            >
              📈
            </span>
            <span style={{ fontWeight: 500, color: '#333' }}>
              加权（系数 1.01 ~ 2.00）
            </span>
          </div>
          <Space wrap>
            {increasePresets.map((value) => (
              <Button
                key={value}
                type={displayCoefficient === value ? 'primary' : 'default'}
                style={{
                  background: displayCoefficient === value ? '#52c41a' : undefined,
                  borderColor: displayCoefficient === value ? '#52c41a' : undefined,
                }}
                onClick={() => handleSelectCoefficient(value)}
              >
                ×{value.toFixed(1)}
              </Button>
            ))}
          </Space>
        </div>

        {/* 减权选项 */}
        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
            }}
          >
            <span
              style={{ color: '#ff4d4f', marginRight: '8px', fontSize: '16px' }}
            >
              📉
            </span>
            <span style={{ fontWeight: 500, color: '#333' }}>
              减权（系数 0.01 ~ 0.99）
            </span>
          </div>
          <Space wrap>
            {decreasePresets.map((value) => (
              <Button
                key={value}
                type={displayCoefficient === value ? 'primary' : 'default'}
                danger={displayCoefficient === value}
                onClick={() => handleSelectCoefficient(value)}
              >
                ×{value.toFixed(1)}
              </Button>
            ))}
          </Space>
        </div>

        {/* 自定义系数 */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontWeight: 500, marginBottom: '12px', color: '#333' }}>
            自定义系数
          </div>
          <Space>
            <span>×</span>
            <InputNumber
              min={0.01}
              max={2.0}
              step={0.1}
              precision={2}
              value={customCoefficient ?? displayCoefficient}
              onChange={handleCustomCoefficientChange}
              style={{ width: '120px' }}
            />
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </div>

        {/* 提示信息 */}
        <div
          style={{
            background: '#e6f7ff',
            border: '1px solid #91d5ff',
            borderRadius: '4px',
            padding: '12px',
            marginBottom: '24px',
          }}
        >
          <div style={{ color: '#1890ff', fontSize: '14px' }}>
            💡 提示：加权系数范围 [1, 2]，减权系数范围 [0,
            1)，系数为1表示正常权重
          </div>
        </div>

        {/* 保存按钮 */}
        <Button
          type="primary"
          size="large"
          block
          onClick={handleSave}
          loading={loading}
          style={{ height: '48px', fontSize: '16px' }}
        >
          保存调整
        </Button>
      </Card>
    </div>
  );
};

export default TrafficAdjustment;

```
