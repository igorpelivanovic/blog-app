export interface IAuthUser {
    id: number,
    username: string,
    email: string
}

export interface IAuthTokens extends Record<'accessToken' | 'refreshToken', string> {}