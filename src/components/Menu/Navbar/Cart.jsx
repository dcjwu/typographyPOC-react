import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Cart = () => {
   return (
      <Link to="/cart">
         <span className="btn-cart">
            <FontAwesomeIcon icon={faShoppingCart}/>
            <span>Cart</span>
         </span>
      </Link>
   )
}

export default Cart