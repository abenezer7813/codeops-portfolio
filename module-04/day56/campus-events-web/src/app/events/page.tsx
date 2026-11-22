import Pagination from "@/components/Pagination";
import { getEvents } from "../services/eventService";
import EventCard from "@/components/EventCard";
import EventFilters from "@/components/EventFilters";
import EventList from "@/components/EventsList";



export default async function EventsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
    const params = await searchParams
    await new Promise((r) => setTimeout(r, 3000));
    const data = await getEvents(params);
  
    return (
        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Events ({data.total} events)
            </h1>
            <EventFilters params={params} />
             <EventList events={data.items} />
            {data.totalPages > 1 && <Pagination page={data.page} totalPages={data.totalPages} params={params} />}
        </div>
    );
}