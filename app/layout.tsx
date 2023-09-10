import Footer from "@/components/Footer"
import Header from "@/components/Header"

import './globals.css'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: '備忘録',
  description: '旅の備忘録です',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto">{children}</main>
      <Footer />
    </div>
  )
}