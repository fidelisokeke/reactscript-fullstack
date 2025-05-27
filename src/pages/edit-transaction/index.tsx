// import React from 'react'

import { useParams } from "react-router-dom";
import TransactionForm from "../../components/transaction-form";
import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { getTransactionById } from "../../services/transactions";

function EditTransaction() {
  const [transactionData, setTransactionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [messsageApi, contextHolder] = message.useMessage();
  const params: any = useParams();

  const getData = async () => {
    try {
      setLoading(true);
      const response: any = await getTransactionById(params.Id);
      if (response.error) {
        throw new Error(response.error.message);
      }
      setTransactionData(response);
    } catch (error: any) {
      messsageApi.error("Error fetching Transactions: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-xl font-bold">Edit Transaction</h1>
      {contextHolder}
      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}
      {transactionData && <TransactionForm transactionData={transactionData} />}
    </div>
  );
}

export default EditTransaction;
