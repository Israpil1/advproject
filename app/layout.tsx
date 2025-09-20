import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Мой продвинутый проект',
  description: 'Next.js с Todo и Календарем',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Navigation />
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}