import { useState, useEffect } from "react";

export function useLayout() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sideBarVisible, setSideBarVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSideBarVisible(!mobile);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSideBarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setSideBarVisible(false);
  };

  return { sideBarVisible, isMobile, toggleSidebar, closeSidebar, mounted };
}
