import { Button, Form, Input, message, Modal } from "antd";
import supabaseConfig from "../../../config/supabase-config";
import { useState } from "react";
// import React from 'react'

function ChangePasswordModal({
  openChangePasswordModal,
  setOpenChangePasswordModal,
}: {
  openChangePasswordModal: boolean;
  setOpenChangePasswordModal: (openChangePasswordModal: boolean) => void;
}) {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values: any) => {
    try {
      if (values.newPassword !== values.confirmPassword) {
        messageApi.error("passwords do not match!");
        return;
      }
      const response = await supabaseConfig.auth.updateUser({
        password: values.newPassword,
      });
      if (response.error) {
        messageApi.error(response.error.message);
      } else {
        messageApi.success("Password Changed Successfully");
        setTimeout(() => {
          setOpenChangePasswordModal(false);
        }, 1000);
      }
    } catch (error: any) {
      messageApi.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      open={openChangePasswordModal}
      onCancel={() => setOpenChangePasswordModal(false)}
      centered
      width={500}
      footer={null}
    >
      <h1 className="text-xl font-bold">Change Password</h1>

      {contextHolder}

      <Form
        className="flex flex-col gap-5 mb-5 "
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="New Passowrd"
          name="newPassword"
          required
          rules={[
            {
              required: true,
              message: "please input your password",
            },
          ]}
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item
          label="Confirm Passowrd"
          name="confirmPassword"
          required
          rules={[
            {
              required: true,
              message: "please confirm your password",
            },
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <div className="flex justify-end">
          <Button disabled={loading}>cancel</Button>
          <Button
            type="primary"
            className="ml-2"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Change Password
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default ChangePasswordModal;
