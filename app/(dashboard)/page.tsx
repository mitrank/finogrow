import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { ExpenseThreshold } from "@/components/expense-threshold";

export default function Dashboard() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <ExpenseThreshold />
      <DataCharts />
    </div>
  );
}
