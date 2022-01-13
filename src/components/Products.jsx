import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "./_UI/Spinner";
import {useEffect} from "react";
import {getProducts} from "../redux/products/products.actions";

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
                        <div className='shop-card-item' key={product.id}>
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