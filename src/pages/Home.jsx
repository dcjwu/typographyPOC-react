import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../components/_UI/Modal";
import {setLoginSuccessMessage} from "../redux/auth/auth.actions";
import homeImage from '../assets/images/home-header.png'

const Home = () => {
    const dispatch = useDispatch()
    const {showSuccessMessage} = useSelector(({auth}) => auth)

    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoginSuccessMessage(false))
        }, 2000)
    }, [])

    return (
        <div className='home'>
            {
                showSuccessMessage
                    ? <Modal/>
                    : null
            }
            <img src={homeImage} alt="Header"/>
            <h1 className='title'>Website description.</h1>
            <div className="home-text-container">
                <small>*This website was made as the demo version to present a minimum product.
                    <br/>
                    *All additional or specific functionality can be discussed.
                </small>
                <div className='d-flex align-items-center justify-content-center gap-5'>
                    <small>
                        <b>ADMIN</b>
                        <p>email: a@d.min</p>
                        <p>password: admin0</p>
                    </small>
                    <small>
                        <b>USER</b>
                        <p>email: u@s.er</p>
                        <p>password: user00</p>
                    </small>
                </div>
                <dl>
                    <dt><span>Logo</span> will redirect you to this [Home] page.</dt>
                    <dt><span>Shop</span> will redirect you to check all products.</dt>
                    {/*<dd>On the shop page you can see all possible categories and search field. As*/}
                    {/*    well, categories are displayed on the left under <b>Categories</b>. By clicking on a*/}
                    {/*    category you can choose product, configure it and add it to cart.*/}
                    {/*</dd>*/}
                    {/*<dt><span>Cart logo</span> will redirect you to the cart page.</dt>*/}
                    {/*<dd>There you will see options chosen for a particular product and price.</dd>*/}
                </dl>
            </div>
        </div>
    )
}

export default Home