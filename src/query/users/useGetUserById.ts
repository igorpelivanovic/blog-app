import { useQuery } from "react-query"
import { USERS } from "../../constants/queryKey"
import { fetchUsernameByUserId } from "../../api/users"

const useGetUserById = (userId: number) => {
    return useQuery({
        queryKey: [ USERS, userId ],
        queryFn: () => fetchUsernameByUserId(userId),
        select: (response) => response.data})
}

export { useGetUserById }