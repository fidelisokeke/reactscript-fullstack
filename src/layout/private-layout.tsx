import React, { useState } from "react";
import Header from "./header";
import { getLoggedInUser } from "../services/users";
import { useEffect } from "react";
import { message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import usersGlobalStore, {
  type IUsersGlobalStore,
} from "../global-store/users-store";

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { setUser } = usersGlobalStore() as IUsersGlobalStore;
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      setLoading(true);
      const response: any = await getLoggedInUser();
      if (response.error) {
        throw new Error(response.error.message);
      }
      setUser(response.data);
    } catch (error: any) {
      messageApi.error(error.message || "something went wrong");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      {contextHolder}
      <Header />
      {loading && (
        <div className="flex justify-center items-center h-96">
          <Spin />
        </div>
      )}
      {!loading && <div className="p-5">{children}</div>}
    </div>
  );
}

export default PrivateLayout;
