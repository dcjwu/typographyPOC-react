import { useState } from "react"

import moment from "moment"
import { useDispatch } from "react-redux"

import { findCollectionId } from "../redux/order/order.actions"
import Button from "./_UI/Button"
import OrderData from "./OrderData"

const Order = ({
   order,
   index
}) => {
   const dispatch = useDispatch()

   const [showDetails, setShowDetails] = useState(false)
   const [status, setStatus] = useState(order.orderStatus)

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
      dispatch(findCollectionId(orderId, status))
   }

   return (
      <>
         <div className="admin-data-order">
            <p>{order.orderId}</p>
            <p>{order.customerEmail}</p>
            <p>€{order.totalPrice.toFixed(2)}</p>
            <p>{transformedDate()}</p>
            <p className={`text-capitalize ${order.orderStatus === "in progress"
               ? "text-warning"
               : order.orderStatus === "completed"
                  ? "text-success"
                  : "text-error"}`}>{order.orderStatus}</p>
            <Button additionalClass="small" onClick={handleShowDetails}>{showDetails ? "Close" : "Show"}</Button>
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