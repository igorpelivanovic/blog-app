import axios, { InternalAxiosRequestConfig } from "axios";
import AuthTokenService from "../services/authToken.service";

const authAxios = axios.create({
    baseURL: import.meta.env.VITE_AUTH_URL,
    headers: {
        "Content-Type": 'application/json'
    },
    params: {
        auth: true
    }
})

authAxios.interceptors.request.use((request)=>{
    const { params: { auth, ...anotherParams } } = request

    if(auth){
        request = addAuthorizationHeader(request)
    }

    return {...request, params: anotherParams}
})


export { authAxios }


const addAuthorizationHeader = (request: InternalAxiosRequestConfig<any>) => {
    request.headers['Authorization'] = `Bearer ${AuthTokenService.getToken('accessToken')}`
    return request
}

  



