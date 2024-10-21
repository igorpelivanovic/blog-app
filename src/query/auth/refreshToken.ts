import { useMutation } from "react-query"
import AuthTokenService from "../../services/authToken.service"
import { refreshAuthToken } from "../../api/auth"

const useRefreshToken = () => useMutation({
        mutationFn: refreshAuthToken,
        onSuccess: (response)=>{
            AuthTokenService.set(response.data)
            return
        }
    })

export { useRefreshToken }