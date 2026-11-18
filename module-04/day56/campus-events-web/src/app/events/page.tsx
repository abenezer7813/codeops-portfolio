import Pagination from "@/components/Pagination";
import { getEvents } from "../services/eventServices";



export default async function EventsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
    const params = await searchParams
    const data = await getEvents(params);
  console.log(data.total);
    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Events ({data.total} events)
            </h1>
            <form
                action="/events"
                method="get"
                className="bg-white border rounded-xl shadow-sm p-6 mb-8"
            >
                <h2 className="text-lg font-semibold mb-4">Filter Events</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="category"
                        placeholder="Filter by category"
                        defaultValue={params.category}
                        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Filter by location"
                        defaultValue={params.location}
                        className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="isPublished"
                        defaultValue={params.isPublished ?? ""}
                        className="border rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Events</option>
                        <option value="true">Published</option>
                        <option value="false">Draft</option>
                    </select>

                    <select
                        name="sortBy"
                        defaultValue={params.sortBy ?? ""}
                        className="border rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">No Sorting</option>
                        <option value="eventDate">Date</option>
                        <option value="title">Title</option>
                    </select>

                    <select
                        name="order"
                        defaultValue={params.order ?? "asc"}
                        className="border rounded-lg px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.items.map((event) => (
                    <div
                        key={event.id}
                        className="border rounded-lg p-5 shadow-sm space-y-3"
                    >
                        <h2 className="text-xl font-semibold">{event.title}</h2>

                        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {event.category}
                        </span>

                        <p className="text-gray-600">{event.location}</p>

                        <p className="text-gray-500">
                            {new Date(event.eventDate).toLocaleDateString("en-GB", {
                                dateStyle: "medium",
                            })}
                        </p>

                        <span
                            className={`text-sm font-medium ${event.isPublished ? "text-green-600" : "text-yellow-600"
                                }`}
                        >
                            {event.isPublished ? "Published" : "Draft"}
                        </span>
                    </div>
                ))}
            </div>
            <Pagination page={1} totalPages={18} params={params}/>
        </div>
    );
}