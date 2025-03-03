import { IUser } from "../types/user"

type GenerateUserImgArgs = Pick<IUser, 'id'>

type GenerateUserImgFn = (param: GenerateUserImgArgs) => string

const generateUserImg: GenerateUserImgFn = ({id})=>{
    return `${import.meta.env.VITE_USER_IMG_URL}/${formatId(id)}`
}

const formatId = (id: number): number => {
    while(id > 100 ){
        id = Math.floor(id / 10)
    }   

    return id
}

export { generateUserImg }