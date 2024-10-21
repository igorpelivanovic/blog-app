import { ComponentProps, FC, PropsWithChildren, useCallback } from "react";
import { FaXmark } from "react-icons/fa6";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { twMerge } from "tailwind-merge";

type ModalProps = PropsWithChildren & ComponentProps<'div'> & {
    closeButton?: boolean,
    closeModalFn?: () => void
    clickOutSideClose?: boolean
    disableOutSide?: boolean
}

const DEFAULT_STYLE_CLASS: string = "bg-white w-[500px] h-[600px] max-h-full mx-auto rounded-md relative content-center p-8"

const Modal: FC<ModalProps> = ( { children, closeButton = true, closeModalFn, clickOutSideClose = false, className, disableOutSide,  ...props } ) => {
    
    const generateOutSideFn = useCallback(()=>{
        if(disableOutSide) return
        return closeModalFn && closeModalFn()
    },[closeModalFn, disableOutSide],)

    const refContainer = useOutsideClick({clickOutSideFn: generateOutSideFn}).ref

    const onCLick = () => {
        if(closeModalFn) {
            closeModalFn()
        }
    }

    return (
        <div className="fixed bg-black inset-0 z-50 pop-up-container content-center">
            <div className={twMerge(DEFAULT_STYLE_CLASS, className)} {...props} ref={refContainer}  >
                { closeButton && closeModalFn && 
                    <button type="button" className="absolute right-3 top-3 text-xl p-1" onClick={onCLick} >
                        <FaXmark />
                    </button> 
                }
                { children }
            </div>
        </div>
    )
}

export default Modal
