import { FC, memo, ReactNode, useCallback } from "react"
import { useAuthModalStore } from "../../../state/authPopUpStore"

type AuthContainerFooterProps = {
    children: (param :()=>void)=>ReactNode
}

const AuthContainerFooter: FC<AuthContainerFooterProps> = memo(({children}) => {

    const { toggle } = useAuthModalStore((state)=>(({toggleAuthForm})=>({toggle: toggleAuthForm}))(state))
    const onClickBtn = useCallback(toggle, [toggle])

    return(
        <>
            {children(onClickBtn)}
        </>
    )
})

export default AuthContainerFooter