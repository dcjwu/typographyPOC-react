import { memo } from "react"

import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import CategoryList from "./CategoryList"

const SidebarLinks = memo(({
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
               !currentUser
                  ? <NavLink className="link"
                             to="/login"
                             onClick={toggleNavOnClick}>
                     LOGIN
                  </NavLink>
                  : <span className="link shop-link"
                          onClick={handleLogoutUser}>LOGOUT</span>
            }
            {
               !isAdmin
                  ? null
                  : <NavLink className="link shop-link"
                             to="/admin"
                             onClick={toggleNavOnClick}>Admin Panel</NavLink>
            }
         </div>
         <h2 className="mb-3">Categories</h2>
         <CategoryList handleClickInside={handleClickInside}/>
      </>
   )
})

export default SidebarLinks