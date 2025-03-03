import { useEffect, useRef, useState } from "react"

type InViewProps = {
    options?: IntersectionObserverInit
    onlyFirstEnter?: boolean
}

type InViewReturn<T> = {
    elRef: React.RefObject<T>
    isVisible: boolean
}

const useInView = <T extends Element>({ options, onlyFirstEnter }: InViewProps = { onlyFirstEnter: false }):InViewReturn<T> => {
    
    const [ isVisible, setIsVisible ] = useState<boolean>(false)

    const elRef = useRef<T>(null)

    useEffect(()=>{
        const el = elRef.current
        const observe = new IntersectionObserver((entries)=>{
            const entry  = entries[0]
            setIsVisible(prev=>{
                if(onlyFirstEnter && prev) return prev
                return entry.isIntersecting
            })
        }, options)

        const stopObserveFn = () => {
            if(el){
                observe.unobserve(el)
            }
        }

        if(el) {
            observe.observe(el)
        }

        return stopObserveFn
    }, [JSON.stringify(options), elRef.current, onlyFirstEnter])

    return { elRef, isVisible }
}

export { useInView }