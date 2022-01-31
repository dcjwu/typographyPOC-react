import { useEffect } from "react"

import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Spinner from "../components/_UI/Spinner"
import Calculator from "../components/Calculator/Calculator"
import GalleryCarousel from "../components/GalleryCarousel"
import { clearProductById, getProductById } from "../redux/products/products.actions"

const ProductPage = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const {
      productById,
      isLoaded
   } = useSelector(({ products }) => products)
   const { currentUser } = useSelector(({ auth }) => auth)

   useEffect(() => {
      dispatch(getProductById(+id))
      return () => {
         dispatch(clearProductById())
      }
   }, [id])

   return (
      <>
         {
            !currentUser
               ? <h1 className="alert-danger notification-red text-center">Please, Sign In to
                  view this Page!</h1>
               : <div className="product">
                  {
                     !isLoaded
                        ? <Spinner/>
                        : productById &&
                        <div className="container-content product-page">
                           <h2>{productById.title}</h2>
                           <hr/>
                           <div className="product-wrapper">
                              <div className="product-header">
                                 <GalleryCarousel images={productById.images}/>
                                 <ul>
                                    <li>
                                       <FontAwesomeIcon icon={faCheck}/>
                                       <small>Additional Description...</small>
                                    </li>
                                    <li>
                                       <FontAwesomeIcon icon={faCheck}/>
                                       <small>Additional Description...</small>
                                    </li>
                                    <li>
                                       <FontAwesomeIcon icon={faCheck}/>
                                       <small>Additional Description...</small>
                                    </li>
                                    <li>
                                       <FontAwesomeIcon icon={faCheck}/>
                                       <small>Additional Description...</small>
                                    </li>
                                 </ul>
                              </div>
                              <Calculator calculatorType={productById.calculator}/>
                           </div>
                        </div>
                  }
               </div>
         }
      </>
   )
}

export default ProductPage