import { Menu } from "lucide-react";
import { useState } from "react";
import usersGlobalStore, {
  type IUsersGlobalStore,
} from "../global-store/users-store";
import Sidebar from "./sidebar";

// import React from 'react'

function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = usersGlobalStore() as IUsersGlobalStore;
  return (
    <div className="bg-black p-5 flex justify-between items-center">
      <h1 className="text-xl text-white font-bold">Header </h1>
      <div className="flex items-center gap-5">
        <span className="text-sm text-white font-semibold">{user?.name}</span>

        <Menu
          className="text-white cursor-pointer"
          onClick={() => setOpenSidebar(true)}
        />
      </div>
      {openSidebar && (
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      )}
    </div>
  );
}

export default Header;
