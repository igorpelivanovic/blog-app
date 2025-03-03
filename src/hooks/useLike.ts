import { useCallback, useState } from "react"

type UseLikeArg = {
    initValue: number
}

const useLike = ( { initValue }: UseLikeArg )=>{
    const [ likes, setLikes ] = useState<number>(initValue)
    const [ isLiked, setIsLiked ] = useState<boolean>(false)
    const toggle = useCallback(()=>{
        const newLikesCount = isLiked ? likes-1 : likes+1
        setLikes(newLikesCount)
        setIsLiked(prev=>!prev)
        return newLikesCount
    }, [likes, isLiked])

    return {
        likes,
        isLiked,
        toggle
    }
}

export { useLike }