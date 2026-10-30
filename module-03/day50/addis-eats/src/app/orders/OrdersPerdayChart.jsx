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
    <div className="w-full min-w-0 rounded-xl border border-(--border) bg-(--white) p-5">
      <h2 className="mb-1 text-lg font-semibold">
        Orders per Day — Last 7 Days
      </h2>

      <p className="mb-4 text-sm text-(--text)">
        Unit: number of orders
      </p>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
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

      <table className="mt-6 w-full text-sm">
        <caption className="mb-3 text-left font-semibold">
          Orders per day for the last 7 days
        </caption>

        <thead>
          <tr className="border-b border-(--border) text-left">
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2 text-right">
              Number of orders
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.date} className="border-b border-(--border)">
              <td className="px-3 py-2">{item.date}</td>
              <td className="px-3 py-2 text-right">
                {item.orders}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}