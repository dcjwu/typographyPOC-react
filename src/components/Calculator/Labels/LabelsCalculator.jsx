import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setProductsToCart, setTotalPrice} from '../../../redux/cart/cart.actions'
import Button from '../../_UI/Button'
import TotalQuote from '../TotalQuote'

const LabelsCalculator = () => {
   const dispatch = useDispatch()
   const {productById} = useSelector(({products}) => products)
   const {title, calculator} = productById

   const [loading, setLoading] = useState(false)
   const [markupType, setMarkupType] = useState('')
   const [labelSizeX, setLabelSizeX] = useState('')
   const [labelSizeY, setLabelSizeY] = useState('')
   const [material, setMaterial] = useState('')
   const [laminated, setLaminated] = useState('')
   const [cutting, setCutting] = useState('')
   const [rotation, setRotation] = useState('')
   const [quantity, setQuantity] = useState('')
   const [price, setPrice] = useState(0)
   const [cartProduct, setCartProducts] = useState({})

   const onMarkupTypeChange = e => setMarkupType(e.target.value)
   const onLabelSizeXChange = e => setLabelSizeX(e.target.value)
   const onLabelSizeYChange = e => setLabelSizeY(e.target.value)
   const onMaterialChange = e => setMaterial(e.target.value)
   const onLaminatedChange = e => setLaminated(e.target.value)
   const onCuttingChange = e => setCutting(e.target.value)
   const onRotationChange = e => setRotation(e.target.value)
   const onQuantityChange = e => setQuantity(e.target.value)

   const formValidation = () => {
      if (markupType === '') alert('Please, specify Markup Type.')
      else if (labelSizeX === '' || labelSizeY === '') alert('Please, specify Label Size.')
      else if (material === '') alert('Please, specify Material.')
      else if (laminated === '') alert('Please, specify Laminated.')
      else if (cutting === '') alert('Please, specify Cutting.')
      else if (rotation === '') alert('Please, specify Rotation.')
      else if (quantity === '') alert('Please, specify Quantity.')
      else return true
   }

   const checkPriceFromServer = (data) => {
      console.log(data)
         new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve(200)
            }, 1500)
         })
            .then(price => {
               setPrice(price)
               setLoading(false)
               setCartProducts(prevState => ({
                  ...prevState,
                  price
               }))
            })
   }

   const onSubmitForm = e => {
      e.preventDefault()
      const validation = formValidation()
      if (validation) {
         const dataReadyToCheckPrice = {
            title,
            productType: calculator,
            markupType: +markupType,
            labelSizeX: +labelSizeX,
            labelSizeY: +labelSizeY,
            material,
            laminated,
            cutting,
            rotation,
            quantity: +quantity
         }
         setCartProducts(dataReadyToCheckPrice)
         checkPriceFromServer(JSON.stringify(dataReadyToCheckPrice))
         setLoading(true)
      }
   }

   const addToCartDataReset = () => {
      setMarkupType('')
      setLabelSizeX('')
      setLabelSizeY('')
      setMaterial('')
      setLaminated('')
      setCutting('')
      setRotation('')
      setQuantity('')
      setPrice(0)
   }

   const addProductToCart = () => {
      dispatch(setProductsToCart(cartProduct))
      // dispatch(setTotalPrice(price))
      // addToCartDataReset()
   }

   return (
      <div className="calc">
         <form onSubmit={onSubmitForm}>
            <div className="calc-markup">
               <h2>Please, choose markup:</h2>
               <select value={markupType} onChange={onMarkupTypeChange}>
                  <option disabled hidden value="">- Choose -</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
               </select>
            </div>
            <h3>Configure & Price Your Label</h3>
            <div className="calc-row">
               <div className="calc-row-name">
                  Label Size (mm):
               </div>
               <div className="calc-row-option--input">
                  <input type="number" min={10} placeholder="X" value={labelSizeX} onChange={onLabelSizeXChange}/>
                  <input type="number" min={10} placeholder="Y" value={labelSizeY} onChange={onLabelSizeYChange}/>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Material:
               </div>
               <div className="calc-row-option--select">
                  <select value={material} onChange={onMaterialChange}>
                     <option value="" disabled hidden>- Choose -</option>
                     <option value="film">Film</option>
                     <option value="gloss">Gloss</option>
                     <option value="matt">Matt</option>
                     <option value="vinyl">Vinyl</option>
                  </select>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Laminated:
               </div>
               <div className="calc-row-option--select">
                  <select value={laminated} onChange={onLaminatedChange}>
                     <option value="" disabled hidden>- Choose -</option>
                     <option value="no">No</option>
                     <option value="yes">Yes</option>
                  </select>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Cutting:
               </div>
               <div className="calc-row-option--select">
                  <select value={cutting} onChange={onCuttingChange}>
                     <option value="" disabled hidden>- Choose -</option>
                     <option value="no">No</option>
                     <option value="yes">Yes</option>
                  </select>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Rotation:
               </div>
               <div className="calc-row-option--select">
                  <select value={rotation} onChange={onRotationChange}>
                     <option value="" disabled hidden>- Choose -</option>
                     <option value="no">No</option>
                     <option value="yes">Yes</option>
                  </select>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Quantity:
               </div>
               <div className="calc-row-option--input--q">
                  <input type="number" min={1} placeholder={'Quantity'} value={quantity} onChange={onQuantityChange}/>
               </div>
            </div>
            <Button type="submit">
               Check Price
            </Button>
         </form>
         <TotalQuote
            quantity={quantity}
            price={price}
            loading={loading}
            addProdctToCart={addProductToCart}
            isQuoteActive={true}/>
      </div>
   )
}

export default LabelsCalculator