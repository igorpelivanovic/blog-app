import { useMemo } from "react"
import { useLocation } from "react-router-dom"

const useSearchValue = (): undefined | null | string => {
    const location = useLocation()
    const searchValue = useMemo(()=>{
        if(location.pathname === '/search'){
            const queryParams: URLSearchParams = new URLSearchParams(location.search)
            return queryParams.get('q')
        }
        return
    }, [location])

    return searchValue

}

export { useSearchValue }