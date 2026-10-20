import { cookies } from "next/headers";
//import { verify } from "./verify";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  return token ? verify(token) : null;
}