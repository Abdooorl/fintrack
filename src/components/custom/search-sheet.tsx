import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { AnimatePresence, motion } from "motion/react";
import { Variants } from "framer-motion";

interface SearchSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchSheet({
  isOpen,
  onOpenChange,
}: SearchSheetProps) {
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Expense Report",
    "Budget",
    "Transactions",
    "Receipts",
    "Invoice",
  ]);

  const handleDeleteSearch = (index: number) => {
    setRecentSearches((prev) => prev.filter((_, i) => i !== index));
  };

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: custom * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    }),
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3,
      },
    },
  } as Variants;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full h-screen py-[20px] px-[16px] sm:hidden font-sans"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader hidden>
          <SheetTitle aria-hidden hidden></SheetTitle>
        </SheetHeader>

        <div className="search-bar">
          <div className="flex items-center gap-[16px] relative">
            <div className="absolute p-[8px] ml-[3px] bg-[hsl(0,0%,96%)] rounded-full ">
              <SearchIcon size={18} className=" text-gray-500  " />
            </div>
            <Input
              type="text"
              placeholder="Search "
              className="w-full p-2  h-[40px]  pl-[48px]   placeholder:text-gray-400 rounded-[20px]"
            />
            <SheetClose>
              <div className=" w-[40px] h-[40px] cursor-pointer items-center flex justify-center rounded-full bg-gray-50 border-1 border-gray-50">
                <XIcon size={18} className="text-gray-600" />
              </div>
            </SheetClose>
          </div>

          <div className="mt-[28px]">
            <p className="recent-searches text-[14px] font-medium text-gray-500 ">
              Recent Searches
            </p>
            <AnimatePresence>
              <motion.div
                layout
                className="recents  flex gap-[12px] mt-[14px] flex-wrap "
              >
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={`${search}-${index}`}
                    layout
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    className="search-box pl-[12px] pr-[5px] flex flex-row w-max  items-center py-[4px] gap-[8px] justify-between  rounded-full bg-gray-100"
                  >
                    <p className="search text-[14px]">{search}</p>
                    <div
                      className="icon cursor-pointer items-center w-max active:scale-96 px-[6px] py-[6px] flex justify-center rounded-full bg-white"
                      onClick={() => handleDeleteSearch(index)}
                    >
                      <XIcon
                        size={16}
                        className="text-gray-400 active:scale-96"
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
