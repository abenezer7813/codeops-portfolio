import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  return token ? verify(token) : null;
}