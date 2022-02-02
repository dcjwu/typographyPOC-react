import { useCallback, useState } from "react"

import { useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"

import { userLogout } from "../../redux/auth/auth.actions"
import { clearCart } from "../../redux/cart/cart.actions"
import { clearOrder } from "../../redux/order/order.actions"
import Navbar from "./Navbar/Navbar"
import Sidebar from "./Sidebar/Sidebar"

const Menu = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const [toggleNav, setToggleNav] = useState(false)
   if (toggleNav) {
      document.body.style.overflow = "hidden"
   } else {
      document.body.style.overflow = "visible"
   }

   const handleLogoutUser = useCallback(() => {
      dispatch(userLogout())
      dispatch(clearOrder())
      dispatch(clearCart())
      history.push("/login")
   }, [])

   return (
      <>
         <Navbar handleLogoutUser={handleLogoutUser}
                 toggleNavHandler={setToggleNav}
                 toggleNavStatus={toggleNav}
         />
         <Sidebar handleLogoutUser={handleLogoutUser}
                  toggleNavHandler={setToggleNav}
                  toggleNavStatus={toggleNav}
         />
      </>
   )
}

export default Menu