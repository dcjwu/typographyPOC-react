import { v4 as uuidv4 } from "uuid"

const OrderData = ({ product }) => {

   const {
      title,
      productType,
      price,
      markupType,
      quantity,
      id,
      productImage,
      ...otherData
   } = product

   const sortObjects = (productData) => {
      return Object.entries(productData)
         .sort()
         .reduce((r, [k, v]) => ({
            ...r,
            [k]: v
         }), {})
   }

   let dataKey = []
   let dataValue = []
   for (const [key, value] of Object.entries(sortObjects(otherData))) {
      dataKey.push(key)
      dataValue.push(value)
   }

   return (
      <>
         <div className="order-details-top">
            <div className="order-details-top-left">
               <p>Title:</p>
               <p>Type:</p>
               <p>Quantity:</p>
               <p>Markup:</p>
               <p>Price:</p>
            </div>
            <div className="order-details-top-right">
               <p>{title}</p>
               <p>{productType}</p>
               <p>{quantity}</p>
               <p>{markupType}</p>
               <p>€{price}</p>
            </div>
         </div>
         <div className="order-details-bottom">
            <div className="order-details-bottom-left">
               {
                  dataKey.map(item => (
                     <p key={uuidv4()}>{item}</p>
                  ))
               }
            </div>
            <div className="order-details-bottom-right">
               {
                  dataValue.map(item => (
                     <p key={uuidv4()}>{item}</p>
                  ))
               }
            </div>
         </div>
      </>
   )
}

export default OrderData