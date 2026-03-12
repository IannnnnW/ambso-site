'use client'

import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export default function ConditionalLayout({ children, header, footer }: Props) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/ambso-backend') || pathname?.startsWith('/structure')

  return (
    <>
      {!isStudio && header}
      {children}
      {!isStudio && footer}
    </>
  )
}
