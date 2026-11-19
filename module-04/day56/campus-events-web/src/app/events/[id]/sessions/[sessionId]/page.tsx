import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById, getEventSession } from "@/app/services/eventService";
import { formatDate, formatTime } from "@/utils/format";

export default async function SessionDetailsPage({
  params,
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const { id, sessionId } = await params;

  // Two independent requests, so run them at the same time.
  const [event, session] = await Promise.all([
    getEventById(id),
    getEventSession(id, sessionId),
  ]);

  if (!event || !session) notFound();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link href={`/events/${event.id}`} className="text-blue-600 hover:underline">
        ← Back to {event.title}
      </Link>

      <div className="mt-4 space-y-4 rounded-lg border p-6 shadow-sm">
        <h1 className="text-3xl font-bold">{session.title}</h1>

        <dl className="grid gap-3 text-gray-700 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-400">Date</dt>
            <dd>{formatDate(session.startsAt, "long")}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-400">Room</dt>
            <dd>{session.room}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-400">Starts</dt>
            <dd>{formatTime(session.startsAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-400">Ends</dt>
            <dd>{formatTime(session.endsAt)}</dd>
          </div>
        </dl>
      </div>

      <section className="mt-6 rounded-lg bg-gray-50 p-5">
        <h2 className="mb-2 text-lg font-semibold">Part of this event</h2>
        <p className="font-medium">{event.title}</p>
        <p className="text-sm text-gray-600">
          {event.location} · {formatDate(event.eventDate)}
        </p>
        <Link
          href={`/events/${event.id}`}
          className="mt-3 inline-block text-blue-600 hover:underline"
        >
          View event details →
        </Link>
      </section>
    </div>
  );
}