"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  endOfMonth,
  format,
  parse,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { formatDateRange } from "@/lib/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import qs from "query-string";
import { ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";

export const DateFilter = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = startOfMonth(defaultTo);

  const paramState = {
    from: from ? parse(from, "dd-MM-yyyy", new Date()) : defaultFrom,
    to: to ? parse(to, "dd-MM-yyyy", new Date()) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, "dd-MM-yyyy"),
      to: format(dateRange?.to || defaultTo, "dd-MM-yyyy"),
      accountId,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  };

  const handleSelectCustomDateRange = (value: string) => {
    let toDate = new Date();
    let fromDate = subDays(toDate, parseInt(value));

    if (value === "this-month") {
      fromDate = startOfMonth(toDate);
    } else if (value === "last-month") {
      fromDate = startOfMonth(subMonths(toDate, 1));
      toDate = endOfMonth(subMonths(new Date(), 1));
    }
    return setDate({
      from: fromDate,
      to: toDate,
    });
  };

  const handleOnReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition justify-between"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <div className="p-4 pb-2">
          <Select
            onValueChange={(value) => {
              handleSelectCustomDateRange(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="0">Today</SelectItem>
              <SelectItem value="3">Last 3 days</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="this-month">This month</SelectItem>
              <SelectItem value="last-month">Last month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          disabled={false}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              onClick={handleOnReset}
              disabled={!date?.from || !date?.to}
              className="w-full"
              variant="outline"
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
              className="w-full"
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
