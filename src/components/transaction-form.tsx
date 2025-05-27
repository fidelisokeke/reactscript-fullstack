// import React from 'react'
import { Form, Input, Select, Button, message } from "antd";
import { transactionTypes } from "../constants";
import { useState } from "react";
import { expenseCategories, incomeCategories } from "../constants";
import usersGlobalStore, {
  type IUsersGlobalStore,
} from "../global-store/users-store";
import { addNewTransaction, updateTransaction } from "../services/transactions";
import { useNavigate } from "react-router-dom";

function TransactionForm({ transactionData }: { transactionData?: any }) {
  const [transactionType, setTransactionType] = useState(transactionData?.type || "income");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if(!transactionData)
      {
      await addNewTransaction({
        ...values,
        user_id: user?.id || "",
      });

      }else{
        await updateTransaction(transactionData.id,{
          ...values,
          user_id : user?.id || "",
          id: transactionData.id,
        });
      }
      messageApi.success(`Transaction ${transactionData ? "updated" : "added"} successfully`);
      setTimeout(() => {
        navigate("/transactions");
      }, 1000);
    } catch (error: any) {
      messageApi.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-7">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={transactionData}
      >
        {contextHolder}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
          <div className="col-span-2">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please enter your transaction's name",
                },
              ]}
            >
              <Input placeholder="enter your transaction name " />
            </Form.Item>
          </div>
          <Form.Item
            label="transaction Type"
            name="type"
            rules={[
              { required: true, message: "please enter your transaction type" },
            ]}
          >
            <Select
              options={transactionTypes}
              placeholder="please select transaction type"
              onChange={(value) => setTransactionType(value)}
            />
          </Form.Item>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-7">
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "please enter your transaction's amount",
              },
            ]}
          >
            <Input placeholder="enter your transaction amount " type="number" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "please enter your transaction's category",
              },
            ]}
          >
            <Select
              options={
                transactionType === "income"
                  ? incomeCategories
                  : expenseCategories
              }
            />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "please enter your transaction's date",
              },
            ]}
          >
            <Input type="date" placeholder="enter your transaction date " />
          </Form.Item>
        </div>
        <div className="flex gap-5 justify-end mt-7">
          <Button onClick={() => navigate("/transactions")}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TransactionForm;
