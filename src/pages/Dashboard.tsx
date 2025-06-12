
'use client'

import Link from 'next/link'
import { Config } from '@package/config'
import { redirect } from 'next/navigation'
import { Audiowide } from 'next/font/google'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export default function DashboardComponent() {

    const AuthLogout = async function Logout() {
        await fetch('/oAuth2/logout',{ mode:'no-cors' })
        return redirect('/')
    }

    return (
        <section className='px-4 w-full mx-auto max-w-6xl select-none'>
            <nav className='flex h-20 w-full items-center justify-between'>
                <Link className={ font.className + ' font-normal text-4xl p-1' } href='/'>{ Config.brand }</Link>
                <button onClick={ AuthLogout } className='border-gray-300 rounded-2xl border px-4 py-1'>ออกจากระบบ</button>
            </nav>
            <main>

            </main>
        </section>
    )
}
