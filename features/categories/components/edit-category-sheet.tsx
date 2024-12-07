import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useGetCategoryById } from "../api/use-get-category-by-id";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/features/hooks/use-confirm";
import { useOpenCategory } from "../hooks/use-open-category";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You're about to delete this category."
  );

  const categoryQuery = useGetCategoryById(id);
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading;
  const isPending = editMutation.isPending || deleteMutation.isPending;

  const handleOnSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleOnDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = {
    name: categoryQuery.data ? categoryQuery.data.name : "",
  };

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>
              Edit category to track your expense division.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              onSubmit={handleOnSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={handleOnDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
