import { FunctionComponent, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchIntervalInBackground: true,
          refetchOnWindowFocus: false,
          suspense: true,
      }
    }
  })
  

const QueryClientProv: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return(
        <QueryClientProvider client={ queryClient }>
            { children }
        </QueryClientProvider>
    )
}

export default QueryClientProv