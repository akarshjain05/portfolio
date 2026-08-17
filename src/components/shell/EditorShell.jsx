import { useState } from "react";
import { Outlet } from "react-router-dom";
import TitleBar from "./TitleBar";
import MenuBar from "./MenuBar";
import CommandBar from "./CommandBar";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import Breadcrumb from "./Breadcrumb";
import StatusBar from "./StatusBar";
import ScrollToTop from "../ScrollToTop";

export default function EditorShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="ide">
      <TitleBar />
      <MenuBar />
      <CommandBar />
      <div className="ide__body">
        <ActivityBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />
        <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
        <div className="ide__main">
          <TabBar />
          <Breadcrumb />
          <main className="content">
            <ScrollToTop />
            <Outlet />
          </main>
        </div>
      </div>
      <StatusBar />
    </div>
  );
}
