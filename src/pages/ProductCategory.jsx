import {Link, useParams, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFilteredProducts} from "../redux/products/products.actions";
import Spinner from "../components/_UI/Spinner";

const ProductCategory = () => {
    const {category} = useParams()
    const {url} = useRouteMatch()
    const dispatch = useDispatch()
    const {productsByCategory, isLoaded} = useSelector(({products}) => products)

    useEffect(() => {
        dispatch(getFilteredProducts(category))
    }, [category])

    return (
        <div className='shop'>
            {
                !isLoaded
                    ? <Spinner/>
                    : productsByCategory && productsByCategory.map(product => (
                        <div className='shop-card-item' key={product.id}>
                            <div className="card">
                                <img className="card-img-top" src={product.imageUrl} alt="Product"/>
                                <div className="card-body">
                                    <Link
                                        className="card-text text-center link"
                                        to={`${url}/${product.id}`}>{product.title}</Link>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default ProductCategory