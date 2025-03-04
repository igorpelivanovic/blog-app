import { useAlertStore } from "../../state/alertsStore"
import Alert from "./Alert"

const AlertsContainer = () => {

    const alerts = useAlertStore((state)=>state.alerts)

    return (
        <div className="left-1/2 -translate-x-1/2 z-50 space-y-2 min-w-64 max-w-96 max-h-96 overflow-hidden alerts-container">
            {alerts.map(alert=><Alert key={alert.id} {...alert}></Alert>)}
        </div>
    )
}

export default AlertsContainer