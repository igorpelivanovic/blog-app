import { ComponentProps, FC } from "react";
import SingInContainer from "./singin/SingInContainer";
import Modal from "../Modal/Modal";
import { useAuthModalStore } from "../../state/authPopUpStore";
import SingUpContainer from "./singup/SingUpContainer";

type Prop = ComponentProps<typeof Modal>

const AuthModal: FC = () => {

    const { isLogin, hasCloseBtn, hide } = useAuthModalStore(state=>((({hasCloseBtn, isLogin, hide})=>({hasCloseBtn, isLogin, hide}))(state)))

    return (
        <Modal clickOutSideClose={hasCloseBtn} closeModalFn={hide} closeButton={hasCloseBtn}>
            <div className="space-y-10 w-3/4 mx-auto">
                {isLogin ? <SingInContainer />:
                <SingUpContainer />}
            </div>
        </Modal>
    )
}

export default AuthModal