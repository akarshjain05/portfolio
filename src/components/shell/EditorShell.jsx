import { Outlet } from "react-router-dom";
import TitleBar from "./TitleBar";
import MenuBar from "./MenuBar";
import ActivityBar from "./ActivityBar";
import Sidebar from "./Sidebar";
import TabBar from "./TabBar";
import Breadcrumb from "./Breadcrumb";
import StatusBar from "./StatusBar";
import ScrollToTop from "../ScrollToTop";
import { useIDE } from "../../contexts/IDEContext";
import TerminalPanel from "./TerminalPanel";
import CommandPalette from "./CommandPalette";

export default function EditorShell() {
  const { sidebarOpen, toggleSidebar } = useIDE();

  return (
    <div className="ide">
      <TitleBar />
      <MenuBar />
      <div className="ide__body">
        <ActivityBar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
        />
        <Sidebar open={sidebarOpen} onNavigate={toggleSidebar} />
        <div className="ide__main">
          <TabBar />
          <Breadcrumb />
          <main className="content">
            <ScrollToTop />
            <Outlet />
          </main>
          <TerminalPanel />
        </div>
      </div>
      <StatusBar />
      <CommandPalette />
    </div>
  );
}
