import { Redirect, Route } from "react-router-dom"

const AdminRoute = ({
   component: Component,
   auth,
   ...otherProps
}) => {
   return (
      <Route {...otherProps} render={(props) => (
         auth === true
            ? <Component {...props}/>
            : <Redirect to={"/"}/>
      )}>

      </Route>
   )
}

export default AdminRoute