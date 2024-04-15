import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import PasswordsProvider from '@/providers/passwords-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto password',
  description: 'Save your passwords'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <PasswordsProvider>
        <body className={inter.className}>{children}</body>
      </PasswordsProvider>
    </html>
  )
}
