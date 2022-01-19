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
               <Link className="shop-card-item" key={product.id} to={`${url}/${product.category}/${product.id}`}>
                  <div className="card">
                     <img className="card-img-top" src={product.imageUrl} alt="Product"/>
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