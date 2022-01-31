import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import CategoryList from "./CategoryList"

const SidebarLinks = ({
   handleClickInside,
   handleLogoutUser
}) => {
   const {
      currentUser,
      isAdmin
   } = useSelector(({ auth }) => auth)
   const toggleNavOnClick = () => handleClickInside()

   return (
      <>
         <div className="nav-toggle-wrapper">
            <NavLink className="link"
                     to="/shop"
                     onClick={toggleNavOnClick}>
               Shop
            </NavLink>
            {
               !isAdmin
                  ? null
                  : <NavLink className="link shop-link"
                             to="/admin"
                             onClick={toggleNavOnClick}>Admin</NavLink>
            }
            {
               !currentUser
                  ? <NavLink className="link"
                             to="/login"
                             onClick={toggleNavOnClick}>
                     Login
                  </NavLink>
                  : <span className="link shop-link"
                          onClick={handleLogoutUser}>Logout</span>
            }
         </div>
         <h2>Products</h2>
         <CategoryList handleClickInside={handleClickInside}/>
      </>
   )
}

export default SidebarLinks