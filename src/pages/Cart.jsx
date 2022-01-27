import { useEffect, useState } from "react"

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import Button from "../components/_UI/Button"
import Modal from "../components/_UI/Modal"
import FileUpload from "../components/FileUpload"
import { clearCart, removeProductFromCart } from "../redux/cart/cart.actions"
import { clearOrder, createOrder } from "../redux/order/order.actions"

const Cart = () => {
   const [showModal, setShowModal] = useState(false)
   const [orderId, setOrderId] = useState(null)

   const history = useHistory()
   const goBackToPreviousPage = () => {
      history.goBack()
   }
   const dispatch = useDispatch()
   const cart = useSelector(({ cart }) => cart)
   const { currentUser } = useSelector(({ auth }) => auth)
   const {
      cartProducts,
      totalPrice
   } = cart

   useEffect(() => {
      if (cartProducts.length) {
         setOrderId(uuidv4())
      }
   }, [])

   const onRemoveProductFromCart = id => {
      dispatch(removeProductFromCart(id))
   }

   const handleCreateOrder = () => {
      const timestamp = Date.now()
      const status = "in progress"
      dispatch(createOrder(cart, timestamp, orderId, currentUser, status))
      setShowModal(true)
      setTimeout(() => {
         setShowModal(false)
         history.push("/")
         dispatch(clearCart())
         dispatch(clearOrder())
      }, 500)
   }

   return (
      <>
         {
            showModal
               ? <div className="container-content">
                  <Modal isError={false} top="5rem">Order was successfully created!</Modal>
               </div>
               : !cartProducts.length
                  ? <h2 className="alert-warning p-5 text-center">The cart is
                     empty...</h2>
                  : <div className="container-content">
                     <div className="cart">
                        <div className="cart-wrapper">
                           {
                              cartProducts && cartProducts.map(product => (
                                 <div key={uuidv4()} className="cart-item">
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
                                    <div className="cart-item-data">
                                       <p>Quantity: {product.quantity}</p>
                                       <p>Price: {product.price.toFixed(2)} EUR</p>
                                       <button className="text-danger"
                                               onClick={() => onRemoveProductFromCart(product.id)}>
                                          <FontAwesomeIcon icon={faTrashAlt}/>
                                       </button>
                                    </div>
                                 </div>
                              ))
                           }
                        </div>
                        <div className="cart-total alert-info p-2">
                           <p>Total: {totalPrice.toFixed(2)} EUR</p>
                        </div>
                        <FileUpload orderId={orderId}/>
                        <div className="cart-proceed">
                           <Button onClick={goBackToPreviousPage}>Go Back</Button>
                           <Button onClick={handleCreateOrder}>Create Order</Button>
                        </div>
                     </div>
                  </div>
         }
      </>
   )
}

export default Cart