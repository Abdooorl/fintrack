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

      <div
        className="flex flex-row mb-[50px] mt-16 h-[calc(100vh-64px)] overflow-hidden"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className={`sidebar ${!isMobile ? "h-full" : ""}`}>
          <SideBar
            isMobile={isMobile}
            isVisible={sideBarVisible}
            onBackDropClick={closeSidebar}
          />
        </div>

        <div
          className="main-content flex-1 overflow-y-auto "
          style={{
            scrollbarWidth: "none",
          }}
        >
          <MainContainter>{children}</MainContainter>
        </div>
      </div>
    </div>
  );
}
