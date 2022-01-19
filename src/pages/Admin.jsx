import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Button from '../components/_UI/Button'
import Spinner from '../components/_UI/Spinner'
import Order from '../components/Order'
import {getOrdersFromDB} from '../redux/order/order.actions'

const filterButtons = ['in progress', 'completed', 'canceled']

const Admin = () => {
   const history = useHistory()

   const dispatch = useDispatch()
   const {orderListFromDb, isDataLoaded} = useSelector(({order}) => order)
   useEffect(() => {
      dispatch(getOrdersFromDB())
   }, [])

   const handleFilteredProducts = filter => {
      dispatch(getOrdersFromDB(filter))
   }

   const handleGoBack = () => {
      dispatch(getOrdersFromDB())
   }

   return (
      <>
         {
            !isDataLoaded
               ? <Spinner/>
               : orderListFromDb && orderListFromDb.length === 0
                  ? <>
                     <h1 className="alert-warning p-5 text-center">No orders to display...</h1>
                     <div className='text-center mt-4'>
                        <Button onClick={handleGoBack}>Go Back</Button>
                     </div>
                  </>
                  : <div className="container-content">
                     <div className="admin-top">
                        <h1 className="admin-header">Order list:</h1>
                        <div className="admin-filters">
                           {
                              filterButtons.map(button => {
                                 if (button === 'in progress') return <Button key={button}
                                                                              onClick={() => handleFilteredProducts(button)}
                                                                              additionalClass="text-capitalize btn-outline-warning">{button}</Button>
                                 if (button === 'completed') return <Button key={button}
                                                                            onClick={() => handleFilteredProducts(button)}
                                                                            additionalClass="text-capitalize btn-outline-success">{button}</Button>
                                 if (button === 'canceled') return <Button key={button}
                                                                           onClick={() => handleFilteredProducts(button)}
                                                                           additionalClass="text-capitalize btn-outline-danger">{button}</Button>
                              })
                           }
                        </div>
                     </div>
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