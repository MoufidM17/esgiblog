import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from './components/providers/AuthProvider'
import { Box, Sheet } from '@mui/joy'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EsgiBloc',
  description: 'Blog dédié à l\'esgi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <nav><Header/></nav>
        {/* <AuthProvider session={session}> */}
        {/* <AuthProvider> */}
          <main>
            <Box
                sx={{
                  bgcolor: 'white',
                  gridTemplateRows: '52px 0px 1fr',
                  minHeight: '90dvh',
                }}
              >
                <Sheet>
                  {children}
                </Sheet>
            </Box>
          </main>
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}
