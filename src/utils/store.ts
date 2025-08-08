import { create } from "zustand";

export interface DashboardSummary {
  totalBalance: number | undefined;
  totalCredits: number | undefined;
  totalDebits: number | undefined;
  transactionCount: number | undefined;
  balanceChange: number | undefined;
  creditsChange: number | undefined;
  debitsChange: number | undefined;
  transactionChange: number | undefined;
}

interface dashboardData {
  dashboardSummary: DashboardSummary | null;
  setDashboardSummary: (data: DashboardSummary | null) => void;
  isFetchingDashboard: boolean;
  setFetchingDashboard: (fetching: boolean) => void;
}

export const useDashboardStore = create<dashboardData>()((set) => ({
  dashboardSummary: null,
  setDashboardSummary: (data) => set({ dashboardSummary: data }),
  isFetchingDashboard: true,
  setFetchingDashboard: (fetching) => set({ isFetchingDashboard: fetching }),
}));

export interface TransactionInterface {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: "Credit" | "Debit";
}

export interface TransactionStore {
  transactions: TransactionInterface[];
  setTransactions: (transactions: TransactionInterface[]) => void;
  isFetchingTransactions: boolean;
  setFetchingTransactions: (fetching: boolean) => void;
}

export const useTransactionStore = create<TransactionStore>()((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  isFetchingTransactions: true,
  setFetchingTransactions: (fetching) =>
    set({ isFetchingTransactions: fetching }),
}));
