---
title: StoryForm
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: StoryForm.tsx
---

# StoryForm

```tsx
import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, message, Space } from 'antd';
import type { StoryResponse, StoryPictureInput } from '@sitin/minerva-schemas';
import ImageUploader, { ExtendedUploadFile } from './ImageUploader';
import { createStory, updateStory } from '../api';
import { parseImageUrl } from '../utils';

const { TextArea } = Input;

interface StoryFormProps {
  /** 编辑模式时传入现有故事 */
  story?: StoryResponse | null;
  /** 提交成功回调 */
  onSuccess?: () => void;
}

/**
 * 故事表单组件
 * 支持创建和编辑两种模式
 */
const StoryForm: React.FC<StoryFormProps> = ({ story, onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<ExtendedUploadFile[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const isEditMode = !!story;

  // 编辑模式时初始化表单数据
  useEffect(() => {
    if (story) {
      form.setFieldsValue({
        from_user_id: story.fromUserId,
        to_user_id: story.toUserId,
        title: story.title || '',
        content: story.content || '',
      });

      // 初始化图片列表（编辑模式下显示现有图片）
      // 需要解析 JSON 字符串格式的 URL
      const existingFiles: ExtendedUploadFile[] = story.pictures.map((pic, index) => ({
        uid: `existing-${index}`,
        name: `image-${index}`,
        status: 'done' as const,
        url: parseImageUrl(pic.url, 'min'),
      }));
      setFileList(existingFiles);
    }
  }, [story, form]);

  /**
   * 将图片列表转换为后端需要的格式
   */
  const convertPictures = (files: ExtendedUploadFile[]): StoryPictureInput[] => {
    return files
      .filter((file) => file.base64) // 只处理有 base64 的新上传图片
      .map((file) => ({
        name: file.name,
        file: file.base64!,
      }));
  };

  /**
   * 表单提交
   */
  const handleSubmit = async (values: {
    from_user_id: number;
    to_user_id: number;
    title?: string;
    content: string;
  }) => {
    // 校验图片
    if (fileList.length === 0) {
      message.error('请上传故事照片');
      return;
    }

    // 检查是否有新图片（编辑模式下可能只有旧图片）
    const newPictures = convertPictures(fileList);
    const hasNewPictures = newPictures.length > 0;

    // 创建模式必须有新图片
    if (!isEditMode && !hasNewPictures) {
      message.error('请上传故事照片');
      return;
    }

    setSubmitting(true);

    try {
      if (isEditMode && story) {
        // 更新故事
        const updateData: Parameters<typeof updateStory>[0] = {
          id: story.id,
          from_user_id: story.fromUserId,
          to_user_id: story.toUserId,
          title: values.title || undefined,
          content: values.content,
        };

        // 只有有新图片时才更新图片
        if (hasNewPictures) {
          updateData.pictures = newPictures;
        }

        await updateStory(updateData);
        message.success('故事更新成功');
      } else {
        // 创建故事
        await createStory({
          from_user_id: values.from_user_id,
          to_user_id: values.to_user_id,
          title: values.title || undefined,
          content: values.content,
          pictures: newPictures,
        });
        message.success('故事创建成功');

        // 重置表单
        form.resetFields();
        setFileList([]);
      }

      onSuccess?.();
    } catch (error) {
      console.error('提交失败:', error);
      // 错误已由全局 errorHandler 处理
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * 同步图片列表到表单
   */
  const handleFileListChange = (newFileList: ExtendedUploadFile[]) => {
    setFileList(newFileList);
    form.setFieldValue('pictures', newFileList);
    form.validateFields(['pictures']);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        from_user_id: undefined,
        to_user_id: undefined,
        title: '',
        content: '',
      }}
    >
      <Form.Item
        label="发送者ID"
        name="from_user_id"
        rules={[{ required: true, message: '请输入发送者ID' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="请输入发送者用户ID"
          min={1}
          disabled={isEditMode}
        />
      </Form.Item>

      <Form.Item
        label="伴侣ID"
        name="to_user_id"
        rules={[{ required: true, message: '请输入伴侣ID' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="请输入伴侣用户ID"
          min={1}
          disabled={isEditMode}
        />
      </Form.Item>

      <Form.Item
        label="故事标题"
        name="title"
        rules={[{ max: 100, message: '标题长度超过限制' }]}
      >
        <Input placeholder="请输入故事标题（可选），最多100字符" maxLength={100} />
      </Form.Item>

      <Form.Item
        label="故事内容"
        name="content"
        rules={[
          { required: true, message: '请输入故事内容' },
          { max: 1000, message: '内容长度超过限制' },
        ]}
      >
        <TextArea
          rows={6}
          placeholder="请输入故事内容，最多1000字符"
          maxLength={1000}
          showCount
        />
      </Form.Item>

      <Form.Item
        label="故事图片"
        name="pictures"
        rules={[
          {
            validator: () => {
              if (fileList.length === 0) {
                return Promise.reject('请上传故事照片');
              }
              if (fileList.length > 9) {
                return Promise.reject('图片数量超过限制');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <ImageUploader
          fileList={fileList}
          setFileList={handleFileListChange}
          maxLength={9}
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {isEditMode ? '更新故事' : '创建故事'}
          </Button>
          {!isEditMode && (
            <Button
              onClick={() => {
                form.resetFields();
                setFileList([]);
              }}
            >
              重置
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export default StoryForm;

```
