import { HTMLMotionProps, motion } from "framer-motion";
import { FaUser } from "react-icons/fa";

const animtionData: HTMLMotionProps<"div"> = {
    initial: {
        height: 0,
        opacity: 0
    },
    animate: {
        height: "auto",
        opacity: 1
    },
    transition: {
        ease: "linear", 
        duration: .2,
        opacity: {
            duration: .1,
        }
    },
    exit: {
        opacity: 0,
        height: 0

    }
}

const UserMenu = () => {
    return(
        <motion.div {...animtionData} className="header-user-menu">
            <ul>
                <li>
                    <a href=""><FaUser className="text-lg"/>profile</a>
                </li>
            </ul>
            <ul>
                <li>
                    <button type="button" className="flex flex-col gap-1">
                        <span>logout</span>
                        <span className="text-sm normal-case">user@mail.com</span>
                    </button>
                </li>
            </ul>
        </motion.div>
    )
}


export default UserMenu