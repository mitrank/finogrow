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
import { useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit } from "lucide-react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const boxVariant = cva("rounded-md p-1 shrink-0", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const iconVariant = cva("size-6 lg:size-5", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const ExpenseThreshold = () => {
  const [expenseThreshold, setExpenseThreshold] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You're about to edit your Monthly Expense Threshold which could affect your expense lifestyle."
  );

  const currentMonth = format(new Date(), "LLLL yyyy");

  const handleEditExpenseThreshold = async () => {
    const ok = await confirm();

    if (ok) {
      setIsEditing(true);
    }
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  placeholder="Enter your budget..."
                  value={expenseThreshold} // show from the DB
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
                  className={cn(boxVariant({ variant: "danger" }))}
                  onClick={() => {}} // keep the data as it was from DB
                >
                  <FaXmark
                    className={cn(
                      iconVariant({ variant: "danger" }),
                      "hover:cursor-pointer"
                    )}
                  />
                </div>
                <div
                  className={cn(boxVariant({ variant: "success" }))}
                  onClick={() => {}} // update the value and save it in the DB
                >
                  <FaCheck
                    className={cn(
                      iconVariant({ variant: "success" }),
                      "hover:cursor-pointer"
                    )}
                  />
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
