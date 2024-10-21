import axios from "axios";

const usersAxios = axios.create({
    baseURL: import.meta.env.VITE_USERS_URL,
    headers: {
        "Content-Type": 'application/json'
    }
})

export { usersAxios }