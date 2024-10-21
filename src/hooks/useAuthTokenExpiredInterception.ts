import { useEffect, useState } from "react"
import { useRefreshToken } from "../query/auth/refreshToken"
import { AxiosError } from "axios"
import { authAxios } from "../axios/auth"
import { useQueryClient } from "react-query"
import { AUTH_USER } from "../constants/queryKey"
import AuthTokenService from "../services/authToken.service"

const useTokenExpiredInterception = () => {
    const { mutateAsync } = useRefreshToken()
    const [ tet, setTet ] = useState(false)
    const queryClient = useQueryClient()


    useEffect(()=>{
        const inter = authAxios.interceptors.response.use(response=>response, (error: AxiosError) => {

            if(error.status === 403){
                
                queryClient.setQueryData([AUTH_USER], undefined)
                AuthTokenService.clear()
            }
        
            if(error.status === 401 && error.config){
                return mutateAsync().then(_=>{
                    if(error.config) return authAxios.request(error.config)
                }).catch(_=>undefined)
            }
            return Promise.reject(error)
        })
        setTet(true)
        return () => {authAxios.interceptors.response.eject(inter)}
    }, [mutateAsync])
    return tet
}


export { useTokenExpiredInterception }