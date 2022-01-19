import {useEffect} from 'react'
import {Link, useParams, useRouteMatch} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Spinner from '../components/_UI/Spinner'
import {getFilteredProducts} from '../redux/products/products.actions'

const ProductCategory = () => {
   const {category} = useParams()
   const {url} = useRouteMatch()
   const dispatch = useDispatch()
   const {productsByCategory, isLoaded} = useSelector(({products}) => products)

   useEffect(() => {
      dispatch(getFilteredProducts(category))
   }, [category])

   return (
      <div className="shop">
         {
            !isLoaded
               ? <Spinner/>
               : productsByCategory && productsByCategory.map(product => (
               <div className="shop-card-item" key={product.id}>
                  <div className="card">
                     <Link to={`${url}/${product.id}`}>
                        <img className="card-img-top" src={product.imageUrl} alt="Product"/>
                     </Link>
                     <div className="card-body">
                        <Link
                           className="card-text text-center link"
                           to={`${url}/${product.id}`}>{product.title}
                        </Link>
                     </div>
                  </div>
               </div>
            ))
         }
      </div>
   )
}

export default ProductCategory