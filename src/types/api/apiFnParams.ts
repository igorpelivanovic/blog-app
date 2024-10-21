
interface IApiFnConfigParamsBase {
    select?: string 
}
type ApiFnConfigOrderParam = 'asc' | 'desc'

export interface ISingleDataApiFnConfigParams extends IApiFnConfigParamsBase {}

export interface IMultiDataApiFnConfigParams extends IApiFnConfigParamsBase, Partial<Record<'limit' | 'skip', number>>{
    sortBy?: string
    order?: ApiFnConfigOrderParam
}

interface IApiFnParamsBase<T extends ISingleDataApiFnConfigParams | IMultiDataApiFnConfigParams> {
    params?: T
}

export interface ISingleDataApiFnParamsBase extends IApiFnParamsBase<ISingleDataApiFnConfigParams> {} 

export interface IMultiDataApiFnParamsBase extends IApiFnParamsBase <IMultiDataApiFnConfigParams>{} 

