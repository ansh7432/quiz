import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { QuizProvider } from '@/context/QuizContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Knowledge Quiz Challenge',
  description: 'Test your knowledge with our interactive quiz application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QuizProvider>
          {children}
        </QuizProvider>
      </body>
    </html>
  )
}