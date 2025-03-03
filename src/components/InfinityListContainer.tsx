import { ReactNode, useEffect } from "react"
import { useInView } from "../hooks/useInView"

type InfinityListContainerProps = {
    children : (elRef: React.RefObject<HTMLDivElement>)=>ReactNode
    fetchNextPage: Function
    hasMore: boolean | undefined
    isLoading: boolean
    loader: ReactNode
}

const InfinityListContainer: React.FunctionComponent<InfinityListContainerProps> = ( { children, hasMore, fetchNextPage, isLoading, loader } ) => {

    const { elRef: lastElRef, isVisible } = useInView<HTMLDivElement>()

    useEffect(()=>{
        if(isVisible && hasMore && !isLoading){
            fetchNextPage()
        }
    }, [isVisible])


    return (
        <>
            {children(lastElRef)}
            {isLoading && loader}
        </>
    )
}

export default InfinityListContainer