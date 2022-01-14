import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import {getProducts} from '../redux/products/products.actions'
import Spinner from './_UI/Spinner'

const Products = () => {
   const {url} = useRouteMatch()
   const dispatch = useDispatch()
   const {productList, isLoaded} = useSelector(({products}) => products)

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
               <div className="shop-card-item" key={product.id}>
                  <div className="card">
                     <img className="card-img-top" src={product.imageUrl} alt="Product"/>
                     <div className="card-body">
                        <Link
                           className="card-text text-center link"
                           to={`${url}/${product.category}/${product.id}`}>{product.title}</Link>
                     </div>
                  </div>
               </div>
            ))
         }
      </>
   )
}

export default Products