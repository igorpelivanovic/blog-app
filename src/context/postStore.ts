import { createContext } from "react";
import { PreviewPost } from "../types/post";
import useGetContext from "../hooks/useGetContext";

const PostContext = createContext<PreviewPost | undefined>(undefined)

const usePostContext = ()=> useGetContext(PostContext)

export { PostContext, usePostContext }