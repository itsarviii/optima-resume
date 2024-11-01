import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Optima Resume',
  description: 'Build a clean, ATS-friendly resume in minutes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  )
}
