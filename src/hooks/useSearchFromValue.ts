import { useEffect, useMemo } from "react"
import { createSearchParams, useLocation, useNavigate  } from "react-router-dom"

const useSearchValue = (): string => {
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = useMemo(()=>new URLSearchParams(location.search),[location.search])

    useEffect(()=>{
        if(location.pathname === '/search'){
            if(!queryParams.has('q')){
                queryParams.set('q', '')
                navigate({
                    pathname: location.pathname,
                    search: createSearchParams(queryParams).toString()
                })
            }
        }
    }, [location])
    
    const searchValue = useMemo(()=>{
        return queryParams.get('q') || ""
    }, [location])

    return searchValue

}

export { useSearchValue }