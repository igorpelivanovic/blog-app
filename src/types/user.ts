export type UsernameOfUser = {
    id: number,
    username: string
}

export type UserGenderType = 'female' | 'male';

export interface IUser {
    id: number,
    username: string
}

export interface EditUserI extends Partial<Omit<IUser, 'id'>>, Partial<Record<'password', string>>{}

export interface IUserUserName extends IUser {}