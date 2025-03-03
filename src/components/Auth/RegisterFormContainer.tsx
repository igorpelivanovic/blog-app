import { FC, memo } from "react";
import RegisterUserForm from "../forms/RegisterUserForm";
import AuthContainerFooter from "./AuthFormContainer/AuthFormContainerFooter";
import AuthFormContainer from "./AuthFormContainer/AuthFormContainer";

const CONTAINER_TITLE: string = 'join us'

const RegisterFormContainer: FC = () => {
    return(
        <>
            <AuthFormContainer title={CONTAINER_TITLE} footerContnet={<FooterContent />}>
                <RegisterUserForm />
            </AuthFormContainer>
        </>
    )
}

const FooterContent: FC = memo(()=>{
    return (
        <AuthContainerFooter>
            {
                (onClick)=>
                (
                    <p className="text-center first-letter:uppercase space-x-1"><span>alredy have account?</span>
                        <button type="button" className="first-letter:uppercase font-semibold p-0 text-neutral-950" onClick={onClick}>login</button>
                    </p>
                )

            }
        </AuthContainerFooter>
    )
})




export default RegisterFormContainer