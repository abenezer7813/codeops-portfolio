import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    return (
        <div>
            <Link href={'/'}>Campus Events</Link>
            <nav>
                <Link href={'/'}>Home</Link>
                <Link href={'/events'}>Events</Link>
                <Link href={'/create-event'}>Create</Link>
            </nav>
        </div>
    )
}
