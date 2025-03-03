import { ReactNode, RefObject, useEffect } from "react"
import { useInView } from "../../../hooks/useInView"

type InfinityListContainerProps<T> = {
    fetchNextPage: Function
    hasMore: boolean | undefined
    isLoading: boolean
    loader: React.ReactNode
    children: (elRef: RefObject<T>) =>ReactNode
}



const InfinityListContainer = <T extends HTMLElement = HTMLElement,>({fetchNextPage, hasMore, isLoading, loader, children}: InfinityListContainerProps<T>) => {
    
    const { elRef: lastElRef, isVisible } = useInView<T>()

    useEffect(()=>{
        if(isVisible && hasMore && !isLoading){
            fetchNextPage()
        }
    }, [isVisible])


    return(
        <>
            {children(lastElRef)}
            {isLoading && loader}
        </>
    )
}

export default InfinityListContainer