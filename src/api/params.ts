

export type ParamsForApi = Partial<Record<'select' | 'q' | 'sortBy', string> & Record<'limit' | 'skip', number> & Record<'order', 'asc' | 'desc'>>

export const paramsForPaginationPosts: ParamsForApi = {
    select: "id,title,tags,reactions,views",
    sortBy: "views",
    order: "desc",
    limit: 12
}