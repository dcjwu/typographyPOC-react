import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
   return (
      <Link to="/cart">
         <button className="btn btn-cart btn-outline-primary">
            <FontAwesomeIcon icon={faShoppingCart}/>
         </button>
      </Link>
   )
}

export default Cart