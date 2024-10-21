export type UsernameOfUser = {
    id: number,
    username: string
}

export interface IUser {
    id: number,
    username: string
}

export interface IUserUserName extends Pick<IUser, 'id' | 'username'> {}