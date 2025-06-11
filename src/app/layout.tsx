
import { Config } from '@package/config'
import { Krub } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'

const font = Krub({
    weight: ['300','400','500','600','700'],
    subsets: ['thai','latin'],
    preload: false
})

export const metadata: Metadata = {
    title: Config.title,
    metadataBase: new URL( process.env.NODE_ENV == 'production' ? 'https://moya-series.vercel.app' : 'https://jubilant-space-potato-gxq74r6xp763p4j4-3000.app.github.dev' )
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
