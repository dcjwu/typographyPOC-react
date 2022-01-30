import { useEffect, useState } from "react"

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"

import Button from "../components/_UI/Button"
import Modal from "../components/_UI/Modal"
import Spinner from "../components/_UI/Spinner"
import FileUpload from "../components/Upload/FileUpload"
import { clearCart, removeProductFromCart } from "../redux/cart/cart.actions"
import { clearOrder, createOrder } from "../redux/order/order.actions"

const Cart = () => {
   const [orderId, setOrderId] = useState(null)
   const [loading, setLoading] = useState(false)
   const [showSuccessModal, setShowSuccessModal] = useState(false)
   const [showErrorModal, setShowErrorModal] = useState(false)
   const [uploadError, setUploadError] = useState("")

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

   const handleCloseModal = () => {
      setShowSuccessModal(false)
      setShowErrorModal(false)
   }

   const handleCreateOrder = () => {
      const timestamp = Date.now()
      const status = "in progress"
      dispatch(createOrder(cart, timestamp, orderId, currentUser, status))
      setShowSuccessModal(true)
      if (!showSuccessModal) {
         dispatch(clearCart())
         dispatch(clearOrder())
      }
   }

   const saveFileToDrive = async orderId => {
      setLoading(true)
      const formData = new FormData()
      formData.append("orderId", orderId)
      axios.post("https://paper-demo-file-upload.herokuapp.com/save", formData, { headers: { "Content-Type": "multipart/form-data" } })
         .then(() => {
            setShowSuccessModal(true)
            setLoading(false)
            handleCreateOrder()
         })
         .catch(err => {
            console.log("error")
            setUploadError(err.response.data)
            setShowErrorModal(true)
            setLoading(false)
         })
   }

   return (
      <>
         {
            loading
               ? <div className="container-content">
                  <Spinner absolute={true} height={400} width={400}/>
               </div>
               : null
         }
         {
            showErrorModal && !loading
               ? <div className="container-content">
                  <Modal handleCloseModal={handleCloseModal} isError={true} showModal={showErrorModal}
                         top="5rem">{uploadError}</Modal>
               </div>
               : showSuccessModal && !loading
                  ? <div className="container-content">
                     <Modal handleCloseModal={handleCloseModal} isError={false} showModal={showSuccessModal}
                            top="5rem">Order was successfully created!</Modal>
                  </div>
                  : !cartProducts.length && !loading
                     ? <div className="alert-warning p-5 text-center">
                        <h2>The cart is empty...</h2>
                        <div className="d-flex gap-5 align-items-center justify-content-center">
                           <Link className="btn btn-outline-warning mt-5" to="/">Home</Link>
                           <Link className="btn btn-outline-warning mt-5" to="/shop">Shop</Link>
                        </div>
                     </div>
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
                           <FileUpload orderId={orderId}/>
                           <div className="cart-total alert-info p-2">
                              <p>Total: {totalPrice.toFixed(2)} EUR</p>
                           </div>
                           <div className="cart-proceed">
                              <Button onClick={goBackToPreviousPage}>Go Back</Button>
                              <Button onClick={() => saveFileToDrive(orderId)}>Create Order</Button>
                           </div>
                        </div>
                     </div>
         }
      </>
   )
}

export default Cart