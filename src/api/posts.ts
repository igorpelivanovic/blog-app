import { postsAxios } from "../axios/posts";
import { HttpResponseHeaderForArrayData } from "../types/httpResponse";
import { AxiosResponse } from "axios";
import { DeletedPost, NewPost, NewPostResponse, Post, PreviewPost } from "../types/post";
import { ParamsForApi, paramsForPaginationPosts } from "./params";


export type PostsApiParams = Partial<Record<'select' | 'sortBy' | 'order' | 'q', string> & Record<'limit' | 'skip', number>>

const selectFields: string[] = ['id', 'title', 'tags', 'reactions', 'views']

export const sortByValues = [ 'views', 'id' ] as const

export const defQueryParamsPreviewPosts: PostsApiParams = {
  select: selectFields.join(','),
  sortBy: "views",
  order: "desc",
  limit: 12
}

export interface IPostsResponse {
  posts: PreviewPost[]
}


type FetchPostsParams = Pick<PostsApiParams, 'skip'>

const fetchPosts = ({ skip }: FetchPostsParams): Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  const configApiParams: ParamsForApi = {...paramsForPaginationPosts, skip}
  return postsAxios.get<HttpResponseHeaderForArrayData<IPostsResponse>>('', {params: configApiParams})
}


type FetchPostsBySearchParams = FetchPostsParams & Required<Pick<PostsApiParams, 'q'>>

const fetchPostsBySearch = (userParams: FetchPostsBySearchParams):  Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  const configApiParams: ParamsForApi = {...paramsForPaginationPosts, ...userParams}
  return postsAxios.get<HttpResponseHeaderForArrayData<IPostsResponse>>('/search', {params: configApiParams})
}


const fetchPostsByUserId = ( userId: number, params?: PostsApiParams): Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  return postsAxios.get<HttpResponseHeaderForArrayData<IPostsResponse>>(`/user/${userId}`, {
    params: {...defQueryParamsPreviewPosts, ...params}
  })
}


type FetchPostsByTagParams = {
  tagId: string
  params?: FetchPostsParams
}

const fetchPostsByTag = ({ tagId, params: userParams }: FetchPostsByTagParams): Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  const configApiparams: ParamsForApi = {...paramsForPaginationPosts, ...userParams}
  return postsAxios.get<HttpResponseHeaderForArrayData<IPostsResponse>>(`/tag/${tagId}`, {
    params: configApiparams
  })
}

const fetchPostById = async (postId: number): Promise<AxiosResponse<Post>> => {
  return postsAxios.get<Post>(`/${postId}`)
}

const createPost = (post: NewPost): Promise<AxiosResponse<NewPostResponse>> => {
  return postsAxios.post<NewPostResponse>('/add', post)
}

const deletePost = (id: number): Promise<AxiosResponse<DeletedPost>> => {
  return postsAxios.delete<DeletedPost>(`/${id}?delay=5000`)
}

export { 
  fetchPosts, 
  fetchPostsBySearch, 
  fetchPostsByTag, 
  fetchPostsByUserId, 
  fetchPostById,
  createPost,
  deletePost
 };
