import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) {
    return null;
  }

  const date = payload[0].payload.date;
  const income = payload[0].value;
  const expense = payload[1].value;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(date, "dd MMM, yyyy")}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <span className="size-1.5 bg-blue-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-sm text-right font-medium">
              {formatCurrency(income)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <span className="size-1.5 bg-rose-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Expense</p>
            <p className="text-sm text-right font-medium">
              {formatCurrency(expense * -1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
