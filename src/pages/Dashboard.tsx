
'use client'

import Link from 'next/link'
import { Config } from '@package/config'
import { redirect } from 'next/navigation'
import { Audiowide } from 'next/font/google'
import { type FormEvent, useState, useRef } from 'react'
import { type Crop, ReactCrop, centerCrop } from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'
import { toast } from 'react-toastify'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export default function DashboardComponent() {

    const imageRef = useRef<HTMLImageElement|null>(null)
    const thumbnailRef = useRef<HTMLInputElement>(null)

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ thumbnail, setThumbnail ] = useState<File>()
    const [ serie, setSerie ] = useState<File>()

    const [ crop, setCrop ] = useState<Crop>({
        unit: '%', width: 0, height: 0, x: 0, y: 0
    })
    
    const [ isOpenNew, setOpenNewState ] = useState(false)
    const [ isOpenCrop, setOpenCropState ] = useState(false)

    const [ imageSrc, setImageSrc ] = useState('')

    const onSelectThumbnail = ( event: FormEvent<HTMLInputElement> ) => {
        const file = event.currentTarget.files?.[0]
        if ( !file ) return void 0
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setImageSrc( reader.result?.toString() || '' )
        })
        reader.readAsDataURL( file )
        setOpenCropState( true )
    }

    const onImageLoad = ( event: FormEvent<HTMLImageElement> ) => {
        const { height, width } = event.currentTarget
        imageRef.current = event.currentTarget
        setCrop(
            centerCrop({
                x: 0,
                y: 0,
                unit: 'px',
                height: 150,
                width: 150 * 0.7375
            }, width, height )
        )
    }

    const getGoogleAccessToken = async (): Promise<string> => {
        const res = await fetch('/oAuth2/token/post', {
            method: 'POST'
        })
        const data: { token: string } = await res.json()
        return data.token
    }

    const uploadToGoogleDrive = async ( file: File ) => {

        const token = await getGoogleAccessToken()
        const extension = file.name.split('.').pop() || 'webp'

        const metadata = {
            name: `${Date.now()}.${extension}`,
            parents: ['1GMQCzKONyarUvB4YvdWatlLs84dZoU9n']
        }

        const form = new FormData()
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
        form.append('file', file)

        const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: form
        })

        const result = await response.json() as { id: string }
        return result.id
    }

    const getCroppedImageFile = async (): Promise<File|null> => {

        if (!imageRef.current || !crop.width || !crop.height) return null
        const canvas = document.createElement('canvas')
        const scaleX = imageRef.current.naturalWidth / imageRef.current.width
        const scaleY = imageRef.current.naturalHeight / imageRef.current.height

        canvas.width = crop.width
        canvas.height = crop.height

        const ctx = canvas.getContext('2d')
        if (!ctx) return null

        ctx.drawImage(
            imageRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const image = thumbnailRef.current?.files?.[0] as File

        return new Promise(resolve => {
            canvas.toBlob(blob => {
                if (!blob) return resolve(null)
                const file = new File([blob], image.name, { type: image.type })
                resolve(file)
            }, image.type )
        })
    }

    const onSubmitSave = async ( event: FormEvent ) => {
        event.preventDefault()
        const thumbnail_id = await uploadToGoogleDrive( thumbnail as File )
        const serie_upload = uploadToGoogleDrive( serie as File )
        toast.promise(
            serie_upload,
            {
                error: 'อัปโหลดไม่สำเร็จ',
                success: 'อัปโหลดสำเร็จ',
                pending: 'กำลังอัปโหลดวีดีโอ'
            }
        )
    }

    const onCropped = async  ( event: FormEvent ) => {
        event.preventDefault()
        const img = await getCroppedImageFile() as File
        setThumbnail( img )
        setOpenCropState( false )
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
                <form onSubmit={ onSubmitSave } className='p-5 sm:mt-6 mx-auto bg-white min-h-dvh sm:min-h-0 sm:rounded-lg max-w-4xl sm:max-w-lg'>
                    <h1 className='p-4 text-2xl text-center font-semibold'>เพิ่มซีรีย์ใหม่</h1>
                    <div className='pt-2.5 flex flex-col'>
                        <label htmlFor='title'>ชื่อเรื่อง</label>
                        <input value={ title } onInput={ event => setTitle( event.currentTarget.value ) } className='px-4 py-1 border rounded outline-none' id='title' type="text" required></input>
                    </div>
                    <div className='pt-2.5 flex flex-col'>
                        <label htmlFor='description'>เรื่องย่อ - บทนำ</label>
                        <input value={ description } onInput={ event => setDescription( event.currentTarget.value ) } className='px-4 py-1 border rounded outline-none' id='description' type="text" required></input>
                    </div>
                    <div className='pt-2.5 flex flex-col'>
                        <label>ภาพหน้าปก</label>
                        <input ref={ thumbnailRef } onChange={ onSelectThumbnail } className='px-4 py-1 border rounded outline-none' id='thumbnail' type="file" accept='image/webp, image/jpeg, image/png' required></input>
                    </div>
                    <div className='pt-2.5 flex flex-col'>
                        <label>ซีรีย์เต็มเรื่อง</label>
                        <input onChange={ event => setSerie( event.currentTarget.files?.[0] as File ) } className='px-4 py-1 border rounded outline-none' id='movie' type="file" accept='video/mp4, video/webm, video/ogg' required></input>
                    </div>
                    <div className='p-4 flex gap-3 text-white justify-center'>
                        <button className='w-20 py-1.5 rounded-md bg-blue-500' type='submit'>บันทึก</button>
                        <button onClick={ () => setOpenNewState( false ) } className='w-20 py-1.5 rounded-md bg-red-500' type='reset'>ยกเลิก</button>
                    </div>
                </form>
            </div>
            <div className={ ( isOpenCrop ? 'flex' : 'hidden' ) + ' fixed top-0 left-0 w-full h-full items-center justify-center bg-slate-700 bg-opacity-70' }>
                { imageSrc &&
                    <form onSubmit={ onCropped } className='p-5 w-11/12 max-w-3xl mx-auto bg-white rounded-lg'>
                        <h1 className='pb-5 text-2xl text-center font-semibold'>เครื่องมือตัดรูปภาพ</h1>
                        <div className='flex border bg-gray-100 items-center justify-center'>
                            <ReactCrop className='max-h-[70vh] max-w-2xl' crop={ crop } onChange={ setCrop } aspect={ 0.7375 }>
                                <img onLoad={ onImageLoad } className='w-full max-h-full' src={ imageSrc } alt="preview"></img>
                            </ReactCrop>
                        </div>
                        <div className='flex pb-3 pt-5 gap-3 text-white justify-center'>
                            <button className='w-20 py-1.5 rounded-md bg-blue-500' type='submit'>ตกลง</button>
                            <button onClick={ () => setOpenCropState( false ) } className='w-20 py-1.5 rounded-md bg-red-500' type='reset'>ยกเลิก</button>
                        </div>
                    </form>
                }
            </div>
        </section>
    )
}
