import { HTMLMotionProps, motion } from "framer-motion";
import { FC, memo } from "react";
import { FaUser } from "react-icons/fa";
import { useGetAuthUser } from "../../query/auth/user";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { FaFilePen } from "react-icons/fa6";

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

type UserMenuProps = {
    closeMenuFn: ()=>void
}

const UserMenu: FC<UserMenuProps> = ( { closeMenuFn } ) => {
    
    const { data: userData } = useGetAuthUser()
    const { singOut } = useAuth() 

    const handleClick = () => {
        singOut()
    }

    return(
        <motion.div {...animtionData} className="header-user-menu">
            <ul>
                <li>
                    <Link onClick={closeMenuFn} to={`/profile/${userData?.id}`}><FaUser className="icon"/>profile</Link>
                </li>
                <li>
                    <Link onClick={closeMenuFn} to={`/new-post`}><FaFilePen className="icon"/>write</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <button type="button" className="flex flex-col items-start gap-1" onClick={handleClick}>
                        <span>singout</span>
                        <span className="text-sm normal-case">{userData?.email}</span>
                    </button>
                </li>
            </ul>
        </motion.div>
    )
}


export default memo(UserMenu)