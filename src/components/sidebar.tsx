import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isVisible: boolean;
  isMobile: boolean;
  onBackDropClick: () => void;
}

interface navData {
  title: string;
  url: string;
}
const data: navData[] | [] = [
  {
    title: "Dashboard",
    url: "/dashboard",
  },
  {
    title: "Transaction",
    url: "/transactions",
  },
  {
    title: "Reports",
    url: "/reports",
  },
  {
    title: "Settings",
    url: "/settings",
  },
];

export default function SideBar({
  isVisible,
  isMobile,
  onBackDropClick,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="side-bar  ">
      {isMobile && isVisible && (
        <div
          className="fixed inset-0 bg-black/20  z-5 animate-in fade-in"
          onClick={onBackDropClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? "fixed" : "relative"} 
          ${isVisible ? "translate-x-0" : "-translate-x-full"}
          ${isMobile ? "z-50" : "z-auto"}
          ${!isMobile && !isVisible ? "w-0 p-0" : "w-[300px]"}
          h-full bg-white transition-all  pt-[28px]  duration-300 overflow-y-hidden
        `}
        style={{
          scrollbarWidth: "none",
        }}
        aria-hidden={!isVisible}
      >
        <div className="">
          {" "}
          <nav className="flex flex-col pl-[16px] sm:pl-[48px] pr-[16px] space-y-1">
            {data.map((item: navData, idx: number) => (
              <Link
                className={` ${
                  item.url === pathname
                    ? "bg-[#DDE5E7] text-[#3A6C7B]"
                    : "hover:bg-[hsl(192,17%,97%)]"
                } w-[full] text-[15px] rounded-[20px] font-medium text-[#1B2528]  pl-[18px] py-[8px] active:scale-97 `}
                key={idx}
                href={item.url}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
