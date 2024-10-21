import { FC, useCallback, useState } from "react";
import PostInifinityList from "../PostList/PostInfinityList";
import { useParams } from "react-router-dom";
import { useGetPostsByUserId } from "../../query/posts/useGetPostsByUserIdPagination";
import LoadSpinner from "../Loader";
import SortForm, { FormT } from "../ui/SortForm";


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
                    data?.pages.length && (
                        <div>
                            <SortForm defaultValue={filterParams} onChange={onChangeFilterParam} />
                        </div>
                    )
                }
            </div>
            {isFetching && <LoadSpinner />}
            {data?.pages && (
                <PostInifinityList fetchNextPage={fetchNextPage} hasMore={hasNextPage} isLoading={isLoading} loader={<LoadSpinner />} posts={data.pages} />
            )}
        </section>
    )   
}

export default UserPostsSection