
'use client'

import Link from 'next/link'
import { Config } from '@package/config'
import { redirect } from 'next/navigation'
import { Audiowide } from 'next/font/google'
import { type FormEvent, useState } from 'react'
import { type Crop, ReactCrop } from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export default function DashboardComponent() {

    const [ crop, setCrop ] = useState<Crop>({
        unit: 'px', width: 300, height: 400, x: 0, y: 0
    })
    
    const [ isOpenNew, setOpenNewState ] = useState(false)
    const [ isOpenCrop, setOpenCropState ] = useState(false)

    const [ thumbnail, setThumbnail ] = useState('')

    const onSelectThumbnail = ( event: FormEvent<HTMLInputElement> ) => {
        const file = event.currentTarget.files?.[0]
        if ( !file ) return void 0
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setThumbnail( reader.result?.toString() || '' )
        })
        reader.readAsDataURL( file )
        setOpenCropState( true )
    }

    const AuthLogout = async () => {
        await fetch('/oAuth2/logout/post',{ method: 'POST', mode:'no-cors' })
        return redirect('/')
    }

    return (
        <section className='px-4 w-full mx-auto max-w-6xl select-none'>
            <nav className='flex h-20 w-full items-center justify-between'>
                <Link className={ font.className + ' font-normal text-4xl p-1' } href='/'>{ Config.brand }</Link>
                <button onClick={ AuthLogout } className='border-gray-300 rounded-2xl border px-4 py-1'>ออกจากระบบ</button>
            </nav>
            <main className='pt-5 px-2 border-t'>
                <header className='flex items-center justify-between'>
                    <section>
                        <div className='flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='size-8'>
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z"></path>
                            </svg>
                            <span className='text-xl font-semibold'>แดชบอร์ด</span>
                        </div>
                        <h1 className='text-sm py-2 ps-1'>ยินดีต้อนรับ ผู้ดูแลระบบ</h1>
                    </section>
                    <button onClick={ () => setOpenNewState( true ) } className='px-3 py-1.5 rounded text-sm text-white bg-blue-600'>{'+ เพิ่มซีรีย์ใหม่'}</button>
                </header>
            </main>
            <div className={ ( isOpenNew ? 'block' : 'hidden' ) + ' fixed top-0 left-0 w-full h-full bg-slate-700 bg-opacity-70' }>
                <form className='p-5 sm:mt-6 mx-auto bg-white min-h-dvh sm:min-h-0 sm:rounded-lg max-w-4xl sm:max-w-lg'>
                    <h1 className='p-4 text-2xl text-center font-semibold'>เพิ่มซีรีย์ใหม่</h1>
                    <div className='pt-2.5 flex flex-col'>
                        <label htmlFor='title'>ชื่อเรื่อง</label>
                        <input className='px-4 py-1 border rounded outline-none' id='title' type="text"></input>
                    </div>
                    <div className='pt-2.5 flex flex-col'>
                        <label htmlFor='description'>เรื่องย่อ - บทนำ</label>
                        <input className='px-4 py-1 border rounded outline-none' id='description' type="text"></input>
                    </div>
                    <div className='pt-2.5 flex flex-col'>
                        <label>ภาพหน้าปก</label>
                        <input onChange={ onSelectThumbnail } className='px-4 py-1 border rounded outline-none' id='thumbnail' type="file" accept='image/webp, image/jpeg, image/png'></input>
                    </div>
                    <div className='pt-2.5 flex flex-col'>
                        <label>ซีรีย์</label>
                        <input className='px-4 py-1 border rounded outline-none' id='movie' type="file" accept='video/mp4, video/webm, video/ogg'></input>
                    </div>
                    <div className='p-4 flex gap-3 text-white justify-center'>
                        <button className='w-20 py-1.5 rounded-md bg-blue-500' type='submit'>บันทึก</button>
                        <button onClick={ () => setOpenNewState( false ) } className='w-20 py-1.5 rounded-md bg-red-500' type='reset'>ยกเลิก</button>
                    </div>
                </form>
            </div>
            <div className={ ( isOpenCrop ? 'flex' : 'hidden' ) + ' fixed top-0 left-0 w-full h-full items-center justify-center bg-slate-700 bg-opacity-70' }>
                { thumbnail &&
                    <div className='p-5 w-[90%] mx-auto bg-white rounded-lg'>
                        <h1 className='pb-5 text-2xl text-center font-semibold'>เครื่องมือตัดรูปภาพ</h1>
                        <div className='flex justify-center'>
                            <ReactCrop crop={ crop } onChange={ setCrop } aspect={ 0.725 }>
                                <img className='block max-w-full max-h-[70vh]' src={ thumbnail } alt="preview"></img>
                            </ReactCrop>
                        </div>
                        <div className='flex pb-3 pt-5 gap-3 text-white justify-center'>
                            <button className='w-20 py-1.5 rounded-md bg-blue-500'>ตกลง</button>
                            <button onClick={ () => setOpenCropState( false ) } className='w-20 py-1.5 rounded-md bg-red-500'>ยกเลิก</button>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}
