import { useMutation } from "react-query"
import { IRegisterUser, registerUser } from "../../api/users"

const useRegisterUser = () =>{
    return useMutation({
        mutationFn: (data: IRegisterUser)=>registerUser(data),
        retry: 0
    })
}

export { useRegisterUser }