"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueChart({ data }) {
  const formatETB = (value) =>
    `${new Intl.NumberFormat("en-ET").format(value)} ETB`;

  return (
    <div className="w-full min-w-0 rounded-xl border border-(--border) bg-(--white) p-5">
      <h2 className="mb-4 text-lg font-semibold">
        Revenue Overview
      </h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-ET", {
                  notation: "compact",
                }).format(value)
              }
            />

            <Tooltip
              formatter={(value) => [formatETB(value), "Revenue"]}
            />

            <Bar dataKey="revenue" fill="#7a1f1f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}