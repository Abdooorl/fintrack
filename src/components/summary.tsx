"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SummaryCard from "./custom/summary-card";

export default function SummarySection() {
  return (
    <div className="summary-section flex flex-col gap-[18px]">
      <h2 className="text-[18px] sm:text-[20px] text-[#1B2528] font-bold">
        Summary
      </h2>
      <div className="metricCardSection">
        <SummaryCard />
      </div>
    </div>
  );
}
