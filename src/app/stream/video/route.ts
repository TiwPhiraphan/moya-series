
import { type NextRequest, NextResponse } from 'next/server'
import { auth } from '@package/module/GoogleAuth'
import { redirect } from 'next/navigation'

export async function GET( request: NextRequest ) {

    const { searchParams } = new URL( request.url )
    const range = request.headers.get('range')
    const id = searchParams.get('watch')

    if ( typeof id !== 'string' || typeof range !== 'string' ) {
        return redirect('/404')
    }

    return new NextResponse()
}
