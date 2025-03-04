import { useEffect, useRef, useState } from "react"
import { useRefreshToken } from "../query/auth/refreshToken"
import axios, { AxiosError, AxiosResponse } from "axios"
import { authAxios } from "../axios/auth"
import { HttpResponseRefreshAuthToken } from "../types/httpResponse"
import { useLoginAgainWithAlert } from "../hooks/useLoginAgainWithAlert"
import { AlertType } from "../state/alertsStore"

const useAuthInterception = () => {
    const { mutateAsync } = useRefreshToken()
    const [ isAdded, setIsAdded ] = useState(false)
    const loginAgainWithAlert = useLoginAgainWithAlert()

    const ref = useRef<undefined | Promise<AxiosResponse<HttpResponseRefreshAuthToken, AxiosError>>>(undefined)

    useEffect(()=>{
        const inter = authAxios.interceptors.response.use((response)=>response, async(error: unknown) => {
            if(!axios.isAxiosError(error)) {
                return Promise.reject(error)
            }
            if(error.status === 403){
                loginAgainWithAlert({
                    text: error.message,
                    type: AlertType.error
                })
                return
            }
            if(error.status === 401 && error.config){
                try{
                    if(!ref.current){
                        ref.current = mutateAsync()
                    }
                    await ref.current
                    return authAxios.request(error.config)
                }catch(e){
                    if(axios.isAxiosError(e)){
                        loginAgainWithAlert({
                            type: AlertType.error,
                            text: e.message,
                        })
                    }
                    return
                }finally{
                    ref.current = undefined
                }
            }
            return Promise.reject(error)
        })
        setIsAdded(true)
        return () => {authAxios.interceptors.response.eject(inter)}
    }, [mutateAsync, ref.current])
    return isAdded
}


export { useAuthInterception }