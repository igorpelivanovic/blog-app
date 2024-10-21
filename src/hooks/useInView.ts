import { useEffect, useRef, useState } from "react"

type InViewProps = {
    options?: IntersectionObserverInit
}

type InViewReturn<T> = {
    elRef: React.RefObject<T>
    isVisible: boolean
}

const useInView = <T extends Element>({ options }: InViewProps = {}):InViewReturn<T> => {
    
    const [ isVisible, setIsVisible ] = useState<boolean>(false)
    const elRef = useRef<T>(null)
    useEffect(()=>{
        const el = elRef.current
        const observe = new IntersectionObserver((entries)=>{
            const entry  = entries[0]
            setIsVisible(entry.isIntersecting)
        }, options)

        const stopObserveFn = () => {
            if(el){
                observe.unobserve(el)
                setIsVisible(false)
            }
        }

        if(el) {
            observe.observe(el)
        }

        return stopObserveFn
    }, [options, elRef.current])

    return { elRef, isVisible }
}

export { useInView }