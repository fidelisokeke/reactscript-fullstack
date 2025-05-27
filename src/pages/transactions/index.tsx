// import React from 'react'

import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ITransaction } from "../../interfaces";
import usersGlobalStore, {
  type IUsersGlobalStore,
} from "../../global-store/users-store";
import {
  deleteTransaction,
  getTransactions,
} from "../../services/transactions";
import dayjs from "dayjs";
import { PenSquareIcon, Trash2 } from "lucide-react";
import Filters from "../../components/filters";

function Transactions() {
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    date: "",
  });
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const navigate = useNavigate();

  const getData = async (filtersData = {}) => {
    try {
      setLoading(true);
      const response: any = await getTransactions(user?.id || "", filtersData);
      if (response.error) {
        throw new Error(response.error.message);
      }
      console.log("response", response);
      setTransactions(response as ITransaction[]);
    } catch (error: any) {
      messageApi.error("error fetching transactions: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData(filters);
  }, []);
  const deleteHandler = async (id: string) => {
    try {
      setLoading(true);
      await deleteTransaction(id);
      messageApi.success("Transaction deleted successfully");
      setTransactions((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      messageApi.error("error deleting transaction:" + error.message);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Transaction Type",
      dataIndex: "type",
      render: (text: string) => text.toLocaleUpperCase(),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text: number) => `$${text}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text: string) => text.toLocaleUpperCase(),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (text: string) => dayjs(text).format("MM DD YYYY hh:mm A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: ITransaction) => (
        <div className="flex gap-5 items-center">
          <Button
            icon={<Trash2 size={14} />}
            onClick={() => deleteHandler(record.id)}
          ></Button>
          <Button
            onClick={() => navigate(`/transactions/edit/${record.id}`)}
            icon={<PenSquareIcon size={14} />}
          ></Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Transactions</h1>
        <Button type="primary">
          <Link to="/transactions/add"> Add Transactions</Link>
        </Button>
      </div>
      <Filters
        filters={filters}
        setFilters={(newFilters: any) => {
          setFilters(newFilters);
          getData(newFilters);
        }}
      />
      <Table dataSource={transactions} columns={columns} loading={loading} />
    </div>
  );
}

export default Transactions;
