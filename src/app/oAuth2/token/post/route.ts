
import { auth } from '@package/lib/GoogleAuth'
import { isAdminToken } from '@package/lib/JwtAuth'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST( request: NextRequest ) {
    if ( isAdminToken( request.cookies.get('Authorization')?.value ) ) {
        return NextResponse.json({ token: await auth.getAccessToken() })
    }
    return NextResponse.json({ code: 401, message: 'Unauthorized' })
}