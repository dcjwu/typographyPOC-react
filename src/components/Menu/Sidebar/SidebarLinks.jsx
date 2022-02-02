import { useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom"

import AdminSidebarList from "./AdminSidebarList"
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
   const location = useLocation()

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
                             to="/admin/orders"
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
         {
            location.pathname.includes("admin")
               ? <>
                  <h2>Admin Panel</h2>
                  <AdminSidebarList handleClickInside={handleClickInside}/>
               </>
               : <>
                  <h2>Products</h2>
                  <CategoryList handleClickInside={handleClickInside}/>
               </>
         }
      </>
   )
}

export default SidebarLinks