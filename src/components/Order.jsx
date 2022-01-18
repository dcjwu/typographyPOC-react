import {useState} from 'react'
import moment from 'moment'
import Button from './_UI/Button'
import OrderData from './OrderData'

const Order = ({order, index}) => {
   const [showDetails, setShowDetails] = useState(false)

   const handleShowDetails = () => {
      setShowDetails(true)
      if (showDetails) {
         setShowDetails(false)
      }
   }

   const transformedDate = () => {
      return moment(order.dateCreated).format('DD/MM/YYYY HH:mm')
   }

   return (
      <div className="order">
         <div className="order-header">
            <p className="order-count">{index + 1}.</p>
            <p className="order-info text-primary">{order.orderId}</p>
            <p className="order-info text-success">{order.totalPrice} EUR</p>
            <p className="order-info text-success">{transformedDate()}</p>
            <Button onClick={handleShowDetails}>{showDetails ? 'Close' : 'Show'}</Button>
         </div>
         {
            !showDetails
               ? null
               : <div className='order-data'>
                  {
                     order.cartProducts.map((product, index) => (
                        <OrderData key={product.id} product={product}/>
                     ))
                  }
               </div>
         }
      </div>
   )
}

export default Order