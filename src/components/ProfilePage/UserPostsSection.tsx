import { FC, useCallback, useState } from "react";
import PostInifinityList from "../PostList/PostInfinityList";
import { useParams } from "react-router-dom";
import { useGetPostsByUserId } from "../../query/posts/useGetPostsByUserIdPagination";
import LoadSpinner from "../Loader";
import SortForm, { FormT } from "../ui/SortForm";
import { FaRegFileExcel } from "react-icons/fa";
import { useGetUserById } from "../../query/users/useGetUserById";

const UserPostsSection: FC = () => {

    const { userId } = useParams<string>()
    const [ filterParams, setFilterParams ] = useState<FormT>({
        sortBy: 'id'
    })
    const { fetchNextPage, hasNextPage, isLoading, data, isFetching } = useGetPostsByUserId(Number(userId), filterParams, { suspense: false })

    const onChangeFilterParam = useCallback((data: FormT)=>setFilterParams(data),  [])

    return (
        <section className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-3xl font-semibold capitalize">posts</p>
                </div>
                {
                    data?.pages !== undefined && data?.pages.length > 1 && (
                        <div>
                            <SortForm defaultValue={filterParams} onChange={onChangeFilterParam} />
                        </div>
                    )
                }
            </div>
            {isFetching && <LoadSpinner />}
            {data?.pages && (
                <PostInifinityList fetchNextPage={fetchNextPage} noData={<NoResults />} hasMore={hasNextPage} isLoading={isLoading} loader={<LoadSpinner />} posts={data.pages} />
            )}
        </section>
    )   
}

const NoResults: FC = () => {

    const { userId } = useParams<string>()
    const { data: user } = useGetUserById(Number(userId))

    if(!user) return

    return (
        <div className="flex flex-col items-center gap-5 p-20">
            <FaRegFileExcel  className="text-6xl" />
            <p className="text-center text-xl"><span className="capitalize">{user?.username}</span> don't have posts</p>
        </div>
    )
}

export default UserPostsSection