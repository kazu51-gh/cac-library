import Header from "@/components/header";
import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import Footer from "@/components/footer";

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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${font.className}`}>
        <Header></Header>
        <div className='container mx-auto'>{children}</div>
        <Footer></Footer>
      </body>
    </html>
  )
}
