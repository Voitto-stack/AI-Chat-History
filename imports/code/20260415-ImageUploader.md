---
title: ImageUploader
date: 2026-04-15T17:04:52+08:00
source: import
language: tsx
original: ImageUploader.tsx
---

# ImageUploader

```tsx
import { useState } from 'react';
import { Upload, Image, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps, RcFile } from 'antd/es/upload';
import imageCompression from 'browser-image-compression';

export interface ExtendedUploadFile extends UploadFile {
  /** Base64 编码的图片数据 */
  base64?: string;
}

interface ImageUploaderProps {
  fileList: ExtendedUploadFile[];
  setFileList: (fileList: ExtendedUploadFile[]) => void;
  maxLength?: number;
}

/**
 * 图片上传组件
 * - 支持图片预览
 * - 自动压缩超过 1MB 的图片
 * - 将图片转换为 Base64 格式
 */
const ImageUploader: React.FC<ImageUploaderProps> = ({
  fileList,
  setFileList,
  maxLength = 9,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [compressing, setCompressing] = useState(false);

  /**
   * 将文件转换为 Base64
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // 去掉 data:image/xxx;base64, 前缀
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  /**
   * 压缩图片
   */
  const compressImage = async (file: RcFile): Promise<File> => {
    const fileSizeMB = file.size / 1024 / 1024;

    // 小于 1MB 不压缩
    if (fileSizeMB <= 1) {
      return file;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('图片压缩失败:', error);
      return file;
    }
  };

  /**
   * 自定义上传处理
   */
  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    const rcFile = file as RcFile;

    setCompressing(true);

    try {
      // 压缩图片
      const processedFile = await compressImage(rcFile);

      // 转换为 Base64
      const base64 = await fileToBase64(processedFile);

      // 创建预览 URL
      const previewUrl = URL.createObjectURL(processedFile);

      // 更新文件列表
      const newFile: ExtendedUploadFile = {
        uid: rcFile.uid,
        name: rcFile.name,
        status: 'done',
        url: previewUrl,
        base64,
      };

      setFileList([...fileList, newFile]);
      onSuccess?.(newFile);
    } catch (error) {
      console.error('图片处理失败:', error);
      message.error('图片处理失败');
      onError?.(error as Error);
    } finally {
      setCompressing(false);
    }
  };

  /**
   * 预览图片
   */
  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url || '');
    setPreviewOpen(true);
  };

  /**
   * 移除图片
   */
  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    return true;
  };

  /**
   * 上传前校验
   */
  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('只能上传图片文件!');
      return Upload.LIST_IGNORE;
    }

    if (fileList.length >= maxLength) {
      message.error(`最多只能上传 ${maxLength} 张图片!`);
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const uploadButton = (
    <div>
      {compressing ? <Spin size="small" /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>{compressing ? '处理中...' : '上传图片'}</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        accept="image/*"
        multiple
      >
        {fileList.length >= maxLength ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUploader;

```
