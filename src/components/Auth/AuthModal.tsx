import { FC } from "react";
import Modal from "../Modal/Modal";
import { useAuthModalStore } from "../../state/authPopUpStore";
import LogInFormContainer from "./LogInFormContainer";
import RegisterFormContainer from "./RegisterFormContainer";
import { AnimatePresence } from "framer-motion";

const AuthModal: FC = () => {

    const { isLogin, hasCloseBtn, clickOutSide, hide } = useAuthModalStore(state=>((({hasCloseBtn, isLogin, hide, clickOutSide})=>({hasCloseBtn, isLogin, hide, clickOutSide}))(state)))
    
    return (
        <Modal clickOutSideClose={hasCloseBtn} closeModalFn={hide} disableOutSide={!clickOutSide} className="shadow-lg shadow-black auth-modal p-0" closeButton={hasCloseBtn}>
            <AnimatePresence initial={false} >
                {isLogin ? <LogInFormContainer key='login' /> : < RegisterFormContainer key='register' />}
            </AnimatePresence>
        </Modal>
    )
}

export default AuthModal
