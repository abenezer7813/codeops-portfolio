
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
    <div className=" w-200">
      <h2>Orders per Day — Last 7 Days</h2>
      <p>Unit: number of orders</p>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            accessibilityLayer
          >
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

      <table>
        <caption>
          Orders per day for the last 7 days
        </caption>

        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Number of orders</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
