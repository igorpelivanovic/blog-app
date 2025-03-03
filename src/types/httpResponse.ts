import { ReactElement } from 'react';
import { IAuthUser, IAuthTokens } from './auth';
import { TagResponse } from './tag';
import { HttpErrorKey } from '../constants/errorApiMessage';

export type HttpResponseHeaderForArrayDataBase = Record<'total' | 'skip' | 'limit', number>

export type HttpResponseHeaderForArrayData<T> = T & HttpResponseHeaderForArrayDataBase

export type HttpResponseForAllTags = TagResponse[]

export type HttpResposenseAuthUser = IAuthUser

export type HttpResposenseLoginUser = IAuthUser & IAuthTokens

export type HttpResponseRegisterUser = Pick<IAuthUser, 'id'>

export type HttpResponseRefreshAuthToken = IAuthTokens

type HttpHandleContent = {
    title: string
    icon?: ReactElement 
}

export type ErrorBoundaryHttpHandleContent = Record<HttpErrorKey, HttpHandleContent>