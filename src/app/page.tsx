
import Link from 'next/link'
import { Config } from '@package/config'
import { Audiowide } from 'next/font/google'
import Container from '@package/components/Container'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export type InterfaceMetadata = {
    id: string
    title: string
    thumbnail: string
}

export default async function Home() {

    const metadata: InterfaceMetadata[] = [
        {
            id: '001',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '002',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '003',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '004',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '005',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '006',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '007',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '008',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '009',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        },
        {
            id: '010',
            title: 'ฮ่องเต้ เบาๆ กับข้าหน่อย',
            thumbnail: '1ZQZsRvbdpHeam4OsF1CI9CDhLp-yzGRt'
        }
    ]

    return (
        <>
            <section className='px-4 w-full mx-auto max-w-6xl select-none'>
                <nav className='flex h-20 w-full items-center justify-between'>
                    <Link className={ font.className + ' font-normal text-4xl p-1' } href='/'>{ Config.brand }</Link>
                    <Link className='border-gray-300 rounded-2xl border px-3 py-1' href='/oAuth2/login'>เข้าสู่ระบบ</Link>
                </nav>
                <main className='py-6 w-full'>
                    <Container metadata={ metadata } />
                </main>
                <footer className='py-5 text-center text-sm'>
                    MoYa Series | All Rights Reserved | 2025
                </footer>
            </section>
        </>
    )
}
