import React from "react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type ListContainerProps<T> = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
    data: T[],
    children: (data:T, index: number)=>ReactNode
    keyField?: keyof T
    noData?: ReactNode
}

const ListContainer = <T extends any = any, > ({ data, keyField, children, noData= <p>don't have data</p>, ...props }: ListContainerProps<T> ) => {
    return (
        <>
            {data.length > 0 ? 
            <div {...props}>
                {data.map((el, index)=><React.Fragment key={keyField ? el[keyField]?.toString(): index} >
                    {children(el, index)}
                </React.Fragment>)}
            </div>
            :
                noData
            }
        </>
        
    )
}

export default ListContainer