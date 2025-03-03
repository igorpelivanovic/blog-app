import { useMutation, useQueryClient } from "react-query";
import { EditUserI } from "../../types/user";
import { editUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { useGetAuthUser } from "../auth/user";
import { AUTH_USER, USERS } from "../../constants/queryKey";

const useEditAuthUser = () => {
    const queryClient = useQueryClient()
    const { data: userData} = useGetAuthUser()
    const navigate = useNavigate()

    if(!userData){
        navigate("/sing-in")
        return 
    }    

    return useMutation({
        mutationFn: (data: EditUserI)=> editUser({id: userData.id, data}),
        onSuccess: ({data})=>{
            queryClient.setQueryData([AUTH_USER], {data})
            queryClient.setQueryData([USERS, userData.id], (({username , id})=>({data: {username,id} }))(data))
            return
        }
    })
}
export { useEditAuthUser }