import { useState } from "react"
import AuthBtns from "./AuthBtns"
import UserPreview from "./UserPreview"
import { Link } from "react-router-dom"

const Header = () => {

    const [ isLogin, setLogin ] = useState<boolean>(false)

    return(
        <header>
            {/* <Link to="/"> */}
                <img src="./src/assets/logo.svg" className="h-12" alt="logo_blog_app" />
{/*             </Link>
 */}            
                <UserPreview></UserPreview>
{/*                 <AuthBtns></AuthBtns>
 */}           
        </header>
    )
}


export default Header