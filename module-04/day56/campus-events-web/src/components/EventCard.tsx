import type { CampusEvent } from "@/types/event"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react";
import { formatDate } from "@/utils/format";

export default function EventCard({ event }: { event: CampusEvent }) {
    return (
        <div>

            <div
                key={event.id}
                className="border rounded-lg p-5 shadow-sm space-y-3"
            >
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600 line-clamp-1">{event.description}</p>

                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {event.category}
                </span>

                <p className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4 shrink-0" /> {event.location}
                </p>
                <p className="flex items-center gap-2 text-gray-500">
                    <Calendar className="h-4 w-4 shrink-0" /> {formatDate(event.eventDate)}
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
