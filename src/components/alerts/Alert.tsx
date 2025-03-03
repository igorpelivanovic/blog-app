import { FaCircleExclamation, FaCircleCheck,  FaCircleXmark } from "react-icons/fa6";
import { Alert as AlertT, AlertType } from "../../state/alertsStore";
import { FC, useMemo } from "react";
import classNames from "classnames";

type AlertProps = AlertT

type AlertStyle = {
    component: React.ComponentType,
    style: AlertType
}

const ActiveIcon: Record<AlertType, AlertStyle> = {
    success: {
        component: FaCircleCheck,
        style: AlertType.success
    },
    error: {
        component: FaCircleXmark,
        style: AlertType.error
    },
    info: {
        component: FaCircleExclamation,
        style: AlertType.info
    },
}

const Alert: FC<AlertProps> = ( { text, type }) => {

    const { component: Icon, style } = useMemo(()=>ActiveIcon[type], [type]);  

    return (
        <div className={classNames("w-full alert  flex p-2 gap-2 rounded text-xl items-center", style)}>
            <div className="self-start icon p-2 rounded-full">
                <Icon />
            </div>
            <p className="first-letter:capitalize text-base">
                {text}
            </p>
        </div>
    )
}

export default Alert