import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Order from '../components/Order'
import {getOrdersFromDB} from '../redux/order/order.actions'

const Admin = () => {
   const dispatch = useDispatch()
   const {orderListFromDb} = useSelector(({order}) => order)

   useEffect(() => {
      dispatch(getOrdersFromDB())
   }, [])

   return (
      <>
         {
            orderListFromDb && orderListFromDb.length === 0
               ? <h1 className="alert-warning p-5 text-center">No active orders...</h1>
               : <div className="container-content">
                  <h1 className="admin-header">Order list:</h1>
                  {
                     orderListFromDb.map((order, index) => (
                        <Order key={order.orderId} order={order} index={index}/>
                     ))
                  }
               </div>
         }
      </>
   )
}

export default Admin