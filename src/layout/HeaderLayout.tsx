import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header"

const HeaderLayout = () => {
    return( 
        <>
            <Header />
            <main className="container mx-auto space-y-10 px-36 py-5">
                <Outlet />
            </main>
        </>
    )
}

export default HeaderLayout