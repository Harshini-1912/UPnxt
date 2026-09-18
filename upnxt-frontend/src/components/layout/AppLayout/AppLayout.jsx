import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../AppSidebar/Sidebar";

import "./AppLayout.css";


function AppLayout() {

  // Sidebar starts open
  const [sidebarOpen, setSidebarOpen] = useState(true);


  // Toggle sidebar open / closed
  const handleSidebarToggle = () => {
    setSidebarOpen((current) => !current);
  };


  return (
    <div
      className={`app-layout ${
        sidebarOpen
          ? "sidebar-is-open"
          : "sidebar-is-closed"
      }`}
    >

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
      />


      <main className="app-content">
        <Outlet />
      </main>

    </div>
  );
}


export default AppLayout;