import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useId } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { z } from "zod";
import { useAuthModalStore } from "../../../state/authPopUpStore";
import { IoMail } from "react-icons/io5";
import Input from "../../ui/Form/Input";


const formSingInSchema = z.object({
    username: z.string().trim().min(1, 'username is required field'),
    email: z.string().trim().min(1, 'email is required field').email('email is invalid'),
    password: z.string().trim().min(1, 'password is required field')
})

type formSingIn = z.infer<typeof formSingInSchema>

const SingUpForm: FunctionComponent = () => {

    const { handleSubmit, control, resetField } = useForm<formSingIn>({
        resolver: zodResolver(formSingInSchema)
    })

    const hideModal = useAuthModalStore((state)=>state.hide)

    const formId: string = useId()

    const onSubmitForm = (data: formSingIn) => {
        hideModal()
    }

    return (
        <>
            <div className="auth-form-container" >
{/*                  {isLoading && <LoadingIndicatorAuthForm />}
 */}                <form onSubmit={handleSubmit(onSubmitForm)} className="text-center space-y-4">
                    <div className="flex flex-col gap-1">
                        <Input autoComplete="off" spellCheck="false" formId={formId} resetField={resetField} control={control} type="email" name="email" icon={<IoMail />} placeholder="email" />
                        <Input autoComplete="off" spellCheck="false" formId={formId} resetField={resetField} control={control} name="username" icon={<FaUser />} placeholder="username" />
                        <Input autoComplete="off" spellCheck="false" formId={formId} resetField={resetField} control={control} type="password" name="password" icon={<FaLock />} placeholder="password" />
                    </div>
                    <button className="first-letter:uppercase text-base bg-red-700 py-1 px-5 rounded-lg" type="submit">sing up</button>
                </form>
            </div>
        </>
    )
}

export default SingUpForm