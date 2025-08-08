"use client";
import { useEffect } from "react";
import WidgetLedger from "@/components/widget-ledger";
import TabSwitch from "@/components/tab-switch";
import {
  DashboardSummary,
  TransactionInterface,
  useTransactionStore,
} from "@/utils/store";
import { useDashboardStore } from "@/utils/store";

const dashboardAPIData: DashboardSummary = {
  totalBalance: 12345,
  totalCredits: 7890,
  totalDebits: 4455,
  transactionCount: 150,
  balanceChange: 5,
  creditsChange: 3,
  debitsChange: -2,
  transactionChange: 10,
};


const transactionData: TransactionInterface[] = [
  {
    id: "1",
    date: "2023-10-01",
    remark: "Salary",
    amount: 3000,
    currency: "USD",
    type: "Credit",
  },
  {
    id: "2",
    date: "2023-10-02",
    remark: "Groceries",
    amount: -150,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "3",
    date: "2023-10-03",
    remark: "Gym Membership",
    amount: -50,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "4",
    date: "2023-10-04",
    remark: "Dinner",
    amount: -40,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "5",
    date: "2023-10-05",
    remark: "Movie Tickets",
    amount: -30,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "6",
    date: "2023-10-06",
    remark: "Rent",
    amount: -1200,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "7",
    date: "2023-10-07",
    remark: "Utilities",
    amount: -100,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "8",
    date: "2023-10-08",
    remark: "Car Payment",
    amount: -400,
    currency: "USD",
    type: "Debit",
  },
  {
    id: "9",
    date: "2023-10-09",
    remark: "Insurance",
    amount: -200,
    currency: "USD",
    type: "Debit",
  },
];

export default function Dashboard() {
  const {
    dashboardSummary,
    setDashboardSummary,
    isFetchingDashboard,
    setFetchingDashboard,
  } = useDashboardStore();
  const {
    transactions,
    setTransactions,
    isFetchingTransactions,
    setFetchingTransactions,
  } = useTransactionStore();

  useEffect(() => {
    setFetchingDashboard(true);
    setFetchingTransactions(true);

    const timer = setTimeout(() => {
      setDashboardSummary(dashboardAPIData);
      setTransactions(transactionData);
      setFetchingDashboard(false);
      setFetchingTransactions(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setFetchingDashboard(false);
      setFetchingTransactions(false);
    };
  }, [
    setDashboardSummary,
    setFetchingDashboard,
    setFetchingTransactions,
    setTransactions,
  ]);

  return (
    <div className="">
      <WidgetLedger />
      <TabSwitch />
    </div>
  );
}
