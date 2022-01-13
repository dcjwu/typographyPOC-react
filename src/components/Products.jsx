import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import Spinner from "./_UI/Spinner";

const Products = () => {
    const router = useHistory()
    const {productList, isLoaded} = useSelector(({products}) => products)

    return (
        <>
            {
                !isLoaded
                ? <Spinner/>
                    : productList.map(product => (
                        <div className='shop-card-item' key={product.id}>
                            <div className="card">
                                <img className="card-img-top" src={product.imageUrl} alt="Product"/>
                                <div className="card-body">
                                    <p
                                        className="card-text text-center link"
                                        onClick={() => router.push(`/shop/${product.category}/${product.id}`)}>{product.title}</p>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}

export default Products