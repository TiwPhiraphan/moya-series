
'use client'

import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Audiowide } from 'next/font/google'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export default function LoginComponent() {

    const [ token, setToken ] = useState('')

    const onFormSubmit = async ( e: FormEvent< HTMLFormElement > ) => {
        e.preventDefault()
        await fetch('/oAuth2/login/post', {
            method: 'POST',
            body: JSON.stringify({ token }),
            headers: { 'content-type': 'application/json' }
        }).then( ( response ) => {
            if ( response.status == 200 ) {
                toast.success(
                    'เข้าสู่ระบบสำเร็จ',
                    { autoClose: 3000 }
                )
                toast.success(
                    'กำลังไปที่แดชบอร์ด',
                    { autoClose: 3000 }
                )
                setTimeout( () => {
                    redirect('/dashboard')
                }, 3000 )
            } else { throw new Error('Unauthorized') }
        }).catch( () => toast.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง') )
    }

    return (
        <section className='flex min-h-dvh select-none items-center justify-center'>
            <form onSubmit={ onFormSubmit } className='px-5 sm:px-8 py-8 w-full md:border max-w-72 rounded-lg'>
                <h1 className={ font.className + ' text-center text-4xl pb-4' }>MoYa</h1>
                <input className='mt-2 px-4 py-1 w-full outline-none border-b bg-transparent' type='text' value='Admin_MoYa' disabled={ true }></input>
                <input value={ token } onInput={ ( event ) => setToken( event.currentTarget.value ) } className='mt-2 px-4 py-1 w-full outline-none border-b bg-transparent' type='password' placeholder='ป้อนรหัสผ่าน' minLength={ 8 } maxLength={ 20 } required={ true }></input>
                <input className='mt-4 py-1 w-full bg-black text-white rounded-full cursor-pointer' type='submit' value='เข้าสู่ระบบ'></input>
            </form>
        </section>
    )
}
