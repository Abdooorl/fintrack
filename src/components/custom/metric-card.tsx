"use client";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { Ellipsis, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentTextIcon, EyeIcon } from "@heroicons/react/16/solid";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  isCurrency?: boolean;
}

export default function MetricCard({
  title,
  value,
  change,
  icon,
  isCurrency,
}: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      className="metric-card w-full  flex-col flex gap-[20px] p-[16px]  bg-[#EAEFF0] rounded-[20px]"
      whileHover={{ scale: 1.01 }}
    >
      <div className="top flex flex-row items-center justify-between">
        <p className="title text-[15px] sm:text-[17px] text-[#1B2528] font-medium">
          {title}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="w-[30px] h-[30px] cursor-pointer hover:bg-gray-200 rounded-full flex items-center justify-center">
              <Ellipsis size={20} color="#1B2528" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[220px]  sm:w-[180px] rounded-[16px]"
            align="center"
            sideOffset={-2}
            side="left"
          >
            <DropdownMenuItem className="text-[15px] h-[40px] sm:h-max sm:text-[14px] flex items-center cursor-pointer active:scale-x-98  rounded-[8px] font-medium text-gray-600">
              <DocumentTextIcon />
              See Reports
            </DropdownMenuItem>
            <DropdownMenuItem className="text-[15px]  h-[40px] sm:h-max sm:text-[14px] flex items-center active:scale-x-98 rounded-[8px] cursor-pointer font-medium text-gray-600">
              <EyeIcon />
              More Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="balance flex flex-col gap-[8px]">
        <p className="currency text-[28px] sm:text-[34px] font-semibold text-[#1B2528]">
          {isCurrency ? formatCurrency(value) : value}
        </p>
        <div
          className={`flex items-center font-medium text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <Plus className="w-[14px] h-[14px] mr-[1px]" />
          ) : (
            <div className="w-[7px] h-[1.6px] bg-red-500 mr-[3px]"></div>
          )}
          <span>{Math.abs(change).toFixed(2)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
