// import React from 'react'
import {Button, Form, Input, message } from "antd"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../services/users";


function RegisterPage() {

    const [loading , setLoading] = useState(false);
    const navigate= useNavigate();
    const [messageApi, contextHolder] = message.useMessage(); //ui to display error messgaes


    const onFinish = async(values: any) => {
        try {

            setLoading(true)
            const response: any = await registerUser(values);
            if(!response.success) {
                throw new Error(response.error.message);
            }
            messageApi.success("registeration successful, please check your email to verify your account");
            navigate("/login")



        } catch (error:any) {
            messageApi.error(error.message || "something went wrong");
            
        }
        finally {
            setLoading(false)
        }
    };
  return (
    <div className="bg-gray-200 h-screen flex justify-center items-center">
        {contextHolder}
      <div className="bg-white border-gray-300 shadow-sm p-5 rounded w-[420px]"> 
       <h1 className="text-xl font-bold">
        Register
       </h1>
       <p className="text-sm font-semibold text-gray-500 mb-5">
        create an Account
       </p>
       <hr className="border-gray-300 my-5" />
       <Form layout="vertical" className="flex flex-col gap-5" onFinish={onFinish}>
        <Form.Item
        label='Name'
        name= 'name'
        rules={[
            {
                required: true,
                message: "please enter your name",
            },
        ]}>
            <Input placeholder="Full name"/>
        </Form.Item>


        <Form.Item
        label='Email'
        name= 'email'
        rules={[
            {
                required: true,
                message: "please enter your email",
            },
        ]}>
            <Input placeholder="Email"/>
        </Form.Item>


        <Form.Item
        label='Password'
        name= 'password'
        rules={[
            {
                required: true,
                message: "please enter your password",
            },
        ]}>
            <Input.Password placeholder="password"/>
        </Form.Item>

        <Button
        htmlType="submit" block type="primary" className="mb-3"
        loading={loading}
        disabled={loading}>Register</Button>

        <span className="text-sm font-semibold my-3">
            Already Have an Account?{" "} <Link to='/login'>Login</Link>
        </span>



       </Form>

      </div>
    </div>
  )
}

export default RegisterPage
