import {FaSignInAlt,FaUser,FaSignOutAlt} from "react-icons/fa"
import { Link,useNavigate } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { logout,reset } from "../features/auth/authSlice"

export default function Header() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
    const onLogout=()=>{
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }
  return (
    <header className="header">
        <div className="logo">
            <Link to="/">Digital-connect</Link>
        </div>
        <ul>
            {user?(<li>
                <button className="logout" onClick={onLogout}>
                    <FaSignOutAlt/>Logout
                </button>
            </li>):(<> <li>
                <Link to="/login">
                    <FaSignInAlt/>Sign in
                </Link>
            </li>
            <li>
                <Link to="/register">
                    <FaUser/>Sign up
                </Link>
            </li></>)}
           
        </ul>
    </header>
  )
}
