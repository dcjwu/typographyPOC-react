import { useState } from "react"

import axios from "axios"
import moment from "moment"
import { useDispatch } from "react-redux"

import { findCollectionId } from "../redux/order/order.actions"
import { prodServerUrl } from "../utils/constants"
import Button from "./_UI/Button"
import SpinnerSmall from "./_UI/SpinnerSmall"
import OrderData from "./OrderData"

const Order = ({ order }) => {
   const dispatch = useDispatch()

   const [showDetails, setShowDetails] = useState(false)
   const [status, setStatus] = useState(order.orderStatus)
   const [loading, setLoading] = useState(false)

   const handleShowDetails = () => {
      setShowDetails(true)
      if (showDetails) {
         setShowDetails(false)
      }
   }

   const handleStatusChange = e => setStatus(e.target.value)

   const transformedDate = () => moment(order.dateCreated).format("DD/MM/YYYY HH:mm")

   const saveNewOrderStatus = orderId => {
      if (order.orderStatus === status) {
         return
      }
      dispatch(findCollectionId(orderId, status, null))
   }

   const getDesignLink = orderId => {
      setLoading(true)
      const formData = new FormData()
      formData.append("orderId", orderId)
      axios.post(`${prodServerUrl}/get-link`, formData, { headers: { "Content-Type": "multipart/form-data" } })
         .then(res => {
            dispatch(findCollectionId(orderId, null, res.data))
            setLoading(false)
         })
         .catch(err => {
            console.log(err)
            setLoading(false)
         })
   }

   return (
      <>
         <div className="admin-data-order">
            <p className="order-id">{order.orderId}</p>
            <p className="order-user">{order.customerEmail}</p>
            <p className="order-price">€{order.totalPrice.toFixed(2)}</p>
            <p className="order-date">{transformedDate()}</p>
            <p className={`order-status-text text-capitalize ${order.orderStatus === "in progress"
               ? "text-warning"
               : order.orderStatus === "completed"
                  ? "text-success"
                  : "text-error"}`}>{order.orderStatus}</p>
            <button className="btn btn-custom small"
                    onClick={handleShowDetails}>{showDetails ? "Close" : "Show"}</button>
         </div>
         {
            !showDetails
               ? null
               : <>
                  <div className="admin-details">
                     <div className="order-status">
                        <p>Order Status:</p>
                        <select value={status} onChange={handleStatusChange}>
                           <option value="in progress">In Progress</option>
                           <option value="completed">Completed</option>
                           <option value="canceled">Canceled</option>
                        </select>
                        <Button additionalClass="small" onClick={() => saveNewOrderStatus(order.orderId)}>
                           Save
                        </Button>
                     </div>
                     <div className="order-status">
                        {
                           order.design && order.designLink
                              ? <a className="btn btn-custom small" href={order.designLink} rel="noreferrer"
                                   target="_blank">Show Design</a>
                              : order.design
                                 ? <Button additionalClass="small success" style={{ width: "12.5rem" }}
                                           onClick={() => getDesignLink(order.orderId)}>
                                    {
                                       loading
                                          ? <SpinnerSmall/>
                                          : "Get Design Link"
                                    }
                                 </Button>
                                 : <Button additionalClass="small error disabled">No Design Uploaded</Button>
                        }
                     </div>
                     <div className="order-data">
                        {
                           order.cartProducts.map(product => (
                              <div key={product.id} className="order-details">
                                 <OrderData product={product}/>
                              </div>
                           ))
                        }
                     </div>
                  </div>
               </>
         }
      </>
   )
}

export default Order