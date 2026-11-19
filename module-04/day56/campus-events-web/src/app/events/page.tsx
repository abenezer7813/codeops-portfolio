import Pagination from "@/components/Pagination";
import { getEvents } from "../services/eventService";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";



export default async function EventsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
    const params = await searchParams
    const data = await getEvents(params);
  
    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Events ({data.total} events)
            </h1>
            <EventFilters params={params} />
            {data.items.length===0?'“No events found. Check back later!':
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.items.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>}
            {data.totalPages > 1 && <Pagination page={data.page} totalPages={data.totalPages} params={params} />}
        </div>
    );
}