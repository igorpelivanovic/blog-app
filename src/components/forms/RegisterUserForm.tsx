import { z } from "zod"
import CustomInput from "../ui/Form/CustomInput"
import FormContainer from "../ui/Form/FormContainer"
import { RegisterFormSchema } from "../../validation"
import { IoMail } from "react-icons/io5"
import { FaLock, FaUser } from "react-icons/fa"
import { useAuthModalStore } from "../../state/authPopUpStore"
import { useRegisterUser } from "../../query/auth/useRegister"
import LoadingIndicatorAuthForm from "../Auth/LoadingIndicatorAuthForm"
import ActionContainer from "../ui/Form/ActionContainer"

type RegisterForm = z.infer<typeof RegisterFormSchema>

const RegisterUserForm = () => {

    const {hideModal, setClickOutSide } = useAuthModalStore((state)=>(({hide, setClickOutSide})=>({hideModal: hide, setClickOutSide}))(state))

    const { mutateAsync, isLoading } = useRegisterUser()

    const onSubmitForm = (data: RegisterForm) => {
        setClickOutSide(false)
        mutateAsync(data).then(_=>hideModal()).catch((e)=>{
            console.log(e)
        })
        return
   }

    return (
        <div>
            {isLoading && <LoadingIndicatorAuthForm />}
            <FormContainer<RegisterForm> className="text-center" onSubmit={onSubmitForm} formParams={{validation: RegisterFormSchema}}>
                <div className="relative mb-6">
                    <div className="flex flex-col gap-1">
                    <CustomInput<RegisterForm> name="email" type="email" icon={<IoMail />} placeholder="email" />
                    <CustomInput<RegisterForm> name="username" icon={<FaUser />} placeholder="username" />
                    <CustomInput<RegisterForm> name="password" type="password" icon={<FaLock />} placeholder="password"  />
                    <CustomInput<RegisterForm> name="repeatPassword" type="password"  icon={<FaLock />} placeholder="repeat password" />
                    </div>
{/*                     {isError && <FormErrorMsg className="w-full" msg={error.message} />}
 */}                </div>
                <ActionContainer>
                    {
                        ({formState: { isValid }})=>(
                            <button className="first-letter:uppercase text-base bg-neutral-400 py-1 px-5 rounded-lg" disabled={isLoading || !isValid} type="submit">register</button>
                        )
                    }
                    </ActionContainer>
            </FormContainer>
        </div>
    )
}

export default RegisterUserForm
