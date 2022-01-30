import { v4 as uuidv4 } from "uuid"

const OrderData = ({ product }) => {

   const {
      title,
      productType,
      price,
      markupType,
      quantity,
      id,
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

   let dataFromKey = []
   let dataFromValue = []
   for (const [key, value] of Object.entries(sortObjects(otherData))) {
      dataFromKey.push(key)
      dataFromValue.push(value)
   }

   return (
      <div className="order-item">
         <div className="order-item-wrapper header">
            <div className="orders-item-keys">
               <p>Title:</p>
               <p>Type:</p>
               <p>Quantity:</p>
               <p>Markup:</p>
               <p>Price:</p>
            </div>
            <div className="orders-item-values">
               <p>{title}</p>
               <p>{productType}</p>
               <p>{quantity}</p>
               <p>{markupType}</p>
               <p>{price.toFixed(2)}</p>
            </div>
         </div>
         <div className="order-item-wrapper">
            <div className="orders-item-keys">
               {
                  dataFromKey.map(item => (
                     <p key={uuidv4()}>{item}:</p>
                  ))
               }
            </div>
            <div className="orders-item-values">
               {
                  dataFromValue.map(item => (
                     <p key={uuidv4()}>{item}</p>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default OrderData