
import type { Metadata } from 'next'
import { Krub } from 'next/font/google'
import './globals.css'

const font = Krub({
    weight: ['300','400','500','600','700'],
    subsets: ['thai','latin'],
    preload: false
})

export const metadata: Metadata = {
    title: 'Model Series'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang='en'>
            <body className={ font.className }>
                { children }
            </body>
        </html>
    )
}
