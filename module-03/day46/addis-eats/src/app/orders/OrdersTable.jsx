
import Link from "next/link";

const columns = [
  { key: "id", label: "Order ID" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Date" },
  { key: "total", label: "Total (ETB)" },
];

export default function OrdersTable({
  orders,
  sort,
  direction,
  page,
  totalPages,
}) {
  function sortHref(column) {
    const nextDirection =
      sort === column && direction === "asc" ? "desc" : "asc";

    const params = new URLSearchParams({
      sort: column,
      direction: nextDirection,
      page: "1",
    });

    return `/orders?${params.toString()}`;
  }

  function pageHref(nextPage) {
    const params = new URLSearchParams({
      sort,
      direction,
      page: String(nextPage),
    });

    return `/orders?${params.toString()}`;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <caption className="mb-3 text-left font-semibold">
          Customer orders
        </caption>

        <thead>
          <tr className="border-b text-left">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                aria-sort={
                  sort === column.key
                    ? direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className={`p-3 ${column.key === "total" ? "text-right" : ""}`}
              >
                <Link href={sortHref(column.key)}>
                  {column.label}
                  {sort === column.key
                    ? direction === "asc"
                      ? " ↑"
                      : " ↓"
                    : ""}
                </Link>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-3 text-right">
                  {new Intl.NumberFormat("en-ET", {
                    maximumFractionDigits: 2,
                  }).format(Number(order.total))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <nav
        aria-label="Orders pagination"
        className="mt-4 flex items-center justify-between gap-4"
      >
        {page > 1 ? (
          <Link
            href={pageHref(page - 1)}
            className="underline"
          >
            Previous
          </Link>
        ) : (
          <span className="text-gray-400">Previous</span>
        )}

        <span aria-current="page">
          Page {page} of {totalPages}
        </span>

        {page < totalPages ? (
          <Link
            href={pageHref(page + 1)}
            className="underline"
          >
            Next
          </Link>
        ) : (
          <span className="text-gray-400">Next</span>
        )}
      </nav>
    </div>
  );
}
