import { Button, Drawer, message } from "antd";
import { Home, User2, List, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabaseConfig from "../config/supabase-config";

function Sidebar({
  openSidebar,
  setOpenSidebar,
}: {
  openSidebar: boolean;
  setOpenSidebar: (open: boolean) => void;
}) {
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const menuItems = [
    {
      name: "Home",
      icon: <Home size={14} />,
      path: "/",
    },
    {
      name: "Profile",
      icon: <User2 size={14} />,
      path: "/profile",
    },

    {
      name: "Transactions",
      icon: <List size={14} />,
      path: "/transactions",
    },
  ];
  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await supabaseConfig.auth.signOut();
      if (response.error) {
        throw new Error(response.error.message);
      }
      messageApi.success("logged out successfully");
      navigate("/login");
    } catch (error: any) {
      messageApi.error(error.message || "Error loggin out, please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Drawer open={openSidebar} onClose={() => setOpenSidebar(false)} closable>
        <div className="flex flex-col gap-10 mt-10">
            {contextHolder}
          {menuItems.map((item) => (
            <div
              className={`p-3 flex gap-5 items-center cursor-pointer  ${
                pathname === item.path
                  ? "bg-gray-100 border border-gray-400 rounded"
                  : ""
              }`}
              key={item.name}
              onClick={() => {
                setOpenSidebar(false);
                navigate(item.path);
              }}
            >
              {item.icon}
              <span className="text-sm text-gray-800">{item.name}</span>
            </div>
          ))}
          <Button
            icon={<LogOut size={14} />}
            type="primary"
            onClick={handleLogout}
            loading={loading}
            disabled={loading}
          >
            logout
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
