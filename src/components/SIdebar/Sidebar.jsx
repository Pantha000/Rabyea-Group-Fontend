import React from "react";
import { useSelector } from "react-redux";
import HrSidebar from "./HrSidebar";
import AdminSidebar from "./AdminSidebar";
import ManagerSidebar from "./ManagerSidebar";
import ClientSidebar from "./ClientSidebar";

const Sidebar = ({ showSidebar }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  if (isAuthenticated) {
    if (user.role === "Admin") {
      return <AdminSidebar showSidebar={showSidebar} />;
    } else if (user.role === "Hr") {
      return <HrSidebar showSidebar={showSidebar} />;
    } else if (user.role === "Manager") {
      return <ManagerSidebar showSidebar={showSidebar} />;
    } else if (user.role === "Client") {
      return <ClientSidebar showSidebar={showSidebar} />;
    }
  }
};

export default Sidebar;
