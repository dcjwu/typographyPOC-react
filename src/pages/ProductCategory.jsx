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
               <Link className="shop-card-item" key={product.id} to={`${url}/${product.id}`}>
                  <div className="card">
                        <img className="card-img-top" src={product.imageUrl} alt="Product"/>
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