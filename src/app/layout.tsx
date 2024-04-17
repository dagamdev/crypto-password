import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import packageData from '../../package.json'
import { Toaster } from 'sonner'

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
        {children}
        <div style={{ textAlign: 'center' }}>
          <span>v{packageData.version}</span>
        </div>
      </body>
    </html>
  )
}
