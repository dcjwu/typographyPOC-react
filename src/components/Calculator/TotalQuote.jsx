import { useEffect, useState } from "react"

import PropTypes from "prop-types"

import Button from "../_UI/Button"
import Spinner from "../_UI/Spinner"

const TotalQuote = ({
   quantity,
   price,
   loading,
   onAddProductToCart,
   isQuoteActive
}) => {
   const [priceForEach, setPriceForEach] = useState("")

   const handleAddToCart = () => {
      if (isQuoteActive) {
         onAddProductToCart()
      }
   }

   useEffect(() => {
      if (price) {
         setPriceForEach((price / quantity).toFixed(2))
      }
   }, [price])

   return (
      <div className="quote">
         <div className="quote-wrapper">
            <div className="quote-top">
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
            </div>
            <div className="quote-bottom">
               <div className="quote-item total">
                  <p className="cost">Printing Cost</p>
                  <div className="cost-price">
                     {
                        loading
                           ? <Spinner height={75} width={75}/>
                           : <>
                              <p className="cost-total">
                                 €
                                 {
                                    price
                                       ? price
                                       : 0
                                 }
                              </p>
                              <small>€{priceForEach ? priceForEach : 0} for each</small>
                           </>
                     }
                  </div>
               </div>
            </div>
         </div>
         <Button disabled={!(!!quantity && price !== 0)}
                 onClick={handleAddToCart}>
            Add to Cart
         </Button>
      </div>
   )
}

TotalQuote.propTypes = {
   quantity: PropTypes.string,
   loading: PropTypes.bool
}

export default TotalQuote