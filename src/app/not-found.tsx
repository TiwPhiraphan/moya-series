
import Link from 'next/link'

export default function DefaultNotFound() {

    return (
        <>
            <section className='flex h-dvh select-none items-center justify-center'>
                <figure className='flex gap-3 items-center'>
                    <figcaption className='text-2xl font-semibold'>404</figcaption>
                    <span className='h-10 w-px bg-black'></span>
                    <article className='text-base'>This page could not be found.</article>
                </figure>
            </section>
            <Link className='block top-4 left-4 absolute' href='/'>{'ぐ HOME'}</Link>
        </>
    )

}
