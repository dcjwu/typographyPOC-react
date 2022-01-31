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
                          src={product.images[0]}/>
                        <div className="card-body">
                           <div className="card-text-custom">
                              <span className="card-text link">{product.title}</span>
                              <small className="link">from €0.05</small>
                           </div>
                        </div>
                     </div>
                  </Link>
               ))
         }
      </>
   )
}

export default Products