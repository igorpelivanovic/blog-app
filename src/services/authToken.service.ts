import { AUTH_TOKENS } from "../constants/localStorageKey"
import { IAuthTokens } from "../types/auth"

const token: string = AUTH_TOKENS

const get = (): undefined | IAuthTokens => {
    const storageData = localStorage.getItem(token)
    if(!storageData) return undefined
    return JSON.parse(storageData)
}

const getToken = (param: keyof IAuthTokens): undefined | string => {
   return get()?.[param]
}

const set = (tokens: Partial<IAuthTokens>): void =>{
    localStorage.setItem(token, JSON.stringify({...get(), ...tokens}))
    return
}

const has = (): boolean => {
    return localStorage.getItem(token) !== null
}

const clear = (): void => {
    localStorage.removeItem(token)
    return
}

const AuthTokenService = {
    get, set, has, clear, getToken
}

export default AuthTokenService


