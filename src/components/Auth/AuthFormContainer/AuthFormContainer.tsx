import { HTMLMotionProps, motion, TargetAndTransition, Variants } from "framer-motion"
import { FC, PropsWithChildren, ReactNode, useMemo } from "react"
import { useAuthModalStore } from "../../../state/authPopUpStore"

type AuthFormContainerProps = {
    title: string,
    footerContnet?: ReactNode
}

type BaseAnimationStyle = Record<'initial' | 'exit', TargetAndTransition>

const generateAnimation = (val: boolean):HTMLMotionProps<"div">=>{
    return {
        variants: val ? FADE_IN_FROM_RIGHT : FADE_IN_FROM_LEFT,
        initial: 'initial',
        exit: 'exit',
        animate: {
            translateX: "0%",
            opacity: [0, 0, 0, 1],
            transition: {
                ease: 'easeInOut',
                duration: .4,
                times: [0, 0.6, 0.8, 1]
            },
            willChange: 'auto'
        },
        transition: {
            ease: 'easeInOut',
            duration: .4,
            times: [0, 0.2, 0.4, 1]
        },

    }
}

const BASE_ANIMATION_STYLE: BaseAnimationStyle = {
    initial: {
        opacity: [0],
    },
    exit: {
        top: ["50%"],
        left: ["0%"],
        y: ["-50%", "-50%"],
        position: "absolute",
        opacity: [1, 1, 0, 0]
    }
}


const FADE_IN_FROM_LEFT: Variants = {
    initial: {
        ...BASE_ANIMATION_STYLE.initial,
        translateX: "100%",
    },
    exit: {
        ...BASE_ANIMATION_STYLE.exit,
        x: "-100%",
  }
}

const FADE_IN_FROM_RIGHT: Variants = {
    initial: {
        ...BASE_ANIMATION_STYLE.initial,
        translateX: "-100%",
    },
    exit: {
        ...BASE_ANIMATION_STYLE.exit,
        x: "100%"
    }
}



const AuthFormContainer: FC<PropsWithChildren<AuthFormContainerProps>> = ( { title, footerContnet, children }) => {
    
    const isLogin = useAuthModalStore(state=>state.isLogin)

    const animationData = useMemo(()=>generateAnimation(isLogin), [isLogin])

    return (
        <motion.div {...animationData} style={{ willChange: "auto" }} className="space-y-10 w-full px-20">
            <h2 className="text-center first-letter:uppercase text-2xl font-semibold mb-14">{title}</h2>
            {children}
            <div>
                {footerContnet}
            </div>
        </motion.div>
    )
}

export default AuthFormContainer
