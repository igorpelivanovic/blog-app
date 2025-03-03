import { useQuery } from "react-query"
import { AUTH_USER } from "../../constants/queryKey"
import { fetchAuthUser } from "../../api/auth"
import AuthTokenService from "../../services/authToken.service"

const useGetAuthUser = () => {
    return useQuery({
        queryKey: [AUTH_USER],
        queryFn: fetchAuthUser,
        staleTime: Infinity,
        enabled: AuthTokenService.has(),
        select: (response)=>(({username, email, id})=>({username, email, id}))(response.data),
        retry: 0
    })
}


export { useGetAuthUser }


