import { useSelector } from "react-redux"

import homeImage from "../assets/images/home-header.png"

const Home = () => {
   const { showSuccessMessage } = useSelector(({ auth }) => auth)

   return (
      <div className="home">
         {
            showSuccessMessage
               ?
               <p className="alert-success p-5 text-center opacity-75 login-success">Login
                  Success!</p>
               : null
         }
         <img alt="Header" src={homeImage}/>
         <h1 className="title">Website description.</h1>
         <div className="home-text-container">
            <small className="mb-3">*This website was made as the demo version
               to present a minimum product.
            <br/>
               *All additional or specific functionality can be discussed.
            </small>
            <dl>
               <dt>- Please, click on <span className="alert-primary p-1">Login</span> and enter provided
                  credentials.
               </dt>
               <dt>- <span className="alert-success p-1">Green category</span> [on the
                  left] contains active products.
               </dt>
               <dt>- Please, <span className="alert-primary p-1">choose data in calculator</span> and
                  get price from Excel.
               </dt>
               <dt>- Products <span className="alert-primary p-1">added to cart</span> can be
                  visible by clicking button on top right corner.
               </dt>
               <dt>- After order is created, you can see it in <span className="alert-primary p-1">Admin Panel</span> by logging in
                  as admin.
               </dt>
            </dl>
         </div>
      </div>
   )
}

export default Home