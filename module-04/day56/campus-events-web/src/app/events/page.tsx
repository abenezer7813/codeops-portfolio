import { getEvents } from "../lib/api";


export default async function EventsPage() {
  const data = await getEvents();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Events ({data.total} events)
      </h1>

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
              className={`text-sm font-medium ${
                event.isPublished ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {event.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}