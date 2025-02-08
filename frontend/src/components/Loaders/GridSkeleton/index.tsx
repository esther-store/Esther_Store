import { Skeleton } from 'primereact/skeleton'
import './index.css'

export function GridSkeleton(){
    return (
        <section className = "grid-skeleton">
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
            <Skeleton size="8rem"></Skeleton>
        </section>
    )
}
