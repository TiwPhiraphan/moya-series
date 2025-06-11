
'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { InterfaceMetadata } from '@package/app/page'

export default function Card({ data }:{ data: InterfaceMetadata }) {
    return (
        <figure>
            <Link className='group' href={ '/watch/' + data.id }>
                <div className='overflow-hidden transition-all rounded-xl group-hover:rounded-none'>
                    <Image className='w-full transition-all group-hover:scale-110' height={0} width={500} src={ `https://lh3.googleusercontent.com/d/${ data.thumbnail }=w500` } alt={ data.thumbnail }></Image>
                </div>
                <figcaption className='px-2 py-3'>
                    <p>{ data.title }</p>
                </figcaption>
            </Link>
        </figure>
    )
}
