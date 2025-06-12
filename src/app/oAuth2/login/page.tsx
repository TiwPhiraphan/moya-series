
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import AuthLogin from '@package/pages/Login'
import { isAdminToken } from '@package/lib/JwtAuth'

export default async function LoginPage( ) {

    const cookie = await cookies()

    if ( isAdminToken( cookie.get('Authorization')?.value ) ) {
        redirect('/dashboard')
    }

    return <AuthLogin />

}
