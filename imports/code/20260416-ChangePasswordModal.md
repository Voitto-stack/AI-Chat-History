---
title: ChangePasswordModal
date: 2026-04-16T11:07:55+08:00
source: import
language: tsx
original: ChangePasswordModal.tsx
---

# ChangePasswordModal

```tsx
import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/auth";
import { useAuthStore } from "../../store/auth";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export const ChangePasswordModal = ({ open, onClose }: ChangePasswordModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleOk = async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      await changePassword(values.currentPassword, values.newPassword);
      message.success("密码已修改，请重新登录");
      form.resetFields();
      onClose();
      setUser(null);
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "修改密码失败";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="修改密码"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="currentPassword"
          label="当前密码"
          rules={[{ required: true, message: "请输入当前密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            { required: true, message: "请输入新密码" },
            { min: 8, message: "密码至少 8 个字符" },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="确认新密码"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "请确认新密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) return Promise.resolve();
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

```
