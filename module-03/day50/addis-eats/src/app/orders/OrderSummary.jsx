"use client";

export default function OrdersSummary({ summary }) {
  const items = [
    { label: "Total Orders", value: summary.totalOrders },
    { label: "Pending Orders", value: summary.pendingOrders },
    { label: "Completed Orders", value: summary.completedOrders },
  ];

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold text-(--primary-dark)">
        Orders Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-(--border) bg-(--white) p-5"
          >
            <p className="text-sm text-(--text)">
              {item.label}
            </p>

            <p className="mt-2 text-3xl font-bold text-(--primary-dark)">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}