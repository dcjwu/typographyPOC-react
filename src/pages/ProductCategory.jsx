import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useRouteMatch } from "react-router-dom"

import Spinner from "../components/_UI/Spinner"
import { getFilteredProducts } from "../redux/products/products.actions"

const ProductCategory = () => {
   const { category } = useParams()
   const { url } = useRouteMatch()
   const dispatch = useDispatch()
   const {
      productsByCategory,
      isLoaded
   } = useSelector(({ products }) => products)

   useEffect(() => {
      dispatch(getFilteredProducts(category))
   }, [category])

   return (
      <div className="shop">
         {
            !isLoaded
               ? <Spinner/>
               : productsByCategory && productsByCategory.map(product => (
                  <Link key={product.id} className="shop-card-item"
                     to={`${url}/${product.id}`}>
                     <div className="card">
                        <img alt="Product" className="card-img-top"
                          src={product.imageUrl}/>
                        <div className="card-body">
                           <span className="card-text text-center link">{product.title}</span>
                        </div>
                     </div>
                  </Link>
               ))
         }
      </div>
   )
}

export default ProductCategory