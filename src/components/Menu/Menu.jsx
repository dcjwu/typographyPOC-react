import {useCallback, useState} from 'react'
import {useDispatch} from 'react-redux'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import {userLogout} from '../../redux/auth/auth.actions'

const Menu = () => {
   const dispatch = useDispatch()
   const [toggleNav, setToggleNav] = useState(false)
   if (toggleNav) {
      document.body.style.overflow = 'hidden'
   } else {
      document.body.style.overflow = 'visible'
   }

   const handleLogoutUser = useCallback(() => {
      dispatch(userLogout())
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