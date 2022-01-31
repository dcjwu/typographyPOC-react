import { useSelector } from "react-redux"

import Banner from "../components/Banner"

const Home = () => {
   const { showSuccessMessage } = useSelector(({ auth }) => auth)

   return (
      <div className="home">
         {
            showSuccessMessage
               ?
               <p className="alert-success notification-green text-center login-success">Login
                  Success!</p>
               : null
         }
         <Banner/>
         <h1 className="title">Website description.</h1>
         <div className="home-text-container">
            <small className="mb-3">*This website was made to present an MVP.
               <br/>
               **All additional or specific functionality can be discussed.
            </small>
            <dl>
               <dt>- Authorization with roles — User or Admin.
               </dt>
               <dt>- Admin Panel with order list.
               </dt>
               <dt>- Price is calculated through Excel file.
               </dt>
               <dt>- Feature to add .pdf file in order which is saved to Google Drive.
               </dt>
            </dl>
         </div>
      </div>
   )
}

export default Home