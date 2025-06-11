
import { Config } from '@package/config'
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: Config.title,
        short_name: Config.title,
        description: 'Moya Mini Series App',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ]
    }
}