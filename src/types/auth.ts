import { IUser } from "./user";

export interface IAuthUser extends IUser {
    email: string,
}

export interface IAuthTokens extends Record<'accessToken' | 'refreshToken', string> {}