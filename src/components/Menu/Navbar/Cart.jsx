import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Cart = () => {
   return (
      <Link to="/cart">
         <button className="btn btn-cart">
            <FontAwesomeIcon icon={faShoppingCart}/>
            <span>Cart</span>
         </button>
      </Link>
   )
}

export default Cart