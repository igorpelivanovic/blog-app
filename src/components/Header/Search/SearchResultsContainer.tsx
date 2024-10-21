import { Suspense } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import LoadSpinner from "../../Loader";
import SearchResultsContent from "./SearchResultContent";

type SearchResultProps = {
  searchValue: string;
};

const SearchResultsContainer: React.FunctionComponent<SearchResultProps> = ({
  searchValue: searchValueProps,
}) => {
  const searchValue = useDebounce(searchValueProps, 400);

  return (
    <>
      <Suspense fallback={<LoadSpinner />}>
        <SearchResultsContent searchValue={searchValue} />
      </Suspense>
    </>
  );
};

export default SearchResultsContainer;
