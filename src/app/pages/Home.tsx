
'use client'

import Link from 'next/link'
import { Config } from '@package/config'
import { Audiowide } from 'next/font/google'
import Container from '@package/components/Container'
import type { InterfaceMetadata } from '@package/app/page'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export default function HomeComponent({ metadata, isAdmin }:{ metadata: InterfaceMetadata[], isAdmin: boolean }) {
    return (
        <>
            <section className='px-4 w-full mx-auto max-w-6xl select-none'>
                <nav className='flex h-20 w-full items-center justify-between'>
                    <Link className={ font.className + ' font-normal text-4xl p-1' } href='/'>{ Config.brand }</Link>
                    <Link className='border-gray-300 rounded-2xl border px-4 py-1' href={ isAdmin ? '/dashboard' : '/oAuth2/login' }>{ isAdmin ? 'แดชบอร์ด' : 'เข้าสู่ระบบ' }</Link>
                </nav>
                <main className='py-6 w-full'>
                    <div className='pb-10 flex justify-center'>
                        <input className='px-6 py-2 flex-1 outline-none border rounded-s-full max-w-96 border-gray-400' placeholder='ค้นหาซีรีย์ที่คุณสนใจ' type='text'></input>
                        <button className='ps-3 pe-5 border bg-black text-white border-black border-s-0 rounded-e-full'>ค้นหา</button>
                    </div>
                    <Container metadata={ metadata } />
                </main>
                <footer className='py-5 text-center text-sm'>
                    MoYa Series | All Rights Reserved | 2025
                </footer>
            </section>
        </>
    )
}
