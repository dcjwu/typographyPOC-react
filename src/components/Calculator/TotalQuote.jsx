import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import Button from '../_UI/Button'
import Spinner from '../_UI/Spinner'

const TotalQuote = ({quantity, price, loading, addToCartDataReset, isQuoteActive}) => {

   const handleAddToCart = () => {
      if (isQuoteActive) {
            console.log('Added to Cart.')
            addToCartDataReset()
      }
   }

   return (
      <div className="quote">
         <div className="quote-item">
            <p>Quantity</p>
            <p>
               {
                  quantity
                     ? quantity
                     : 0
               }
            </p>
         </div>
         <div className="quote-item">
            <p>Delivery</p>
            <p>3 Jan</p>
         </div>
         <>
            {
               loading
               ? <div className='quote-item'>
                     <Spinner width={50} height={50}/>
                  </div>
                  : <div className="quote-item">
                     <p>Total</p>
                     <p>
                        {
                           price
                              ? price
                              : 0
                        }
                        &nbsp;EUR
                     </p>
                  </div>
            }
         </>
         <Button disabled={!(!!quantity && price !== 0)} onClick={handleAddToCart}>
            Add to Cart
         </Button>
      </div>
   )
}

TotalQuote.propTypes = {
   quantity: PropTypes.string,
   price: PropTypes.number,
   loading: PropTypes.bool
}

export default TotalQuote