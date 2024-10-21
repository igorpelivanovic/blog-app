import axios, { AxiosInstance } from "axios";

const postsAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_POSTS_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { postsAxios };
