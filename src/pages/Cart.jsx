import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import Button from '../components/_UI/Button'
import {removeProductFromCart} from '../redux/cart/cart.actions'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Cart = () => {
   const history = useHistory()
   const goBackToPreviousPage = () => {
      history.goBack()
   }
   const dispatch = useDispatch()
   const {cartProducts, totalPrice} = useSelector(({cart}) => cart)

   const onRemoveProductFromCart = id => {
      dispatch(removeProductFromCart(id))
   }

   return (
      <>
         {
            cartProducts.length === 0
               ? <h2 className="alert-warning p-5 text-center">The cart is empty...</h2>
               : <div className="container-content">
                  <div className="cart">
                     <div className="cart-wrapper">
                        {
                           cartProducts && cartProducts.map(product => (
                              <div className="cart-item" key={uuidv4()}>
                                 <div className="cart-item-name">
                                    <h5>{product.title}</h5>
                                    <div className="details">
                                       <div className="row-item">
                                          <p>Size X:</p>
                                          <p>{product.labelSizeX}</p>
                                       </div>
                                       <div className="row-item">
                                          <p>Size Y:</p>
                                          <p>{product.labelSizeY}</p>
                                       </div>
                                       <div className="row-item">
                                          <p>Material:</p>
                                          <p>{product.material}</p>
                                       </div>
                                       <div className="row-item">
                                          <p>Laminated:</p>
                                          <p>{product.laminated}</p>
                                       </div>
                                       <div className="row-item">
                                          <p>Cutting</p>
                                          <p>{product.cutting}</p>
                                       </div>
                                       <div className="row-item">
                                          <p>Rotation:</p>
                                          <p>{product.rotation}</p>
                                       </div>
                                    </div>
                                 </div>
                                 <p>Quantity: {product.quantity}</p>
                                 <p>Price: {product.price} EUR</p>
                                 <button onClick={() => onRemoveProductFromCart(product.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                 </button>
                              </div>
                           ))
                        }
                     </div>
                     <div className="cart-total alert-info p-2">
                        <p>Total {totalPrice} EUR</p>
                     </div>
                     <div className="cart-proceed">
                        <Button onClick={goBackToPreviousPage}>Go Back</Button>
                        <Button>Pay Now</Button>
                     </div>
                  </div>
               </div>
         }
      </>
   )
}

export default Cart