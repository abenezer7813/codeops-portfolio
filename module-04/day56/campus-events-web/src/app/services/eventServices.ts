import type { PaginatedEvents } from "@/types/event";


const API_URL=process.env.NEXT_PUBLIC_API_BASE_URL
if (!API_URL) throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");

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
export async function getUpcomingEvents():Promise<Event[]> {
    const res =await fetch(`${API_URL}/events/upcoming`)
    if(!res.ok) throw new Error(`Unable to fetch upcoming events ${res.status}`)
    return res.json()

    
}
// export async function getEventById(id:string):Promise<Event> {
//     const res=await fetch(`${API_URL}/events/${id}`)
//     if (!res.ok) throw new Error(`Can not find the event ${}`)
// }