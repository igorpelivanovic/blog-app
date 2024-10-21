import AuthBtns from "./AuthBtns"
import UserPreview from "./UserPreview"
import { Link } from "react-router-dom"
import SearchContainer from "./Search/SearchContainer"
import { useGetAuthUser } from "../../query/auth/user"


const Header = () => {

    const { data: userData } = useGetAuthUser()

    return(
        <header>
            <Link to="/">
                <img src="./src/assets/logo.svg" className="h-12" alt="logo_blog_app" />
            </Link>
            <SearchContainer />
            {userData ? <UserPreview /> : <AuthBtns />}
        </header>
    )
}


export default Header