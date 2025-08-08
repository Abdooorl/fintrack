"use client";
import EmptyState from "@/components/custom/empty-state";
export default function Transaction() {
  return (
    <div className="w-full  h-full ">
      <p className="text-[24px] font-bold">Transactions</p>
      <EmptyState />
    </div>
  );
}
