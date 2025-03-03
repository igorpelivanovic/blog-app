import { useGetAuthUser } from "../query/auth/user"
import { useAuthModalStore } from "../state/authPopUpStore"

const useCheckAuth= <T extends Function>(fn: T) => {
    const { data: userData } = useGetAuthUser()
    const showAuthModal = useAuthModalStore((state)=> state.show)

    return ()=>{
        if(!userData?.id){
            showAuthModal()
            return
        }
        return fn()
    }
}

export { useCheckAuth }