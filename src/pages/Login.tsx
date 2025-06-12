
'use client'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { redirect } from 'next/navigation'
import { Audiowide } from 'next/font/google'
import { FormEvent, useEffect, useState, useRef } from 'react'

const font = Audiowide({
    subsets: ['latin'],
    weight: ['400'],
    preload: false
})

export default function LoginComponent() {

    const inputRef = useRef<HTMLInputElement>(null)
    
    const [ token, setToken ] = useState('')
    const [ isSubmiting, setSubmiting ] = useState(false)

    useEffect( () => {
        inputRef.current?.focus()
    })

    const onFormSubmit = async ( e: FormEvent< HTMLFormElement > ) => {
        e.preventDefault()
        if ( isSubmiting ) {
            return void 0
        }
        setSubmiting( true )
        await toast.promise(
            fetch('/oAuth2/login/post', {
                method: 'POST',
                body: JSON.stringify({ token }),
                headers: { 'content-type': 'application/json' }
            }).then( ( response ) => {
                if ( response.status !== 200 ) {
                    setSubmiting( false )
                    throw new Error('Unauthorized')
                }
            }),
            {
                pending: 'กำลังเข้าสู่ระบบ',
                success: 'เข้าสู่ระบบสำเร็จ',
                error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
            },
            {
                autoClose: 2000
            }
        )
        setTimeout( ()=> redirect('/dashboard'), 2000 )
    }

    return (
        <section className='flex min-h-dvh select-none items-center justify-center md:bg-slate-50'>
            <Link className='absolute left-4 top-3' href='/'>{'ぐ กลับหน้าแรก'}</Link>
            <form onSubmit={ onFormSubmit } className='px-5 sm:px-8 py-8 w-full bg-white md:border md:shadow max-w-72 rounded-lg'>
                <h1 className={ font.className + ' text-center text-4xl pb-4' }>MoYa</h1>
                <input className='mt-2 px-4 py-1 w-full outline-none border-b bg-transparent' type='text' value='Admin_MoYa' disabled={ true }></input>
                <input ref={ inputRef } value={ token } onInput={ ( event ) => setToken( event.currentTarget.value ) } className='mt-2 px-4 py-1 w-full outline-none border-b bg-transparent' type='password' placeholder='ป้อนรหัสผ่าน' minLength={ 8 } maxLength={ 20 } required={ true }></input>
                <input className='mt-4 py-1.5 w-full bg-black text-white rounded-full cursor-pointer' type='submit' value='เข้าสู่ระบบ'></input>
            </form>
        </section>
    )
}
