import { useEffect, useState } from "react";
import DashboardCard from "../../components/dashboard-card";
import dayjs from "dayjs";
import { message, Spin, Table } from "antd";
import { getTransactionsDashboardData } from "../../services/transactions";
import usersGlobalStore, {
  type IUsersGlobalStore,
} from "../../global-store/users-store";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
    lastFiveTransactions: [],
  });

  const getData = async () => {
    try {
      setLoading(true);
      const response: any = await getTransactionsDashboardData(user?.id || "");
      setDashboardData(response);
    } catch (error: any) {
      messageApi.error("Error Fetching data: " + error.message);
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
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      {contextHolder}
      <h1 className="text-xl font-bold">Dashboard</h1>
      {loading && (
        <div className="flex items-center justify-center h-96">
          <Spin />
        </div>
      )}
      {!loading && (
        <>
          {" "}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">
            <DashboardCard
              title="Total Income"
              value={dashboardData.totalIncome}
              caption="Total Income From all sources"
            />
            <DashboardCard
              title="Total Expenses"
              value={dashboardData.totalExpenses}
              caption="Total Expenses from all sources"
            />
            <DashboardCard
              title="Total Savings"
              value={dashboardData.totalSavings}
              caption="Total savings from all sources"
            />
          </div>
          <div className="mt-7">
            <h1 className="text-lg font-bold">Last 5 Transactions</h1>

            <Table
              columns={columns}
              dataSource={dashboardData.lastFiveTransactions}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
