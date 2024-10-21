import axios, { AxiosInstance } from "axios";

const commentsAxios: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_COMMENTS_URL,
    headers: {
        "Content-Type": 'application/json'
    }
})

export { commentsAxios }