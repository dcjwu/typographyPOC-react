import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link, useRouteMatch } from "react-router-dom"

import { getProducts } from "../redux/products/products.actions"
import Spinner from "./_UI/Spinner"

const Products = () => {
   const { url } = useRouteMatch()
   const dispatch = useDispatch()
   const {
      productList,
      isLoaded
   } = useSelector(({ products }) => products)

   useEffect(() => {
      if (productList === null) {
         dispatch(getProducts())
      }
   }, [])

   return (
      <>
         {
            !isLoaded
               ? <Spinner/>
               : productList && productList.map(product => (
                  <Link key={product.id} className="shop-card-item"
                     to={`${url}/${product.category}/${product.id}`}>
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
      </>
   )
}

export default Products