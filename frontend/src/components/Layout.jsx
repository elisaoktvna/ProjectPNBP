import React from "react";
import Sidebar from "./Sidebar";
const Layout = ({ children }) => {
  return (
    <div className="flex p-4 min-h-screen bg-slate-100">
      <Sidebar />
      <main className="px-4 flex-1">
        <div className="bg-white rounded-lg shadow-lg p-5">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
