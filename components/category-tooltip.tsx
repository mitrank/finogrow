import { Separator } from "./ui/separator";
import { formatCurrency } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CategoryTooltip = ({ active, payload }: any) => {
  if (!active) {
    return null;
  }

  const name = payload[0].payload.name;
  const value = payload[0].value;
  const fill = payload[0].payload.fill;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <span
              className="size-1.5 rounded-full"
              style={{ backgroundColor: fill }}
            />
            <p className="text-sm text-muted-foreground">Expense</p>
            <p className="text-sm text-right font-medium">
              {formatCurrency(value * -1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
