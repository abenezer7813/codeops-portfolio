"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersPerDayChart({ data }) {
  return (
    <div className="h-300 w-300">
      <h2>Orders per Day — Last 7 Days</h2>
      <p>Unit: number of orders</p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis
              allowDecimals={false}
              tickFormatter={(value) => Math.round(value)}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#7a1f1f"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}