import type { PaginatedEvents } from "./types";

const API_URL=process.env.API_URL
export async  function getEvents():Promise<PaginatedEvents>{
const res= await fetch(`${API_URL}/events`,{cache:'no-store'});
if(!res.ok) throw new Error(`Unable to fetch Events ${res.status}`)
    return res.json()
}