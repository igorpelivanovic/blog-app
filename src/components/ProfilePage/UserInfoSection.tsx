import { FC } from "react";
import UserImg from "../ui/UserImg";
import { useParams } from "react-router-dom";
import { useGetUserById } from "../../query/users/useGetUserById";
import { useGetAuthUser } from "../../query/auth/user";
import EditUser from "./EditUser";

const UserInfoSection: FC = () => {

    const { userId } = useParams<string>()

    if(!userId) return null

    const { data: authUser } = useGetAuthUser()
    const { data } = useGetUserById(Number(userId))

     if(!data ) return null 


    return (
        <section className="pt-5 pb-7 border-b">
            <div className="flex items-center gap-6">
                <UserImg className="border-stone-600" idUser={parseInt(userId)}  />
                <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">{data.username}</p>
                    {authUser?.id === data?.id && (
                        <EditUser />
                    )}
                </div>
            </div>
        </section>
    )
}

export default UserInfoSection