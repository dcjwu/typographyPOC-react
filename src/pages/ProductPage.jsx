import {useEffect} from "react";
import {useParams, useRouteMatch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../components/_UI/Spinner";
import {clearProductById, getProductById} from "../redux/products/products.actions";

const ProductPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {productById, isLoaded} = useSelector(({products}) => products)

    useEffect(() => {
        dispatch(getProductById(+id))
        return () => {
            dispatch(clearProductById())
        }
    }, [id])

    return (
        <div className='product'>
            {
                !isLoaded
                    ? <Spinner/>
                    : <div className="container-content">
                        <div className="product-header">
                            <div className="product-text">
                                <h2>{productById.title}</h2>
                                <p><small className='mt-4'>Description...</small></p>
                            </div>
                            <img src={productById.imageUrl} alt="Product"/>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ProductPage