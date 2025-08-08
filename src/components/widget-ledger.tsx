"use client";

import { ArrowDown2 } from "iconsax-reactjs";
import { Check, Ellipsis } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PartnerOne from "../../public/Partner-1.png";
import PartnerTwo from "../../public/Partner-2.png";
import PartneThree from "../../public/Partner-3.png";
import PartneFour from "../../public/Partner-4.png";
import Image, { StaticImageData } from "next/image";
import { Button } from "./ui/button";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  FolderArrowDownIcon,
} from "@heroicons/react/16/solid";

export default function WidgetLedger() {
  const partnerImage: StaticImageData[] = [
    PartnerOne,
    PartnerTwo,
    PartneThree,
    PartneFour,
  ];

  return (
    <div className="widget-layout">
      <div className="share-widget flex flex-col gap-[40px] sm:flex-row justify-between sm:items-start">
        <div className="users-widget-active flex flex-col gap-[24px]">
          <div className="active-widget flex flex-row items-center gap-[8px]">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="widgetLedger cursor-pointer flex flex-row items-center gap-[8px] sm:gap-[12px]">
                  <h2 className="text-[30px] leading-[120%] sm:leading-0  sm:text-[34px] text-[#1B2528] font-bold">
                    Widget Ledger
                  </h2>
                  <ArrowDown2
                    className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                    color="#1B2528"
                    variant="Bold"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[240px] sm:w-[280px] rounded-[16px]"
                align="start"
                side="bottom"
              >
                <DropdownMenuItem className=" text-[15px] h-[40px] sm:h-max sm:text-[14px] cursor-pointer flex justify-between rounded-[8px] font-medium text-gray-600">
                  Widget Ledger
                  <Check />
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-[15px] h-[40px] sm:h-max sm:text-[14px]  rounded-[8px] cursor-not-allowed font-medium text-gray-600"
                  disabled
                >
                  Balance Ledger
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="active px-[10px] bg-[#DDE5E7] py-[4px] flex items-center justify-center w-max rounded-full gap-[4px]">
              <div className="w-[8px] h-[8px]  bg-[#087A2E] rounded-full"></div>
              <p className="text-[13px] font-medium pr-[2px]">Active</p>
            </div>
          </div>
          <div className="users flex flex-row items-center gap-[12px] sm:gap-[16px]">
            <div className="images group flex flex-row -space-x-[8px]">
              {partnerImage.map((image, idx) => (
                <Image
                  src={image}
                  alt="avatars"
                  key={idx}
                  priority
                  className="w-[36px] border-[1.5px] hover:scale-110 transition-transform duration-300 cursor-pointer rounded-full border-white sm:w-[32px] sm:shadow-[0px_1.456px_4.221px_0px_rgba(0,0,0,0.25)] object-cover "
                />
              ))}
            </div>
            <p className="text-[14px] sm:text-[15px]">
              Ava, Liam, Noah{" "}
              <span className="text-[13px] text-gray-400 font-medium">
                +12 others
              </span>
            </p>
          </div>
        </div>
        <div className="share flex-row flex items-center gap-[12px] w-full sm:w-max">
          <Button
            className="bg-[#4B8B9F] h-[40px] sm:h-[32px] flex-1 px-[20px] cursor-pointer hover:bg-[hsl(194,36%,40%)] active:scale-x-98 rounded-full font-medium text-[#020303]"
            size="default"
          >
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="menu h-[40px] cursor-pointer border-1 w-[40px] sm:w-[32px] sm:h-[32px] hover:bg-gray-50 text-[#1B2528] flex items-center justify-center active:scale-x-98 border-[#BBC7C9] rounded-full">
                <Ellipsis size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[240px] sm:w-[180px] rounded-[16px]"
              align="end"
              side="bottom"
            >
              <DropdownMenuItem className=" text-[15px] h-[40px] sm:h-max sm:text-[14px] cursor-pointer  rounded-[8px] font-medium text-gray-600">
                <ArrowUpOnSquareIcon color="#1B2528" />
                Import Report
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[15px] h-[40px] sm:h-max sm:text-[14px]  rounded-[8px] cursor-pointer font-medium text-gray-600">
                <FolderArrowDownIcon color="#1B2528" />
                Get Statement
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[15px] h-[40px] sm:h-max sm:text-[14px]  rounded-[8px] cursor-pointer font-medium text-gray-600">
                <ArrowDownOnSquareIcon color="#1B2528" />
                Download Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
