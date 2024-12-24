import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  limit: number | undefined;
};

export const ExpenseProgress = ({ limit }: Props) => {
  const { data } = useGetSummary();
  const [monthlyExpensePercent, setMonthlyExpensePercent] = useState<number>(0);
  const [expenseMessage, setExpenseMessage] = useState<string | undefined>();
  const [isExceeded, setIsExceeded] = useState<boolean>(false);

  useEffect(() => {
    if (data?.expenseAmount && limit) {
      const expenseAmount = Math.abs(data.expenseAmount);
      const expenseAmountPercent = (expenseAmount / limit) * 100;

      if (expenseAmountPercent > 100) {
        setMonthlyExpensePercent(100);
        setIsExceeded(true);
        setExpenseMessage("You have exceeded your budget!");
      } else {
        setMonthlyExpensePercent(expenseAmountPercent);
        setIsExceeded(false);
        setExpenseMessage(
          `You are within your budget and still left with ₹${
            limit - Math.abs(data.expenseAmount || 0)
          }!`
        );
      }
    }
  }, [data?.expenseAmount, limit]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="w-full h-9 border border-slate-300 rounded-md p-1">
        <div className="relative h-full bg-gradient-to-r from-blue-500 from-40% to-rose-500 rounded-md transition-all duration-700">
          <div
            className="h-full bg-transparent transition-all duration-700"
            style={{ width: `${monthlyExpensePercent}%` }}
          />
          <div
            className="absolute top-0 right-0 h-full bg-white transition-all duration-700"
            style={{ width: `${100 - monthlyExpensePercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center">
        <span className="text-sm text-muted-foreground">₹0</span>
        <span className="text-sm text-muted-foreground">₹{limit || 0}</span>
      </div>

      <p
        className={cn(
          "text-sm lg:text-base text-muted-foreground mt-2",
          isExceeded && "text-rose-500"
        )}
      >
        {expenseMessage}
      </p>
    </div>
  );
};
