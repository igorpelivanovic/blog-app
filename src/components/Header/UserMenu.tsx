import { HTMLMotionProps, motion } from "framer-motion";
import { FC, memo } from "react";
import { FaUser } from "react-icons/fa";
import { useGetAuthUser } from "../../query/auth/user";
import { Link } from "react-router-dom";
import { FaFilePen } from "react-icons/fa6";
import { useLogout } from "../../hooks/useLogout";

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
    const logout = useLogout() 

    const handleClick = () => {
        logout()
    }

    return(
        <motion.div {...animtionData} className="header-user-menu">
            <ul className="top-menu-container text-text">
                <li>
                    <Link className="hover:text-stone-600" onClick={closeMenuFn} to={`/profile/${userData?.id}`}><FaUser className="icon "/>profile</Link>
                </li>
                <li>
                    <Link className="hover:text-stone-600" onClick={closeMenuFn} to={`/new-post`}><FaFilePen className="icon "/>write</Link>
                </li>
            </ul>
            <ul className="bottom-menu-container">
                <li>
                    <button type="button" onClick={handleClick} className="hover:bg-stone-300 hover:bg-opacity-40">
                        <span>singout</span>
                        <span className="text-sm normal-case">{userData?.email}</span>
                    </button>
                </li>
            </ul>
        </motion.div>
    )
}


export default memo(UserMenu)