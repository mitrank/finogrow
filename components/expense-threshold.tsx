"use client";

import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit } from "lucide-react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useGetBudget } from "@/features/budget/api/use-get-budget";
import { useCreateBudget } from "@/features/budget/api/use-create-budget";
import { useEditBudget } from "@/features/budget/api/use-edit-budget";

export const ExpenseThreshold = () => {
  const [expenseThreshold, setExpenseThreshold] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You're about to edit your Monthly Expense Threshold which could affect your expense lifestyle."
  );
  const budgetQuery = useGetBudget();
  const budgetData = budgetQuery.data;
  const createBudgetMutation = useCreateBudget();
  const editBudgetMutation = useEditBudget(budgetData?.id);

  const currentMonth = format(new Date(), "LLLL yyyy");

  useEffect(() => {
    if (budgetData) {
      setExpenseThreshold(budgetData.amount.toString());
    }
  }, [budgetData]);

  const handleEditExpenseThreshold = async () => {
    const ok = await confirm();

    if (ok) {
      setIsEditing(true);
    }
  };

  const handleSubmitUpdatedExpense = (amount: string) => {
    setIsEditing(false);
    if (budgetData?.id) {
      editBudgetMutation.mutate({ amount: parseFloat(amount) });
    } else {
      createBudgetMutation.mutate({ amount: parseFloat(amount) });
    }
  };

  const handleCancelUpdatedExpense = () => {
    setIsEditing(false);
    setExpenseThreshold(budgetData?.amount.toString() || "");
  };

  return (
    <>
      <ConfirmationDialog />
      <div className="w-full lg:w-fit pb-2 mb-8">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="flex lg:flex-row justify-between gap-x-4 space-y-4 lg:space-y-0">
            <div>
              <CardTitle className="text-xl line-clamp-1">
                Monthly Expense Threshold
              </CardTitle>
              <CardDescription className="line-clamp-1">
                For {currentMonth}
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="relative flex flex-row gap-x-2 justify-between items-center">
                <CurrencyInput
                  prefix="₹ "
                  className="disabled:bg-slate-200 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Enter your budget..."
                  value={expenseThreshold}
                  onValueChange={(e) => setExpenseThreshold(e ?? "")}
                  disabled={!isEditing}
                />
                <Edit
                  className="absolute top-100 right-0 size-5 mr-2 hover:cursor-pointer"
                  onClick={handleEditExpenseThreshold}
                />
              </div>

              <div
                className={cn(
                  "hidden lg:mr-2 flex-row gap-x-4 lg:gap-x-2 justify-end items-center",
                  isEditing && "flex"
                )}
              >
                <div
                  className="rounded-md p-1 shrink-0 bg-rose-500/20"
                  onClick={handleCancelUpdatedExpense}
                >
                  <FaXmark className="size-6 lg:size-5 fill-rose-500 hover:cursor-pointer" />
                </div>
                <div
                  className="rounded-md p-1 shrink-0 bg-emerald-500/20"
                  onClick={() => handleSubmitUpdatedExpense(expenseThreshold)}
                >
                  <FaCheck className="size-6 lg:size-5 fill-emerald-500 hover:cursor-pointer" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
};
