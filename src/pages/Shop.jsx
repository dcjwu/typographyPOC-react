import Searchbar from "../components/Searchbar";
import Products from "../components/Products";

const Shop = () => {
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