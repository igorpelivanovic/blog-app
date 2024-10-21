import { FC, useId, useState } from "react";
import { IoSettings } from "react-icons/io5";
import Modal from "../Modal/Modal";
import Input from "../ui/Form/Input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckBox from "../ui/Form/CheckBox";
import ImageInput from "../ui/Form/ImageInput";

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp',]

const InputFileLabel: string = "Recommended: Square JPEG, JPG, PNG, WEBP, or GIF, max size 5MB"

const formSchema = z.object({
    image: z.custom<File[]>().refine(files=>ACCEPTED_IMAGE_TYPES.includes(files[0].type), {message: 'prva'}).refine(files=>files[0].size <= MAX_FILE_SIZE).nullable(),
    username: z.string(),
    updatePassword: z.boolean(),
    password: z.string(),
    repeatPassword: z.string()
}).refine(obj=>obj.password === obj.repeatPassword, {
    message: "error",
    path: ['repeatPassword']
})

type FormT = z.infer<typeof formSchema>

const EditUser: FC = () => {

    const [renderModal, setRenderModal] = useState<boolean>(false)

    const { control, handleSubmit, resetField, watch}  = useForm<FormT>({
        defaultValues: {
            image: null,
            username: '',
            password: '',
            repeatPassword: '',
            updatePassword: true
        },
        resolver: zodResolver(formSchema),
    })

    const formId = useId()

    const isUpdatePassword: boolean = watch('updatePassword')

    const onSubmitForm: SubmitHandler<FormT> = (data) => {
        console.log(data)
    }

    return (
        <div className="flex">
            <button type="button" className="text-xl" onClick={()=>setRenderModal(true)}>
                <IoSettings />
            </button>
            {renderModal && (
                <Modal closeButton={true} clickOutSideClose={true} closeModalFn={()=>setRenderModal(false)} >
                    <div className="flex gap-8 flex-col p-1 pb-3 h-full">
                        <div>
                            <p className="text-center text-2xl font-semibold capitalize">edit user</p>
                        </div>
                        <div className="flex-grow flexflex-col overflow-hidden">
                            <form onSubmit={handleSubmit(onSubmitForm)} className="h-full gap-8 flex flex-col">
                                <div className="flex flex-col flex-grow overflow-y-auto">
                                    <ImageInput label={InputFileLabel} imgSrc="https://avatar.iran.liara.run/public" resetField={resetField} accept={ACCEPTED_IMAGE_TYPES.join(', ')} control={control} formId={formId} name="image" />
                                    <Input label={'username'} control={control} formId={formId} resetField={resetField} name={"username"} />
                                    <CheckBox<FormT> label="edit password" control={control} formId={formId} name="updatePassword" />
                                    {isUpdatePassword && (
                                        <>
                                            <Input label={'password'} control={control} formId={formId} resetField={resetField} name={"password"} />
                                            <Input label={'password'} control={control} formId={formId} resetField={resetField} name={"password"} />
                                            <Input label={'password'} control={control} formId={formId} resetField={resetField} name={"password"} />
                                            <Input label={'repeat password'} control={control} formId={formId} resetField={resetField} name={"repeatPassword"} />
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-3 justify-between">
                                    <button type="reset" className="ml-auto mr-0 capitalize">
                                        cancel
                                    </button>
                                    <button type="submit" className="capitalize">
                                        save change
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
            
        </div>
    )
}

export default EditUser