import { cookies } from 'next/headers'
import React from 'react'

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')
  return (
    <main>
      <h1>CheckoutPage</h1>
      <p>Session:{session ? "Found" : "Not Found"}</p>
    </main>
  )
}
