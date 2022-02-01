import { useState } from "react"

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"

import { setProductsToCart } from "../../../redux/cart/cart.actions"
import { convertToYesNo } from "../../../utils/dataModification"
import Button from "../../_UI/Button"
import Modal from "../../_UI/Modal"
import TotalQuote from "../TotalQuote"

const LabelsCalculator = () => {
   const dispatch = useDispatch()
   const { productById } = useSelector(({ products }) => products)
   const {
      title,
      calculator
   } = productById

   const [markupType, setMarkupType] = useState("")
   const [labelSizeX, setLabelSizeX] = useState("")
   const [labelSizeY, setLabelSizeY] = useState("")
   const [material, setMaterial] = useState("")
   const [laminated, setLaminated] = useState("")
   const [cutting, setCutting] = useState("")
   const [rotation, setRotation] = useState("")
   const [quantity, setQuantity] = useState("")
   const [price, setPrice] = useState(0)
   const [cartProduct, setCartProducts] = useState({})

   const [loading, setLoading] = useState(false)
   const [showModal, setShowModal] = useState(false)
   const [requestError, setRequestError] = useState(false)

   const onMarkupTypeChange = e => setMarkupType(e.target.value)
   const onLabelSizeXChange = e => setLabelSizeX(e.target.value)
   const onLabelSizeYChange = e => setLabelSizeY(e.target.value)
   const onMaterialChange = e => setMaterial(e.target.value)
   const onLaminatedChange = e => setLaminated(e.target.value)
   const onCuttingChange = e => setCutting(e.target.value)
   const onRotationChange = e => setRotation(e.target.value)
   const onQuantityChange = e => setQuantity(e.target.value)

   const formValidation = () => {
      if (markupType === "") alert("Please, specify Markup Type.")
      else if (labelSizeX === "" || labelSizeY === "") alert("Please, specify Label Size.")
      else if (material === "") alert("Please, specify Material.")
      else if (laminated === "") alert("Please, specify Laminated.")
      else if (cutting === "") alert("Please, specify Cutting.")
      else if (rotation === "") alert("Please, specify Rotation.")
      else if (quantity === "") alert("Please, specify Quantity.")
      else return true
   }

   const checkPriceFromServer = (data) => {
      axios.post("https://flask-react-testing-app.herokuapp.com/", data, { headers: { "Content-Type": "application/json" } })
         .then(response => {
            const price = Number(response.data)
            setPrice(price)
            setLoading(false)
            setCartProducts(prevState => ({
               ...prevState,
               price,
               productImage: productById.images[0]
            }))
         })
         .catch(() => {
            setPrice(0)
            setRequestError(true)
            setLoading(false)
            setShowModal(true)
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
            laminated: +laminated,
            cutting: +cutting,
            rotation: +rotation,
            quantity: +quantity,
            id: uuidv4()
         }
         checkPriceFromServer(JSON.stringify(dataReadyToCheckPrice))
         dataReadyToCheckPrice.laminated = convertToYesNo(dataReadyToCheckPrice.laminated)
         dataReadyToCheckPrice.cutting = convertToYesNo(dataReadyToCheckPrice.cutting)
         dataReadyToCheckPrice.rotation = convertToYesNo(dataReadyToCheckPrice.rotation)
         setCartProducts(dataReadyToCheckPrice)
         setLoading(true)
      }
   }

   const onAddToCartDataReset = () => {
      setMarkupType("")
      setLabelSizeX("")
      setLabelSizeY("")
      setMaterial("")
      setLaminated("")
      setCutting("")
      setRotation("")
      setQuantity("")
      setPrice(0)
   }

   const handleCloseModal = () => {
      setShowModal(false)
      setRequestError(false)
   }

   const onAddProductToCart = () => {
      dispatch(setProductsToCart(cartProduct))
      onAddToCartDataReset()
      setShowModal(true)
   }

   return (
      <div className="calc">
         {
            showModal
               ? <Modal handleCloseModal={handleCloseModal} isError={false} showModal={showModal}
                        top="10rem">Product added to
                  cart!</Modal>
               : null
         }
         {
            requestError
               ? <Modal handleCloseModal={handleCloseModal} isError={true} showModal={showModal}
                        top="0">Error. Please, contact Admin.</Modal>
               : null
         }
         <form onSubmit={onSubmitForm}>
            <div className="calc-markup">
               <h2>Please, choose markup:</h2>
               <select disabled={loading} value={markupType} onChange={onMarkupTypeChange}>
                  <option disabled hidden value="">- Choose -</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
               </select>
            </div>
            <h3>Configure & Price</h3>
            <div className="calc-row">
               <div className="calc-row-name">
                  Label Size (mm):
               </div>
               <div className="calc-row-option--input">
                  <input disabled={loading} min={10} placeholder="X"
                         type="number"
                         value={labelSizeX} onChange={onLabelSizeXChange}/>
                  <input disabled={loading} min={10} placeholder="Y"
                         type="number"
                         value={labelSizeY} onChange={onLabelSizeYChange}/>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Material:
               </div>
               <div className="calc-row-option--select">
                  <select disabled={loading} value={material} onChange={onMaterialChange}>
                     <option disabled hidden value="">- Choose -</option>
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
                  <select disabled={loading} value={laminated} onChange={onLaminatedChange}>
                     <option disabled hidden value="">- Choose -</option>
                     <option value="0">No</option>
                     <option value="1">Yes</option>
                  </select>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Cutting:
               </div>
               <div className="calc-row-option--select">
                  <select disabled={loading} value={cutting} onChange={onCuttingChange}>
                     <option disabled hidden value="">- Choose -</option>
                     <option value="0">No</option>
                     <option value="1">Yes</option>
                  </select>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Rotation:
               </div>
               <div className="calc-row-option--select">
                  <select disabled={loading} value={rotation} onChange={onRotationChange}>
                     <option disabled hidden value="">- Choose -</option>
                     <option value="0">No</option>
                     <option value="1">Yes</option>
                  </select>
               </div>
            </div>
            <div className="calc-row">
               <div className="calc-row-name">
                  Quantity:
               </div>
               <div className="calc-row-option--input--q">
                  <input disabled={loading} min={1} placeholder={"Quantity"}
                         type="number"
                         value={quantity} onChange={onQuantityChange}/>
               </div>
            </div>
            <Button disabled={loading} type="submit">
               Check Price
            </Button>
         </form>
         <TotalQuote isQuoteActive={true}
                     loading={loading}
                     price={price}
                     quantity={quantity}
                     onAddProductToCart={onAddProductToCart}/>
      </div>
   )
}

export default LabelsCalculator