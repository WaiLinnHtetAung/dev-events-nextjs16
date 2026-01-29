'use client'

import Image from "next/image"
import Link from "next/link"
import posthog from "posthog-js"

const Navbar = () => {
  const handleLogoClick = () => {
    posthog.capture('navbar_logo_clicked')
  }

  const handleNavLinkClick = (destination: string) => {
    posthog.capture('navbar_link_clicked', {
      destination: destination,
    })
  }

  return (
    <header>
        <nav>
            <Link href="/" className="logo" onClick={handleLogoClick}>
                <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
                <p>DevEvent</p>
            </Link>

            <ul>
                <li><Link href="/" onClick={() => handleNavLinkClick('Home')}>Home</Link></li>
                <li><Link href="/events" onClick={() => handleNavLinkClick('Events')}>Events</Link></li>
                <li><Link href="/contact" onClick={() => handleNavLinkClick('Create Event')}>Create Event</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
