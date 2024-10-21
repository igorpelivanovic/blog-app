import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent, useId } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaUser } from "react-icons/fa";
import { z } from "zod";
import LoadingIndicatorAuthForm from "../Loading";
import { useSingIn } from "../../../hooks/useAuth";
import { useAuthModalStore } from "../../../state/authPopUpStore";
import FormErrorMsg from "../../ui/Form/FormErrorMsg";
import Input from "../../ui/Form/Input";

const formSingInSchema = z.object({
    username: z.string().trim().min(1, 'username is required field'),
    password: z.string().trim().min(1, 'password is required field')
})

type formSingIn = z.infer<typeof formSingInSchema>

const SingInForm: FunctionComponent = () => {

    const { handleSubmit, control, resetField } = useForm<formSingIn>({
        defaultValues: {
            username: "emilys",
            password: "emilyspass"
        },
        resolver: zodResolver(formSingInSchema)
    })
    const hideAuthPopUpContainer = useAuthModalStore((state)=>state.hide)

    const { mutateAsync, isLoading, isError, error } = useSingIn()


    const formId: string = useId()

    const onSubmitForm = (data: formSingIn) => {
        mutateAsync(data).then(_=>{
            hideAuthPopUpContainer()
        })
        
    }

    return (
        <>
            <div className="auth-form-container">
                {isLoading && <LoadingIndicatorAuthForm />}
                <form onSubmit={handleSubmit(onSubmitForm)} className="text-center space-y-4">
                    <div className="relative mb-6">
                        <div className="flex flex-col gap-1">
                            <Input autoComplete="off" spellCheck="false" formId={formId} resetField={resetField} control={control} name="username" icon={<FaUser />} placeholder="username" />
                            <Input autoComplete="off" spellCheck="false" formId={formId} resetField={resetField} control={control} type="password" name="password" icon={<FaLock />} placeholder="password" />
                        </div>
                        {isError && <FormErrorMsg className="w-full" msg={error.message} />}
                    </div>
                    <button className="first-letter:uppercase text-base bg-red-700 py-1 px-5 rounded-lg" type="submit">sing in</button>
                </form>
            </div>
        </>
    )
}

export default SingInForm