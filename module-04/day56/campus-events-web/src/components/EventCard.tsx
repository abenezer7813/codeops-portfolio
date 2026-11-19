import type { CampusEvent } from "@/types/event"
import Link from "next/link"

export default function EventCard({ event }: { event: CampusEvent }) {
    return (
        <div>

            <div
                key={event.id}
                className="border rounded-lg p-5 shadow-sm space-y-3"
            >
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600 line-clamp-2">{event.description}</p>

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
                <Link href={`/events/${event.id}`} className="inline-block bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors">
                    view details
                </Link>
            </div>
        </div>
    )
}
