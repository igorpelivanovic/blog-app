import { immer } from 'zustand/middleware/immer'
import { createWithEqualityFn } from 'zustand/traditional';

type ShowModelFnParams = Record<'isLogin' | 'hasCloseBtn', boolean>

type ShowModelFn = (param?: Partial<ShowModelFnParams>)=>void

type AuthModalContainerStore = {
    isRender: boolean,
    isLogin: boolean,
    hasCloseBtn: boolean,
    hide: () => void
    show: ShowModelFn
}

const useAuthModalStore = createWithEqualityFn<AuthModalContainerStore>()(
    immer((set)=>({
            isRender: false,
            isLogin: true,
            hasCloseBtn: false,
            show: ({isLogin, hasCloseBtn} = {isLogin: true, hasCloseBtn: true})=>set(()=>({isLogin, hasCloseBtn, isRender: true})),
            hide: ()=>set(()=>({isRender: false})),
        })
    )
)

export { useAuthModalStore }