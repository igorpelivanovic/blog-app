import { NewAlert, useAlertStore } from "../state/alertsStore"
import { useAuthModalStore } from "../state/authPopUpStore"
import { useLogout } from "./useLogout"

type UseLoginAgainWithAlertFnReturnFn = (param: NewAlert) => void

type UseLoginAgainWithAlertFn = () =>UseLoginAgainWithAlertFnReturnFn

const useLoginAgainWithAlert: UseLoginAgainWithAlertFn = (  ) => {
    const logout = useLogout()
    const showAuthModal = useAuthModalStore((state)=> state.show)
    const addAlert =  useAlertStore((state)=>state.addAlert)

    return ( alertContent )=>{
        logout()
        showAuthModal()
        addAlert(alertContent)
    }

}

export { useLoginAgainWithAlert }