import { createContext } from "react";
import useGetContext from "../hooks/useGetContext";
import { SearchPopUpStoreContext } from "../types/utils";

const SearchPopUpContext = createContext<SearchPopUpStoreContext | undefined>(undefined)

const useSearchPopUpContext = ()=> useGetContext(SearchPopUpContext)

export { SearchPopUpContext, useSearchPopUpContext }