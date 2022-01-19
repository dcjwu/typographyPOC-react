import {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {userLogout} from '../../redux/auth/auth.actions'
import {clearCart} from '../../redux/cart/cart.actions'
import {clearOrder} from '../../redux/order/order.actions'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

const Menu = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const [toggleNav, setToggleNav] = useState(false)
   if (toggleNav) {
      document.body.style.overflow = 'hidden'
   } else {
      document.body.style.overflow = 'visible'
   }

   const handleLogoutUser = useCallback(() => {
      dispatch(userLogout())
      dispatch(clearOrder())
      dispatch(clearCart())
      history.push('/login')
   }, [])

   return (
      <>
         <Navbar
            toggleNavHandler={setToggleNav}
            toggleNavStatus={toggleNav}
            handleLogoutUser={handleLogoutUser}
         />
         <Sidebar
            toggleNavHandler={setToggleNav}
            toggleNavStatus={toggleNav}
            handleLogoutUser={handleLogoutUser}
         />
      </>
   )
}

export default Menu