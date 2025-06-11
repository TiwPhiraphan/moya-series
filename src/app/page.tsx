
import Link from 'next/link'
import { Config } from '@package/config'
import { Audiowide } from 'next/font/google'
import Container from '@package/components/Container'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export default function Home() {
    return (
        <>
            <section className='px-4 w-full mx-auto max-w-6xl select-none'>
                <nav className='flex h-20 w-full items-center justify-between'>
                    <Link className={ font.className + ' font-normal text-4xl p-1' } href='/'>{ Config.brand }</Link>
                    <Link className='border-gray-300 rounded-2xl border px-3 py-1' href='/oAuth2/login'>เข้าสู่ระบบ</Link>
                </nav>
                <main className='py-5 w-full'>
                    <Container />
                </main>
            </section>
        </>
    )
}
