import { DependencyList, useEffect, useRef } from "react"




const useSkipFirstRender = (fn: React.EffectCallback, deps?: DependencyList) =>{
    const firstRenderRef = useRef<boolean>(true)

    useEffect(()=>{
        if(firstRenderRef.current){
            firstRenderRef.current = false
            return
        }
        fn()
    }, deps)
}

export { useSkipFirstRender }