import { ComponentProps, FC } from "react";
import { twMerge } from "tailwind-merge";

const imgAtr: ComponentProps<'img'> = {
    src: "https://avatar.iran.liara.run/public",
    alt: 'user img'
}

const defaultStyle: string = "size-28 rounded-full border-4 border-black overflow-hidden";

type UserImgProps = ComponentProps<'div'>

const UserImg: FC<UserImgProps> = ( { className, ...props}) => {

    const styleContainer = twMerge(defaultStyle, className)

    return (
        <div className={styleContainer} {...props}>
            <img {...imgAtr} />
        </div>
    )
}

export default UserImg