"use client";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { DataCard, DataCardLoading } from "./data-card";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export const DataGrid = () => {
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const { data, isLoading } = useGetSummary();

  const dateRangeLabel = formatDateRange({ to, from });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        dateRange={dateRangeLabel}
        icon={FaPiggyBank}
        variant="warning"
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        dateRange={dateRangeLabel}
        icon={FaArrowTrendUp}
        variant="success"
      />
      <DataCard
        title="Expense"
        value={data?.expenseAmount}
        percentageChange={data?.expenseChange}
        dateRange={dateRangeLabel}
        icon={FaArrowTrendDown}
        variant="danger"
      />
    </div>
  );
};
