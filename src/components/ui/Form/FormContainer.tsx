import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, PropsWithChildren, useCallback, useMemo } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";
import { filterChangeFormFields, test } from "../../../utils/filterChangeFormFields";

type FormProps<T extends FieldValues> = Omit<UseFormProps<T>, 'resolver'> & {
    validation?: ZodType<T>
}

type FormContainerProps<T extends FieldValues> = Omit<ComponentProps<'form'>, 'onSubmit'> & {
    onSubmit: (data: T, formInstance: UseFormReturn<T>) => void
    onlyDirty?: boolean
    formParams: FormProps<T>
}


const FormContainer = <T extends FieldValues = any ,> ({ onlyDirty = false, children, onSubmit, formParams: { validation, ...useFormProps}, ...formProps }: PropsWithChildren<FormContainerProps<T>>) => {
    const formInstance = useForm<T>({...useFormProps, resolver: validation ? zodResolver(validation) : undefined})


    const handleSubmit: SubmitHandler<T> = useCallback((data: T)=>{
        onSubmit(data, formInstance)
    }, [formInstance, onSubmit, onlyDirty])

    return (
        <FormProvider {...formInstance}>
            <form onSubmit={formInstance.handleSubmit(handleSubmit)} {...formProps}>
                {children}
            </form>
        </FormProvider>
    )
}

export default FormContainer