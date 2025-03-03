import { AxiosResponse } from "axios"
import { usersAxios } from "../axios/users"
import { ISingleDataApiFnConfigParams } from "../types/api/apiFnParams"
import { EditUserI, IUserUserName } from "../types/user"
import { LoginUserProps } from "./auth"
import { HttpResponseRegisterUser } from "../types/httpResponse"
import { handleHttpRequest } from "../utils/handleHttpRequest"
import { IAuthUser } from "../types/auth"

export interface IRegisterUser extends LoginUserProps {
    email: string
}   

const registerUser = async(user: IRegisterUser): Promise<AxiosResponse<HttpResponseRegisterUser>> =>{
    return await handleHttpRequest<HttpResponseRegisterUser, IRegisterUser>({
        config: {
            url: '',
            method: 'post',
            data: user
        },
        axios: usersAxios
    })
}

const fetchUsernameByIdRequestParams: ISingleDataApiFnConfigParams = {
    select: 'id,username'
}

const fetchUsernameByUserId = async( userId: number): Promise<AxiosResponse<IUserUserName>> => {
    return await handleHttpRequest<IUserUserName>({
        config: {
            url: `/${userId}`,
            params: fetchUsernameByIdRequestParams
        },
        axios: usersAxios
    })
}

const editUser = async( { id, data}: {id: number, data: EditUserI}): Promise<AxiosResponse<IAuthUser>>=>{
    return await handleHttpRequest<IAuthUser, EditUserI>({
        config: {
            url: `/${id}`,
            method: 'put',
            data
        },
        axios: usersAxios
    })
}

export { fetchUsernameByUserId, registerUser, editUser }