import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "../routes";

const router = createBrowserRouter(routes)

const RouterProv: FC = () => {

    return (
        <>
          <RouterProvider router={router} />
        </>
    )
}

export default RouterProv