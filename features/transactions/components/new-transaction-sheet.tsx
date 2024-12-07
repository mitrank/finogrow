import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransaction } from "../hooks/use-new-transaction";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { TransactionForm } from "./transaction-form";
import { Loader2 } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransaction();
  const mutation = useCreateTransaction();

  const accountsQuery = useGetAccounts();
  const accountsMutation = useCreateAccount();
  const onCreateAccount = (name: string) =>
    accountsMutation.mutate({
      name,
    });
  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const categoriesQuery = useGetCategories();
  const categoriesMutation = useCreateCategory();
  const onCreateCategory = (name: string) =>
    categoriesMutation.mutate({
      name,
    });
  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const isPending =
    mutation.isPending ||
    categoriesMutation.isPending ||
    accountsMutation.isPending;
  const isLoading = categoriesQuery.isLoading || accountsQuery.isLoading;

  const handleOnSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>
            Add a new transaction to track your expenses.
          </SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={handleOnSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
