import { Metadata } from 'next'

import 'tailwindcss/tailwind.css'

export const metadata: Metadata = {
  title: 'Aufgabenordner Analyse Q3/2023',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
