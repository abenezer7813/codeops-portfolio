import { PaginatedEvents } from "@/types/event";


const API_URL=process.env.NEXT_PUBLIC_API_BASE_URL
export async function getEvents(
  params: Record<string, string | undefined> = {},
): Promise<PaginatedEvents> {
  const query = new URLSearchParams();          // inside the function

  for (const [key, value] of Object.entries(params)) {
   if(value)query.set(key,value)
  }

  const res = await fetch(`${API_URL}/events?${query}`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Unable to fetch events (${res.status})`);
  return res.json();
}