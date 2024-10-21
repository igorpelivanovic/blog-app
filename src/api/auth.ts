import { authAxios } from "../axios/auth"
import { AxiosError, AxiosResponse } from "axios"
import { HttpResponseRefreshAuthToken, HttpResposenseAuthUser } from "../types/httpResponse"
import AuthTokenService from "../services/authToken.service"

export type SingInUserProps = Record<'username' | 'password', string>

const errorSingInMessage = new Map<number, string>([
    [400, 'username or password is incorect']
])

const singInUser = async (userData: SingInUserProps):Promise<AxiosResponse<HttpResposenseAuthUser, AxiosError>> => {
    try{
        return await authAxios.post<HttpResposenseAuthUser>('/login', userData, {
            params: {
                auth: false
            }
        })
    }catch(e){
        throw hadnleErrorSingIn(e)
    }
}

const hadnleErrorSingIn = (e: unknown): unknown=>{
    if(e instanceof AxiosError && e.status){
        e.message = errorSingInMessage.get(e.status) || e.message
    }
    return e
} 


const fetchAuthUser = (): Promise<AxiosResponse<HttpResposenseAuthUser, AxiosError>> => {
    return authAxios.get<HttpResposenseAuthUser>('/me')
}

const refreshAuthToken = (): Promise<AxiosResponse<HttpResponseRefreshAuthToken, AxiosError>> => {
    return authAxios.post<HttpResponseRefreshAuthToken>('/refresh', {
        refreshToken: AuthTokenService.getToken('refreshToken')
    }, {
        params: {
            auth: false
        }
    })
}





export { singInUser, fetchAuthUser, refreshAuthToken }