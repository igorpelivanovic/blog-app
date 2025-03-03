import { ComponentProps, FC, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { generateUserImg } from "../../utils/generateUserImg";
import NoUserImage from "../../assets/images/no-user-img.png"

const defaultStyle: string = "size-28 rounded-full border-4 border-black overflow-hidden";

type UserImgProps = ComponentProps<'div'> & {
    idUser: number
}

const UserImg: FC<UserImgProps> = ( { className, idUser, ...props}) => {

    const styleContainer = twMerge(defaultStyle, className)

    const imageSrc = useMemo(()=>generateUserImg({id: idUser}), [idUser])

    const onErrorImg: React.ReactEventHandler<HTMLImageElement> = useCallback(({currentTarget})=>{
        currentTarget.src = NoUserImage
        currentTarget.onerror = null
    }, [])

    return (
        <div className={styleContainer} {...props}>
            <img alt="user_img" src={imageSrc} onError={onErrorImg} />
        </div>
    )
}

export default UserImg