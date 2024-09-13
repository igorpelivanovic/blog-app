import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom"
import Header from "./components/Header/Header"
import HomePageHeader from "./components/HomePageHeader/HomePageHeader"
import HomePage from "./page/Home"


function App() {

  return (
    <>
      <Header />
      <HomePage />
{/*       <RouterProvider router={createBrowserRouter(routes)} />
 */}    </>
  )
}

export default App
