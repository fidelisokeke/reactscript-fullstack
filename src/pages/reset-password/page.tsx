// import React from 'react'
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabaseConfig from "../../config/supabase-config";

function ResetPassword() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      if (values.password !== values.confirmpassword) {
        messageApi.error("Passwords do not match");
        return;
      }
      setLoading(true);
      const response = await supabaseConfig.auth.updateUser({
        password: values.password,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }
      messageApi.success("Password reset successfully");

      navigate("/login");
    } catch (error: any) {
      messageApi.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      {contextHolder}
      <div className="bg-white border-gray-300 shadow-sm p-5 rounded w-[420px]">
        <h1 className="text-xl font-bold">Reset Password</h1>
        <p className="text-sm font-semibold text-gray-500 mb-5">
          Enter new password to reset
        </p>
        <hr className="border-gray-300 my-5" />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              {
                required: true,
                message: "please enter your password",
              },
            ]}
          >
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item
            label="confirm password"
            name="confirmpassword"
            rules={[
              {
                required: true,
                message: "please confirm your password",
              },
            ]}
          >
            <Input.Password placeholder="confirm password" />
          </Form.Item>

          <Button
            htmlType="submit"
            block
            type="primary"
            disabled={loading}
            loading={loading}
          >
            Reset password
          </Button>

          
          {/* <span className="text-sm font-semibold">
            Dont Have an Account? <Link to="/register">Register</Link>
          </span>
          <span className="text-sm font-semibold ">
            Forgot Password? <Link to="/forgot-password">click to reset</Link>
          </span> */}
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
