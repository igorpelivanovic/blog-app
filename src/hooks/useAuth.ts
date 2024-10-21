import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import { useGetAuthUser } from "../query/auth/user"
import { AxiosResponse, AxiosError } from "axios"
import { SingInUserProps, singInUser } from "../api/auth"
import { AUTH_USER } from "../constants/queryKey"
import AuthTokenService from "../services/authToken.service"
import { HttpResposenseAuthUser } from "../types/httpResponse"
import { IAuthUser } from "../types/auth"

const useAuth = () => {
    const query = useGetAuthUser()
    const queryClient = useQueryClient()

    const setUserData = (userData: undefined | IAuthUser): void => {
        queryClient.setQueryData([AUTH_USER], userData)
        return
    }


    const singIn: UseMutationResult<AxiosResponse<HttpResposenseAuthUser, AxiosError>, AxiosError, SingInUserProps, unknown> = useMutation({
            mutationFn: (userData: SingInUserProps)=>singInUser(userData),
            onSuccess: (response) => {
                const { accessToken, refreshToken, ...user } = response.data
                AuthTokenService.set({accessToken, refreshToken})
                setUserData(user)
                return
        }
    })

    const singOut = (): void => {
        AuthTokenService.clear()
        setUserData(undefined)
    }

    const user: undefined | IAuthUser  = query.data

    return {
        singIn, user, singOut
    }

}

export { useAuth, useSingIn }

const useSingIn = () => {

    const queryClient = useQueryClient()

    return useMutation<AxiosResponse<HttpResposenseAuthUser, AxiosError<unknown, any>>, AxiosError, SingInUserProps, unknown>({
        mutationFn: (userData: SingInUserProps)=>singInUser(userData),
        onSuccess: (response) => {
            const { accessToken, refreshToken, ...user } = response.data
            AuthTokenService.set({accessToken, refreshToken})
            queryClient.setQueryData([AUTH_USER], {data: user})
        }
    })
}

