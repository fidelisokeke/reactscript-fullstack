import { Button, Form, Input } from "antd";
import { Select } from "antd";
// import Input from "antd";
import {
  transactionTypes,
  incomeCategories,
  expenseCategories,
} from "../constants";
import { useState } from "react";
const updatedTransactionTypes = [
  { label: "All", values: "" },
  ...transactionTypes,
];
const updatedIcomeCategories = [
  { label: "All", values: "" },
  ...incomeCategories,
];
const updatedExpenseCategories = [
  { label: "All", values: "" },
  ...expenseCategories,
];
function Filters({
  setFilters,
}: {
  filters: any;
  setFilters: (filters: any) => void;
}) {
  const [transactionType, setTransactionType] = useState("");
  const [form] = Form.useForm();
  return (
    <Form
      className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mb-5 items-end"
      layout="vertical"
      onFinish={(values) => setFilters(values)}
      form={form}
    >
      <Form.Item name={"type"} label="Transaction Type">
        <Select
          options={updatedTransactionTypes}
          onChange={(value) => setTransactionType(value)}
        />
      </Form.Item>

      <Form.Item name={"category"} label="Category">
        <Select
          options={
            transactionType === "income"
              ? updatedIcomeCategories
              : updatedExpenseCategories
          }
        />
      </Form.Item>

      <Form.Item name={"date"} label="Date">
        <Input type="date" />
      </Form.Item>
      <div className="grid grid-cols-2 gap-5">
        <Button
          onClick={() => {
            setFilters({});
            setTransactionType("");
            form.resetFields();
          }}
        >
          Clear Filter
        </Button>
        <Button type="primary" htmlType="submit">
          Apply Filters
        </Button>
      </div>
    </Form>
  );
}

export default Filters;
