import { FieldValues } from "react-hook-form"

const filterChangeFormFields = <T extends FieldValues> ( data: T, fieldsStatus: Partial<Record<keyof T, boolean | boolean[] | object>> ): Partial<T> => {
    return Object.keys(fieldsStatus).reduce((acc, fieldStatusKey)=>{
        const fieldStatus = fieldsStatus[fieldStatusKey]
        if(typeof fieldStatus === 'object' && fieldStatus != null && !Array.isArray(fieldStatus)){
            return {...acc, ...filterChangeFormFields(data[fieldStatusKey], fieldStatus)}
        }
        return {...acc, ...(fieldStatus ? {[fieldStatusKey]: data[fieldStatusKey]} : {})}
    }, {})
}


export { filterChangeFormFields }
