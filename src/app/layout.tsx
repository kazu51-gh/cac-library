import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'

const font = Noto_Sans_JP({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'C.A.C. Library',
  description: 'Introduce the books held by C.A.C.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${font.className}`}>{children}</body>
    </html>
  )
}
