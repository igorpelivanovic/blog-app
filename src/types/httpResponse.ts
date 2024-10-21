import { IAuthUser, IAuthTokens } from './auth';
import { TagResponse } from './tag';

export type HttpResponseHeaderForArrayDataBase = Record<'total' | 'skip' | 'limit', number>

export type HttpResponseHeaderForArrayData<T> = T & HttpResponseHeaderForArrayDataBase

export type HttpResponseForAllTags = TagResponse[]

export type HttpResposenseAuthUser = IAuthUser & IAuthTokens

export type HttpResponseRefreshAuthToken = IAuthTokens