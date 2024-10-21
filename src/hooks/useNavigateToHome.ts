import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

const useNavigateToHome = () => {

    const navigate = useNavigate()

    const navigateToHome = useCallback(()=>{
        navigate('/')
        return
    }, [navigate])

    return navigateToHome

}

export { useNavigateToHome }