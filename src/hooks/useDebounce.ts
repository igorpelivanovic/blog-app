import { useEffect, useState } from 'react';


const useDebounce = <T>(initValue: T, timer: number = 500): T => {

    const [ value, setValue ] = useState<T>(initValue)

    useEffect(()=>{
        const handler = setTimeout(()=>{
            setValue(initValue)
        }, timer)

        return(()=> clearInterval(handler))

    }, [initValue, timer])

    return value
}

export { useDebounce }