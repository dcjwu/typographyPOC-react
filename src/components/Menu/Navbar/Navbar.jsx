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
      <div className="navbar bg-white navbar--custom">
         <div className="container">
            <div className={classNames("nav-icon", { "active": toggleNavStatus })}
               onClick={!toggleNavStatus ? () => toggleNavHandler(true) : null}
            >
               <span/>
               <span/>
               <span/>
            </div>
            <Logo/>
            <div className="navbar-right">
               <NavLink className="link shop-link" to="/shop">
                  Shop
               </NavLink>
               {
                  !isAdmin
                     ? null
                     : <NavLink className="link shop-link" to="/admin/orders">Admin</NavLink>
               }
               {
                  !currentUser
                     ? <NavLink className="link shop-link"
                                to="/login">Login</NavLink>
                     : <span className="link shop-link"
                             onClick={handleLogoutUser}>Logout</span>
               }
               <Cart/>
            </div>
         </div>
      </div>
   )
}

export default Navbar