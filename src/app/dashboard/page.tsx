
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { isAdminToken } from '@package/lib/JwtAuth'
import DashboardComponent from '@package/pages/Dashboard'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: 'Admin Dashboard'
}

export default async function Dashboard() {
    const cookie = await cookies()
    if ( !isAdminToken( cookie.get('Authorization')?.value ) ) {
        redirect('/oAuth2/login')
    }
    return <DashboardComponent />
}
