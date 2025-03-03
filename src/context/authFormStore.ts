import { createContext } from "react";
import useGetContext from "../hooks/useGetContext";

export type AuthFormType = {
    status: boolean
    toggle: ()=>void
}

const AuthFormContext = createContext<AuthFormType | null>(null)

const useAuthFormContext = ()=> useGetContext(AuthFormContext)

export { useAuthFormContext, AuthFormContext }

