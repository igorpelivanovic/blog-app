import { DeepMap, DeepPartial, FieldValues } from "react-hook-form"

const filterChangeFormFields = <T extends FieldValues> ( data: T, fieldsStatus: Partial<Readonly<DeepMap<DeepPartial<T>, boolean>>> ): Partial<T> => {
  return Object.entries(fieldsStatus).reduce((acc, [key, fieldStatus])=>{
        if(typeof fieldStatus === 'object' && fieldStatus != null && !Array.isArray(fieldStatus)){
            return {...acc, ...filterChangeFormFields(data[key], fieldStatus)}
        }
        return {...acc, ...(fieldStatus ? {[key]: data[key]} : {})}
    }, {})
}


export { filterChangeFormFields, test }


const test =  <
TData extends Record<keyof TDirtyItems, unknown>,
TDirtyItems extends Record<string, unknown>,
>(
formValues: TData,
dirtyItems: TDirtyItems,
): Partial<TData> => {
return Object.entries(dirtyItems).reduce((dirtyData, [key, value]) => {
  if (value === false) return dirtyData;
  if (value === true) return { ...dirtyData, [key]: true };

  const child = test(
    formValues[key] as TData,
    dirtyItems[key] as TDirtyItems,
  );

  if (typeof child === 'object' && Object.keys(child).length === 0) {
    return dirtyData;
  }

  if (Array.isArray(child) && child.length === 0) {
    return dirtyData;
  }

  return {
    ...dirtyData,
    [key]: child,
  };
}, {});
};


