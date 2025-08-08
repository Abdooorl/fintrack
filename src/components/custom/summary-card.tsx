"use client";
import MetricCard from "./metric-card";
import { useDashboardStore } from "@/utils/store";

export default function SummaryCard() {
  const { dashboardSummary, isFetchingDashboard } = useDashboardStore();

  if (isFetchingDashboard) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-40 bg-gray-200 dark:bg-gray-700 p-[20px] flex flex-col gap-[32px] rounded-[20px] animate-pulse"
          >
            <div className="top flex flex-row items-center justify-between">
              <p className="h-[16px] w-[90px] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></p>
              <div className="w-[28px] h-[28px] bg-gray-300 rounded-full flex items-center justify-center"></div>
            </div>
            <div className="balance flex flex-col gap-[8px]">
              <p className="h-[30px] w-[90px] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></p>
              <div className="h-[12px] w-[20px] bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="app">
      {dashboardSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Balance"
            value={dashboardSummary?.totalBalance || 0}
            change={dashboardSummary?.balanceChange || 0}
            isCurrency
            icon={
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            }
          />

          <MetricCard
            title="Total Credits"
            value={dashboardSummary?.totalCredits || 0}
            change={dashboardSummary?.creditsChange || 0}
            isCurrency
            icon={
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                ></path>
              </svg>
            }
          />

          <MetricCard
            title="Total Debits"
            value={dashboardSummary?.totalDebits || 0}
            change={dashboardSummary?.debitsChange || 0}
            isCurrency
            icon={
              <svg
                className="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                ></path>
              </svg>
            }
          />

          <MetricCard
            title="Transactions"
            value={dashboardSummary?.transactionCount || 0}
            change={dashboardSummary?.transactionChange || 0}
            icon={
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                ></path>
              </svg>
            }
            isCurrency={false}
          />
        </div>
      )}

      {/* Empty State */}
      {dashboardSummary === undefined && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No summary data available</p>
        </div>
      )}
    </div>
  );
}
