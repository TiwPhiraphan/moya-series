
import { cookies } from 'next/headers'
import HomePage from '@package/pages/Home'
import { isAdminToken } from '@package/lib/JwtAuth'

export type InterfaceMetadata = {
    id: string
    title: string
    thumbnail: string
}

export default async function Home() {

    const cookie = await cookies()

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

    return <HomePage metadata={ metadata } isAdmin={ isAdminToken( cookie.get('Authorization')?.value ) } />
    
}
