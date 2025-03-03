import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";

export enum AlertType {
    success = 'success', 
    info = 'info', 
    error = 'error'
}

export type Alert = {
    id: number,
    text: string,
    type: AlertType
}

export type NewAlert = Omit<Alert, 'id'> & {
    time?: number
}

type AlertsStore = {
    alerts: Alert[]
    addAlert: (newAlert: NewAlert)=>void
}

type RemoveAlertFn = (param: Pick<Alert, 'id'> & Pick<NewAlert, 'time'>)=>void

const DEFAULT_ALERT_TIME: number = 10000;

const useAlertStore = createWithEqualityFn<AlertsStore>()(immer((set)=>{
    return {
        alerts: [],
        addAlert: ({ text, time, type })=>{
            const id = Date.now()
            const formatAlert: Alert = { text, id, type}
            set(({alerts})=>({alerts: [...alerts, formatAlert]}))
            removeAlert({id, time})
        }
    }
}))

const removeAlert: RemoveAlertFn = ({id, time = DEFAULT_ALERT_TIME}) => {
    setTimeout(()=>{
        useAlertStore.setState((state)=>({alerts: state.alerts.filter(alert=>alert.id != id)}))
    }, time)
    return
}

export { useAlertStore }