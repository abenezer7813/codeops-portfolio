"use client";

import { useState } from "react";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import type { CampusEvent } from "@/types/event";

export default function EventList({ events }: { events: CampusEvent[] }) {
  const [search, setSearch] = useState("");

  // Derived from state while rendering. No second state variable needed.
  const term = search.trim().toLowerCase();
  const visible = events.filter((event) =>
    event.title.toLowerCase().includes(term),
  );

  return (
    <div>
      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} />
        {term && (
          <p className="mt-2 text-sm text-gray-500">
            {visible.length} of {events.length} events on this page match &ldquo;{search.trim()}&rdquo;
          </p>
        )}
      </div>

      {visible.length === 0 ? (
        <p className="py-12 text-center text-gray-500">
          No events found. Try a different title.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}