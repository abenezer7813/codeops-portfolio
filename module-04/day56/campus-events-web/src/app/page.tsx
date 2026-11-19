import Link from "next/link";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "./services/eventService";
export default async function HomePage() {
  const events = await getUpcomingEvents();

  // Only published events, soonest first, at most 3.
  // filter() returns a new array, so sort() does not change the original data.
  const upcoming = events
    .filter((event) => event.isPublished)
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime(),
    )
    .slice(0, 3);

  return (
    <div>
      <section className="bg-blue-50 px-6 py-16 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Discover What&apos;s Happening on Campus
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Find workshops, technology events and activities across the college.
        </p>
        <Link
          href="/events"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Explore Events
        </Link>
      </section>

      <section className="mx-auto max-w-6xl p-6 py-12">
        <h2 className="mb-6 text-2xl font-bold">Upcoming Events</h2>

        {upcoming.length === 0 ? (
          <p className="py-8 text-center text-gray-500">
            No events found. Check back later!
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/events" className="font-medium text-blue-600 hover:underline">
            View All Events →
          </Link>
        </div>
      </section>
    </div>
  );
}