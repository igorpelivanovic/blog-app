import { Context, useContext } from "react"

const useGetContext = <T = any>( contextKey: Context<T>) => {
    const context = useContext(contextKey)
    if(!context) throw Error("D'not have context data")
    return context
}

export default useGetContext