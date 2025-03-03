import { postsAxios } from "../axios/posts";
import { HttpResponseHeaderForArrayData } from "../types/httpResponse";
import { AxiosResponse } from "axios";
import { DeletedPost, NewPost, NewPostResponse, Post, PreviewPost, UpdatePost } from "../types/post";
import { ParamsForApi, paramsForPaginationPosts } from "./params";
import { authAxios } from "../axios/auth";
import { handleHttpRequest } from "../utils/handleHttpRequest";


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

const fetchPosts = async({ skip }: FetchPostsParams): Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  const configApiParams: ParamsForApi = {...paramsForPaginationPosts, skip}
  return await handleHttpRequest<HttpResponseHeaderForArrayData<IPostsResponse>>({
    config: {
      params: configApiParams
    },
    axios: postsAxios
  })
}


type FetchPostsBySearchParams = FetchPostsParams & Required<Pick<PostsApiParams, 'q'>>

const fetchPostsBySearch = async(userParams: FetchPostsBySearchParams):  Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  const configApiParams: ParamsForApi = {...paramsForPaginationPosts, ...userParams}
  return await handleHttpRequest<HttpResponseHeaderForArrayData<IPostsResponse>>({
    config: {
      params: configApiParams
    },
    axios: postsAxios
  })
}


const fetchPostsByUserId = async( userId: number, params?: PostsApiParams): Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  return await handleHttpRequest<HttpResponseHeaderForArrayData<IPostsResponse>>({
    config: {
      params: {...defQueryParamsPreviewPosts, ...params},
      url: `/user/${userId}`
    },
    axios: postsAxios
  })
}


type FetchPostsByTagParams = {
  tagId: string
  params?: FetchPostsParams
}

const fetchPostsByTag = async({ tagId, params: userParams }: FetchPostsByTagParams): Promise<AxiosResponse<HttpResponseHeaderForArrayData<IPostsResponse>>> => {
  const configApiparams: ParamsForApi = {...paramsForPaginationPosts, ...userParams}
  return await handleHttpRequest<HttpResponseHeaderForArrayData<IPostsResponse>>({
    config: {
      params: configApiparams,
      url: `/tag/${tagId}`
    },
    axios: postsAxios
  })
}

const fetchPostById = async (postId: number): Promise<AxiosResponse<Post>> => {
  return await handleHttpRequest<Post>({
    axios: postsAxios,
    config: {
      url: `/${postId}`
    }
  })
}

const createPost = async(post: NewPost): Promise<AxiosResponse<NewPostResponse>> => {
  return await handleHttpRequest<NewPostResponse>({
    config: {
      url: `${import.meta.env.VITE_POST_PREFIX}/add`,
      data: post,
      method: 'post'
    },
    axios: authAxios
  })
}

const deletePost = async(id: number): Promise<AxiosResponse<DeletedPost>> => {
  return await handleHttpRequest<DeletedPost>({
    config: {
      method: 'delete',
      url: `${import.meta.env.VITE_POST_PREFIX}/${id}`
    },
    axios: authAxios
  })
}

const updatePost = async({id, ...postData}: UpdatePost): Promise<AxiosResponse<Post>> => {
  return await handleHttpRequest<Post>({
    config: {
      url: `${import.meta.env.VITE_POST_PREFIX}/${id}`,
      data: postData,
      method: 'put'
    },
    axios: authAxios
  })
}

export { 
  fetchPosts, 
  fetchPostsBySearch, 
  fetchPostsByTag, 
  fetchPostsByUserId, 
  fetchPostById,
  createPost,
  updatePost,
  deletePost
 };
