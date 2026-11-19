import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById } from "@/app/services/eventService";
import { formatDate, formatTime } from "@/utils/format";
import { getEventSessions } from "@/app/services/eventService";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await getEventById(id);
  if (!event) notFound();

  const sessions = (await getEventSessions(id)).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Link href="/events" className="text-blue-600 hover:underline">
        ← Back to events
      </Link>

      <div className="mt-4 space-y-4 rounded-lg border p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {event.category}
          </span>
          <span
            className={`text-sm font-medium ${
              event.isPublished ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {event.isPublished ? "Published" : "Draft"}
          </span>
        </div>

        <h1 className="text-3xl font-bold">{event.title}</h1>
        <p className="text-gray-700">{event.description}</p>

        <dl className="grid gap-2 text-gray-600 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-400">Location</dt>
            <dd>{event.location}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-400">Date</dt>
            <dd>{formatDate(event.eventDate, "long")}</dd>
          </div>
        </dl>
      </div>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Sessions ({sessions.length})</h2>

        {sessions.length === 0 ? (
          <p className="text-gray-500">No sessions have been added for this event yet.</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((session) => (
              <li key={session.id}>
                <Link
                  href={`/events/${event.id}/sessions/${session.id}`}
                  className="block rounded-lg border p-4 transition-colors hover:bg-gray-50"
                >
                  <p className="font-semibold">{session.title}</p>
                  <p className="text-sm text-gray-600">
                    {formatTime(session.startsAt)} – {formatTime(session.endsAt)} · Room: {session.room}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}