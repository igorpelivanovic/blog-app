import { authAxios } from "../axios/auth"
import { AxiosResponse } from "axios"
import { HttpResponseRefreshAuthToken, HttpResposenseAuthUser, HttpResposenseLoginUser } from "../types/httpResponse"
import AuthTokenService from "../services/authToken.service"
import { ERROR_API_MESSAGES, ErrorApiMesages } from "../constants/errorApiMessage"
import { handleHttpRequest } from "../utils/handleHttpRequest"

export type LoginUserProps = Record<'username' | 'password', string>

const errorLogInMessage: ErrorApiMesages = new Map([...ERROR_API_MESSAGES, [400, 'username or password is incorect']])


const loginUser = async(userData: LoginUserProps):Promise<AxiosResponse<HttpResposenseLoginUser>> => {
    return await handleHttpRequest<HttpResposenseLoginUser, LoginUserProps>({
        config: {
            url: `${import.meta.env.VITE_AUTH_URL}/login`,
            method: 'post',
            data: userData
        },
        errorMessages: errorLogInMessage
    })
}



const fetchAuthUser = async(): Promise<AxiosResponse<HttpResposenseAuthUser>> => {
    return await handleHttpRequest<HttpResposenseAuthUser>({
        axios: authAxios,
        config: {
            url: '/me'
        }
    })
}

const refreshAuthToken = async(): Promise<AxiosResponse<HttpResponseRefreshAuthToken>> => {
    return await handleHttpRequest<HttpResponseRefreshAuthToken>({
        config: {
            url: `${import.meta.env.VITE_AUTH_URL}/refresh`,
            method: 'post',
            data: {
                refreshToken: AuthTokenService.getToken('refreshToken')
            }
        },
        errorMessages: new Map([...ERROR_API_MESSAGES, [403, 'something is wrong, please login again']])
    })
}





export { loginUser, fetchAuthUser, refreshAuthToken }