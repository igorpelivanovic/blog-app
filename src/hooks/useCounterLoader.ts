import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useInView } from "./useInView"

type UseCounetLoaderProps = {
    initValue?: number
    endValue: number
    duration?: number
}

const useCounterLoader = <T extends Element = HTMLElement>( { duration = 1000, initValue = 0, endValue }: UseCounetLoaderProps ) => {
    const { elRef, isVisible } = useInView<T>({ onlyFirstEnter: true})

    const [ counter, setCounter ] = useState<number>(initValue)

    const intervalRef = useRef<ReturnType<typeof setInterval>>()

    const intervalPerStep = useMemo(()=> duration / (endValue - initValue) ,[initValue, endValue, duration])

    const countHandle = useCallback(()=>{
        intervalRef.current = setInterval(()=>{
        setCounter(prev=>{
            const newValue = prev+1
            if(newValue >= endValue){
                clearInterval(intervalRef.current)
                return endValue
            }
            return newValue
        })
    }, intervalPerStep)}, [intervalPerStep, endValue])


    useEffect(()=>{
        if(isVisible){
            countHandle()
        }
        return ()=>{
            if(intervalRef.current){
                clearInterval(intervalRef.current)
            }
        }
    }, [isVisible, countHandle])


    return { ref: elRef, counter}
}

export { useCounterLoader }