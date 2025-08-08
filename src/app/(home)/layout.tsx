"use client";

import Header from "@/components/header";
import MainContainter from "@/components/main-container";
import SideBar from "@/components/sidebar";
import { useLayout } from "@/hooks/useLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobile, sideBarVisible, toggleSidebar, closeSidebar } = useLayout();
  return (
    <div className="font-sans tracking-[0.5%] h-screen overflow-hidden flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-16 z-20">
        <Header onMenuClick={toggleSidebar} />
      </div>

      <div className="flex flex-row mt-16 h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar container with fixed position for both mobile and desktop */}
        {/* For mobile, we don't render in normal flow, but use fixed positioning via the SideBar component */}
        {!isMobile && (
          <div className="sidebar h-full">
            <SideBar
              isMobile={false}
              isVisible={sideBarVisible}
              onBackDropClick={closeSidebar}
            />
          </div>
        )}

        {/* Fixed mobile sidebar outside normal document flow */}
        {isMobile && (
          <SideBar
            isMobile={true}
            isVisible={sideBarVisible}
            onBackDropClick={closeSidebar}
          />
        )}

        {/* Main content with its own scrolling context */}
        <div className="main-content flex-1 overflow-y-auto">
          <MainContainter>{children}</MainContainter>
        </div>
      </div>
    </div>
  );
}
