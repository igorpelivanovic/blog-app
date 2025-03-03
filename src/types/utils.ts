export type Optional<T> = {
    [k in keyof T]?: Optional<T[k]>
}

export type SearchPopUpStoreContext = {
    clickOutSide: ()=>void
}