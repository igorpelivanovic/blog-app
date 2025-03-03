import { immer } from 'zustand/middleware/immer'
import { createWithEqualityFn } from 'zustand/traditional';

type ShowModelFnParams = Record<'isLogin' | 'hasCloseBtn' | 'clickOutSide', boolean>

type ShowModelFn = (param?: Partial<ShowModelFnParams>)=>void

type SetClickOutSideFn = (param: boolean) => void

type AuthModalContainerStore = {
    isRender: boolean,
    isLogin: boolean,
    hasCloseBtn: boolean,
    clickOutSide: boolean
    setClickOutSide: SetClickOutSideFn
    hide: () => void
    show: ShowModelFn,
    toggleAuthForm: () => void
}

const useAuthModalStore = createWithEqualityFn<AuthModalContainerStore>()(
    immer((set)=>({
            isRender: false,
            isLogin: true,
            hasCloseBtn: false,
            clickOutSide: true,
            setClickOutSide: (val)=>set(()=>({clickOutSide: val})),
            toggleAuthForm: ()=>set((state)=>({isLogin: !state.isLogin})),
            show: ({isLogin, hasCloseBtn, clickOutSide = true} = {isLogin: true, hasCloseBtn: true})=>set(()=>({isLogin, hasCloseBtn, clickOutSide, isRender: true})),
            hide: ()=>set(()=>({isRender: false})),
        })
    )
)



export { useAuthModalStore }