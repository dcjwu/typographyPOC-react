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
      <div className="order">
         <div className="order-header mb-2">
            <p className="order-count">{index + 1}.</p>
            <p className="order-info text-primary text-center">{order.orderId}</p>
            <p className="order-info text-primary text-center">{order.customerEmail}</p>
            <p className="order-info text-secondary text-center">{order.totalPrice.toFixed(2)} EUR</p>
            <p className="order-info text-secondary text-center">{transformedDate()}</p>
            <Button onClick={handleShowDetails}>{showDetails ? "Close" : "Show"}</Button>
         </div>
         <p className={`order-info ${order.orderStatus === "in progress"
            ? "text-warning"
            : order.orderStatus === "completed"
               ? "text-success"
               : "text-danger"} text-center`}
         >{order.orderStatus}</p>
         {
            !showDetails
               ? null
               : <div className="mt-2">
                  <div className="status">
                     <p>Order Status:</p>
                     <select value={status} onChange={handleStatusChange}>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="canceled">Canceled</option>
                     </select>
                  </div>
                  <div className="order-data">
                     {
                        order.cartProducts.map(product => (
                           <OrderData key={product.id} product={product}/>
                        ))
                     }
                  </div>
                  <div className="text-center mt-3">
                     <Button onClick={() => saveNewOrderStatus(order.orderId)}>
                        Save
                     </Button>
                  </div>
               </div>
         }
      </div>
   )
}

export default Order