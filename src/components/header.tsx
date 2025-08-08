"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeftStartOnRectangleIcon,  BellIcon,  UserIcon } from "@heroicons/react/16/solid";
import Logo from "../../public/Logo.svg";
import Avatar from "../../public/Avatar.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SearchSheet from "./custom/search-sheet";
import {
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {  LayoutGrid, Menu, SearchIcon,  } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div
      className="header fixed top-0 w-full px-[16px] sm:px-[48px] border-b-1 border-[hsl(0,0%,90%)] py-[16px] sm:border-none sm:py-[16px] flex flex-row
     justify-between bg-white z-10"
    >
      <div className="menu-logo items-center flex flex-row gap-[8px] sm:gap-[28px]">
        <div className=" sm:py-[6px] sm:px-[8px] hover:bg-gray-50 cursor-pointer rounded-[8px] ">
          <Menu
            onClick={onMenuClick}
            className="w-[32px] sm:w-[24px] cursor-pointer text-[#1B2528] hover:text-gray-600 active:scale-90 transition-all"
          />
        </div>
        <Image src={Logo} alt="FinTrack Logo" height={32} priority />
      </div>
      <div className="menubar flex flex-row items-center gap-[18px] sm:gap-[20px] ">
        <div ref={searchRef} className="hidden sm:block relative">
          <AnimatePresence initial={false} mode="wait">
            {!isSearchOpen ? (
              <motion.div
                key="searchIcon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
                onClick={() => setIsSearchOpen(true)}
                className="cursor-pointer relative"
              >
                <div className=" py-[6px] px-[8px] cursor-pointer  sm:hover:bg-gray-50 rounded-[8px] ">
                  <SearchIcon className="w-[24px] h-[24px]  text-[#1B2528] hover:text-gray-600 active:scale-95 transition-all" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="searchInput"
                layoutId="searchBox"
                initial={{ width: 24, x: 0, opacity: 0 }}
                animate={{
                  width: 260,
                  x: 0,
                  opacity: 1,
                  transition: {
                    width: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.1, ease: "easeOut" },
                  },
                }}
                exit={{
                  width: 24,
                  x: 0,
                  opacity: 0,
                  transition: {
                    width: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                    opacity: { duration: 0.1, delay: 0.1 },
                  },
                }}
                className="flex items-center bg-gray-100 rounded-full overflow-hidden  origin-right"
              >
                <div className=" bg-white rounded-full mx-[2px] my-[2px]  p-[8px]">
                  <SearchIcon className="w-[18px] h-[18px] text-gray-500  " />
                </div>
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  ref={inputRef}
                  className="bg-transparent ml-[4px] border-none outline-none text-sm w-full text-gray-800 placeholder-gray-400"
                  placeholder="Search Keywords"
                />
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: { delay: 0.1, duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.1 },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex-shrink-0"
                >
                  <XMarkIcon className="w-[18px] h-[18px] mr-[8px] text-gray-500 hover:text-gray-700" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className=" py-[6px] px-[8px] hover:bg-gray-50 cursor-pointer rounded-[8px] ">
          <LayoutGrid className="w-[20px] h-[20px] cursor-pointer text-[#1B2528] hover:text-gray-600 active:scale-95  transition-all hidden sm:flex" />
        </div>
        <SearchIcon
          onClick={() => setOpenSheet(true)}
          className="w-[26px] h-[26px] cursor-pointer text-[#1B2528] hover:text-gray-600 active:scale-95 transition-all sm:hidden"
        />
        <LayoutGrid className="w-[26px] h-[26px] cursor-pointer text-[#1B2528] hover:text-gray-600 active:scale-95 transition-all  sm:hidden" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="profile-avatar cursor-pointer border-2 sm:ml-[8px] border-gray-200 bg-contain rounded-[100px] overflow-hidden">
              <Image
                src={Avatar}
                alt="User Avatar"
                className=" w-[28px] sm:w-[36px]"
                priority
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[240px] sm:w-[180px] rounded-[16px]"
            align="end"
            side="bottom"
          >
            <DropdownMenuItem className=" text-[15px] h-[40px] sm:h-max sm:text-[14px] cursor-pointer active:scale-98  rounded-[8px] font-medium text-gray-600">
              <UserIcon color="#1B2528" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[15px] h-[40px] sm:h-max sm:text-[14px]  rounded-[8px] active:scale-98  cursor-pointer font-medium text-gray-600">
              <BellIcon color="#1B2528" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-[15px] h-[40px] sm:h-max sm:text-[14px]  rounded-[8px] cursor-pointer active:scale-98 font-medium text-gray-600"
              variant="destructive"
            >
              <ArrowLeftStartOnRectangleIcon color="#1B2528" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <SearchSheet
        isOpen={openSheet}
        onOpenChange={() => setOpenSheet(false)}
      />
    </div>
  );
}
