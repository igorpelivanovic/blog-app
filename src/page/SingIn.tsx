import { FunctionComponent, useEffect } from "react";
import { useAuthModalStore } from "../state/authPopUpStore";

const SingInPage: FunctionComponent = () => {

    const renderAuthPopUp = useAuthModalStore((state)=>state.show)

    useEffect(()=>renderAuthPopUp({isLogin: true, hasCloseBtn: false}),[])

    return <>
        test
    </>
}

export default SingInPage