
import bcrypt from 'bcrypt'
import { createAdminToken } from '@package/lib/JwtAuth'
import { getAuthToken } from '@package/lib/FirebaseDatabase'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST( request: NextRequest ) {

    const { token } = await request.json() as { token?: string } || {}
    
    if ( typeof token == 'string' && bcrypt.compareSync( token, await getAuthToken() ) ) {

        const adminToken = createAdminToken()

        const cookieAttributes = [
            `Authorization=${ adminToken }`,
            'Path=/',
            'HttpOnly',
            'SameSite=Strict',
            process.env.NODE_ENV === 'production' ? 'Secure' : '',
        ].filter( Boolean ).join('; ')

        return NextResponse.json({ code: 200, message: 'Ok' }, {
            headers: { 'Set-Cookie': cookieAttributes }
        })

    }

    return NextResponse.json({ code: 401, message: 'Unauthorized' },{ status: 401 })

}
