import Link from 'next/link'
import React from 'react'

export default function ({params}: {params: Record<string, string | undefined>}) {
  return (
    <div>
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

                   <div>
                     <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
                    >
                        Apply Filters
                    </button>
                    <Link href="/events" className="inline-block bg-gray-500 text-white rounded-lg px-4 py-2 font-medium hover:bg-gray-600 transition-colors ml-2">
                        Reset Filters
                    </Link>
                   </div>
                </div>
            </form> 
    </div>
  )
}
