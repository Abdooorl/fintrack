"use-client";

import { TransactionInterface } from "@/utils/store";
import { MoneyRecive, MoneySend } from "iconsax-reactjs";
import { formatCurrency } from "@/lib/utils";
import { Currency } from "lucide-react";
import { text } from "stream/consumers";

// Transaction Card Component for Mobile
export default function MobileTransactionCard(props: {
  data: TransactionInterface;
}) {
  return (
    <div className="mobile-view-card border-[0.5px] border-[#EBEBEB] px-[16px] py-[14px] rounded-[20px] bg-white">
      <div className="tb  flex flex-col gap-[14px]">
        <div className="currency-type flex  flex-row gap-[12px]">
          <div className="type px-[10px] h-[24px]  border-[0.5px] border-[#EBEBEB] rounded-full flex items-center justify-center w-max bg-[#F5F5F5]">
            <p className="usd text-[12px] font-medium text-[#909090] leading-0">
              {props.data.currency}
            </p>
          </div>
          <div className="type px-[10px] h-[24px] border-[0.5px]  border-[#EBEBEB] rounded-full flex items-center gap-[4px] w-max bg-[#F5F5F5]">
            <div
              className={` ${
                props.data.type === "Credit" ? "bg-[#087A2E]" : "bg-[#C6381B]"
              } rounded-full w-[9px] h-[9px] inline-block`}
            ></div>
            <p className="usd text-[12px] font-medium text-[#909090] leading-0">
              {props.data.type.toLocaleUpperCase()}
            </p>
          </div>
        </div>
        <div className="amount-remarks flex-row flex  w-full items-center justify-between">
          <div className="remarks flex flex-row items-center gap-[16px]">
            <div
              className={` ${
                props.data.type === "Credit"
                  ? "bg-[#E4FFED] border-[#CCEBD6]"
                  : "bg-[#FFEBE7] border-[#ECDADA]"
              } credit-icon w-[40px] border-[0.5px] h-[40px] flex items-center rounded-full justify-center `}
            >
              {props.data.type === "Credit" ? (
                <MoneyRecive size={24} color={"#087A2E"} variant="Bold" />
              ) : (
                <MoneySend size={24} color={"#C6381B"} variant="Bold" />
              )}
            </div>
            <div className="remarks flex flex-col items-start gap-[6px]">
              <p className="text text-[15px] leading-[100%]">
                {props.data.remark}
              </p>
              <p className="text text-[12px] text-[#909090] leading-[100%]">
                {props.data.date}
              </p>
            </div>
          </div>
          <div className="amount">
            <p
              className={` ${
                props.data.type === "Credit"
                  ? "text-[#087A2E]"
                  : "text-[#C6381B]"
              } text text-[16px] font-semibold  leading-[100%]`}
            >
              <span>{props.data.type === "Credit" ? "+" : "-"}</span>
              {formatCurrency(Math.abs(props.data.amount), props.data.currency)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
