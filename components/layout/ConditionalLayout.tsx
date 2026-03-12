'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/ambso-backend') || pathname?.startsWith('/structure')

  return (
    <>
      {!isStudio && <Header />}
      {children}
      {!isStudio && <Footer />}
    </>
  )
}