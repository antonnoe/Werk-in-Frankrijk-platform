import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Werk in Frankrijk - Beroepenchecker',
  description: 'Ontdek wat je nodig hebt om jouw beroep in Frankrijk uit te oefenen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}
