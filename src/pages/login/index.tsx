// import React from 'react'
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/users";

function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response: any = await loginUser(values);
      if (!response.success) {
        throw new Error(response.error.message);
      }
      messageApi.success("login sucessful", 5);
      setTimeout(()=> {
        navigate("/");

      }, 1000)
      
    } catch (error: any) {
      messageApi.error(error.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const temp = ()=> messageApi.success('temp success message', 5);
  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
      {contextHolder}
      <div className="bg-white border-gray-300 shadow-sm p-5 rounded w-[420px]">
        <h1 className="text-xl font-bold">Login</h1>
        <p className="text-sm font-semibold text-gray-500 mb-5">Welcome Back</p>
        <hr className="border-gray-300 my-5" />
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "please enter your email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Password"
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

          <Button
            htmlType="submit"
            block
            type="primary"
            disabled={loading}
            loading={loading}
          >
            login
          </Button>

          {/* <Button
            htmlType="button"
            block
            type="primary"
            onClick={temp}
          >
            test message
          </Button> */}

          <span className="text-sm font-semibold">
            Dont Have an Account? <Link to="/register">Register</Link>
          </span>
          <span className="text-sm font-semibold ">
            Forgot Password? <Link to="/forgot-password">click to reset</Link>
          </span>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
