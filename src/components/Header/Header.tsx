import AuthBtns from "./AuthBtns"
import UserPreview from "./UserPreview"
import { Link } from "react-router-dom"
import SearchContainer from "./Search/SearchContainer"
import { useGetAuthUser } from "../../query/auth/user"
import logoUrl from './../../assets/logo.svg'

const Header = () => {

    const { data: userData, isError } = useGetAuthUser()

    return(
        <header>
            <Link to="/" className="order-1">
                <img src={logoUrl} className="md:h-12 h-10" alt="logo_blog_app" />
            </Link>
            <SearchContainer />
            <div className="order-2 sm:order-3">
                {userData && !isError ? <UserPreview /> : <AuthBtns />}
            </div>
        </header>
    )
}


export default Header