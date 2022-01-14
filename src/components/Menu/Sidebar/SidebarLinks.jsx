import {memo} from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CategoryList from './CategoryList'

const SidebarLinks = memo(({handleClickInside, handleLogoutUser}) => {
   const {currentUser, isAdmin} = useSelector(({auth}) => auth)
   const toggleNavOnClick = () => handleClickInside()

   return (
      <>
         <div className="nav-toggle-wrapper">
            <NavLink
               className="link"
               to="/shop"
               onClick={toggleNavOnClick}>
               Shop
            </NavLink>
            {
               !currentUser
                  ? <NavLink
                     className="link"
                     to="/login"
                     onClick={toggleNavOnClick}>
                     LOGIN
                  </NavLink>
                  : <span onClick={handleLogoutUser} className="link shop-link">LOGOUT</span>
            }
            {
               !isAdmin
                  ? null
                  : <NavLink
                     className="link shop-link"
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