import { AxiosResponse } from "axios"
import { usersAxios } from "../axios/users"
import { ISingleDataApiFnConfigParams } from "../types/api/apiFnParams"
import { IUserUserName } from "../types/user"

interface IGetUserByIdFnParams {
    userId: number
}

/* const getUserById = ({ userId }: IGetUserByIdFnParams): Promise<AxiosResponse<IUserUserName>> => {
    return usersAxios.get<IUserUserName, AxiosResponse<IUserUserName>>(`/${userId}`, {
        params: queryParams
    })
} */

    

const fetchUsernameByIdRequestParams: ISingleDataApiFnConfigParams = {
    'select': 'id,username'
}

const fetchUsernameByUserId = ( userId: number): Promise<AxiosResponse<IUserUserName>> => {
    return usersAxios.get<IUserUserName, AxiosResponse<IUserUserName>>(`/${userId}`, {
        params: fetchUsernameByIdRequestParams
    })
}

export { /* getUserById, */ fetchUsernameByUserId }