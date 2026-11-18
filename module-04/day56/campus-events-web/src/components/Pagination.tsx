import Link from "next/link";

type Props = {
    page: number;
    totalPages: number;
    params: Record<string, string | undefined>;
};

function pageHref(params: Props["params"], page: number) {
    const query = new URLSearchParams();
    // 1. copy every non-empty value from params into query
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value) query.set(key, value)
        }
    }
    // 2. set "page" to String(page)
    query.set('page', String(page))
    return `/events?${query}`;
}

export default function Pagination({ page, totalPages, params }: Props) {
    if (totalPages <= 1) return null; // nothing to paginate

    return (
        <nav className="flex items-center justify-between mt-8">
            {page > 1 ?
                <Link href={pageHref(params, page - 1)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</Link> :
                <span className="px-4 py-2 border rounded-lg text-gray-400 cursor-not-allowed">
                    Previous
                </span>
            }

            <span>Page {page} of {totalPages}</span>
            {
                page <totalPages ?
                <Link href={pageHref(params, page + 1)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</Link> :
                <span className="px-4 py-2 border rounded-lg text-gray-400 cursor-not-allowed">
                    Next
                </span>
            }
        </nav>
    );
}