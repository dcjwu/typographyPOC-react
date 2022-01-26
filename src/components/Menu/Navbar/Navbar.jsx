import classNames from "classnames"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import Cart from "./Cart"
import Logo from "./Logo"

const Navbar = ({
   toggleNavHandler,
   toggleNavStatus,
   handleLogoutUser
}) => {
   const {
      currentUser,
      isAdmin
   } = useSelector(({ auth }) => auth)

   return (
      <div className="navbar bg-light navbar--custom">
         <div className="container">
            <div className={classNames("nav-icon", { "active": toggleNavStatus })}
               onClick={!toggleNavStatus ? () => toggleNavHandler(true) : null}
            >
               <span/>
               <span/>
               <span/>
            </div>
            <Logo/>
            <NavLink className="link shop-link" to="/shop">
               Shop
            </NavLink>
            {
               !isAdmin
                  ? null
                  : <NavLink className="link shop-link" to="/admin">Admin
                     Panel</NavLink>
            }
            {
               !currentUser
                  ? <NavLink className="link shop-link"
                             to="/login">LOGIN</NavLink>
                  : <span className="link shop-link"
                          onClick={handleLogoutUser}>LOGOUT</span>
            }
            <Cart/>
         </div>
      </div>
   )
}

export default Navbar