import { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios"
import defaultAxiosInstance from "axios"
import { ERROR_API_MESSAGES, ErrorApiMesages } from "../constants/errorApiMessage"

type HandleHttpRequestFnArguments<K> = {
    axios?: AxiosInstance
    config: AxiosRequestConfig<K>
    errorMessages?: ErrorApiMesages
}

type HandleHttpRequestFn = <T = any, K = any>(arg: HandleHttpRequestFnArguments<K>) => Promise<AxiosResponse<T>>

const handleHttpRequest: HandleHttpRequestFn = async({ axios = defaultAxiosInstance, config, errorMessages = ERROR_API_MESSAGES}) => {
    try{
        return await axios(config)
    }catch(e: unknown){
        throw handleErrorMessageHttpResponse(e, errorMessages)
    }
}

const handleErrorMessageHttpResponse = (error: unknown, errorMesages: ErrorApiMesages): unknown => {
    if(isAxiosError(error) && error.status){
        error.message = errorMesages.get(error.status) || errorMesages.get('default') || error.message
    }
    return error
}

export { handleHttpRequest }