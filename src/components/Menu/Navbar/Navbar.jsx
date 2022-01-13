import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Logo from "./Logo";
import Cart from "./Cart";
import {getProducts} from "../../../redux/products/products.actions";
import classNames from "classnames";

const Navbar = ({toggleNavHandler, toggleNavStatus, handleLogoutUser}) => {
    const dispatch = useDispatch()
    const {currentUser, isAdmin} = useSelector(({auth}) => auth)
    const handleShop = () => dispatch(getProducts())

    return (
        <div className='navbar bg-light navbar--custom'>
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
                <NavLink onClick={handleShop} className='link shop-link' to='/shop'>
                    Shop
                </NavLink>
                {
                    !isAdmin
                        ? null
                        : <NavLink className='link shop-link' to='/admin'>Admin Panel</NavLink>
                }
                {
                    !currentUser
                        ? <NavLink className='link shop-link' to='/login'>LOGIN</NavLink>
                        : <span onClick={handleLogoutUser} className='link shop-link'>LOGOUT</span>
                }
                <Cart/>
            </div>
        </div>
    )
}

export default Navbar