import { format } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { CustomTooltip } from "./custom-tooltip";

type Props = {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
};

export const AreaVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="income" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="2%" stopColor="#3D82F6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3D82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expense" x1={0} y1={0} x2={0} y2={1}>
            <stop offset="2%" stopColor="#F43F5E" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#F43F5E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: 12 }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="income"
          stackId="income"
          strokeWidth={2}
          stroke="#3D82F6"
          fill="url(#income)"
          className="drop-shadow-sm"
        />
        <Area
          type="monotone"
          dataKey="expense"
          stackId="expense"
          strokeWidth={2}
          stroke="#F43F5E"
          fill="url(#expense)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
