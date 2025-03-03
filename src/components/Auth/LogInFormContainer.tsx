import { FC, memo } from "react";
import LoginForm from "../forms/LoginForm";
import AuthFormContainer from "./AuthFormContainer/AuthFormContainer";
import AuthContainerFooter from "./AuthFormContainer/AuthFormContainerFooter";

const CONTAINER_TITLE: string = "welcome back"

const LogInFormContainer: FC = () => {
    return(
        <>
            <AuthFormContainer title={CONTAINER_TITLE} footerContnet={<FooterContent />}>
                <LoginForm />
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
                    <p className="text-center first-letter:uppercase space-x-1"><span>no account?</span>
                        <button type="button" className="first-letter:uppercase font-semibold p-0 text-neutral-950" onClick={onClick}>create account</button>
                    </p>
                )

            }
        </AuthContainerFooter>

    )
})

export default LogInFormContainer