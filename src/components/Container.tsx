
import type { InterfaceMetadata } from '@package/app/page'
import Card from './Card'

type ContainerProps = {
    metadata: InterfaceMetadata[]
}

export default function Container({ metadata }:ContainerProps) {
    return (
        <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            { metadata?.map( (item,i) => <Card key={i} data={ item } /> ) }
        </div>
    )
}
