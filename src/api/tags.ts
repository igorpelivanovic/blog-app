import { AxiosResponse } from "axios";
import { postsAxios } from "../axios/posts";
import { HttpResponseForAllTags } from "../types/httpResponse";

const fetchTags = async(): Promise<AxiosResponse<HttpResponseForAllTags>>=>{
    return postsAxios.get<HttpResponseForAllTags>('/tags')
}

export { fetchTags }