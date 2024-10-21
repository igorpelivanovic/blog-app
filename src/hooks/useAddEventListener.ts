import { useEffect } from "react";

type EventListenerProps<T> = {
    ref: React.RefObject<T> | React.Ref<HTMLFormElement>,
    fn: EventListener,
    key: keyof WindowEventMap,
    options?: AddEventListenerOptions | boolean
}

type EventListenerFn = <T extends HTMLElement>({ref, fn, key, options}: EventListenerProps<T>) => void;

const useEventListener: EventListenerFn = ({ref, fn, key, options}) => {

    useEffect(()=>{
        const currentRef = ref && 'current' in ref ? ref.current : null
        if(currentRef){ 
            currentRef.addEventListener(key, fn, options)
        }
        return()=> {
            if(currentRef) currentRef.removeEventListener(key, fn, options)
        }
    }, [ref, fn, key, options])

    return 
}

export { useEventListener }