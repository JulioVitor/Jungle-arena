import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type Props = {
  data: { date: string; matches: number }[];
};

export function OverviewChart({ data }: Props) {
  return (
    <div className="h-64 md:h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 8, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="jungleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
            formatter={(v) => [
              Number(v ?? 0).toLocaleString("pt-BR"),
              "Partidas",
            ]}
          />
          <Area
            type="monotone"
            dataKey="matches"
            stroke="#22c55e"
            strokeWidth={2}
            fill="url(#jungleGradient)"
            dot={{ r: 4, fill: "#22c55e" }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
