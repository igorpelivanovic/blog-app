import { useQueryClient } from "react-query"
import AuthTokenService from "../services/authToken.service"
import { AUTH_USER } from "../constants/queryKey"

const useLogout = ()=>{
    const queryClient = useQueryClient()
    return ()=>{
        if(AuthTokenService.has()){
            AuthTokenService.clear()
            queryClient.setQueryData([AUTH_USER], undefined)
        }
    }
}

export { useLogout }