
'use client'

import { toast } from 'react-toastify'
import { type FormEvent, useState, useRef } from 'react'
import { type Crop, ReactCrop, centerCrop } from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'

export default function FormUpload() {

    const [ isOpenForm, setOpenFormState ] = useState( false )
    const [ isOpenCrop, setOpenCropState ] = useState( false )
    
    return (
        <>
            <div className={ ( isOpenForm ? 'block' : 'hidden' ) + ' fixed top-0 left-0 w-full h-full bg-slate-700 bg-opacity-70' }>
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
                        <button onClick={ () => setOpenFormState( false ) } className='w-20 py-1.5 rounded-md bg-red-500' type='reset'>ยกเลิก</button>
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
        </>
    )

}
