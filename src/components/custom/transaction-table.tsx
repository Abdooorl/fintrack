"use client";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLayout } from "@/hooks/useLayout";
import { useTransactionStore } from "@/utils/store";
import MobileTransactionCard from "./mobile-transaction";
import { ArrowDown2 } from "iconsax-reactjs";
import { formatCurrency } from "@/lib/utils";
import { ArrowDown, ArrowUp, SearchIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import NotFound from "../../../public/NoFound.png";

type SortDirection = "asc" | "desc" | null;
type SortField = "date" | "remark" | "amount" | "currency" | "type" | null;

export default function TransactionTable() {
  const { isMobile } = useLayout();
  const { transactions, isFetchingTransactions } = useTransactionStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
      );

      if (sortDirection === "desc") {
        setSortField(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let result = transactions.filter((transaction) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        transaction.date.toLowerCase().includes(searchLower) ||
        transaction.remark.toLowerCase().includes(searchLower) ||
        transaction.currency.toLowerCase().includes(searchLower) ||
        transaction.type.toLowerCase().includes(searchLower) ||
        transaction.amount.toString().includes(searchLower)
      );
    });

    if (sortField && sortDirection) {
      result = [...result].sort((a, b) => {
        let compareA, compareB;

        switch (sortField) {
          case "date":
            compareA = new Date(a.date).getTime();
            compareB = new Date(b.date).getTime();
            break;
          case "amount":
            compareA = a.amount;
            compareB = b.amount;
            break;
          default:
            compareA = a[sortField]?.toLowerCase() || "";
            compareB = b[sortField]?.toLowerCase() || "";
        }

        if (sortDirection === "asc") {
          return compareA > compareB ? 1 : -1;
        } else {
          return compareA < compareB ? 1 : -1;
        }
      });
    }

    return result;
  }, [transactions, searchQuery, sortField, sortDirection]);

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ArrowDown2 size={16} color="#6D797C" variant="Bold" />;

    return sortDirection === "asc" ? (
      <ArrowDown size={16} color="#087A2E" />
    ) : (
      <ArrowUp size={16} color="#087A2E" />
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-3 px-1 h-max min-h-[70vh]">
        <div className="flex flex-col gap-4 mb-[24px]">
          <h3 className="text-[18px] font-bold">Transactions</h3>

          <div className="search-bar relative">
            <div className="flex items-center gap-[16px] relative">
              <div className="absolute p-[8px] ml-[3px] bg-[hsl(0,0%,96%)] rounded-full ">
                <SearchIcon size={18} className=" text-gray-500  " />
              </div>
              <Input
                type="text"
                placeholder="Search "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2  h-[40px]  pl-[48px]   placeholder:text-gray-400 rounded-[20px]"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleSort("date")}
              className={`text-[14px] px-[16px] py-1 rounded-full h-[36px] border flex items-center gap-1 ${
                sortField === "date"
                  ? "bg-[#E2EDF1] border-[#b3d1db]"
                  : "bg-gray-50"
              }`}
            >
              Date <SortIndicator field="date" />
            </button>
            <button
              onClick={() => toggleSort("amount")}
              className={`text-[14px] px-[16px] py-1 rounded-full h-[36px] border flex items-center gap-1 ${
                sortField === "amount"
                  ? "bg-[#E2EDF1] border-[#b3d1db]"
                  : "bg-gray-50"
              }`}
            >
              Amount <SortIndicator field="amount" />
            </button>
          </div>
        </div>

        {filteredAndSortedTransactions.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <Image
              src={NotFound}
              alt="No Search Found"
              className="w-[150px] "
            />
            <div className="flex flex-col items-center gap-[2px] text-center">
              <p className="text-gray-700 text-[15px]">No Transaction Found</p>
              <p className="text-gray-500 text-[14px]">Adjust your filter</p>
            </div>
          </div>
        ) : (
          <div className="flex-col flex gap-[18px] mt-[32px]">
            {" "}
            {filteredAndSortedTransactions.map((item) => (
              <MobileTransactionCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isFetchingTransactions) {
    return (
      <div className="flex flex-col gap-[32px]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="h-[20px] bg-gray-200 p-[20px] flex flex-col gap-[32px] rounded-[20px] animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (isFetchingTransactions && isMobile) {
    return (
      <div className="flex flex-col gap-[32px]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="h-[20px] bg-gray-200 p-[20px] flex flex-col gap-[32px] rounded-[20px] animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="table w-full">
      <div className="table w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] sm:text-[20px] text-[#1B2528] font-semibold">
            Transactions
          </h2>
        </div>
        <div className="filter-section w-full mb-[4px]">
          <div className="search-bar max-w-[600px]">
            <div className="flex items-center gap-[16px] relative">
              <div className="absolute w-[28px] h-[28px] flex items-center justify-center ml-[3px] bg-[hsl(0,0%,96%)] rounded-full">
                <SearchIcon size={14} className="text-gray-500" />
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions"
                className="w-full max-w-[340px] p-2 h-[36px] pl-[32px] bg-white placeholder:text-gray-400 rounded-[20px] sm:text-[14px] sm:placeholder:text-[14px]"
              />
            </div>
          </div>
        </div>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => toggleSort("date")}
              className="w-[45%] cursor-pointer text-[#6D797C]"
            >
              <p className="flex flex-row items-center gap-[4px]">
                Date <SortIndicator field="date" />
              </p>
            </TableHead>
            <TableHead
              onClick={() => toggleSort("remark")}
              className="text-[#6D797C] cursor-pointer"
            >
              <p className="flex flex-row items-center gap-[4px]">
                Remarks <SortIndicator field="remark" />
              </p>
            </TableHead>
            <TableHead
              onClick={() => toggleSort("amount")}
              className="text-[#6D797C] cursor-pointer"
            >
              <p className="flex flex-row items-center gap-[4px]">
                Amount <SortIndicator field="amount" />
              </p>
            </TableHead>
            <TableHead
              onClick={() => toggleSort("currency")}
              className="text-[#6D797C] cursor-pointer"
            >
              <p className="flex flex-row items-center gap-[4px]">
                Currency <SortIndicator field="currency" />
              </p>
            </TableHead>
            <TableHead
              onClick={() => toggleSort("type")}
              className="text-[#6D797C] cursor-pointer"
            >
              <p className="flex flex-row items-center gap-[4px]">
                Type <SortIndicator field="type" />
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedTransactions.length === 0 &&
          !isFetchingTransactions ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center bg-white hover:bg-white"
              >
                <div className="flex flex-col items-center gap-4">
                  <Image
                    src={NotFound}
                    alt="No Search Found"
                    className="w-[150px] "
                  />
                  <div className="flex flex-col items-center gap-[2px] text-center">
                    <p className="text-gray-700 text-[15px]">
                      No Transaction Found
                    </p>
                    <p className="text-gray-500 text-[14px]">
                      Adjust your filter
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredAndSortedTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-[#1B2528]">
                  {transaction.remark}
                </TableCell>
                <TableCell className="text-[#1B2528]">
                  {formatCurrency(transaction.amount, transaction.currency)}
                </TableCell>
                <TableCell className="text-[#1B2528]">
                  {transaction.currency}
                </TableCell>
                <TableCell className="text-[#1B2528]">
                  <div className="type px-[10px] h-[24px] border-[0.5px] border-[#EBEBEB] rounded-full flex items-center gap-[4px] w-max bg-[#F5F5F5]">
                    <div
                      className={`${
                        transaction.type === "Credit"
                          ? "bg-[#087A2E]"
                          : "bg-[#C6381B]"
                      } rounded-full w-[9px] h-[9px] inline-block`}
                    ></div>
                    <p className="usd text-[#1B2528] leading-0">
                      {transaction.type}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
