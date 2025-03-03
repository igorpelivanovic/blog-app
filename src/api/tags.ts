import { AxiosResponse } from "axios";
import { postsAxios } from "../axios/posts";
import { HttpResponseForAllTags } from "../types/httpResponse";
import { handleHttpRequest } from "../utils/handleHttpRequest";

const fetchTags = async(): Promise<AxiosResponse<HttpResponseForAllTags>>=>{
    return await handleHttpRequest<HttpResponseForAllTags>({
        config: {
            url: '/tags'
        },
        axios: postsAxios
    })
}

export { fetchTags }