import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Modal from '../../_UI/Modal'
import Logo from './Logo'
import Cart from './Cart'
import classNames from 'classnames'

const Navbar = ({toggleNavHandler, toggleNavStatus, handleLogoutUser}) => {
   const {currentUser, isAdmin} = useSelector(({auth}) => auth)

   return (
      <div className="navbar bg-light navbar--custom">
         <div className="container">
            <div onClick={!toggleNavStatus ? () => toggleNavHandler(true) : null}
                 className={classNames('nav-icon', {
                    'active': toggleNavStatus
                 })}
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
                  : <NavLink className="link shop-link" to="/admin">Admin Panel</NavLink>
            }
            {
               !currentUser
                  ? <NavLink className="link shop-link" to="/login">LOGIN</NavLink>
                  : <span onClick={handleLogoutUser} className="link shop-link">LOGOUT</span>
            }
            <Cart/>
         </div>
      </div>
   )
}

export default Navbar