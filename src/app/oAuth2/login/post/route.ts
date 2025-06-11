
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import database from '@package/module/FirebaseDatabase'
import { type NextRequest, NextResponse } from 'next/server'
import { Private } from '@package/config'

export async function POST( request: NextRequest ) {

    const { token } = await request.json() as { token?: string } || {}

    const token_encrypted = await database.ref('Token').get().then( s => s.val() )
    
    if ( typeof token == 'string' && bcrypt.compareSync( token, token_encrypted ) ) {

        const jwt_token = jwt.sign( { accept: 'role=[ADMIN]' }, Private.Credentials.Jwt )

        const response = NextResponse.json({ code: 200, message: 'Ok' })
        response.cookies.set( 'Authorization', jwt_token, {
            secure: process.env.NODE_ENV === 'production', sameSite: 'strict', httpOnly: true, path: '/'
        })
        return response

    }

    return NextResponse.json({ code: 401, message: 'Unauthorized' },{ status: 401 })

}
