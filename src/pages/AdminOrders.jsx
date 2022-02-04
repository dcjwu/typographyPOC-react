import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"

import Button from "../components/_UI/Button"
import Spinner from "../components/_UI/Spinner"
import Order from "../components/Order"
import { getOrdersFromDB } from "../redux/order/order.actions"

const filterButtons = ["in progress", "completed", "canceled", "show all"]

const AdminOrders = () => {


   const dispatch = useDispatch()
   const {
      orderListFromDb,
      isDataLoaded
   } = useSelector(({ order }) => order)
   useEffect(() => {
      dispatch(getOrdersFromDB())
   }, [])

   const handleFilteredProducts = filter => {
      dispatch(getOrdersFromDB(filter))
   }

   const handleGetAllOrders = () => {
      dispatch(getOrdersFromDB())
   }

   return (
      <>
         {
            !isDataLoaded
               ? <Spinner/>
               : orderListFromDb && orderListFromDb.length === 0
                  ? <>
                     <h1 className="notification-red p-5 text-center">No orders to
                        display...</h1>
                     <div className="container-content">
                        <div className="mt-4">
                           <Button onClick={handleGetAllOrders}>Go Back</Button>
                        </div>
                     </div>
                  </>
                  : <div className="container-content">
                     <h2 className="category-name admin-title">Order List</h2>
                     <div className="admin">
                        <div className="admin-filters">
                           {
                              filterButtons.map(button => {
                                 if (button === "in progress") return <Button key={button}
                                                                              additionalClass="text-capitalize mid"
                                                                              onClick={() => handleFilteredProducts(button)}>{button}</Button>
                                 if (button === "completed") return <Button key={button}
                                                                            additionalClass="text-capitalize mid"
                                                                            onClick={() => handleFilteredProducts(button)}>{button}</Button>
                                 if (button === "canceled") return <Button key={button}
                                                                           additionalClass="text-capitalize mid"
                                                                           onClick={() => handleFilteredProducts(button)}>{button}</Button>
                                 if (button === "show all") return <Button key={button}
                                                                           additionalClass="text-capitalize mid"
                                                                           onClick={() => handleGetAllOrders(button)}>{button}</Button>
                              })
                           }
                        </div>
                        <div className="admin-data">
                           <div className="admin-info">
                              <p className="order-id">Order ID</p>
                              <p className="order-user">User</p>
                              <p className="order-price">Price</p>
                              <p className="order-date">Date</p>
                              <p className="order-status-text">Status</p>
                           </div>
                           {
                              orderListFromDb.map((order, index) => (
                                 <Order key={order.orderId} index={index} order={order}/>
                              ))
                           }
                        </div>
                     </div>
                  </div>
         }
      </>
   )
}

export default AdminOrders