import { useQuery } from "react-query"
import { TAGS } from "../../constants/queryKey"
import { fetchTags } from "../../api/tags"

const useGetTags = ()=>{
    return useQuery({
        queryKey: [TAGS],
        queryFn: fetchTags,
        staleTime: 24*60*60*1000,
        select: (data)=> data.data.map(el=>el.slug)})
}

export { useGetTags}