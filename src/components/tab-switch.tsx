"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SummarySection from "./summary";
import TransactionTable from "./custom/transaction-table";

export default function TabSwitch() {
  const [activeTab, setActiveTab] = useState<string>("Overview");

  return (
    <div className="tab-switch mt-[32px] relative">
      <div className="tabs relative z-0 flex flex-row border-b-[1.5px]   border-gray-200">
        <motion.div
          className="Overview-tab px-[16px] py-[12px] cursor-pointer relative"
          onClick={() => setActiveTab("Overview")}
        >
          <p
            className={`text-[15px] sm:text-[16px] font-medium ${
              activeTab === "Overview"
                ? "text-[#4B8B9F] font-semibold"
                : "text-[#8b999c]"
            }`}
          >
            Overview
          </p>
          {activeTab === "Overview" && (
            <motion.div
              className="absolute  bottom-0 left-0 right-0 h-[2px] bg-[#4B8B9F]"
              layoutId="underline"
            />
          )}
        </motion.div>

        <motion.div
          className="Transaction-tab px-[16px] py-[12px] cursor-pointer relative"
          onClick={() => setActiveTab("Transactions")}
        >
          <p
            className={`text-[15px] sm:text-[16px] font-medium ${
              activeTab === "Transactions"
                ? "text-[#4B8B9F] font-semibold"
                : "text-[#8b999c]"
            }`}
          >
            Transactions
          </p>
          {activeTab === "Transactions" && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4B8B9F]"
              layoutId="underline"
            />
          )}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="content"
        >
          {activeTab === "Overview" ? (
            <div className="tab-content mt-[24px] mb-[40px] sm:mb-[20px] flex-col flex gap-[28px] sm:mt-[28px]">
              <SummarySection />
              <TransactionTable />
            </div>
          ) : (
            <div className="tab-content mt-[24px] mb-[40px] sm:mb-[20px] sm:mt-[28px]">
              <TransactionTable />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
