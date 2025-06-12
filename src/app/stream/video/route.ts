
import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@package/lib/GoogleAuth'

type GoogleApisResponse = {
    error: { code: number, message: string }
    mimeType: string
    size: string
}

const CHUNK_SIZE = 1400000
const videoMetadata = new Map< string, Omit< GoogleApisResponse, 'error' > >()

export async function GET( request: NextRequest ) {

    const { searchParams } = new URL( request.url )
    const range = request.headers.get('range')
    const id = searchParams.get('watch')

    if ( typeof id !== 'string' || typeof range !== 'string' ) {
        return NextResponse.json({ status: 404, message: 'This page could not be found.' },{ status: 404 })
    }

    const token = await auth.getAccessToken()
    if ( typeof videoMetadata.get( id ) !== 'object' ) {
        try {
            await fetch(`https://www.googleapis.com/drive/v3/files/${id}?fields=size,mimeType`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
                .then( r => r.json() )
                .then( ( res: GoogleApisResponse ) => {
                    if ( res.error ) {
                        throw new Error('Not found')
                    }
                    videoMetadata.set( id, res )
                })
        } catch {
            return NextResponse.json({ status: 404, message: `This page could not be found.` },{ status: 404 })
        }
    }

    const { size, mimeType } = videoMetadata.get( id ) as Omit< GoogleApisResponse, 'error' >
    const bufferSize = searchParams.get('bufferSize')
    let chunk = 0
    if ( bufferSize ) {
        const match = bufferSize.match(/^(\d+(\.\d+)?)(Mb|KB|mb|kb)$/i)
        if ( match ) {
            const value = parseFloat( match[1] )
            chunk = match[3].toLowerCase() === 'mb' ? value * 1000 * 1000 : value * 1000;
        }
    }

    const chunk_size = ( chunk >= 500_000 && chunk <= 2_500_000 ) ? chunk : CHUNK_SIZE
    const start = parseInt( range.replace(/bytes=/,'').split('-')[0], 10 )
    const end = Math.min( start + chunk_size - 1, parseInt( size, 10 ) - 1 )
    const video = await fetch( `https://www.googleapis.com/drive/v3/files/${ id }?alt=media`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Range': `bytes=${start}-${end}`
        }
    })

    const headers = new Headers({
        'Content-Type': mimeType,
        'Accept-Ranges': 'bytes',
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': ( end - start + 1 ).toString()
    })

    return new NextResponse( video.body, { status: 206, headers } )

}
