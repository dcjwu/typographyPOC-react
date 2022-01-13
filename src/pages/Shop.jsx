import {useEffect} from "react";
import {useDispatch} from "react-redux";
import Searchbar from "../components/Searchbar";
import Products from "../components/Products";
import {getProducts} from "../redux/products/products.actions";

const Shop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [])

    return (
        <div className='container-content'>
            <Searchbar/>
            <div className="shop">
                <Products/>
            </div>
        </div>
    )
}

export default Shop