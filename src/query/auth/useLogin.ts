import { useMutation, useQueryClient } from "react-query"
import { AxiosResponse, AxiosError } from "axios"
import { AUTH_USER } from "../../constants/queryKey"
import AuthTokenService from "../../services/authToken.service"
import { HttpResposenseLoginUser } from "../../types/httpResponse"
import { loginUser, LoginUserProps } from "../../api/auth"


const useLogin = () => {
    
    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<HttpResposenseLoginUser>, AxiosError, LoginUserProps, unknown>({
        mutationFn: (userData: LoginUserProps)=>loginUser(userData),
        onSuccess: (response) => {
            const { accessToken, refreshToken, ...user } = response.data
            AuthTokenService.set({accessToken, refreshToken})
            queryClient.setQueryData([AUTH_USER], {data: user})
        }/* ,
        onError: (error)=>{
            if(error.status !== 400){
                add({text: 'somthing wrong, please try later'})
                return
            }
        }, */

    })
}

export { useLogin }

