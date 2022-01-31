import Banner from "../components/Banner"
import Products from "../components/Products"

const Shop = () => {
   return (
      <>
         <Banner/>
         <div className="container-content">
            <h2 className="category-name">All Products</h2>
            <div className="shop">
               <Products/>
            </div>
         </div>
      </>
   )
}

export default Shop