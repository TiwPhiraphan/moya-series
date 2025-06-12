
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const revalidate = 0

export async function GET() {
    const cookie = await cookies()
    cookie.delete('Authorization')
    return NextResponse.json({ code: 200, message: 'Ok' }, {
        headers: {
            'Set-Cookie': cookie.toString()
        }
    })
}
