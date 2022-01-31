import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useRouteMatch } from "react-router-dom"

import Spinner from "../components/_UI/Spinner"
import Banner from "../components/Banner"
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
      <>
         <Banner/>
         <div className="container-content">
            <h2 className="category-name">Shop {category}</h2>
            <div className="shop">
               {
                  !isLoaded
                     ? <Spinner/>
                     : productsByCategory && productsByCategory.map(product => (
                        <Link key={product.id} className="shop-card-item"
                        to={`${url}/${product.id}`}>
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
            </div>
         </div>
      </>
   )
}

export default ProductCategory