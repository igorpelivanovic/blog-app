import { z } from "zod"
import FormContainer from "../ui/Form/FormContainer"
import { LoginFormSchema } from "../../validation"
import { useLogin } from "../../query/auth/useLogin"
import { FaUser, FaLock } from "react-icons/fa"
import { useAuthModalStore } from "../../state/authPopUpStore"
import FormErrorMsg from "../ui/Form/FormErrorMsg"
import CustomInput from "../ui/Form/CustomInput"
import ActionContainer from "../ui/Form/ActionContainer"
import LoadingIndicatorAuthForm from "../Auth/LoadingIndicatorAuthForm"

type LoginFormType = z.infer<typeof LoginFormSchema>

const DEFAULT_FORM_DATA: LoginFormType = {
    username: "emilys",
    password: "emilyspass"
}

const LoginForm = () => {

    const { mutateAsync, isLoading, isError, error } = useLogin()
    const { hide, setClickOutSide } = useAuthModalStore((state)=>(({hide, setClickOutSide, clickOutSide})=>({hide, setClickOutSide, clickOutSide}))(state))

    const onSubmitForm = (data: LoginFormType) => {
        setClickOutSide(false)

        mutateAsync(data).then(_=>{
            hide()
        }).catch((e)=>{

        }).finally(()=>{
            setClickOutSide(true)
        })

    }

    return (
        <div>
            {isLoading && <LoadingIndicatorAuthForm />}
            <FormContainer<LoginFormType> onSubmit={onSubmitForm} formParams={{validation: LoginFormSchema, defaultValues: DEFAULT_FORM_DATA,}} className="text-center space-y-4">
                <div className="relative mb-6">
                    <div className="flex flex-col gap-1">
                        <CustomInput<LoginFormType> autoComplete="off" spellCheck="false" name="username" icon={<FaUser />} placeholder="username" />
                        <CustomInput<LoginFormType> autoComplete="off" spellCheck="false" type="password" name="password" icon={<FaLock />} placeholder="password" />
                    </div>
                    {isError && error.status === 400 &&  <FormErrorMsg className="w-full" msg={error.message} />}
                </div>
                <ActionContainer>
                    {
                        ({formState: { isValid }})=>(
                            <button className="first-letter:uppercase text-base bg-neutral-400 py-1 px-5 rounded-lg" disabled={!isValid} type="submit">log in</button>
                        )
                    }
                </ActionContainer>
            </FormContainer>
        </div>
    )
}

export default LoginForm


