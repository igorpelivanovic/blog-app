import LoadSpinner from "../../Loader"

const SearchResultLoader: React.FunctionComponent = () =>{
    return(
        <div className="py-2">
            <LoadSpinner></LoadSpinner>
        </div>
    )
}


export default SearchResultLoader