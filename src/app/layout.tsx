import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import packageData from '../../package.json'
import { Toaster } from 'sonner'
import Header from '@/components/header'

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
      <body className={inter.className}>
        <Toaster richColors position='top-center' theme='system' pauseWhenPageIsHidden offset={16} toastOptions={{
          className: 'toast'
        }} />
        <Header />

        <main>
          {children}
        </main>

        <div className='version'>
          <span>v{packageData.version}</span>
        </div>
      </body>
    </html>
  )
}
