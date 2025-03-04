import { FC, useState } from "react";
import { IoSettings } from "react-icons/io5";
import Modal from "../Modal/Modal";
import { z } from "zod";
import CheckBox from "../ui/Form/CheckBox";
import FormContainer from "../ui/Form/FormContainer";
import CustomImageInput from "../ui/Form/CustomImageInput";
import CustomInput from "../ui/Form/CustomInput";
import ActionContainer from "../ui/Form/ActionContainer";
import { EditUserFormSchema } from "../../validation";
import { useGetAuthUser } from "../../query/auth/user";
import { AlertType, useAlertStore } from "../../state/alertsStore";
import classNames from "classnames";
import { FaRotate, FaTrashCan } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { useEditAuthUser } from "../../query/users/useEditUser";
import LoadingIndicatorAuthForm from "../Auth/LoadingIndicatorAuthForm";
import { ALERTS_MESSAGE_COMMENTS } from "../../constants/alertMessage";


/* const InputFileLabel: string = "Recommended: Square JPEG, JPG, PNG, WEBP, or GIF, max size 5MB"
 */
type FormT = z.infer<typeof EditUserFormSchema>

const EditUser: FC = () => {

    const addAlert = useAlertStore(state=>state.addAlert)

    const mutatuion = useEditAuthUser()

    const [renderModal, setRenderModal] = useState<boolean>(false)

    const { data } = useGetAuthUser()

    if(!data || !mutatuion) return

    const onSubmitForm = async(data: FormT) => {
        try{
            await mutatuion.mutateAsync(data)
            addAlert({text: ALERTS_MESSAGE_COMMENTS.get('update') || '', type: AlertType.success})
            setRenderModal(false)
        }catch(e){

        }
    }


    return (
        <div className="flex">
            <button type="button" className="text-xl" onClick={()=>setRenderModal(true)}>
                <IoSettings className={classNames()} />
            </button>
            {renderModal && (
                <Modal className="shadow-2xl py-2 overflow-hidden" closeButton={true} clickOutSideClose={true} closeModalFn={()=>setRenderModal(false)} >
                    <div className="flex gap-8 flex-col p-1 pb-2 h-full">
                        <div>
                            <p className="text-center text-2xl font-semibold capitalize">edit user</p>
                        </div>
                        <div className="flex-grow flexflex-col overflow-hidden"> 
                            <FormContainer<FormT>  onSubmit={onSubmitForm} className="h-full gap-8 flex flex-col" formParams={{ defaultValues: {username: data.username, isUpdatePassword: false, image: new DataTransfer().files} ,validation: EditUserFormSchema, shouldUnregister: true }} >
                                <div className="flex flex-col flex-grow overflow-y-auto">
                                    <div className="w-fit mx-auto">
                                        <CustomImageInput<FormT> name={'image'} >
                                            {
                                                ({img, add, remove})=>(
                                                    <div className="w-24 aspect-square border-4 border-stone-600 rounded-full overflow-hidden relative group">
                                                        {img && <img src={img} className="absolute top-0 left-0 w-full h-full object-contain bg-stone-400 " />}
                                                        <div className={classNames("flex items-stretch h-full text-xl bg-stone-300 bg-opacity-50 z-10 relative", {"opacity-0 group-hover:opacity-100 transition-opacity": img})}>
                                                            <button type="button" className="flex-1 flex items-center justify-center hover:bg-stone-500 hover:bg-opacity-50 transition-colors" onClick={add}>
                                                                {img ? <FaRotate /> : <FaCamera />} 
                                                            </button>
                                                            {
                                                                img && 
                                                                <button type="button" className="flex-1 flex items-center justify-center hover:bg-stone-500 hover:bg-opacity-50 transition-colors" onClick={remove}>
                                                                    <FaTrashCan />
                                                                </button>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </CustomImageInput>
                                    </div>
                                    <CustomInput<FormT> name="username" label="username" />
                                    <CheckBox<FormT> label="change password" name="isUpdatePassword" />
                                    <ActionContainer>
                                            {
                                                ({watch})=>(
                                                    <>
                                                        {watch('isUpdatePassword') && (
                                                            <>
                                                                <CustomInput<FormT> type="password" name={'password'} label="password" />
                                                                <CustomInput<FormT> type="password" name={'repeatPassword'} label="repeat password" />
                                                            </>
                                                        )}
                                                    </>
                                                )
                                            }
                                    </ActionContainer>
                                </div>
                                <div className="flex gap-3 justify-between mx-auto">
                                    <button type="reset" className="ml-auto mr-0 capitalize  px-4 py-1 rounded">
                                        cancel
                                    </button>
                                    <ActionContainer>
                                            {
                                                ({formState: { isValid, dirtyFields } })=>(
                                                
                                                    <button disabled={ Object.keys(dirtyFields).length  === 0 || !isValid}  type="submit" className="capitalize px-4 py-1 rounded bg-stone-300  disabled:opacity-70">
                                                        save change
                                                    </button>
                                                )
                                            }
                                    </ActionContainer>
                                </div>
                            </FormContainer>
                        </div>
                    </div>
                    {mutatuion.isLoading && <LoadingIndicatorAuthForm />}
                </Modal>
            )}
            
        </div>
    )
}

export default EditUser